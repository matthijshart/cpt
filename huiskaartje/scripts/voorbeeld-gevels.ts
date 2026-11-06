/**
 * Tekent eenvoudige, verzonnen grachtenpandgevels als SVG voor de voorbeelddata.
 * Twee designs per pand: zwartwit (lijntekening) en kleur (vlakken).
 *
 * Draaien: npm run voorbeeld:gevels
 * Uitvoer: src/data/voorbeeld/tekeningen/<slug>-<design>.svg
 *
 * Dit is géén generator voor echte panden. Die komt later en levert SVG's
 * met dezelfde afspraken: alleen het pand, een viewBox, geen tekst.
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { voorbeeldGevels } from "../src/data/voorbeeld/panden";

type Gevel = (typeof voorbeeldGevels)[number];
type Design = "zwartwit" | "kleur";

const KLEUREN: Record<string, { gevel: string; accent: string }> = {
  rood: { gevel: "#9c4a35", accent: "#e9dfcc" },
  zand: { gevel: "#e6d9c0", accent: "#9c4a35" },
  donker: { gevel: "#3a322e", accent: "#e9dfcc" },
  groen: { gevel: "#4e6552", accent: "#e9dfcc" },
  hout: { gevel: "#6a4a36", accent: "#e9dfcc" },
};
const KOZIJN = "#fbf8f1";
const GLAS = "#c6d3d6";
const DEUR = "#24382d";
const STEEN = "#8d8882";
const LIJN = "#141414";

interface Ctx {
  design: Design;
  kleur: { gevel: string; accent: string };
  delen: string[];
}

function rect(c: Ctx, x: number, y: number, w: number, h: number, fill: string, extra = "") {
  const f = c.design === "kleur" ? fill : "#ffffff";
  c.delen.push(`<rect x="${r(x)}" y="${r(y)}" width="${r(w)}" height="${r(h)}" fill="${f}" ${extra}/>`);
}
function poly(c: Ctx, punten: [number, number][], fill: string) {
  const f = c.design === "kleur" ? fill : "#ffffff";
  c.delen.push(`<polygon points="${punten.map(([x, y]) => `${r(x)},${r(y)}`).join(" ")}" fill="${f}"/>`);
}
function path(c: Ctx, d: string, fill: string) {
  const f = c.design === "kleur" ? fill : "#ffffff";
  c.delen.push(`<path d="${d}" fill="${f}"/>`);
}
function lijn(c: Ctx, x1: number, y1: number, x2: number, y2: number, dik = 1) {
  c.delen.push(`<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" stroke-width="${dik}"/>`);
}
function r(n: number) {
  return Math.round(n * 100) / 100;
}

function raam(c: Ctx, x: number, y: number, w: number, h: number) {
  rect(c, x - 1.2, y - 1.2, w + 2.4, h + 2.4, KOZIJN);
  rect(c, x, y, w, h, GLAS);
  // roeden
  lijn(c, x + w / 2, y, x + w / 2, y + h, 0.7);
  lijn(c, x, y + h * 0.42, x + w, y + h * 0.42, 0.7);
}

function deur(c: Ctx, x: number, y: number, w: number, h: number) {
  rect(c, x - 1.2, y - 1.2, w + 2.4, h + 1.2, KOZIJN);
  // bovenlicht
  rect(c, x, y, w, h * 0.22, GLAS);
  lijn(c, x + w / 2, y, x + w / 2, y + h * 0.22, 0.7);
  // deur
  rect(c, x, y + h * 0.22 + 1, w, h * 0.78 - 1, DEUR);
  lijn(c, x + w / 2, y + h * 0.22 + 1, x + w / 2, y + h, 0.7);
  // knop
  c.delen.push(`<circle cx="${r(x + w * 0.62)}" cy="${r(y + h * 0.62)}" r="0.9" fill="${c.design === "kleur" ? KOZIJN : "#ffffff"}"/>`);
}

function stoep(c: Ctx, x: number, w: number, grond: number) {
  rect(c, x - 3, grond - 3, w + 6, 3, STEEN);
  rect(c, x - 5, grond - 6, w + 10, 3, STEEN);
  // leuning
  lijn(c, x - 5, grond - 6, x - 5, grond - 14, 0.9);
  lijn(c, x + w + 5, grond - 6, x + w + 5, grond - 14, 0.9);
}

function hijsbalk(c: Ctx, x: number, y: number) {
  lijn(c, x, y, x, y + 7, 1.4);
  lijn(c, x - 2.5, y + 7, x + 2.5, y + 7, 1.2);
}

function tekenGevel(g: Gevel, design: Design): string {
  const c: Ctx = { design, kleur: KLEUREN[g.kleur], delen: [] };
  const ramen = g.ramen;
  const W = ramen === 3 ? 100 : 76;
  const raamB = 14;
  const raamH = 20;
  const verdH = 30;
  const begH = 36;
  const gevelH = { tuit: 34, trap: 34, hals: 40, klok: 38, lijst: 12 }[g.gevel];
  const wandH = begH + verdH * (g.verdiepingen - 1);
  const H = wandH + gevelH + 2;
  const grond = H - 2;
  const topWand = grond - wandH;

  // muur
  rect(c, 0, topWand, W, wandH, c.kleur.gevel);

  // gevel (topgevel)
  const mid = W / 2;
  switch (g.gevel) {
    case "tuit":
      poly(c, [[0, topWand], [mid - 6, topWand - gevelH + 2], [mid + 6, topWand - gevelH + 2], [W, topWand]], c.kleur.gevel);
      lijn(c, 0, topWand, W, topWand, 0.6);
      hijsbalk(c, mid, topWand - gevelH + 2);
      break;
    case "trap": {
      const stappen = 4;
      const stapH = (gevelH - 2) / stappen;
      const stapB = (mid - 7) / stappen;
      const pts: [number, number][] = [[0, topWand]];
      for (let i = 1; i <= stappen; i++) {
        pts.push([(i - 1) * stapB, topWand - i * stapH], [i * stapB, topWand - i * stapH]);
      }
      pts.push([mid - 7, topWand - gevelH + 2], [mid + 7, topWand - gevelH + 2]);
      for (let i = stappen; i >= 1; i--) {
        pts.push([W - i * stapB, topWand - i * stapH], [W - (i - 1) * stapB, topWand - i * stapH]);
      }
      pts.push([W, topWand]);
      poly(c, pts, c.kleur.gevel);
      // speklagen
      for (let v = 1; v < g.verdiepingen; v++) {
        const y = grond - begH - (v - 1) * verdH - 3;
        lijn(c, 0, y, W, y, 0.6);
      }
      hijsbalk(c, mid, topWand - gevelH + 2);
      break;
    }
    case "hals": {
      const schouder = 9;
      const halsB = W * 0.5;
      const top = topWand - gevelH + 2;
      poly(c, [[0, topWand], [0, topWand - schouder], [mid - halsB / 2, topWand - schouder], [mid - halsB / 2, top + 7], [mid + halsB / 2, top + 7], [mid + halsB / 2, topWand - schouder], [W, topWand - schouder], [W, topWand]], c.kleur.gevel);
      // klauwstukken
      path(c, `M ${r(mid - halsB / 2)} ${r(topWand - schouder)} q -9 -2 -9 -10 q 7 2 9 10 z`, c.kleur.accent);
      path(c, `M ${r(mid + halsB / 2)} ${r(topWand - schouder)} q 9 -2 9 -10 q -7 2 -9 10 z`, c.kleur.accent);
      // fronton
      path(c, `M ${r(mid - halsB / 2 - 3)} ${r(top + 7)} q ${r(halsB / 2 + 3)} -14 ${r(halsB + 6)} 0 z`, c.kleur.accent);
      lijn(c, 0, topWand - schouder, W, topWand - schouder, 0.6);
      break;
    }
    case "klok": {
      const top = topWand - gevelH + 2;
      const kruinB = W * 0.36;
      poly(c, [[0, topWand], [W, topWand]], c.kleur.gevel);
      path(
        c,
        `M 0 ${r(topWand)} C ${r(W * 0.05)} ${r(topWand - gevelH * 0.45)}, ${r(mid - kruinB / 2 - 4)} ${r(topWand - gevelH * 0.5)}, ${r(mid - kruinB / 2)} ${r(top + 6)} ` +
          `L ${r(mid + kruinB / 2)} ${r(top + 6)} C ${r(mid + kruinB / 2 + 4)} ${r(topWand - gevelH * 0.5)}, ${r(W * 0.95)} ${r(topWand - gevelH * 0.45)}, ${r(W)} ${r(topWand)} Z`,
        c.kleur.gevel,
      );
      path(c, `M ${r(mid - kruinB / 2 - 2)} ${r(top + 6)} q ${r(kruinB / 2 + 2)} -12 ${r(kruinB + 4)} 0 z`, c.kleur.accent);
      lijn(c, 0, topWand, W, topWand, 0.6);
      break;
    }
    case "lijst": {
      rect(c, -2.5, topWand - 6, W + 5, 6, c.kleur.accent);
      rect(c, -1, topWand - 10, W + 2, 4, c.kleur.gevel);
      poly(c, [[mid - 9, topWand - 10], [mid, topWand - 16], [mid + 9, topWand - 10]], c.kleur.accent);
      break;
    }
  }

  // zolderraam in de topgevel
  if (g.gevel !== "lijst") {
    const zy = topWand - gevelH * 0.55;
    raam(c, mid - 5, zy, 10, 12);
  }

  // verdiepingen
  const kolommen = ramen;
  const vak = W / kolommen;
  for (let v = 1; v < g.verdiepingen; v++) {
    const y = grond - begH - (v - 1) * verdH - verdH + 6;
    for (let k = 0; k < kolommen; k++) {
      raam(c, vak * k + vak / 2 - raamB / 2, y, raamB, raamH);
    }
  }

  // begane grond: deur en ramen
  const deurB = 13;
  const deurH = g.stoep ? 26 : 28;
  const deurKolom = g.deur === "links" ? 0 : g.deur === "rechts" ? kolommen - 1 : Math.floor(kolommen / 2);
  const bgY = grond - begH + 8;
  for (let k = 0; k < kolommen; k++) {
    const cx = vak * k + vak / 2;
    if (k === deurKolom) {
      const dx = cx - deurB / 2;
      const dy = g.stoep ? grond - 6 - deurH : grond - deurH;
      deur(c, dx, dy, deurB, deurH);
      if (g.stoep) stoep(c, dx, deurB, grond);
    } else {
      raam(c, cx - raamB / 2, bgY, raamB, raamH + 2);
    }
  }

  // grondlijn
  lijn(c, -4, grond, W + 4, grond, 1.2);

  const stroke = design === "zwartwit" ? `stroke="${LIJN}" stroke-width="1.1"` : `stroke="#2a2420" stroke-width="0.5"`;
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-6} ${0} ${W + 12} ${H}">`,
    `<!-- Voorbeeldgevel, verzonnen. Niet gebaseerd op het echte pand. -->`,
    `<g ${stroke} stroke-linejoin="round" stroke-linecap="round">`,
    ...c.delen,
    `</g>`,
    `</svg>`,
  ].join("\n");
}

const uit = join(process.cwd(), "src/data/voorbeeld/tekeningen");
mkdirSync(uit, { recursive: true });
let n = 0;
for (const g of voorbeeldGevels) {
  for (const design of ["zwartwit", "kleur"] as const) {
    writeFileSync(join(uit, `${g.slug}-${design}.svg`), tekenGevel(g, design) + "\n");
    n++;
  }
}
console.log(`${n} gevels geschreven naar ${uit}`);
