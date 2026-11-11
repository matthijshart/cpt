/**
 * Betaallaag. Mollie later; nu een nepvariant voor lokaal gebruik.
 *
 * De flow is dezelfde als bij Mollie: we maken een betaling aan, sturen de klant
 * naar de betaalpagina, en de betaaldienst meldt de uitkomst aan onze webhook.
 * De bestelling verandert alleen van status door die webhook, nooit doordat de
 * klant terugkomt op de site.
 */
import type { Bestelling } from "./types";

export type BetaalUitkomst = "betaald" | "mislukt" | "geannuleerd" | "open";

export interface Betaaldienst {
  naam: string;
  /** Maakt een betaling aan en geeft de url waar de klant heen moet. */
  start(bestelling: Bestelling, basisUrl: string): Promise<{ betalingId: string; url: string }>;
  /** Vraagt de status van een betaling op, zoals de webhook dat doet. */
  status(betalingId: string): Promise<BetaalUitkomst>;
}

const g = globalThis as unknown as { __nepBetalingen?: Map<string, { bestellingId: string; uitkomst: BetaalUitkomst }> };
const nepBetalingen = (g.__nepBetalingen ??= new Map());

/** Nepbetaling: een eigen pagina waarop je kiest hoe de betaling afloopt. */
const nep: Betaaldienst = {
  naam: "nep",
  async start(bestelling) {
    const betalingId = `nep_${bestelling.id}`;
    nepBetalingen.set(betalingId, { bestellingId: bestelling.id, uitkomst: "open" });
    return { betalingId, url: `/betalen/${bestelling.id}` };
  },
  async status(betalingId) {
    return nepBetalingen.get(betalingId)?.uitkomst ?? "open";
  },
};

/** Alleen voor de nepdienst: de uitkomst vastleggen, zoals de bank dat bij Mollie doet. */
export function zetNepUitkomst(betalingId: string, uitkomst: BetaalUitkomst): string | null {
  const b = nepBetalingen.get(betalingId);
  if (!b) return null;
  b.uitkomst = uitkomst;
  return b.bestellingId;
}

export function betaaldienst(): Betaaldienst {
  // Zodra MOLLIE_API_KEY bestaat komt hier de Mollie-variant.
  return nep;
}
