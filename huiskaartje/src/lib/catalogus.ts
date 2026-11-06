/**
 * De catalogus: panden, adressen en tekeningen.
 *
 * In stap 1 is dit een geheugencatalogus met voorbeelddata. In stap 2 komt hier
 * de database achter, met dezelfde functies. De pagina's praten alleen met dit bestand.
 */
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { DESIGNS, type Design } from "./config";
import type { Adres, Pand, PandMetTekeningen, Tekening } from "./types";

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
  leesSvg(tekening: Tekening): Promise<string>;
}

async function laadBron(): Promise<Bron> {
  if (!voorbeeldDataActief()) {
    return { panden: [], adressen: [], tekeningen: [], leesSvg: async () => "" };
  }
  const { voorbeeldPanden, voorbeeldAdressen, voorbeeldGevels } = await import("@/data/voorbeeld/panden");
  const tekeningen: Tekening[] = voorbeeldGevels.flatMap((g) =>
    DESIGNS.map((design) => ({ pandSlug: g.slug, design, versie: 1, bestand: `voorbeeld/${g.slug}-${design}.svg` })),
  );
  return {
    panden: voorbeeldPanden,
    adressen: voorbeeldAdressen,
    tekeningen,
    leesSvg: (t) => readFile(join(process.cwd(), "src/data/voorbeeld/tekeningen", t.bestand.replace(/^voorbeeld\//, "")), "utf8"),
  };
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

/** De SVG van een tekening als tekst. */
export async function leesTekening(t: Tekening): Promise<string> {
  const bron = await laadBron();
  return bron.leesSvg(t);
}
