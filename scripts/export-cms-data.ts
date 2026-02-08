import fs from "fs";
import path from "path";
import { getPayload } from "payload";
import config from "../cms/src/payload.config"

async function run() {
  console.log("Initializing payload");

  const payload = await getPayload({ config });

  console.log("Payload initialized");

  const recipes = await payload.find({
    collection: "recipesrich",
    limit: 9999,
  });

  const outputPath = path.join(process.cwd(), "cms-data", "recipes.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(recipes.docs, null, 2));

  // Copy media folder 
  const sourceMedia = path.join(process.cwd(), "cms", "media"); 
  const destMedia = path.join(process.cwd(), "public", "media");

  fs.mkdirSync(destMedia, { recursive: true }); fs.cpSync(sourceMedia, destMedia, { recursive: true });

  console.log("Exported recipes to cms-data/recipes.json");
}

await run();
