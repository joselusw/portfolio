import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2] || "dist/portfolio/browser";

for (const file of ["index.html", "index.csr.html"]) {
  const p = join(dir, file);
  if (!existsSync(p)) {
    console.log(`[post-build] skip ${file} (not found)`);
    continue;
  }

  const html = readFileSync(p, "utf8");
  const links = [...html.matchAll(/<link\b[^>]*>/g)];

  const printHrefs = new Set(
    links
      .filter((m) => /\brel="stylesheet"/.test(m[0]) && /\bmedia="print"/.test(m[0]))
      .map((m) => (m[0].match(/href="([^"]+)"/) || [])[1])
  );

  const next = html.replace(/<link\b[^>]*>/g, (tag) => {
    if (/\brel="stylesheet"/.test(tag) && !/\bmedia="print"/.test(tag)) {
      const href = (tag.match(/href="([^"]+)"/) || [])[1];
      if (href && printHrefs.has(href)) {
        return "";
      }
    }
    return tag;
  });

  if (next === html) {
    console.log(`[post-build] ${file}: no redundant normal stylesheet link`);
  } else {
    writeFileSync(p, next);
    console.log(`[post-build] ${file}: removed duplicate normal stylesheet link`);
  }
}
