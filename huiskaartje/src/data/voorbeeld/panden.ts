/**
 * VOORBEELDDATA. Alleen voor lokaal gebruik.
 *
 * De adressen zijn echt (opgehaald bij de PDOK Locatieserver), maar de gevels
 * zijn verzonnen en het bouwjaar is verzonnen. Dit mag nooit in productie
 * terechtkomen: een klant zou een verzonnen gevel voor zijn eigen huis aanzien.
 * De catalogus laadt dit alleen als HUISKAARTJE_VOORBEELDDATA=1 staat.
 */
import type { Adres, Pand } from "@/lib/types";

export const voorbeeldPanden: Pand[] = [
  {
    "slug": "prinsengracht-110",
    "bagPandId": null,
    "straat": "Prinsengracht",
    "huisnummers": [
      "110-1",
      "110-2",
      "110-3",
      "110-H"
    ],
    "huisnummerWeergave": "110",
    "postcode": "1015EA",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1665,
    "status": "goedgekeurd"
  },
  {
    "slug": "herengracht-386",
    "bagPandId": null,
    "straat": "Herengracht",
    "huisnummers": [
      "386"
    ],
    "huisnummerWeergave": "386",
    "postcode": "1016CJ",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1663,
    "status": "goedgekeurd"
  },
  {
    "slug": "keizersgracht-123",
    "bagPandId": null,
    "straat": "Keizersgracht",
    "huisnummers": [
      "123"
    ],
    "huisnummerWeergave": "123",
    "postcode": "1015CJ",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1622,
    "status": "goedgekeurd"
  },
  {
    "slug": "brouwersgracht-52",
    "bagPandId": null,
    "straat": "Brouwersgracht",
    "huisnummers": [
      "52-1",
      "52-2",
      "52-3",
      "52-H"
    ],
    "huisnummerWeergave": "52",
    "postcode": "1013GX",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1730,
    "status": "goedgekeurd"
  },
  {
    "slug": "bloemgracht-87",
    "bagPandId": null,
    "straat": "Bloemgracht",
    "huisnummers": [
      "87"
    ],
    "huisnummerWeergave": "87",
    "postcode": "1016KH",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1642,
    "status": "goedgekeurd"
  },
  {
    "slug": "egelantiersgracht-12",
    "bagPandId": null,
    "straat": "Egelantiersgracht",
    "huisnummers": [
      "12"
    ],
    "huisnummerWeergave": "12",
    "postcode": "1015RL",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1690,
    "status": "goedgekeurd"
  },
  {
    "slug": "reguliersgracht-34",
    "bagPandId": null,
    "straat": "Reguliersgracht",
    "huisnummers": [
      "34",
      "34-1",
      "34-H"
    ],
    "huisnummerWeergave": "34",
    "postcode": "1017LS",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1725,
    "status": "goedgekeurd"
  },
  {
    "slug": "singel-5",
    "bagPandId": null,
    "straat": "Singel",
    "huisnummers": [
      "5"
    ],
    "huisnummerWeergave": "5",
    "postcode": "1012VC",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1700,
    "status": "goedgekeurd"
  },
  {
    "slug": "zeedijk-1",
    "bagPandId": null,
    "straat": "Zeedijk",
    "huisnummers": [
      "1"
    ],
    "huisnummerWeergave": "1",
    "postcode": "1012AN",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1550,
    "status": "goedgekeurd"
  },
  {
    "slug": "kloveniersburgwal-29",
    "bagPandId": null,
    "straat": "Kloveniersburgwal",
    "huisnummers": [
      "29"
    ],
    "huisnummerWeergave": "29",
    "postcode": "1011JV",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1662,
    "status": "goedgekeurd"
  },
  {
    "slug": "haarlemmerdijk-43",
    "bagPandId": null,
    "straat": "Haarlemmerdijk",
    "huisnummers": [
      "43-1",
      "43-2",
      "43-H"
    ],
    "huisnummerWeergave": "43",
    "postcode": "1013KB",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1880,
    "status": "goedgekeurd"
  },
  {
    "slug": "lauriergracht-113",
    "bagPandId": null,
    "straat": "Lauriergracht",
    "huisnummers": [
      "113-1",
      "113-2",
      "113-3",
      "113-H"
    ],
    "huisnummerWeergave": "113",
    "postcode": "1016RJ",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1680,
    "status": "goedgekeurd"
  },
  {
    "slug": "herengracht-172",
    "bagPandId": null,
    "straat": "Herengracht",
    "huisnummers": [
      "172"
    ],
    "huisnummerWeergave": "172",
    "postcode": "1016BP",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1638,
    "status": "getekend"
  },
  {
    "slug": "prinsengracht-112",
    "bagPandId": null,
    "straat": "Prinsengracht",
    "huisnummers": [
      "112"
    ],
    "huisnummerWeergave": "112",
    "postcode": "1015EA",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1670,
    "status": "verwijderd"
  },
  {
    "slug": "herengracht-174",
    "bagPandId": null,
    "straat": "Herengracht",
    "huisnummers": [
      "174"
    ],
    "huisnummerWeergave": "174",
    "postcode": "1016BR",
    "woonplaats": "Amsterdam",
    "bouwjaar": 1640,
    "status": "nieuw"
  }
];

export const voorbeeldAdressen: Adres[] = [
  {
    "bagNummeraanduidingId": "0363200000243481",
    "bagAdresseerbaarObjectId": "0363010000783874",
    "pdokId": "adr-9d2acfadd5867c6d61fbcd07bbdc8574",
    "pandSlug": "prinsengracht-110",
    "straat": "Prinsengracht",
    "huisnummer": 110,
    "huisletter": null,
    "toevoeging": "1",
    "postcode": "1015EA",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000243482",
    "bagAdresseerbaarObjectId": "0363010000783875",
    "pdokId": "adr-f8eb0d51c12360b2564b25346cc93749",
    "pandSlug": "prinsengracht-110",
    "straat": "Prinsengracht",
    "huisnummer": 110,
    "huisletter": null,
    "toevoeging": "2",
    "postcode": "1015EA",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000542999",
    "bagAdresseerbaarObjectId": "0363010001172830",
    "pdokId": "adr-7bc87f90b974b51967e6a146cab65105",
    "pandSlug": "prinsengracht-110",
    "straat": "Prinsengracht",
    "huisnummer": 110,
    "huisletter": null,
    "toevoeging": "3",
    "postcode": "1015EA",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000543000",
    "bagAdresseerbaarObjectId": "0363010001172829",
    "pdokId": "adr-62242fe23f65dafc3911db8a9a076dd2",
    "pandSlug": "prinsengracht-110",
    "straat": "Prinsengracht",
    "huisnummer": 110,
    "huisletter": null,
    "toevoeging": "H",
    "postcode": "1015EA",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200001992823",
    "bagAdresseerbaarObjectId": "0363010001993886",
    "pdokId": "adr-5f7a038e301ae7e0a53ad623cba24a7a",
    "pandSlug": "herengracht-386",
    "straat": "Herengracht",
    "huisnummer": 386,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1016CJ",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000161899",
    "bagAdresseerbaarObjectId": "0363010000700611",
    "pdokId": "adr-e37fafd14792ac4d2e2f96ddfb4945e5",
    "pandSlug": "keizersgracht-123",
    "straat": "Keizersgracht",
    "huisnummer": 123,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1015CJ",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000059174",
    "bagAdresseerbaarObjectId": "0363010000596819",
    "pdokId": "adr-25ec7f5b7759361aa6ac2c24cd882f3e",
    "pandSlug": "brouwersgracht-52",
    "straat": "Brouwersgracht",
    "huisnummer": 52,
    "huisletter": null,
    "toevoeging": "1",
    "postcode": "1013GX",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000059175",
    "bagAdresseerbaarObjectId": "0363010000596820",
    "pdokId": "adr-1e670e6324a92d0c713a76d93801a505",
    "pandSlug": "brouwersgracht-52",
    "straat": "Brouwersgracht",
    "huisnummer": 52,
    "huisletter": null,
    "toevoeging": "2",
    "postcode": "1013GX",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000059176",
    "bagAdresseerbaarObjectId": "0363010000596821",
    "pdokId": "adr-84f6e7356f9847bd4d074f77463e8fc6",
    "pandSlug": "brouwersgracht-52",
    "straat": "Brouwersgracht",
    "huisnummer": 52,
    "huisletter": null,
    "toevoeging": "3",
    "postcode": "1013GX",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000059173",
    "bagAdresseerbaarObjectId": "0363010000596818",
    "pdokId": "adr-0f878f3e44dfc47108281d97493d5642",
    "pandSlug": "brouwersgracht-52",
    "straat": "Brouwersgracht",
    "huisnummer": 52,
    "huisletter": null,
    "toevoeging": "H",
    "postcode": "1013GX",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000051069",
    "bagAdresseerbaarObjectId": "0363010000588641",
    "pdokId": "adr-367d10ce144b44e14624ec18027d9179",
    "pandSlug": "bloemgracht-87",
    "straat": "Bloemgracht",
    "huisnummer": 87,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1016KH",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000091210",
    "bagAdresseerbaarObjectId": "0363010000628930",
    "pdokId": "adr-d68180406df2abc7710e4012003e7c93",
    "pandSlug": "egelantiersgracht-12",
    "straat": "Egelantiersgracht",
    "huisnummer": 12,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1015RL",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200013042792",
    "bagAdresseerbaarObjectId": "0363010012582687",
    "pdokId": "adr-c184ca9452e1e4cc65c0c5cc8c61bc79",
    "pandSlug": "reguliersgracht-34",
    "straat": "Reguliersgracht",
    "huisnummer": 34,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1017LS",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000248602",
    "bagAdresseerbaarObjectId": "0363010000789282",
    "pdokId": "adr-1df3780c32828d57e57aeee8a5d4372b",
    "pandSlug": "reguliersgracht-34",
    "straat": "Reguliersgracht",
    "huisnummer": 34,
    "huisletter": null,
    "toevoeging": "1",
    "postcode": "1017LS",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000248601",
    "bagAdresseerbaarObjectId": "0363010001007338",
    "pdokId": "adr-c159c482366e0266672a8ea460758053",
    "pandSlug": "reguliersgracht-34",
    "straat": "Reguliersgracht",
    "huisnummer": 34,
    "huisletter": null,
    "toevoeging": "H",
    "postcode": "1017LS",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000418229",
    "bagAdresseerbaarObjectId": "0363010000809630",
    "pdokId": "adr-637d59a059e14512db1c8d50ff18205c",
    "pandSlug": "singel-5",
    "straat": "Singel",
    "huisnummer": 5,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1012VC",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000337078",
    "bagAdresseerbaarObjectId": "0363010000968017",
    "pdokId": "adr-9aef9a645f75c3378fb06184db4f91be",
    "pandSlug": "zeedijk-1",
    "straat": "Zeedijk",
    "huisnummer": 1,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1012AN",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200012113265",
    "bagAdresseerbaarObjectId": "0363010012111542",
    "pdokId": "adr-06730b59b6658b2d12a6fe1b46081165",
    "pandSlug": "kloveniersburgwal-29",
    "straat": "Kloveniersburgwal",
    "huisnummer": 29,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1011JV",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000118119",
    "bagAdresseerbaarObjectId": "0363010000655974",
    "pdokId": "adr-2827e7e9ff6a6d98b4e8084fc27f070c",
    "pandSlug": "haarlemmerdijk-43",
    "straat": "Haarlemmerdijk",
    "huisnummer": 43,
    "huisletter": null,
    "toevoeging": "1",
    "postcode": "1013KB",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000118120",
    "bagAdresseerbaarObjectId": "0363010001014473",
    "pdokId": "adr-45470edd74068ec7749c5bfcda1f80a1",
    "pandSlug": "haarlemmerdijk-43",
    "straat": "Haarlemmerdijk",
    "huisnummer": 43,
    "huisletter": null,
    "toevoeging": "2",
    "postcode": "1013KB",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000118118",
    "bagAdresseerbaarObjectId": "0363010000655973",
    "pdokId": "adr-e79e3e775754c3f1cd5db419aabb3ba8",
    "pandSlug": "haarlemmerdijk-43",
    "straat": "Haarlemmerdijk",
    "huisnummer": 43,
    "huisletter": null,
    "toevoeging": "H",
    "postcode": "1013KB",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000180438",
    "bagAdresseerbaarObjectId": "0363010000719541",
    "pdokId": "adr-f609cb37f511bd6b268027dc090e70db",
    "pandSlug": "lauriergracht-113",
    "straat": "Lauriergracht",
    "huisnummer": 113,
    "huisletter": null,
    "toevoeging": "1",
    "postcode": "1016RJ",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000180439",
    "bagAdresseerbaarObjectId": "0363010000719542",
    "pdokId": "adr-7885c4c7c99d69faf0bbe53043393d6f",
    "pandSlug": "lauriergracht-113",
    "straat": "Lauriergracht",
    "huisnummer": 113,
    "huisletter": null,
    "toevoeging": "2",
    "postcode": "1016RJ",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000180440",
    "bagAdresseerbaarObjectId": "0363010000719543",
    "pdokId": "adr-36410c2cee5ee11378ffbbae114b87e8",
    "pandSlug": "lauriergracht-113",
    "straat": "Lauriergracht",
    "huisnummer": 113,
    "huisletter": null,
    "toevoeging": "3",
    "postcode": "1016RJ",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000180437",
    "bagAdresseerbaarObjectId": "0363010000719540",
    "pdokId": "adr-9ef342bbb7a2e749c9db93afff848d0d",
    "pandSlug": "lauriergracht-113",
    "straat": "Lauriergracht",
    "huisnummer": 113,
    "huisletter": null,
    "toevoeging": "H",
    "postcode": "1016RJ",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200012117249",
    "bagAdresseerbaarObjectId": "0363010012115496",
    "pdokId": "adr-236dffc9c966e390c86040e1c342ca39",
    "pandSlug": "herengracht-172",
    "straat": "Herengracht",
    "huisnummer": 172,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1016BP",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200000243485",
    "bagAdresseerbaarObjectId": "0363010000864521",
    "pdokId": "adr-2b08ebf85d1f8b4bccbcacbb2176ed54",
    "pandSlug": "prinsengracht-112",
    "straat": "Prinsengracht",
    "huisnummer": 112,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1015EA",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  },
  {
    "bagNummeraanduidingId": "0363200011909674",
    "bagAdresseerbaarObjectId": "0363010011909467",
    "pdokId": "adr-d194b97d30c6ea535f774790b659a0b0",
    "pandSlug": "herengracht-174",
    "straat": "Herengracht",
    "huisnummer": 174,
    "huisletter": null,
    "toevoeging": null,
    "postcode": "1016BR",
    "woonplaats": "Amsterdam",
    "jaJaSticker": false
  }
];

/** Parameters waarmee scripts/voorbeeld-gevels.ts de SVG-gevels tekent. */
export const voorbeeldGevels = [
  {
    "slug": "prinsengracht-110",
    "gevel": "hals",
    "verdiepingen": 3,
    "ramen": 3,
    "deur": "links",
    "kleur": "rood",
    "stoep": true
  },
  {
    "slug": "herengracht-386",
    "gevel": "lijst",
    "verdiepingen": 4,
    "ramen": 3,
    "deur": "midden",
    "kleur": "zand",
    "stoep": true
  },
  {
    "slug": "keizersgracht-123",
    "gevel": "trap",
    "verdiepingen": 3,
    "ramen": 3,
    "deur": "midden",
    "kleur": "rood",
    "stoep": true
  },
  {
    "slug": "brouwersgracht-52",
    "gevel": "tuit",
    "verdiepingen": 3,
    "ramen": 2,
    "deur": "rechts",
    "kleur": "donker",
    "stoep": false
  },
  {
    "slug": "bloemgracht-87",
    "gevel": "trap",
    "verdiepingen": 2,
    "ramen": 2,
    "deur": "links",
    "kleur": "rood",
    "stoep": false
  },
  {
    "slug": "egelantiersgracht-12",
    "gevel": "klok",
    "verdiepingen": 3,
    "ramen": 2,
    "deur": "rechts",
    "kleur": "groen",
    "stoep": false
  },
  {
    "slug": "reguliersgracht-34",
    "gevel": "klok",
    "verdiepingen": 3,
    "ramen": 3,
    "deur": "links",
    "kleur": "zand",
    "stoep": true
  },
  {
    "slug": "singel-5",
    "gevel": "hals",
    "verdiepingen": 4,
    "ramen": 2,
    "deur": "midden",
    "kleur": "donker",
    "stoep": false
  },
  {
    "slug": "zeedijk-1",
    "gevel": "tuit",
    "verdiepingen": 2,
    "ramen": 2,
    "deur": "links",
    "kleur": "hout",
    "stoep": false
  },
  {
    "slug": "kloveniersburgwal-29",
    "gevel": "lijst",
    "verdiepingen": 3,
    "ramen": 3,
    "deur": "midden",
    "kleur": "zand",
    "stoep": true
  },
  {
    "slug": "haarlemmerdijk-43",
    "gevel": "lijst",
    "verdiepingen": 3,
    "ramen": 2,
    "deur": "rechts",
    "kleur": "rood",
    "stoep": false
  },
  {
    "slug": "lauriergracht-113",
    "gevel": "klok",
    "verdiepingen": 3,
    "ramen": 2,
    "deur": "links",
    "kleur": "donker",
    "stoep": false
  },
  {
    "slug": "herengracht-172",
    "gevel": "trap",
    "verdiepingen": 3,
    "ramen": 3,
    "deur": "midden",
    "kleur": "rood",
    "stoep": true
  },
  {
    "slug": "prinsengracht-112",
    "gevel": "hals",
    "verdiepingen": 3,
    "ramen": 2,
    "deur": "rechts",
    "kleur": "zand",
    "stoep": false
  }
] as const;
