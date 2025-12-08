const axios = require("axios");
const cheerio = require("cheerio");
const Cookware = require("../models/Cookware.js");

// ---------------------- CATEGORY MAP ----------------------
const CATEGORIES = {
  // "Pressure Cooker": "https://shop.ttkprestige.com/pressure-cooker.html",
  "Fry Pan": "https://shop.ttkprestige.com/cookware/fry-pan.html",
  // "Dosa Tawa": "https://shop.ttkprestige.com/cookware/dosa-tawa.html",
  // "Roti Tawa": "https://shop.ttkprestige.com/cookware/roti-tawa.html",
  // "Kadai": "https://shop.ttkprestige.com/cookware/kadai.html",
  // "Paniyarakkal": "https://shop.ttkprestige.com/cookware/paniyarakkal.html",
  // "Casserole": "https://shop.ttkprestige.com/cookware/casseroles.html",
  // "Grill Pan": "https://shop.ttkprestige.com/cookware/grill-pan.html",
  // "Tadka Pan": "https://shop.ttkprestige.com/cookware/tadka-pan.html",
  // "Appachetty": "https://shop.ttkprestige.com/cookware/appachetty.html",
  // "Deep Pot": "https://shop.ttkprestige.com/cookware/deep-pot.html",
  // "Biryani Pot": "https://shop.ttkprestige.com/cookware/biryani-pot.html",
  // "Milk Pan": "https://shop.ttkprestige.com/cookware/milk-pan.html",
  // "Sauce Pan": "https://shop.ttkprestige.com/cookware/sauce-pans.html",
  // "Idli Cooker": "https://shop.ttkprestige.com/cookware/idli-cookers.html",
  // "Air Fryer": "https://shop.ttkprestige.com/kitchen-appliances/air-fryer.html",
  // "Mixer Grinder": "https://shop.ttkprestige.com/food-preparation-appliances/mixer-grinder.html",
};

// ---------------------- DETAIL PAGE SCRAPE ----------------------
async function getProductDetails(productUrl) {
  try {
    const { data } = await axios.get(productUrl);
    const $ = cheerio.load(data);

    const attributes = {};
    $(".additional-attributes tr").each((_, row) => {
      const key = $(row).find("th").text().trim().toLowerCase();
      const value = $(row).find("td").text().trim();
      attributes[key] = value;
    });

    return {
      material: attributes["material"] || null,
      weight: attributes["weight"] || null,
      efficiency: attributes["energy efficiency"] || null,
      durability: attributes["durability"] || null,
      heatCompatibility: attributes["heat compatibility"] || null,
      releaseYear: attributes["release year"] || null,
      specialFeatures: attributes["features"] || null,
    };

  } catch (error) {
    console.log(`❌ Failed details page → ${productUrl}`);
    return {};
  }
}

// ---------------------- MAIN SCRAPER ----------------------
async function scrapePrestige() {
  console.log(`\n🛒 STARTING PRESTIGE SCRAPER...\n`);
  let inserted = 0;
  let updated = 0;

  for (const [categoryName, url] of Object.entries(CATEGORIES)) {
    console.log(`📂 Category: ${categoryName}`);

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const productList = $("li.product-item").toArray();

      for (const el of productList) {
        const title = $(el).find(".product-item-link").text().trim();
        if (!title) continue;

        const priceText = $(el).find(".price").first().text().trim();
        const price = parseInt(priceText.replace(/[^\d]/g, "") || 0, 10);

        let productUrl = $(el).find(".product-item-link").attr("href");
        if (productUrl?.startsWith("/"))
          productUrl = "https://shop.ttkprestige.com" + productUrl;

        let image = $(el).find("img.product-image-photo").attr("src");
        if (image?.startsWith("//")) image = "https:" + image;

        // Get deep details
        const details = await getProductDetails(productUrl);

        const item = {
          title,
          brand: "Prestige",
          category: categoryName,
          price,
          image,
          sourceUrl: productUrl,
          scrapedAt: new Date(),
          ...details,
        };

        // 🔁 Check if exists
        const existing = await Cookware.findOne({ title, brand: "Prestige" });

        if (!existing) {
          await Cookware.create(item);
          inserted++;
          console.log(`   ➕ NEW ITEM: ${title}`);
        } else {
          await Cookware.updateOne({ _id: existing._id }, { $set: item });
          updated++;
          console.log(`   🔄 UPDATED: ${title}`);
        }

        // Prevent rate limiting
        await new Promise(res => setTimeout(res, 300));
      }

    } catch (err) {
      console.log(`   ❌ Error scraping ${categoryName}: ${err.message}`);
    }
  }

  console.log(`
------------------------------------------------------
🎉 SCRAPE COMPLETE!
📌 Inserted: ${inserted} new products
📌 Updated: ${updated} existing products
------------------------------------------------------
`);
}

module.exports = scrapePrestige;
