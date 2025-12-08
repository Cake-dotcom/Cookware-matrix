module.exports = {
  normalizePrice(price) {
    if (!price) return null;
    return parseInt(price.toString().replace(/[^\d]/g, ""), 10) || null;
  },

  normalizeWeight(value) {
    if (!value) return null;
    
    value = value.toLowerCase();
    if (value.includes("kg")) {
      return Math.round(parseFloat(value) * 1000);
    }
    if (value.includes("g")) {
      return Math.round(parseFloat(value));
    }
    return null;
  },

  normalizeMaterial(text) {
    if (!text) return null;
    
    const map = {
      "stainless steel": "Stainless Steel",
      "aluminium": "Aluminium",
      "hard anodized": "Hard Anodized",
      "non stick": "Non-stick"
    };
    
    text = text.toLowerCase();
    for (let key in map) {
      if (text.includes(key)) return map[key];
    }
    return text.charAt(0).toUpperCase() + text.slice(1);
  },

  normalizeRating(text) {
    if (!text) return null;
    
    // Handle percentage ratings
    if (text.includes('%')) {
      const percent = parseFloat(text.replace(/[^\d.]/g, ""));
      return Math.round((percent / 20) * 10) / 10;
    }
    
    // Extract first number (handles "4.5/5", "4.2 stars", etc.)
    const match = text.match(/(\d+\.?\d*)/);
    return match ? parseFloat(match[1]) : null;
  }
};