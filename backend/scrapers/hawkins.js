const { chromium } = require("playwright");
const Cookware = require("../models/Cookware.js");

const HAWKINS_URLS = [
  { category: "Pressure Cooker", url: "https://buyhawkins.in/ProductDisplay.aspx?e=CKR1&" },
  { category: "Fry Pan", url: "https://buyhawkins.in/ProductCookware.aspx?e=CWR1&f=FP" },
  { category: "Dosa Tawa", url: "https://buyhawkins.in/ProductCookware.aspx?e=CWR1&f=TAVA" },
];

async function scrapeHawkins() {
  console.log("\n🥄 Starting Hawkins scrape...\n");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let totalInserted = 0;

  for (const { category, url } of HAWKINS_URLS) {
    console.log(`📂 Hawkins → ${category}`);
    await page.goto(url, { timeout: 60000, waitUntil: "networkidle" });

    // wait until products appear
    await page.waitForTimeout(3000);

    const productSelectors = await page.$$(".productimage img");

    if (productSelectors.length === 0) {
      console.log("   ⚠ No products detected — skipping.");
      continue;
    }

    console.log(`   Found ${productSelectors.length} product thumbnails.`);

    for (let i = 0; i < productSelectors.length; i++) {
      await productSelectors[i].click();
      await page.waitForTimeout(2500);

      const title = await page.$eval(".Productdetailstitle h4", el => el.innerText.trim()).catch(() => null);
      const price = await page.$eval(".offerpricetext", el => parseInt(el.innerText.replace(/[^\d]/g, ""), 10)).catch(() => null);
      const image = await page.$eval(".productimage img", el => el.src).catch(() => null);

      if (!title) {
        console.log("   ❌ Could not extract product — skipping.");
        continue;
      }

      const exists = await Cookware.findOne({ title, brand: "Hawkins" });

      if (!exists) {
        await Cookware.create({
          title,
          brand: "Hawkins",
          category,
          price,
          image,
          sourceUrl: page.url(),
          scrapedAt: new Date()
        });

        totalInserted++;
        console.log(`   ➕ Added: ${title}`);
      } else {
        console.log(`   ⚠ Exists: ${title}`);
      }
    }
  }

  await browser.close();
  console.log(`\n🎉 Hawkins scrape finished → ${totalInserted} products inserted.\n`);
}

module.exports = scrapeHawkins;
