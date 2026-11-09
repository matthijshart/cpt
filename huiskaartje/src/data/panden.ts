/**
 * Echte panden, adressen en tekeningen, totdat de database er is (stap 2).
 * Adressen komen van de PDOK Locatieserver (alleen verblijfsobjecten, geen
 * lig- of standplaatsen). Tekeningen staan in opslag/tekeningen.
 */
import type { Adres, Pand, Tekening } from "@/lib/types";

interface Invoer {
  slug: string;
  straat: string;
  huisnummer: number;
  postcode: string | null;
  adressen: {
    bagNummeraanduidingId: string;
    bagAdresseerbaarObjectId: string;
    pdokId: string;
    toevoeging: string | null;
    postcode: string | null;
  }[];
  tekeningen: {
    design: Tekening["design"];
    bestand: string;
    breedtePx: number;
    hoogtePx: number;
  }[];
}

const invoer: Invoer[] = [
  {
    slug: "nieuwe-prinsengracht-8",
    straat: "Nieuwe Prinsengracht",
    huisnummer: 8,
    postcode: "1018XH",
    adressen: [
      {
        bagNummeraanduidingId: "0363200000217895",
        bagAdresseerbaarObjectId: "0363010000757552",
        pdokId: "adr-3301c36c160fc427dc36945bee318883",
        toevoeging: "H",
        postcode: "1018XH",
      },
      {
        bagNummeraanduidingId: "0363200000217896",
        bagAdresseerbaarObjectId: "0363010000757553",
        pdokId: "adr-7954e5bfc91b6c31f1a9b6f2dadb8542",
        toevoeging: "1",
        postcode: "1018XH",
      },
      {
        bagNummeraanduidingId: "0363200000217897",
        bagAdresseerbaarObjectId: "0363010000757554",
        pdokId: "adr-b533d3f3f94605298a9df115b3eeb674",
        toevoeging: "2",
        postcode: "1018XH",
      },
      {
        bagNummeraanduidingId: "0363200000217898",
        bagAdresseerbaarObjectId: "0363010000757555",
        pdokId: "adr-7476095cf75a1d2de37d68df5a76e071",
        toevoeging: "3",
        postcode: "1018XH",
      },
    ],
    tekeningen: [
      {
        design: "kleur",
        bestand: "tekeningen/nieuwe-prinsengracht-8-kleur.webp",
        breedtePx: 901,
        hoogtePx: 1160,
      },
      {
        design: "zwartwit",
        bestand: "tekeningen/nieuwe-prinsengracht-8-zwartwit.webp",
        breedtePx: 859,
        hoogtePx: 1140,
      },
    ],
  },
  {
    slug: "herengracht-1",
    straat: "Herengracht",
    huisnummer: 1,
    postcode: "1015BA",
    adressen: [
      {
        bagNummeraanduidingId: "0363200000126404",
        bagAdresseerbaarObjectId: "0363010000664293",
        pdokId: "adr-87813bc93f52d0ef812d7fe48e96923b",
        toevoeging: "1",
        postcode: "1015BA",
      },
      {
        bagNummeraanduidingId: "0363200000456682",
        bagAdresseerbaarObjectId: "0363010001007794",
        pdokId: "adr-2973f9f5ce385d25dab40fcad0a213c1",
        toevoeging: "2",
        postcode: "1015BA",
      },
      {
        bagNummeraanduidingId: "0363200000126405",
        bagAdresseerbaarObjectId: "0363010000664294",
        pdokId: "adr-5de1d70d5a32ff8ea2f87def72fb7484",
        toevoeging: "3",
        postcode: "1015BA",
      },
      {
        bagNummeraanduidingId: "0363200000126406",
        bagAdresseerbaarObjectId: "0363010000821184",
        pdokId: "adr-de852691eaa8186796ebe6744f212b12",
        toevoeging: "4",
        postcode: "1015BA",
      },
      {
        bagNummeraanduidingId: "0363200000126403",
        bagAdresseerbaarObjectId: "0363010000664292",
        pdokId: "adr-393357d084f901446e682e7ff7dc7866",
        toevoeging: "O",
        postcode: "1015BA",
      },
    ],
    tekeningen: [
      {
        design: "kleur",
        bestand: "tekeningen/herengracht-1-kleur.webp",
        breedtePx: 681,
        hoogtePx: 1213,
      },
    ],
  },
  {
    slug: "herengracht-3",
    straat: "Herengracht",
    huisnummer: 3,
    postcode: "1015BA",
    adressen: [
      {
        bagNummeraanduidingId: "0363200000126408",
        bagAdresseerbaarObjectId: "0363010000664296",
        pdokId: "adr-8c396925f3c7b8f206eaa718552f8c41",
        toevoeging: "H",
        postcode: "1015BA",
      },
      {
        bagNummeraanduidingId: "0363200000126409",
        bagAdresseerbaarObjectId: "0363010000664297",
        pdokId: "adr-bc950cd44aa59f582561aa414a05d468",
        toevoeging: "2",
        postcode: "1015BA",
      },
    ],
    tekeningen: [
      {
        design: "kleur",
        bestand: "tekeningen/herengracht-3-kleur.webp",
        breedtePx: 551,
        hoogtePx: 1226,
      },
    ],
  },
  {
    slug: "herengracht-5",
    straat: "Herengracht",
    huisnummer: 5,
    postcode: "1015BA",
    adressen: [
      {
        bagNummeraanduidingId: "0363200000126411",
        bagAdresseerbaarObjectId: "0363010000664299",
        pdokId: "adr-e86efaf26aa47e83b8995ecdcd71907e",
        toevoeging: "H",
        postcode: "1015BA",
      },
      {
        bagNummeraanduidingId: "0363200000126412",
        bagAdresseerbaarObjectId: "0363010000664300",
        pdokId: "adr-6bef328901dad1158289739322e97a06",
        toevoeging: "1",
        postcode: "1015BA",
      },
      {
        bagNummeraanduidingId: "0363200012133674",
        bagAdresseerbaarObjectId: "0363010012131743",
        pdokId: "adr-d633cbd0471958a163b599407c10cf74",
        toevoeging: "2",
        postcode: "1015BA",
      },
      {
        bagNummeraanduidingId: "0363200012133675",
        bagAdresseerbaarObjectId: "0363010012131744",
        pdokId: "adr-6c84c6f516f2142900370d406339fc2c",
        toevoeging: "3",
        postcode: "1015BA",
      },
    ],
    tekeningen: [
      {
        design: "kleur",
        bestand: "tekeningen/herengracht-5-kleur.webp",
        breedtePx: 577,
        hoogtePx: 1223,
      },
    ],
  },
  {
    slug: "herengracht-7",
    straat: "Herengracht",
    huisnummer: 7,
    postcode: "1015BA",
    adressen: [
      {
        bagNummeraanduidingId: "0363200000414834",
        bagAdresseerbaarObjectId: "0363010000664303",
        pdokId: "adr-ddeccc536bf22f60ecb3158b10e0f479",
        toevoeging: null,
        postcode: "1015BA",
      },
    ],
    tekeningen: [
      {
        design: "kleur",
        bestand: "tekeningen/herengracht-7-kleur.webp",
        breedtePx: 588,
        hoogtePx: 1171,
      },
    ],
  },
  {
    slug: "herengracht-13",
    straat: "Herengracht",
    huisnummer: 13,
    postcode: "1015BA",
    adressen: [
      {
        bagNummeraanduidingId: "0363200012115268",
        bagAdresseerbaarObjectId: "0363010012113516",
        pdokId: "adr-8569fca736c89999b8526b5ca99e7966",
        toevoeging: null,
        postcode: "1015BA",
      },
    ],
    tekeningen: [
      {
        design: "kleur",
        bestand: "tekeningen/herengracht-13-kleur.webp",
        breedtePx: 693,
        hoogtePx: 1157,
      },
    ],
  },
];

export const panden: Pand[] = invoer.map((i) => ({
  slug: i.slug,
  bagPandId: null,
  straat: i.straat,
  huisnummers: i.adressen.map(
    (a) => `${i.huisnummer}${a.toevoeging ? `-${a.toevoeging}` : ""}`,
  ),
  huisnummerWeergave: String(i.huisnummer),
  postcode: i.postcode,
  woonplaats: "Amsterdam",
  bouwjaar: null,
  status: "goedgekeurd",
}));

export const adressen: Adres[] = invoer.flatMap((i) =>
  i.adressen.map((a) => ({
    bagNummeraanduidingId: a.bagNummeraanduidingId,
    bagAdresseerbaarObjectId: a.bagAdresseerbaarObjectId,
    pdokId: a.pdokId,
    pandSlug: i.slug,
    straat: i.straat,
    huisnummer: i.huisnummer,
    huisletter: null,
    toevoeging: a.toevoeging,
    postcode: a.postcode,
    woonplaats: "Amsterdam",
    jaJaSticker: false,
  })),
);

export const tekeningen: Tekening[] = invoer.flatMap((i) =>
  i.tekeningen.map((t) => ({
    pandSlug: i.slug,
    design: t.design,
    versie: 1,
    soort: "afbeelding" as const,
    mime: "image/webp",
    bestand: t.bestand,
    breedtePx: t.breedtePx,
    hoogtePx: t.hoogtePx,
  })),
);
