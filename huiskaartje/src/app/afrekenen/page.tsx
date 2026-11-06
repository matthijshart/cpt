import Link from "next/link";
import { formatteerPrijs, isDesign, vindFormaat } from "@/lib/config";
import { haalPand } from "@/lib/catalogus";
import { teksten } from "@/lib/teksten";

export const dynamic = "force-dynamic";

/** Tijdelijke pagina. Het echte afrekenen komt in stap 2. */
export default async function Afrekenen({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const p = sp.pand ? await haalPand(sp.pand) : null;
  const formaat = sp.formaat ? vindFormaat(sp.formaat) : undefined;
  const design = sp.design && isDesign(sp.design) ? sp.design : undefined;
  return (
    <div className="mx-auto max-w-xl pt-[10vh]">
      <h1 className="text-2xl mb-3">Afrekenen</h1>
      <p className="text-grijs mb-6">Deze stap volgt. Dit is wat je koos:</p>
      <dl className="grid grid-cols-[8rem_1fr] gap-y-2 text-base">
        <dt className="text-grijs">Pand</dt>
        <dd>{p ? `${p.pand.straat} ${p.pand.huisnummerWeergave}` : "–"}</dd>
        <dt className="text-grijs">Design</dt>
        <dd>{design ? teksten.pand.designNaam[design] : "–"}</dd>
        <dt className="text-grijs">Formaat</dt>
        <dd>{formaat ? `${formaat.code.replace("x", " × ")} cm, ${formatteerPrijs(formaat.prijsCent)}` : "–"}</dd>
        <dt className="text-grijs">Eigen regel</dt>
        <dd>{sp.regel || "–"}</dd>
      </dl>
      {p && (
        <p className="mt-8 text-sm">
          <Link href={`/pand/${p.pand.slug}`} className="underline">
            {teksten.algemeen.terug}
          </Link>
        </p>
      )}
    </div>
  );
}
