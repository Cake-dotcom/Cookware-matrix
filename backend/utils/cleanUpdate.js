// backend/utils/cleanUpdate.js
/**
 * Helper function to remove null/undefined/empty values from update data
 * This prevents overwriting existing DB fields with null values
 */
function cleanUpdate(data) {
  const cleaned = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== null && value !== undefined && value !== "") {
      cleaned[key] = value;
    }
  }
  return cleaned;
}

module.exports = cleanUpdate;