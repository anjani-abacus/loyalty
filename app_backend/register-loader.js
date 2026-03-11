// register-loader.js (ESM)
import { register } from "node:module";
import { pathToFileURL } from "node:url";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";

// 1. Attach your alias loader
register("./alias-loader.mjs", pathToFileURL("./"));

// 2. Handle --env argument OR NODE_ENV
const args = process.argv.slice(2);
const envArg = args.find((arg) => arg.startsWith("--env="));
const env = envArg ? envArg.split("=")[1] : process.env.NODE_ENV || "development";

// 3. Always load .env.common first
const commonPath = path.resolve(process.cwd(), ".env.common");
if (fs.existsSync(commonPath)) {
    dotenv.config({ path: commonPath });
    // console.log("✅ Loaded .env.common");
}

// 4. Load environment-specific
const envFile = `.env.${env}`;
const envPath = path.resolve(process.cwd(), envFile);

if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath, override: true });
    // console.log(`✅ Loaded ${envFile}`);
} else {
    console.warn(`⚠️  No ${envFile} found`);
}

// console.log(`Running in: ${env}`);
