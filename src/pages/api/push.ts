import { exec } from "child_process";
import path from "path";

export async function GET() {
     // Prevent this from running in production builds 
     if (import.meta.env.PROD) { return new Response("Not available in production", { status: 404 }); }

  return new Promise(async (resolve) => {

     // 1. Run export script 
     exec("npm run export-cms", async (error) => { 
        if (error) { 
            resolve(new Response("Export failed: " + error.message, { status: 500 })); 
            return; 
        }});

    const hasChangesRes = await fetch("http://localhost:4321/api/hasChanges"); 
    const { hasChanges } = await hasChangesRes.json();

    if (!hasChanges) { 
        resolve(new Response("No changes to commit", { status: 200 })); 
        return; 
    }

    const scriptPath = path.join(process.cwd(), "scripts", "push.cmd");

    exec(`"${scriptPath}"`, (error, stdout, stderr) => {
      if (error) {
        resolve(
          new Response(
            "Error running script:\n" + error.message + "\n" + stderr,
            { status: 500 }
          )
        );
        return;
      }

      resolve(
        new Response("Success:\n" + stdout, {
          status: 200,
        })
      );
    });
  });
}
