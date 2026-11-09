/**
 * Het printsjabloon. Dezelfde functie levert het voorbeeld op de site en, later,
 * de drukklare pdf op ware grootte. Alle maten in millimeters.
 *
 * Opbouw: crèmekleurig papier. De tekening staat bovenin, in een vak dat de
 * breedte van de print minus de marges vult, en rust op een vaste grondlijn.
 * Daaronder: straat en huisnummer in kapitalen, "AMSTERDAM" tussen twee lijntjes,
 * en de eigen regel cursief.
 * De ruimte voor de eigen regel is altijd gereserveerd, zodat de tekening niet
 * verspringt als iemand begint te typen.
 */
import type { Formaat } from "../config";

/** De tekening zoals het sjabloon hem krijgt: SVG-tekst of een afbeelding op een url. */
export type TekeningBron =
  | { soort: "svg"; svg: string }
  | { soort: "afbeelding"; url: string; breedtePx: number; hoogtePx: number };

export interface PrintInvoer {
  formaat: Pick<Formaat, "breedteMm" | "hoogteMm">;
  tekening: TekeningBron;
  straat: string;
  huisnummer: string;
  stad: string;
  eigenRegel?: string;
}

export const PRINT_LETTERTYPE = "'Fraunces Variable', Fraunces, Georgia, serif";

function escapeXml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

/** Haalt viewBox en inhoud uit een SVG-bestand, zodat het genest kan worden. */
export function ontleedSvg(svg: string): { viewBox: string; inhoud: string } {
  const open = svg.match(/<svg\b[^>]*>/i);
  const viewBox = open?.[0].match(/viewBox\s*=\s*"([^"]+)"/i)?.[1];
  if (!open || !viewBox) throw new Error("Tekening heeft geen viewBox");
  const inhoud = svg.slice(open.index! + open[0].length).replace(/<\/svg>\s*$/i, "");
  return { viewBox, inhoud };
}

export const PRINT_PAPIER = "#faf2e8";

export function maakPrintSvg(i: PrintInvoer): string {
  const W = i.formaat.breedteMm;
  const H = i.formaat.hoogteMm;
  const n = (x: number) => Math.round(x * 100) / 100;

  const zijMarge = W * 0.1;
  const bovenMarge = W * 0.1;
  const onderMarge = H * 0.075;

  const maat1 = W * 0.04; // straat en huisnummer, kapitalen
  const maat2 = W * 0.022; // AMSTERDAM
  const maat3 = W * 0.03; // eigen regel, cursief

  const y3 = H - onderMarge;
  const y2 = y3 - W * 0.06;
  const y1 = y2 - W * 0.055;
  const grond = y1 - maat1 * 1.6;

  const tekH = grond - bovenMarge;
  const tekW = W - 2 * zijMarge;
  let tekening: string;
  if (i.tekening.soort === "svg") {
    const tek = ontleedSvg(i.tekening.svg);
    tekening = `<svg x="${n(zijMarge)}" y="${n(bovenMarge)}" width="${n(tekW)}" height="${n(tekH)}" viewBox="${tek.viewBox}" preserveAspectRatio="xMidYMax meet">${tek.inhoud}</svg>`;
  } else {
    tekening = `<image x="${n(zijMarge)}" y="${n(bovenMarge)}" width="${n(tekW)}" height="${n(tekH)}" href="${escapeXml(i.tekening.url)}" preserveAspectRatio="xMidYMax meet"/>`;
  }

  const regel1 = escapeXml(`${i.straat} ${i.huisnummer}`.toUpperCase());
  const regel2 = escapeXml(i.stad.toUpperCase());
  const lijnLengte = W * 0.07;
  const lijnAfstand = maat2 * 0.5 + regel2.length * maat2 * 0.95 * 0.5 + W * 0.025;

  const regels: string[] = [];
  regels.push(
    `<text x="${n(W / 2)}" y="${n(y1)}" text-anchor="middle" font-size="${n(maat1)}" letter-spacing="${n(maat1 * 0.22)}" font-weight="400">${regel1}</text>`,
  );
  regels.push(
    `<text x="${n(W / 2)}" y="${n(y2)}" text-anchor="middle" font-size="${n(maat2)}" letter-spacing="${n(maat2 * 0.32)}" font-weight="400">${regel2}</text>`,
  );
  const lijnY = y2 - maat2 * 0.32;
  regels.push(
    `<line x1="${n(W / 2 - lijnAfstand - lijnLengte)}" y1="${n(lijnY)}" x2="${n(W / 2 - lijnAfstand)}" y2="${n(lijnY)}" stroke="#141414" stroke-width="${n(W * 0.0012)}"/>`,
    `<line x1="${n(W / 2 + lijnAfstand)}" y1="${n(lijnY)}" x2="${n(W / 2 + lijnAfstand + lijnLengte)}" y2="${n(lijnY)}" stroke="#141414" stroke-width="${n(W * 0.0012)}"/>`,
  );
  const eigen = (i.eigenRegel ?? "").trim();
  if (eigen) {
    regels.push(
      `<text x="${n(W / 2)}" y="${n(y3)}" text-anchor="middle" font-size="${n(maat3)}" font-style="italic" font-weight="400" fill="#4a4a4a">${escapeXml(eigen)}</text>`,
    );
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${W}mm" height="${H}mm" viewBox="0 0 ${W} ${H}" font-family="${PRINT_LETTERTYPE}" fill="#141414">`,
    `<rect width="${W}" height="${H}" fill="${PRINT_PAPIER}"/>`,
    tekening,
    ...regels,
    `</svg>`,
  ].join("\n");
}
