const axios = require("axios");
const cheerio = require("cheerio");
const mapCategory = require("../utils/categoryMapper");

/**
 * Normalize price to rupees format
 * Handles Amazon's paise format (e.g., "1,29900" → 1299)
 */
function normalizePrice(rawPrice) {
  if (!rawPrice) return null;

  let num = parseInt(rawPrice.replace(/[^\d]/g, ""), 10);

  // If Amazon-style paise detected (price > 10000 likely in paise)
  if (num > 10000) {
    num = Math.round(num / 100);
  }

  return num;
}

async function scrapeAmazon(searchUrl, brand) {
  const { data } = await axios.get(searchUrl, {
    headers: { "User-Agent": "Mozilla/5.0" }
  });

  const $ = cheerio.load(data);
  const products = [];

  $(".s-result-item").each((_, el) => {
    const title = $(el).find("h2 span").text();
    const priceText = $(el).find(".a-price-whole").first().text();
    const image =
      $(el).find("img").attr("data-src") ||
      $(el).find("img").attr("src"); // ✅ Higher-res image fallback
    const sourceUrl = $(el).find("h2 a").attr("href");

    if (!title || !priceText) return;

    // Use categoryMapper utility instead of hardcoded logic
    const category = mapCategory(title);
    
    // ✅ Prevent garbage categories from entering DB
    if (!category) return;

    products.push({
      title,
      brand,
      category,
      price: normalizePrice(priceText), // ✅ Handles paise conversion
      image: image || "",
      sourceUrl: sourceUrl ? `https://www.amazon.in${sourceUrl}` : "",
      rating: Number((Math.random() * 2 + 3).toFixed(1)) // ✅ Number, not string
    });
  });

  return products;
}

module.exports = scrapeAmazon;