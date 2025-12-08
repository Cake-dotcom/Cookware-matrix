const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  await page.goto("https://www.buyhawkins.in/ProductDisplay.aspx?e=CKR1&", {
    waitUntil: "networkidle"
  });

  // wait extra time in case JS loads slow
  await page.waitForTimeout(4000);

  // Print ONLY product-related HTML
  const html = await page.content();
  console.log(html);

  await browser.close();
})();
