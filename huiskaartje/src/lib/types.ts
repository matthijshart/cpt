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
  /** svg: vector met viewBox. afbeelding: webp, png of jpeg. */
  soort: "svg" | "afbeelding";
  /** Mediatype van het bestand, bijvoorbeeld image/svg+xml of image/webp. */
  mime: string;
  /** Pad relatief aan de bestandsopslag. */
  bestand: string;
  /** Pixelmaat van een afbeelding; bij svg null. */
  breedtePx: number | null;
  hoogtePx: number | null;
}

/** Wat de pandpagina nodig heeft: het pand plus de tekeningen per design. */
export interface PandMetTekeningen {
  pand: Pand;
  tekeningen: Partial<Record<Design, Tekening>>;
}

/**
 * Status van een bestelling. Verandert alleen door de webhook van de betaaldienst
 * (nieuw naar betaald, mislukt of geannuleerd) en daarna door het beheer.
 */
export type BestelStatus = "nieuw" | "betaald" | "mislukt" | "geannuleerd" | "in_productie" | "verzonden";

export interface Bezorgadres {
  naam: string;
  straat: string;
  huisnummer: string;
  postcode: string;
  plaats: string;
  land: "NL";
}

export interface Bestelling {
  id: string;
  /** Leesbaar nummer voor de klant, bijvoorbeeld HK-240113. */
  nummer: string;
  aangemaakt: string;
  pandSlug: string;
  straat: string;
  huisnummerWeergave: string;
  design: Design;
  formaat: string;
  eigenRegel: string;
  prijsCent: number;
  klant: { naam: string; email: string };
  bezorgadres: Bezorgadres;
  cadeau: { isCadeau: boolean; kaartjeTekst: string; geenFactuur: boolean };
  betaalwijze: string;
  betalingId: string | null;
  status: BestelStatus;
  /** QR-code waarmee de klant binnenkwam, als die er was. */
  herkomst: string | null;
}
