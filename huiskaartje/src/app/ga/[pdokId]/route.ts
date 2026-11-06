import { redirect } from "next/navigation";
import { pandSlugVoor } from "@/lib/adres";
import { vindPandVoorAdres } from "@/lib/catalogus";
import { haalAdres } from "@/lib/pdok";

/**
 * Van een gekozen adres naar de juiste pagina.
 * Goedgekeurd pand: de pandpagina. Alles anders: nog niet getekend.
 * De status van een pand wordt nooit verraden.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ pdokId: string }> }) {
  const { pdokId } = await params;
  const adres = await haalAdres(pdokId);
  if (!adres) redirect("/nog-niet-getekend");

  const slug = pandSlugVoor(adres);
  const pand = await vindPandVoorAdres({ nummeraanduidingId: adres.nummeraanduidingId, slug });
  if (pand && pand.status === "goedgekeurd") redirect(`/pand/${pand.slug}`);

  const naam = `${adres.straat} ${adres.huisnummer}${adres.huisletter ?? ""}`;
  redirect(`/nog-niet-getekend?${new URLSearchParams({ naam, id: adres.pdokId })}`);
}
