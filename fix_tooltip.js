const fs = require('fs');
const path = "c:\\dev\\Personal\\my-agency\\src\\app\\[locale]\\architect\\_components\\FoundationCard.tsx";

let content = fs.readFileSync(path, 'utf8');
const target = 'absolute bottom-full left-0 mb-1';
const replacement = 'absolute top-full left-0 mt-1';

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(path, content, 'utf8');
  console.log("Replaced successfully");
} else {
  console.log("Target string not found in file content");
  // Dump a slice of text around what is expected to debug
  const snippet = content.slice(content.indexOf('WHAT YOU GET'), content.indexOf('f.scope'));
  console.log("Snippet bounds:", snippet);
}
