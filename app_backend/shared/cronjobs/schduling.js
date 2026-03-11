import cron from "node-cron";
import TestTask from "./tasks.js"

// cron.schedule("*/5 * * * * *", TestTask); 
console.log("✅ Cron job scheduled...");
