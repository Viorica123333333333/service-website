// scripts/generate-placeholders.mjs
//
// Generates lightweight, on-brand SVG placeholder images for every photo
// slot on the site (hero, gallery, wardrobe story, about portrait). These
// are NOT meant to ship to production — replace each with a real,
// optimized photograph (JPG/WebP) at the same file path once available.
// Every placeholder is clearly labeled "PLACEHOLDER IMAGE" so it can
// never be mistaken for real project photography.
//
// Run with: node scripts/generate-placeholders.mjs

import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const PALETTE = {
  ivory: '#F5F0E6',
  stone: '#D8D5CE',
  forest: '#355744',
  sage: '#8FA28D',
  coffee: '#5A4033',
  coffeeLight: '#A88974',
  charcoal: '#252521',
  white: '#FFFEFA',
};

function wardrobeGlyph(cx, cy, scale, stroke) {
  const w = 90 * scale;
  const h = 130 * scale;
  const x = cx - w / 2;
  const y = cy - h / 2;
  return `
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${4 * scale}" fill="none" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
    <line x1="${cx}" y1="${y}" x2="${cx}" y2="${y + h}" stroke="${stroke}" stroke-width="${2 * scale}"/>
    <circle cx="${cx - 8 * scale}" cy="${cy}" r="${2.2 * scale}" fill="${stroke}"/>
    <circle cx="${cx + 8 * scale}" cy="${cy}" r="${2.2 * scale}" fill="${stroke}"/>
  `;
}

function bedGlyph(cx, cy, scale, stroke) {
  const w = 140 * scale;
  const h = 70 * scale;
  const x = cx - w / 2;
  const y = cy - h / 2;
  return `
    <rect x="${x}" y="${y + h * 0.4}" width="${w}" height="${h * 0.6}" rx="${4 * scale}" fill="none" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
    <rect x="${x}" y="${y}" width="${w * 0.22}" height="${h * 0.5}" rx="${4 * scale}" fill="none" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
    <line x1="${x}" y1="${y + h}" x2="${x}" y2="${y + h + 10 * scale}" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
    <line x1="${x + w}" y1="${y + h}" x2="${x + w}" y2="${y + h + 10 * scale}" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
  `;
}

function drawerGlyph(cx, cy, scale, stroke) {
  const w = 110 * scale;
  const h = 90 * scale;
  const x = cx - w / 2;
  const y = cy - h / 2;
  let rows = '';
  for (let i = 0; i < 3; i += 1) {
    const ry = y + (i * h) / 3;
    rows += `<rect x="${x + 6 * scale}" y="${ry + 4 * scale}" width="${w - 12 * scale}" height="${h / 3 - 8 * scale}" fill="none" stroke="${stroke}" stroke-width="${2 * scale}"/>`;
    rows += `<line x1="${cx - 8 * scale}" y1="${ry + h / 6}" x2="${cx + 8 * scale}" y2="${ry + h / 6}" stroke="${stroke}" stroke-width="${2 * scale}"/>`;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${4 * scale}" fill="none" stroke="${stroke}" stroke-width="${2.5 * scale}"/>${rows}`;
}

function deskGlyph(cx, cy, scale, stroke) {
  const w = 140 * scale;
  const h = 70 * scale;
  const x = cx - w / 2;
  const y = cy - h / 2;
  return `
    <line x1="${x}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${stroke}" stroke-width="${3 * scale}"/>
    <line x1="${x + 10 * scale}" y1="${y}" x2="${x + 10 * scale}" y2="${y + h}" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
    <line x1="${x + w - 10 * scale}" y1="${y}" x2="${x + w - 10 * scale}" y2="${y + h}" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
    <rect x="${x + w * 0.55}" y="${y + 4 * scale}" width="${w * 0.3}" height="${h * 0.4}" fill="none" stroke="${stroke}" stroke-width="${2 * scale}"/>
  `;
}

function shelfGlyph(cx, cy, scale, stroke) {
  const w = 100 * scale;
  const h = 130 * scale;
  const x = cx - w / 2;
  const y = cy - h / 2;
  let shelves = '';
  for (let i = 1; i < 4; i += 1) {
    const ly = y + (i * h) / 4;
    shelves += `<line x1="${x}" y1="${ly}" x2="${x + w}" y2="${ly}" stroke="${stroke}" stroke-width="${2 * scale}"/>`;
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${stroke}" stroke-width="${2.5 * scale}"/>${shelves}`;
}

function portraitGlyph(cx, cy, scale, stroke) {
  return `
    <circle cx="${cx}" cy="${cy - 20 * scale}" r="${26 * scale}" fill="none" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
    <path d="M ${cx - 46 * scale} ${cy + 70 * scale} Q ${cx} ${cy + 10 * scale} ${cx + 46 * scale} ${cy + 70 * scale}" fill="none" stroke="${stroke}" stroke-width="${2.5 * scale}"/>
  `;
}

const GLYPHS = {
  wardrobe: wardrobeGlyph,
  bed: bedGlyph,
  drawer: drawerGlyph,
  desk: deskGlyph,
  shelf: shelfGlyph,
  portrait: portraitGlyph,
};

function buildSvg({ width, height, bg, accent, glyph, label }) {
  const cx = width / 2;
  const cy = height / 2 - height * 0.04;
  const scale = Math.min(width, height) / 260;
  const glyphMarkup = GLYPHS[glyph](cx, cy, scale, accent);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${label}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${bg}"/>
      <stop offset="1" stop-color="${PALETTE.stone}"/>
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#bg)"/>
  <g opacity="0.85">${glyphMarkup}</g>
  <text x="${width / 2}" y="${height - 28}" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.max(14, width * 0.028)}" fill="${PALETTE.charcoal}" opacity="0.55">PLACEHOLDER IMAGE — replace with a real photograph</text>
</svg>
`;
}

function write(path, svg) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, svg, 'utf8');
  console.log('Written', path);
}

const ROOT = new URL('../public/images/', import.meta.url).pathname;

// NOTE: the hero image and the "specialist wardrobe assembly" story section
// now use real reference photography (public/images/real/*.jpg — see
// src/config/wardrobeStory.ts and src/components/Hero/WardrobeAssembly.tsx),
// so this script no longer generates hero/ or story/ placeholders. It only
// covers slots that still use placeholder SVGs: the project gallery and the
// about-page portrait.

// Gallery
const galleryItems = [
  ['dulap-freestanding', 'wardrobe', 'Freestanding wardrobe, illustrative image'],
  ['dulap-glisant', 'wardrobe', 'Sliding-door wardrobe, illustrative image'],
  ['dulap-modular', 'wardrobe', 'Modular wardrobe, illustrative image'],
  ['pat-dublu', 'bed', 'Double bed, illustrative image'],
  ['noptiere', 'bed', 'Bedside tables, illustrative image'],
  ['comoda', 'drawer', 'Chest of drawers, illustrative image'],
  ['raft', 'shelf', 'Bookshelf, illustrative image'],
  ['birou', 'desk', 'Desk, illustrative image'],
];
for (const [name, glyph, label] of galleryItems) {
  write(
    `${ROOT}gallery/${name}.svg`,
    buildSvg({ width: 800, height: 600, bg: PALETTE.white, accent: PALETTE.coffee, glyph, label }),
  );
}

// About portrait
write(
  `${ROOT}about/portret.svg`,
  buildSvg({
    width: 720,
    height: 960,
    bg: PALETTE.coffeeLight,
    accent: PALETTE.charcoal,
    glyph: 'portrait',
    label: 'Professional portrait, illustrative image',
  }),
);

console.log('Done.');
