const dotenv = require("dotenv").config();
const cron = require("node-cron");
const mongoose = require("mongoose");
const scrapePrestige = require("./scrapers/prestige.js");
const scrapeHawkins = require("./scrapers/hawkins.js"); // ✅ Already here!

mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/cookwareDB")
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.log(err));

async function runScraping() {
  console.log("\n🚀 Running full scrape...\n");
  
  try {
    // 1) Prestige (all categories you already set up)
    await scrapePrestige(); // ✅ Already running!
    
    // 2) Hawkins (Deep Fry Pan + Dosa Tawa for now)
    await scrapeHawkins(); // ✅ Already running!
    
    console.log("📌 Scrape finished.\n");
  } catch (err) {
    console.error("❌ Scraper error:", err.message);
  }
}

// Run once immediately
runScraping();

// Schedule every Sunday at 2 AM
cron.schedule("0 2 * * SUN", () => {
  console.log("\n⏳ Scheduled scrape triggered...");
  runScraping();
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await mongoose.disconnect();
  console.log("✅ DB Disconnected");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n🛑 Shutting down gracefully...");
  await mongoose.disconnect();
  console.log("✅ DB Disconnected");
  process.exit(0);
});