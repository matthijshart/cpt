import { betaaldienst } from "@/lib/betalen";
import { alleBestellingen, zetBestelStatus } from "@/lib/bestellingen";
import { formatteerPrijs } from "@/lib/config";
import { verstuurEmail } from "@/lib/email";
import { teksten } from "@/lib/teksten";

/**
 * Verwerkt een melding van de betaaldienst. Dit is de enige plek waar een
 * bestelling van nieuw naar betaald, mislukt of geannuleerd gaat.
 */
export async function verwerkWebhook(betalingId: string): Promise<void> {
  const bestelling = (await alleBestellingen()).find((b) => b.betalingId === betalingId);
  if (!bestelling) return;
  const uitkomst = await betaaldienst().status(betalingId);
  if (uitkomst === "open") return;
  if (bestelling.status !== "nieuw") return; // al verwerkt
  await zetBestelStatus(bestelling.id, uitkomst);
  if (uitkomst === "betaald") {
    await verstuurEmail({
      aan: bestelling.klant.email,
      onderwerp: `${teksten.site.naam}: bestelling ${bestelling.nummer}`,
      tekst: [
        `Dag ${bestelling.klant.naam},`,
        ``,
        `Dank je voor je bestelling. Dit hebben we genoteerd:`,
        `${bestelling.straat} ${bestelling.huisnummerWeergave}, ${teksten.pand.designNaam[bestelling.design]}, ${bestelling.formaat.replace("x", " × ")} cm`,
        bestelling.eigenRegel ? `Eigen regel: ${bestelling.eigenRegel}` : ``,
        `Bedrag: ${formatteerPrijs(bestelling.prijsCent)}`,
        ``,
        `Bezorgadres: ${bestelling.bezorgadres.naam}, ${bestelling.bezorgadres.straat} ${bestelling.bezorgadres.huisnummer}, ${bestelling.bezorgadres.postcode} ${bestelling.bezorgadres.plaats}`,
        ``,
        `Bestelnummer: ${bestelling.nummer}`,
      ].join("\n"),
    });
  }
}
