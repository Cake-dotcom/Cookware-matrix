// backend/run-scrapers.js
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");

const scrapePrestige = require("./scrapers/prestige");
const scrapeHawkinsPdf = require("./scrapers/hawkins_pdf");

(async () => {
  console.log("\nRunning full scrape...\n");

  try {
    console.log("Connecting to MongoDB...");
    await connectDB();

    console.log("\nSTARTING PRESTIGE SCRAPER...\n");
    await scrapePrestige();

    console.log("\nSTARTING HAWKINS PDF SCRAPER...\n");
    await scrapeHawkinsPdf();

    console.log("\n------------------------------------------------------");
    console.log("SCRAPE COMPLETE!");
    console.log("------------------------------------------------------\n");

  } catch (err) {
    console.error("SCRAPER ERROR:", err);
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.\n");
  }
})();