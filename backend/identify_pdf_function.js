const raw = require("pdf-parse");

console.log("Keys in pdf-parse export:", Object.keys(raw));
console.log("Default:", typeof raw.default);

for (const key of Object.keys(raw)) {
  console.log(`KEY: ${key} → TYPE: ${typeof raw[key]}`);
}
