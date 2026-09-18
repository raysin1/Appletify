#!/usr/bin/env node
/* Appletify build: concatenates src/styles/*.css (in ORDER.txt order) into
   appletify/user.css. Usage: node build.js [--check]
   --check exits non-zero when appletify/user.css is out of date. */
const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const SRC = path.join(ROOT, "src", "styles");
const OUT = path.join(ROOT, "appletify", "user.css");

const order = fs.readFileSync(path.join(SRC, "ORDER.txt"), "utf8")
  .split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
const onDisk = fs.readdirSync(SRC).filter((f) => f.endsWith(".css")).map((f) => f.replace(/\.css$/, ""));
const missing = order.filter((n) => !onDisk.includes(n));
const unlisted = onDisk.filter((n) => !order.includes(n));
if (missing.length) { console.error("ORDER.txt lists missing modules:", missing.join(", ")); process.exit(1); }
if (unlisted.length) { console.error("modules not in ORDER.txt:", unlisted.join(", ")); process.exit(1); }

const banner = `/* GENERATED FILE — do not edit. Sources live in src/styles/*.css;
   rebuild with: node build.js */\n\n`;
const css = banner + order.map((n) => fs.readFileSync(path.join(SRC, n + ".css"), "utf8").replace(/\r\n/g, "\n").replace(/\s+$/, "") + "\n").join("\n");

if (process.argv.includes("--check")) {
  const current = fs.existsSync(OUT) ? fs.readFileSync(OUT, "utf8") : "";
  if (current !== css) { console.error("appletify/user.css is out of date — run: node build.js"); process.exit(1); }
  console.log("appletify/user.css is up to date");
} else {
  fs.writeFileSync(OUT, css);
  console.log(`wrote ${OUT} (${css.length} bytes, ${order.length} modules)`);
}
