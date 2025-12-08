const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.buyhawkins.in/ProductDisplay.aspx?e=CKR1&", { waitUntil: "networkidle" });
  await page.waitForTimeout(3000);

  const html = await page.content();
  console.log(html.substring(0, 5000)); // preview HTML

  await browser.close();
})();
