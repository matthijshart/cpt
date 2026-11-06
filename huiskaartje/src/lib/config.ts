/**
 * Eén plek voor formaten, prijzen en designs.
 * Prijzen zijn in eurocenten, inclusief btw en verzending.
 */

export const DESIGNS = ["zwartwit", "kleur"] as const;
export type Design = (typeof DESIGNS)[number];

export const FORMATEN = [
  { code: "21x30", breedteMm: 210, hoogteMm: 300, prijsCent: 2900 },
  { code: "30x40", breedteMm: 300, hoogteMm: 400, prijsCent: 4500 },
  { code: "50x70", breedteMm: 500, hoogteMm: 700, prijsCent: 6900 },
] as const;
export type FormaatCode = (typeof FORMATEN)[number]["code"];
export type Formaat = (typeof FORMATEN)[number];

export const STANDAARD_DESIGN: Design = "zwartwit";
export const STANDAARD_FORMAAT: FormaatCode = "30x40";

export const EIGEN_REGEL_MAX = 40;

export const BTW_PERCENTAGE = 21;

export function vindFormaat(code: string): Formaat | undefined {
  return FORMATEN.find((f) => f.code === code);
}

export function isDesign(x: string): x is Design {
  return (DESIGNS as readonly string[]).includes(x);
}

export function formatteerPrijs(cent: number): string {
  const euro = Math.floor(cent / 100);
  const rest = cent % 100;
  return rest === 0 ? `€ ${euro}` : `€ ${euro},${String(rest).padStart(2, "0")}`;
}
