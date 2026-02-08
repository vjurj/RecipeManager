import { exec } from "child_process";

export async function GET() {
  return new Promise((resolve) => {
    exec("git status --porcelain", (error, stdout) => {
      if (error) {
        resolve(
          new Response(JSON.stringify({ error: error.message }), {
            status: 500,
          })
        );
        return;
      }

      const hasChanges = stdout.trim().length > 0;

      resolve(
        new Response(JSON.stringify({ hasChanges }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });
}
