const axios = require("axios");
const cheerio = require("cheerio");
const Cookware = require("../models/Cookware.js");

/* -----------------------------
   CATEGORY URL LIST
--------------------------------*/
const CATEGORIES = {
  "Pressure Cooker": "https://shop.ttkprestige.com/pressure-cooker.html",
  "Fry Pan": "https://shop.ttkprestige.com/cookware/fry-pan.html",
  "Dosa Tawa": "https://shop.ttkprestige.com/cookware/dosa-tawa.html",
  "Roti Tawa": "https://shop.ttkprestige.com/cookware/roti-tawa.html",
  "Kadai": "https://shop.ttkprestige.com/cookware/kadai.html",
  "Paniyarakkal": "https://shop.ttkprestige.com/cookware/paniyarakkal.html",
  "Casserole": "https://shop.ttkprestige.com/cookware/casseroles.html",
  "Grill Pan": "https://shop.ttkprestige.com/cookware/grill-pan.html",
  "Tadka Pan": "https://shop.ttkprestige.com/cookware/tadka-pan.html",
  "Appachetty": "https://shop.ttkprestige.com/cookware/appachetty.html",
  "Deep Pot": "https://shop.ttkprestige.com/cookware/deep-pot.html",
  "Biryani Pot": "https://shop.ttkprestige.com/cookware/biryani-pot.html",
  "Milk Pan": "https://shop.ttkprestige.com/cookware/milk-pan.html",
  "Sauce Pan": "https://shop.ttkprestige.com/cookware/sauce-pans.html",
  "Idli Cooker": "https://shop.ttkprestige.com/cookware/idli-cookers.html",
  "Air Fryer": "https://shop.ttkprestige.com/kitchen-appliances/air-fryer.html",
  "Mixer Grinder": "https://shop.ttkprestige.com/food-preparation-appliances/mixer-grinder.html"
};

/* -----------------------------------------------------
   CLEAN UPDATE: ensure scraper NEVER overwrites manual
   fields with null / undefined / empty values
------------------------------------------------------*/
function cleanUpdate(data) {
  const cleaned = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined && value !== "") {
      cleaned[key] = value; // Only include real values
    }
  }
  return cleaned;
}

/* -----------------------------------------------------
   SCRAPE PRODUCT DETAILS PAGE
------------------------------------------------------*/
async function getProductDetails(productUrl) {
  try {
    const { data } = await axios.get(productUrl);
    const $ = cheerio.load(data);

    let attrs = {};

    $(".additional-attributes tr").each((i, row) => {
      const key = $(row).find("th").text().trim().toLowerCase();
      const value = $(row).find("td").text().trim();
      attrs[key] = value;
    });

    return {
      material: attrs["material"] || null,
      weight: attrs["weight"] || null,
      efficiency: attrs["energy efficiency"] || null,
      durability: attrs["durability"] || null,
      heatCompatibility: attrs["heat compatibility"] || null,
      releaseYear: attrs["release year"] || null,
      specialFeatures: attrs["features"] || null
    };

  } catch (err) {
    console.log(`❌ Detail scrape failed for: ${productUrl}`);
    return {};
  }
}

/* -----------------------------------------------------
   MAIN SCRAPER
------------------------------------------------------*/
async function scrapePrestige() {
  console.log("\n🛒 STARTING PRESTIGE SCRAPER...\n");

  let inserted = 0;
  let updated = 0;

  for (const [categoryName, url] of Object.entries(CATEGORIES)) {
    console.log(`\n📂 Category: ${categoryName}`);

    try {
      const { data } = await axios.get(url);
      const $ = cheerio.load(data);

      const products = $("li.product-item").toArray();

      for (const el of products) {
        const title = $(el).find(".product-item-link").text().trim();
        if (!title) continue;

        const priceText = $(el).find(".price").first().text().trim();
        const price = parseInt(priceText.replace(/[^\d]/g, ""), 10) || null;

        let productUrl = $(el).find(".product-item-link").attr("href");
        if (productUrl.startsWith("/"))
          productUrl = "https://shop.ttkprestige.com" + productUrl;

        let image = $(el).find("img.product-image-photo").attr("src");
        if (image?.startsWith("//")) image = "https:" + image;

        const details = await getProductDetails(productUrl);

        const filter = { title, brand: "Prestige" };
        const existing = await Cookware.findOne(filter);

        const docData = cleanUpdate({
          title,
          brand: "Prestige",
          category: categoryName,
          price,
          image,
          sourceUrl: productUrl,
          scrapedAt: new Date(),

          // Details (only update if scraper actually gets values)
          material: details.material,
          weight: details.weight,
          efficiency: details.efficiency,
          durability: details.durability,
          heatCompatibility: details.heatCompatibility,
          releaseYear: details.releaseYear,
          specialFeatures: details.specialFeatures
        });

        if (existing) {
          await Cookware.updateOne(filter, docData);
          updated++;
          console.log(`   🔄 UPDATED: ${title}`);
        } else {
          await Cookware.create(docData);
          inserted++;
          console.log(`   ➕ INSERTED: ${title}`);
        }
      }

    } catch (err) {
      console.log(`   ❌ Error scraping ${categoryName}: ${err.message}`);
    }
  }

  console.log("\n------------------------------------------------------");
  console.log("🎉 SCRAPE COMPLETE!");
  console.log(`📌 Inserted: ${inserted} new products`);
  console.log(`📌 Updated: ${updated} existing products`);
  console.log("------------------------------------------------------\n");
}

module.exports = scrapePrestige;
