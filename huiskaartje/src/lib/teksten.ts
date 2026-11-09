/**
 * Alle teksten van de site, Nederlands. Later kan hier een tweede taal naast.
 */
export const teksten = {
  site: {
    naam: "Huiskaartje",
    omschrijving: "Een print van je huis in Amsterdam.",
  },
  home: {
    kop1: "Je huis,",
    kop2: "als print.",
    uitleg: "Typ je adres. Kies een formaat. Klaar.",
    vanaf: "Vanaf",
    verzending: "verzending inbegrepen",
    placeholder: "Straat en huisnummer",
    zoeken: "Zoek",
    geenResultaten: "Geen adres gevonden in Amsterdam.",
    laden: "Zoeken…",
    voorbeelden: "Voorbeelden",
  },
  pand: {
    design: "Design",
    designNaam: { zwartwit: "Zwart-wit", kleur: "Kleur" },
    formaat: "Formaat",
    eigenRegel: "Eigen regel",
    eigenRegelUitleg: "Komt onder het adres. Mag leeg blijven.",
    eigenRegelVoorbeeld: "Bijvoorbeeld: Sinds 2019",
    prijs: "Prijs",
    inclusief: "inclusief btw en verzending",
    bestellen: "Bestellen",
    bouwjaar: "Gebouwd in",
    adressen: "Adressen op dit pand",
    verwijderVraag: "Woon je hier en wil je dit pand niet in de catalogus?",
    verwijderLink: "Laat het ons weten",
    nogNietTeKoop: "Dit pand is nog niet te koop. We zijn de tekening aan het nakijken.",
    nogNietTeKoopEmail: "Laat je e-mailadres achter, dan hoor je het zodra het zover is.",
  },
  nogNietGetekend: {
    kop: "Nog niet getekend",
    uitleg: "Dit adres staat nog niet in onze catalogus. Laat je e-mailadres achter, dan krijg je bericht zodra het pand getekend is.",
    email: "E-mailadres",
    versturen: "Houd me op de hoogte",
    bedankt: "Dank je. We sturen een bericht zodra het zover is.",
    terug: "Ander adres zoeken",
    geenAdres: "We konden dit adres niet vinden.",
  },
  verwijderen: {
    kop: "Pand uit de catalogus halen",
    uitleg: "Woon je op dit adres en wil je niet dat het pand bij ons te koop is? Laat je e-mailadres achter, dan halen we het weg en bevestigen we dat per mail.",
    email: "E-mailadres",
    versturen: "Verzoek versturen",
    bedankt: "Dank je. We halen het pand weg en sturen een bevestiging.",
  },
  print: {
    stad: "Amsterdam",
  },
  voet: {
    over: "Over",
    vragen: "Veelgestelde vragen",
    voorwaarden: "Voorwaarden",
    privacy: "Privacy",
    colofon: "Colofon",
  },
  vast: {
    volgt: "Deze pagina volgt.",
  },
  algemeen: {
    terug: "Terug",
    nietGevonden: "Deze pagina bestaat niet.",
    naarHome: "Naar de homepage",
  },
} as const;
