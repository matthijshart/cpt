import { redirect } from "next/navigation";
import { zetNepUitkomst, type BetaalUitkomst } from "@/lib/betalen";
import { verwerkWebhook } from "../webhook/verwerk";

/**
 * De "bank" van de nepbetaling: legt de uitkomst vast, roept onze webhook aan
 * (zoals Mollie dat doet) en stuurt de klant terug naar de site.
 */
export async function POST(req: Request) {
  const form = await req.formData();
  const betalingId = String(form.get("betalingId") ?? "");
  const uitkomst = String(form.get("uitkomst") ?? "") as BetaalUitkomst;
  if (!["betaald", "mislukt", "geannuleerd"].includes(uitkomst)) redirect("/");
  const bestellingId = zetNepUitkomst(betalingId, uitkomst);
  if (!bestellingId) redirect("/");
  await verwerkWebhook(betalingId);
  redirect(`/bedankt/${bestellingId}`);
}
