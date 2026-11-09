/**
 * Echte panden, adressen en tekeningen, totdat de database er is (stap 2).
 * Adressen komen van de PDOK Locatieserver. Tekeningen staan in opslag/tekeningen.
 */
import type { Adres, Pand, Tekening } from "@/lib/types";

export const panden: Pand[] = [
  {
    slug: "nieuwe-prinsengracht-8",
    bagPandId: null,
    straat: "Nieuwe Prinsengracht",
    huisnummers: ["8-H", "8-1", "8-2", "8-3"],
    huisnummerWeergave: "8",
    postcode: "1018XH",
    woonplaats: "Amsterdam",
    bouwjaar: null,
    status: "goedgekeurd",
  },
];

const np8 = (toevoeging: string, nummeraanduiding: string, object: string, pdokId: string): Adres => ({
  bagNummeraanduidingId: nummeraanduiding,
  bagAdresseerbaarObjectId: object,
  pdokId,
  pandSlug: "nieuwe-prinsengracht-8",
  straat: "Nieuwe Prinsengracht",
  huisnummer: 8,
  huisletter: null,
  toevoeging,
  postcode: "1018XH",
  woonplaats: "Amsterdam",
  jaJaSticker: false,
});

export const adressen: Adres[] = [
  np8("H", "0363200000217895", "0363010000757552", "adr-3301c36c160fc427dc36945bee318883"),
  np8("1", "0363200000217896", "0363010000757553", "adr-7954e5bfc91b6c31f1a9b6f2dadb8542"),
  np8("2", "0363200000217897", "0363010000757554", "adr-b533d3f3f94605298a9df115b3eeb674"),
  np8("3", "0363200000217898", "0363010000757555", "adr-7476095cf75a1d2de37d68df5a76e071"),
];

export const tekeningen: Tekening[] = [
  {
    pandSlug: "nieuwe-prinsengracht-8",
    design: "kleur",
    versie: 1,
    soort: "afbeelding",
    mime: "image/webp",
    bestand: "tekeningen/nieuwe-prinsengracht-8-kleur.webp",
    breedtePx: 901,
    hoogtePx: 1160,
  },
  {
    pandSlug: "nieuwe-prinsengracht-8",
    design: "zwartwit",
    versie: 1,
    soort: "afbeelding",
    mime: "image/webp",
    bestand: "tekeningen/nieuwe-prinsengracht-8-zwartwit.webp",
    breedtePx: 859,
    hoogtePx: 1140,
  },
];
