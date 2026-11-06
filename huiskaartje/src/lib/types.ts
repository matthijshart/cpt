import type { Design } from "./config";

/**
 * Status van een pand in de catalogus.
 * nieuw: geïmporteerd, nog geen tekening
 * getekend: tekening aanwezig, wacht op goedkeuring
 * goedgekeurd: te koop
 * afgekeurd: tekening afgekeurd, niet te koop
 * verwijderd: op verzoek van een bewoner verwijderd; nergens meer te vinden
 */
export type PandStatus = "nieuw" | "getekend" | "goedgekeurd" | "afgekeurd" | "verwijderd";

export interface Pand {
  /** Interne sleutel en url-deel, bijvoorbeeld "prinsengracht-110". */
  slug: string;
  /** BAG-identificatie van het pand. Nog leeg zolang alleen de Locatieserver is gebruikt. */
  bagPandId: string | null;
  straat: string;
  /** Alle huisnummers op dit pand, in weergavevorm: "110", "110-1", "11A". */
  huisnummers: string[];
  /** Het nummer dat op de print komt, bijvoorbeeld "110" of "11A". */
  huisnummerWeergave: string;
  postcode: string | null;
  woonplaats: string;
  bouwjaar: number | null;
  status: PandStatus;
}

export interface Adres {
  /** BAG nummeraanduiding, de sleutel van een adres. */
  bagNummeraanduidingId: string;
  /** BAG verblijfsobject, standplaats of ligplaats. */
  bagAdresseerbaarObjectId: string;
  /** PDOK Locatieserver-id, handig om snel terug te zoeken. */
  pdokId: string;
  pandSlug: string;
  straat: string;
  huisnummer: number;
  huisletter: string | null;
  toevoeging: string | null;
  postcode: string | null;
  woonplaats: string;
  jaJaSticker: boolean;
}

export interface Tekening {
  pandSlug: string;
  design: Design;
  versie: number;
  /** Pad naar het vectorbestand, relatief aan de bestandsopslag. */
  bestand: string;
}

/** Wat de pandpagina nodig heeft: het pand plus de tekeningen per design. */
export interface PandMetTekeningen {
  pand: Pand;
  tekeningen: Partial<Record<Design, Tekening>>;
}
