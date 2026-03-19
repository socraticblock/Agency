const { MODULES, FOUNDATIONS } = require("./src/constants/pricing");

console.log("=== Configurator Debug ===");
console.log("FOUNDATIONS count:", FOUNDATIONS.length);
console.log("MODULES count:", MODULES.length);

const categories = Array.from(new Set(MODULES.map(m => m.category)));
console.log("Categories calculated:", categories);

categories.forEach(cat => {
  const filtered = MODULES.filter(m => m.category === cat);
  console.log(`Category [${cat}] has ${filtered.length} modules`);
});
