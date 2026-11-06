/**
 * Hulpfuncties voor adressen en pand-sleutels.
 */

export function slugify(tekst: string): string {
  return tekst
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Sleutel van een pand op basis van wat de Locatieserver teruggeeft.
 * Alle toevoegingen (H, 1, 2, 3) van hetzelfde huisnummer komen op één pand uit.
 * Een huisletter (11A, 11B) telt als apart pand. Dat klopt meestal, maar niet altijd;
 * de echte BAG-pand-id komt bij het importeren.
 */
export function pandSlugVoor(a: {
  straat: string;
  huisnummer: number;
  huisletter?: string | null;
  woonplaats?: string | null;
}): string {
  const nummer = `${a.huisnummer}${(a.huisletter ?? "").toLowerCase()}`;
  const basis = `${slugify(a.straat)}-${nummer}`;
  if (a.woonplaats && a.woonplaats.toLowerCase() !== "amsterdam") {
    return `${basis}-${slugify(a.woonplaats)}`;
  }
  return basis;
}

export function huisnummerWeergave(a: {
  huisnummer: number;
  huisletter?: string | null;
  toevoeging?: string | null;
}): string {
  let s = `${a.huisnummer}${a.huisletter ?? ""}`;
  if (a.toevoeging) s += `-${a.toevoeging}`;
  return s;
}
