import { notFound } from "next/navigation";
import { teksten } from "@/lib/teksten";

/** Tijdelijke vaste pagina's. De echte komen in stap 3. */
const paginas: Record<string, string> = {
  over: teksten.voet.over,
  "veelgestelde-vragen": teksten.voet.vragen,
  voorwaarden: teksten.voet.voorwaarden,
  privacy: teksten.voet.privacy,
  colofon: teksten.voet.colofon,
};

export function generateStaticParams() {
  return Object.keys(paginas).map((pagina) => ({ pagina }));
}

export const dynamicParams = false;

export default async function VastePagina({ params }: { params: Promise<{ pagina: string }> }) {
  const { pagina } = await params;
  const titel = paginas[pagina];
  if (!titel) notFound();
  return (
    <div className="mx-auto max-w-xl pt-[10vh]">
      <h1 className="text-2xl mb-3">{titel}</h1>
      <p className="text-grijs">{teksten.vast.volgt}</p>
    </div>
  );
}
