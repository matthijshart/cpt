import { teksten } from "@/lib/teksten";
import { VerwijderFormulier } from "./VerwijderFormulier";

export const dynamic = "force-dynamic";

export default async function Verwijderen({ searchParams }: { searchParams: Promise<{ pand?: string }> }) {
  const { pand } = await searchParams;
  return (
    <div className="mx-auto max-w-xl pt-[10vh]">
      <h1 className="text-2xl mb-3">{teksten.verwijderen.kop}</h1>
      <p className="mb-6">{teksten.verwijderen.uitleg}</p>
      <VerwijderFormulier pandSlug={pand ?? ""} />
    </div>
  );
}
