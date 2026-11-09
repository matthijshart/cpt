import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PandBesteller } from "@/components/PandBesteller";
import { haalPand, tekeningBron } from "@/lib/catalogus";
import type { TekeningBron } from "@/lib/print/sjabloon";
import { DESIGNS, type Design } from "@/lib/config";
import { teksten } from "@/lib/teksten";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await haalPand(slug);
  if (!p || p.pand.status !== "goedgekeurd") return { title: teksten.site.naam };
  return { title: `${p.pand.straat} ${p.pand.huisnummerWeergave}` };
}

export default async function PandPagina({ params }: Props) {
  const { slug } = await params;
  const p = await haalPand(slug);
  if (!p) notFound();
  const { pand, tekeningen } = p;

  if (pand.status !== "goedgekeurd") {
    return (
      <div className="mx-auto max-w-xl pt-[10vh]">
        <h1 className="text-2xl mb-3">
          {pand.straat} {pand.huisnummerWeergave}
        </h1>
        <p className="mb-6">{teksten.pand.nogNietTeKoop}</p>
        <Link href={`/nog-niet-getekend?${new URLSearchParams({ naam: `${pand.straat} ${pand.huisnummerWeergave}` })}`} className="underline">
          {teksten.pand.nogNietTeKoopEmail}
        </Link>
      </div>
    );
  }

  const bronnen: Partial<Record<Design, TekeningBron>> = {};
  for (const d of DESIGNS) {
    const t = tekeningen[d];
    if (t) bronnen[d] = await tekeningBron(t);
  }

  return (
    <div className="mx-auto max-w-5xl pt-4 sm:pt-8">
      <PandBesteller slug={pand.slug} straat={pand.straat} huisnummer={pand.huisnummerWeergave} tekeningen={bronnen} />
      <dl className="mt-10 text-sm text-grijs flex flex-wrap gap-x-8 gap-y-1">
        {pand.bouwjaar && (
          <div>
            <dt className="inline">{teksten.pand.bouwjaar} </dt>
            <dd className="inline">{pand.bouwjaar}</dd>
          </div>
        )}
        {pand.huisnummers.length > 1 && (
          <div>
            <dt className="inline">{teksten.pand.adressen}: </dt>
            <dd className="inline">{pand.huisnummers.join(", ")}</dd>
          </div>
        )}
      </dl>
    </div>
  );
}
