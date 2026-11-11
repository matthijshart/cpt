import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintVoorbeeld } from "@/components/PrintVoorbeeld";
import { haalPand, tekeningBron } from "@/lib/catalogus";
import { EIGEN_REGEL_MAX, formatteerPrijs, isDesign, vindFormaat } from "@/lib/config";
import { teksten } from "@/lib/teksten";
import { AfrekenFormulier } from "./AfrekenFormulier";

export const dynamic = "force-dynamic";
export const metadata = { title: teksten.afrekenen.kop };

export default async function Afrekenen({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const p = sp.pand ? await haalPand(sp.pand) : null;
  const formaat = sp.formaat ? vindFormaat(sp.formaat) : undefined;
  const design = sp.design && isDesign(sp.design) ? sp.design : undefined;
  const tekening = p && design ? p.tekeningen[design] : undefined;
  if (!p || p.pand.status !== "goedgekeurd" || !formaat || !design || !tekening) notFound();
  const regel = (sp.regel ?? "").slice(0, EIGEN_REGEL_MAX);
  const bron = await tekeningBron(tekening);
  const t = teksten.afrekenen;

  const samenvatting = (
    <aside className="bg-wand p-6 sm:p-8">
      <h2 className="label mb-5">{t.jeBestelling}</h2>
      <div className="flex gap-5">
        <PrintVoorbeeld
          className="w-24 shrink-0 sm:w-28 !border-2"
          invoer={{ formaat, tekening: bron, straat: p.pand.straat, huisnummer: p.pand.huisnummerWeergave, stad: teksten.print.stad, eigenRegel: regel }}
        />
        <dl className="text-sm flex-1 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 content-start">
          <dt className="text-grijs col-span-2 text-base text-inkt mb-1">
            {p.pand.straat} {p.pand.huisnummerWeergave}
          </dt>
          <dt className="text-grijs">{t.design}</dt>
          <dd>{teksten.pand.designNaam[design]}</dd>
          <dt className="text-grijs">{t.formaat}</dt>
          <dd>{formaat.code.replace("x", " × ")} cm</dd>
          <dt className="text-grijs">{t.eigenRegel}</dt>
          <dd className={regel ? "italic" : "text-grijs"}>{regel || t.geen}</dd>
        </dl>
      </div>
      <Link href={`/pand/${p.pand.slug}`} className="label inline-block mt-4 underline underline-offset-4 hover:text-inkt">
        {t.wijzig}
      </Link>
      <dl className="mt-6 border-t border-lijn pt-4 text-sm grid grid-cols-[1fr_auto] gap-y-2">
        <dt className="text-grijs">{t.verzending}</dt>
        <dd>{t.gratis}</dd>
        <dt className="text-lg pt-2">{t.totaal}</dt>
        <dd className="text-lg pt-2">{formatteerPrijs(formaat.prijsCent)}</dd>
        <dd className="col-span-2 label">{t.inclusiefBtw}</dd>
      </dl>
      <p className="mt-5 text-sm text-grijs">{t.levertijd}</p>
    </aside>
  );

  return (
    <div className="mx-auto max-w-6xl pt-6 sm:pt-12">
      <h1 className="display text-4xl sm:text-5xl mb-8 sm:mb-12">{t.kop}</h1>
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-16 md:items-start">
        <div className="md:hidden">{samenvatting}</div>
        <AfrekenFormulier
          pand={p.pand.slug}
          design={design}
          formaat={formaat.code}
          regel={regel}
          herkomst={sp.herkomst ?? ""}
          prijs={formatteerPrijs(formaat.prijsCent)}
        />
        <div className="hidden md:block md:sticky md:top-8">{samenvatting}</div>
      </div>
    </div>
  );
}
