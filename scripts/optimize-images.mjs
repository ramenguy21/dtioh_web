// One-off image optimizer for best LCP / payload.
//   node scripts/optimize-images.mjs
// - Generates WebP for every raster (AVIF + responsive widths for the hero).
// - Deletes the heavy original (keeps an optimized hero.jpg for OG/fallback).
import sharp from 'sharp';
import { readdir, stat, writeFile, unlink, readFile } from 'node:fs/promises';
import path from 'node:path';

const IMG = path.resolve('public/images');

// Target max width per path (covers the largest place each image is shown).
function targetWidth(rel) {
  if (rel === 'hero.jpg') return 1920;
  if (/^(certified-bg|journey-bg|work-bg|transform-bg|course-cta-bg|footer)\./.test(rel)) return 1600;
  if (rel.startsWith('blog/')) return 1600;
  if (rel.startsWith('courses/')) return 1500;
  if (rel.startsWith('work/')) return 1100;
  if (rel.startsWith('services/')) return 820;
  if (rel.startsWith('journey/')) return 520;
  return 1500;
}
const bigWebpQ = 64;
const smallWebpQ = 72;

const kb = (b) => (b / 1024).toFixed(0) + ' KB';

async function walk(dir) {
  const out = [];
  for (const name of await readdir(dir)) {
    const full = path.join(dir, name);
    const s = await stat(full);
    if (s.isDirectory()) out.push(...(await walk(full)));
    else out.push(full);
  }
  return out;
}

let savedBefore = 0, savedAfter = 0;

async function toWebp(file, rel) {
  const before = (await stat(file)).size;
  const w = targetWidth(rel);
  const q = w <= 900 ? smallWebpQ : bigWebpQ;
  const target = file.replace(/\.(jpe?g|png)$/i, '.webp');
  const buf = await sharp(file).rotate().resize({ width: w, withoutEnlargement: true }).webp({ quality: q }).toBuffer();
  await writeFile(target, buf);
  savedBefore += before; savedAfter += buf.length;
  console.log(`  ${rel} -> ${path.basename(target)}  ${kb(before)} -> ${kb(buf.length)}`);
  return target;
}

async function buildHero(file) {
  // Read source into memory first so we can safely overwrite hero.jpg on Windows.
  const src = await readFile(file);
  // Responsive AVIF + WebP at 960 and 1920, plus an optimized hero.jpg fallback.
  for (const width of [960, 1920]) {
    const base = sharp(src).rotate().resize({ width, withoutEnlargement: true });
    const avif = await base.clone().avif({ quality: 50 }).toBuffer();
    const webp = await base.clone().webp({ quality: 66 }).toBuffer();
    await writeFile(path.join(IMG, `hero-${width}.avif`), avif);
    await writeFile(path.join(IMG, `hero-${width}.webp`), webp);
    console.log(`  hero-${width}: avif ${kb(avif.length)}, webp ${kb(webp.length)}`);
  }
  const jpg = await sharp(src).rotate().resize({ width: 1600, withoutEnlargement: true }).jpeg({ quality: 72, mozjpeg: true, progressive: true }).toBuffer();
  await writeFile(path.join(IMG, 'hero.jpg'), jpg); // overwrite original with optimized fallback/OG
  console.log(`  hero.jpg (fallback/OG): ${kb(jpg.length)}`);
}

console.log('Optimizing images...');
const files = await walk(IMG);
for (const file of files) {
  const rel = path.relative(IMG, file).split(path.sep).join('/');
  if (!/\.(jpe?g|png)$/i.test(rel)) continue;

  if (rel === 'hero.jpg') {
    await buildHero(file); // creates hero-*.{avif,webp} + optimized hero.jpg (kept)
    continue;
  }
  await toWebp(file, rel);
  await unlink(file); // remove heavy original; refs now point to .webp
}

console.log(`\nTotal (excl. hero variants): ${kb(savedBefore)} -> ${kb(savedAfter)}`);
console.log('Done.');
