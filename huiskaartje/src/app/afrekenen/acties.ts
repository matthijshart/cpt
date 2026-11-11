"use server";

import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { betaaldienst } from "@/lib/betalen";
import { koppelBetaling, maakBestelling } from "@/lib/bestellingen";
import { haalPand } from "@/lib/catalogus";
import { EIGEN_REGEL_MAX, isDesign, vindFormaat } from "@/lib/config";

export interface AfrekenStaat {
  fouten: Record<string, string>;
  waarden: Record<string, string>;
}

const KAARTJE_MAX = 200;
const BETAALWIJZEN = ["ideal", "creditcard", "bancontact"];

function tekst(form: FormData, naam: string, max = 120): string {
  return String(form.get(naam) ?? "").trim().slice(0, max);
}

/** Maakt de bestelling aan en stuurt de klant door naar de betaalpagina. Prijs komt van de server. */
export async function plaatsBestelling(_vorige: AfrekenStaat, form: FormData): Promise<AfrekenStaat> {
  const waarden: Record<string, string> = {};
  for (const [k, v] of form.entries()) if (typeof v === "string") waarden[k] = v;
  const fouten: Record<string, string> = {};

  const pandSlug = tekst(form, "pand");
  const design = tekst(form, "design");
  const formaatCode = tekst(form, "formaat");
  const eigenRegel = tekst(form, "regel", EIGEN_REGEL_MAX);
  const p = await haalPand(pandSlug);
  const formaat = vindFormaat(formaatCode);
  if (!p || p.pand.status !== "goedgekeurd" || !isDesign(design) || !p.tekeningen[design] || !formaat) {
    fouten.product = "Deze combinatie kennen we niet.";
    return { fouten, waarden };
  }

  const naam = tekst(form, "naam");
  const email = tekst(form, "email");
  const isCadeau = form.get("cadeau") === "ja";
  const anderAdres = isCadeau && form.get("anderAdres") === "ja";
  const ontvangerNaam = tekst(form, "ontvangerNaam");
  const straat = tekst(form, "straat");
  const huisnummer = tekst(form, "huisnummer", 20);
  const postcode = tekst(form, "postcode", 10).toUpperCase().replace(/\s+/g, "");
  const plaats = tekst(form, "plaats");
  const kaartjeTekst = isCadeau ? tekst(form, "kaartje", KAARTJE_MAX) : "";
  const geenFactuur = isCadeau && form.get("geenFactuur") === "ja";
  const betaalwijze = tekst(form, "betaalwijze", 20);

  if (naam.length < 2) fouten.naam = "Vul je naam in.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fouten.email = "Vul een geldig e-mailadres in.";
  if (anderAdres && ontvangerNaam.length < 2) fouten.ontvangerNaam = "Vul de naam van de ontvanger in.";
  if (straat.length < 2) fouten.straat = "Vul de straat in.";
  if (!huisnummer) fouten.huisnummer = "Vul het huisnummer in.";
  if (!/^\d{4}[A-Z]{2}$/.test(postcode)) fouten.postcode = "Vul een postcode in zoals 1015 EA.";
  if (plaats.length < 2) fouten.plaats = "Vul de plaats in.";
  if (!BETAALWIJZEN.includes(betaalwijze)) fouten.betaalwijze = "Kies een betaalwijze.";
  if (Object.keys(fouten).length) return { fouten, waarden };

  const bestelling = await maakBestelling({
    pandSlug,
    straat: p.pand.straat,
    huisnummerWeergave: p.pand.huisnummerWeergave,
    design,
    formaat: formaat.code,
    eigenRegel,
    prijsCent: formaat.prijsCent,
    klant: { naam, email },
    bezorgadres: { naam: anderAdres ? ontvangerNaam : naam, straat, huisnummer, postcode, plaats, land: "NL" },
    cadeau: { isCadeau, kaartjeTekst, geenFactuur },
    betaalwijze,
    herkomst: tekst(form, "herkomst", 40) || null,
  });

  const h = await headers();
  const basisUrl = `${h.get("x-forwarded-proto") ?? "http"}://${h.get("host") ?? "localhost:3000"}`;
  const betaling = await betaaldienst().start(bestelling, basisUrl);
  await koppelBetaling(bestelling.id, betaling.betalingId);
  redirect(betaling.url);
}
