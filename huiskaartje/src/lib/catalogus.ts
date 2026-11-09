/**
 * De catalogus: panden, adressen en tekeningen.
 *
 * In stap 1 is dit een geheugencatalogus met voorbeelddata. In stap 2 komt hier
 * de database achter, met dezelfde functies. De pagina's praten alleen met dit bestand.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DESIGNS, type Design } from "./config";
import { leesBestand } from "./opslag";
import type { TekeningBron } from "./print/sjabloon";
import type { Adres, Pand, PandMetTekeningen, Tekening } from "./types";
import { panden as echtePanden, adressen as echteAdressen, tekeningen as echteTekeningen } from "@/data/panden";

/**
 * Voorbeelddata alleen lokaal: nooit op Vercel, nooit in een productiebuild,
 * tenzij iemand het uitdrukkelijk aanzet met HUISKAARTJE_VOORBEELDDATA=1.
 */
export function voorbeeldDataActief(): boolean {
  if (process.env.HUISKAARTJE_VOORBEELDDATA === "1") return true;
  if (process.env.HUISKAARTJE_VOORBEELDDATA === "0") return false;
  return process.env.NODE_ENV === "development" && !process.env.VERCEL;
}

interface Bron {
  panden: Pand[];
  adressen: Adres[];
  tekeningen: Tekening[];
}

/** Echte panden (src/data/panden.ts) plus, alleen lokaal, de voorbeeldpanden. */
async function laadBron(): Promise<Bron> {
  const bron: Bron = { panden: [...echtePanden], adressen: [...echteAdressen], tekeningen: [...echteTekeningen] };
  if (!voorbeeldDataActief()) return bron;
  const { voorbeeldPanden, voorbeeldAdressen, voorbeeldGevels } = await import("@/data/voorbeeld/panden");
  const echteSlugs = new Set(bron.panden.map((p) => p.slug));
  bron.panden.push(...voorbeeldPanden.filter((p) => !echteSlugs.has(p.slug)));
  bron.adressen.push(...voorbeeldAdressen.filter((a) => !echteSlugs.has(a.pandSlug)));
  for (const g of voorbeeldGevels) {
    if (echteSlugs.has(g.slug)) continue;
    for (const design of DESIGNS) {
      bron.tekeningen.push({
        pandSlug: g.slug,
        design,
        versie: 1,
        soort: "svg",
        mime: "image/svg+xml",
        bestand: `voorbeeld/${g.slug}-${design}.svg`,
        breedtePx: null,
        hoogtePx: null,
      });
    }
  }
  return bron;
}

function zichtbaar(p: Pand): boolean {
  return p.status !== "verwijderd";
}

async function metTekeningen(bron: Bron, pand: Pand): Promise<PandMetTekeningen> {
  const tekeningen: Partial<Record<Design, Tekening>> = {};
  for (const t of bron.tekeningen) {
    if (t.pandSlug !== pand.slug) continue;
    const huidig = tekeningen[t.design];
    if (!huidig || huidig.versie < t.versie) tekeningen[t.design] = t;
  }
  return { pand, tekeningen };
}

/** Een pand op slug. Verwijderde panden bestaan niet. */
export async function haalPand(slug: string): Promise<PandMetTekeningen | null> {
  const bron = await laadBron();
  const pand = bron.panden.find((p) => p.slug === slug);
  if (!pand || !zichtbaar(pand)) return null;
  return metTekeningen(bron, pand);
}

/** Het pand bij een BAG-nummeraanduiding of, als dat niets oplevert, bij een afgeleide slug. */
export async function vindPandVoorAdres(opties: { nummeraanduidingId?: string; slug?: string }): Promise<Pand | null> {
  const bron = await laadBron();
  let pand: Pand | undefined;
  if (opties.nummeraanduidingId) {
    const adres = bron.adressen.find((a) => a.bagNummeraanduidingId === opties.nummeraanduidingId);
    if (adres) pand = bron.panden.find((p) => p.slug === adres.pandSlug);
  }
  if (!pand && opties.slug) pand = bron.panden.find((p) => p.slug === opties.slug);
  if (!pand || !zichtbaar(pand)) return null;
  return pand;
}

/** Goedgekeurde panden met tekening, voor de homepage. */
export async function haalVoorbeelden(aantal: number): Promise<PandMetTekeningen[]> {
  const bron = await laadBron();
  const uit: PandMetTekeningen[] = [];
  for (const p of bron.panden) {
    if (p.status !== "goedgekeurd") continue;
    const m = await metTekeningen(bron, p);
    if (Object.keys(m.tekeningen).length === 0) continue;
    uit.push(m);
    if (uit.length >= aantal) break;
  }
  return uit;
}

/** De bytes van een tekening. Voorbeeldgevels komen uit src/data, de rest uit de opslag. */
export async function leesTekening(t: Tekening): Promise<Buffer> {
  if (t.bestand.startsWith("voorbeeld/")) {
    return readFile(join(process.cwd(), "src/data/voorbeeld/tekeningen", t.bestand.slice("voorbeeld/".length)));
  }
  return leesBestand(t.bestand);
}

/** Wat het sjabloon nodig heeft: SVG-tekst, of een url naar de afbeelding. */
export async function tekeningBron(t: Tekening): Promise<TekeningBron> {
  if (t.soort === "svg") return { soort: "svg", svg: (await leesTekening(t)).toString("utf8") };
  return {
    soort: "afbeelding",
    url: `/tekening/${t.pandSlug}/${t.design}?v=${t.versie}`,
    breedtePx: t.breedtePx ?? 1000,
    hoogtePx: t.hoogtePx ?? 1000,
  };
}
