import { notFound } from "next/navigation";
import { haalPand, leesTekening } from "@/lib/catalogus";
import { isDesign } from "@/lib/config";

/** Levert het bestand van een tekening. Alleen voor panden die te zien mogen zijn. */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string; design: string }> }) {
  const { slug, design } = await params;
  if (!isDesign(design)) notFound();
  const p = await haalPand(slug);
  const t = p?.tekeningen[design];
  if (!p || !t || p.pand.status !== "goedgekeurd") notFound();
  const bytes = await leesTekening(t);
  return new Response(new Uint8Array(bytes), {
    headers: {
      "Content-Type": t.mime,
      "Cache-Control": "public, max-age=86400, immutable",
    },
  });
}
