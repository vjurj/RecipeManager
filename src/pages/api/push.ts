import { exec } from "child_process";
import path from "path";

export async function GET() {
  return new Promise((resolve) => {
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
