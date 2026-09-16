// One-off asset optimizer. Run with `node scripts/optimize-images.js`.
// Converts the oversized portrait/logo PNGs (several were exported at
// print/canvas resolution, e.g. 8000x10512px for a ~320px-tall card image)
// into resized WebP files so the site doesn't ship tens of megabytes of
// image weight for art that never renders larger than ~1000px on screen.
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.resolve(__dirname, "..");
const MAX_DIMENSION = 1200;
const WEBP_QUALITY = 82;

const TARGETS = [
  { dir: "img/members", maxDimension: MAX_DIMENSION },
  { dir: "img/tech", maxDimension: MAX_DIMENSION },
  { dir: "img", maxDimension: 900, only: ["logo.png"] },
];

async function optimize(filePath, maxDimension) {
  const before = fs.statSync(filePath).size;
  const outPath = filePath.replace(/\.(png|jpe?g)$/i, ".webp");

  await sharp(filePath)
    .resize({ width: maxDimension, height: maxDimension, fit: "inside", withoutEnlargement: true })
    .webp({ quality: WEBP_QUALITY })
    .toFile(outPath);

  const after = fs.statSync(outPath).size;
  fs.unlinkSync(filePath);

  console.log(
    `${path.relative(ROOT, filePath)} -> ${path.relative(ROOT, outPath)} ` +
      `(${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB)`
  );
}

(async () => {
  for (const target of TARGETS) {
    const dirPath = path.join(ROOT, target.dir);
    const files = fs.readdirSync(dirPath).filter((f) => /\.(png|jpe?g)$/i.test(f));
    for (const file of files) {
      if (target.only && !target.only.includes(file)) continue;
      await optimize(path.join(dirPath, file), target.maxDimension);
    }
  }
})();
