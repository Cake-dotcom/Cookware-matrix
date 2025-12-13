// backend/scrapers/hawkins_pdf.js
const axios = require("axios");
const pdfParse = require("pdf-parse");
const Cookware = require("../models/Cookware");

// PDF source
const HAWKINS_PDF_URL =
  process.env.HAWKINS_PDF_URL ||
  "https://www.hawkinscookers.com/download/2024_shareholder_pricelist.pdf";

/* ------------------------------------------------------
   1) Text Normalizers
------------------------------------------------------ */

function normalizeMaterial(text) {
  if (!text) return null;
  text = text.toLowerCase();

  if (text.includes("hard anod")) return "Hard Anodised Aluminum";
  if (text.includes("alum")) return "Aluminum";
  if (text.includes("steel") || text.includes("ss")) return "Stainless Steel";
  if (text.includes("non stick") || text.includes("non-stick")) return "Non-Stick";

  return null;
}

function guessCategory(title) {
  const t = title.toLowerCase();

  if (t.includes("pressure") || t.includes("cooker")) return "Pressure Cooker";
  if (t.includes("tawa") || t.includes("tava")) return "Tawa";
  if (t.includes("pan")) return "Fry Pan";
  if (t.includes("kadhai") || t.includes("kadai")) return "Kadai";
  if (t.includes("handi")) return "Handi";
  if (t.includes("sauce")) return "Sauce Pan";
  if (t.includes("idli")) return "Idli Cooker";
  if (t.includes("biryani")) return "Biryani Pot";
  if (t.includes("grill")) return "Grill Pan";

  return "Cookware";
}

function extractSpecialFeatures(title) {
  title = title.toLowerCase();

  let features = [];

  if (title.includes("hard anod")) features.push("Hard Anodised Coating");
  if (title.includes("non stick")) features.push("Non-Stick Coating");
  if (title.includes("futura")) features.push("Futura Series");
  if (title.includes("contura")) features.push("Contura Shape");
  if (title.includes("classic")) features.push("Classic Series");

  return features.length ? features.join(", ") : null;
}

/* ------------------------------------------------------
   2) Product Extraction from PDF Text
------------------------------------------------------ */

function parseProductsFromText(text) {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);

  const products = [];
  let lastLine = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Identify product names (simple heuristic)
    if (
      /hawkins|futura|contura|classic|tawa|handi|pan|kadai/i.test(line)
    ) {
      lastLine = line;
      continue;
    }

    // Identify capacity
    const capMatch = line.match(/(\d+(\.\d+)?)\s*(litre|ltr|l)\b/i);
    if (!capMatch || !lastLine) continue;

    const capacity = capMatch[1];

    // Identify price → pick last number in line
    const priceMatch = line.match(/(\d{3,6})\b/);
    const price = priceMatch ? parseInt(priceMatch[1], 10) : null;

    const title = `${lastLine} ${capacity} Litre`;

    products.push({
      title,
      rawName: lastLine,
      capacity,
      price,
    });
  }

  return products;
}

/* ------------------------------------------------------
   3) Main Scraper
------------------------------------------------------ */

async function scrapeHawkinsPdf() {
  console.log("\n🔥 STARTING HAWKINS PDF SCRAPER...\n");
  console.log("📄 Downloading Hawkins PDF catalog...");

  try {
    const response = await axios.get(HAWKINS_PDF_URL, {
      responseType: "arraybuffer",
    });

    const pdfData = await pdfParse(response.data);
    const parsedProducts = parseProductsFromText(pdfData.text);

    console.log(`   🔍 Parsed ~${parsedProducts.length} products`);

    let inserted = 0;
    let updated = 0;

    for (const p of parsedProducts) {
      const normalizedMaterial = normalizeMaterial(p.rawName);
      const specialFeatures = extractSpecialFeatures(p.rawName);

      const docData = {
        title: p.title,
        brand: "Hawkins",
        category: guessCategory(p.title),
        price: p.price ?? null,
        material: normalizedMaterial,
        dimensions: p.capacity ? `${p.capacity} Litre` : null,
        weight: null,
        heatCompatibility: null,
        durability: null,
        efficiency: null,
        specialFeatures,
        image: null,
        sourceUrl: HAWKINS_PDF_URL,
        scrapedAt: new Date(),
      };

      const existing = await Cookware.findOne({
        brand: "Hawkins",
        title: p.title,
      });

      if (existing) {
        await Cookware.updateOne({ _id: existing._id }, docData);
        updated++;
      } else {
        await Cookware.create(docData);
        inserted++;
      }
    }

    console.log(
      `\n🎉 Hawkins PDF scrape finished → ${inserted} inserted, ${updated} updated.\n`
    );
  } catch (err) {
    console.error("❌ Error scraping Hawkins PDF:", err.message);
  }
}

module.exports = scrapeHawkinsPdf;
