/**
 * Adressen zoeken bij de PDOK Locatieserver (gratis, zonder sleutel).
 * Alleen op de server gebruiken.
 *
 * Gebouwd op echte antwoorden van /free en /lookup (november 2026). Velden die we gebruiken:
 * id, weergavenaam, straatnaam, huisnummer, huisletter, huisnummertoevoeging, postcode,
 * woonplaatsnaam, openbareruimte_id, nummeraanduiding_id, adresseerbaarobject_id, adrestype.
 * De Locatieserver kent géén BAG-pand-id; die halen we bij het importeren elders op.
 */
import { huisnummerWeergave, pandSlugVoor } from "./adres";

const BASIS = "https://api.pdok.nl/bzk/locatieserver/search/v3_1";
const GEMEENTE_AMSTERDAM = "0363";
const VELDEN =
  "id,weergavenaam,straatnaam,huisnummer,huisletter,huisnummertoevoeging,postcode,woonplaatsnaam,openbareruimte_id,nummeraanduiding_id,adresseerbaarobject_id,adrestype,centroide_ll";

export interface PdokAdres {
  pdokId: string;
  weergavenaam: string;
  straat: string;
  huisnummer: number;
  huisletter: string | null;
  toevoeging: string | null;
  postcode: string | null;
  woonplaats: string;
  openbareRuimteId: string;
  nummeraanduidingId: string;
  adresseerbaarObjectId: string;
  centroide: { lon: number; lat: number } | null;
}

/** Eén suggestie in de adreszoeker: één per pand, niet per toevoeging. */
export interface AdresSuggestie {
  pdokId: string;
  pandSlug: string;
  /** "Prinsengracht 110" */
  regel1: string;
  /** "1015 EA Amsterdam" */
  regel2: string;
}

interface PdokDoc {
  id: string;
  weergavenaam: string;
  straatnaam: string;
  huisnummer: number;
  huisletter?: string;
  huisnummertoevoeging?: string;
  postcode?: string;
  woonplaatsnaam: string;
  openbareruimte_id: string;
  nummeraanduiding_id: string;
  adresseerbaarobject_id: string;
  adrestype?: string;
  centroide_ll?: string;
}

function naarAdres(d: PdokDoc): PdokAdres {
  const m = d.centroide_ll?.match(/POINT\(([-\d.]+) ([-\d.]+)\)/);
  return {
    pdokId: d.id,
    weergavenaam: d.weergavenaam,
    straat: d.straatnaam,
    huisnummer: d.huisnummer,
    huisletter: d.huisletter ?? null,
    toevoeging: d.huisnummertoevoeging ?? null,
    postcode: d.postcode ?? null,
    woonplaats: d.woonplaatsnaam,
    openbareRuimteId: d.openbareruimte_id,
    nummeraanduidingId: d.nummeraanduiding_id,
    adresseerbaarObjectId: d.adresseerbaarobject_id,
    centroide: m ? { lon: Number(m[1]), lat: Number(m[2]) } : null,
  };
}

async function haal(pad: string, params: Record<string, string | string[]>): Promise<PdokDoc[]> {
  const u = new URL(`${BASIS}/${pad}`);
  for (const [k, v] of Object.entries(params)) {
    for (const x of Array.isArray(v) ? v : [v]) u.searchParams.append(k, x);
  }
  const res = await fetch(u, { headers: { Accept: "application/json" }, next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`PDOK antwoordde ${res.status}`);
  const json = (await res.json()) as { response: { docs: PdokDoc[] } };
  return json.response.docs;
}

function tokens(s: string): string[] {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

export function postcodeWeergave(p: string | null): string {
  return p ? `${p.slice(0, 4)} ${p.slice(4)}` : "";
}

/** Zoekt adressen in de gemeente Amsterdam en vouwt toevoegingen samen tot één regel per pand. */
export async function zoekAdressen(q: string, max = 6): Promise<AdresSuggestie[]> {
  const schoon = q.trim();
  if (schoon.length < 2) return [];
  const docs = await haal("free", {
    q: schoon,
    fq: [`gemeentecode:${GEMEENTE_AMSTERDAM}`, "type:adres", "adrestype:hoofdadres"],
    rows: "30",
    fl: VELDEN,
  });
  const gezien = new Map<string, AdresSuggestie>();
  const termen = tokens(schoon);
  for (const d of docs) {
    // PDOK matcht op elk los woord ("qqq 999" vindt alles met 999). Wij eisen dat
    // elk getypt woord het begin is van een woord in het adres.
    const woorden = tokens(d.weergavenaam);
    if (!termen.every((t) => woorden.some((w) => w.startsWith(t)))) continue;
    const a = naarAdres(d);
    const slug = pandSlugVoor(a);
    if (gezien.has(slug)) continue;
    const plaats = a.woonplaats;
    gezien.set(slug, {
      pdokId: a.pdokId,
      pandSlug: slug,
      regel1: `${a.straat} ${huisnummerWeergave({ huisnummer: a.huisnummer, huisletter: a.huisletter })}`,
      regel2: [postcodeWeergave(a.postcode), plaats].filter(Boolean).join(" "),
    });
    if (gezien.size >= max) break;
  }
  return [...gezien.values()];
}

/** Haalt één adres op aan de hand van het PDOK-id (adr-...). */
export async function haalAdres(pdokId: string): Promise<PdokAdres | null> {
  if (!/^adr-[a-f0-9]{32}$/.test(pdokId)) return null;
  const docs = await haal("lookup", { id: pdokId, fl: VELDEN });
  const d = docs[0];
  if (!d || d.straatnaam === undefined) return null;
  return naarAdres(d);
}

/** Alle hoofdadressen van één straat in Amsterdam. Voor het importscript. */
export async function haalStraat(straat: string): Promise<PdokAdres[]> {
  const alles: PdokAdres[] = [];
  for (let start = 0; ; start += 100) {
    const docs = await haal("free", {
      q: straat,
      fq: [`gemeentecode:${GEMEENTE_AMSTERDAM}`, "type:adres", "adrestype:hoofdadres", `straatnaam:"${straat}"`],
      rows: "100",
      start: String(start),
      fl: VELDEN,
    });
    alles.push(...docs.filter((d) => d.straatnaam === straat).map(naarAdres));
    if (docs.length < 100) break;
  }
  return alles;
}
