import Link from "next/link";
import { notFound } from "next/navigation";
import { PrintVoorbeeld } from "@/components/PrintVoorbeeld";
import { haalBestelling } from "@/lib/bestellingen";
import { haalPand, tekeningBron } from "@/lib/catalogus";
import { formatteerPrijs, vindFormaat } from "@/lib/config";
import { teksten } from "@/lib/teksten";

export const dynamic = "force-dynamic";
export const metadata = { title: teksten.bedankt.kop };

export default async function Bedankt({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await haalBestelling(id);
  if (!b) notFound();
  const t = teksten.bedankt;
  const p = await haalPand(b.pandSlug);
  const formaat = vindFormaat(b.formaat);
  const tekening = p?.tekeningen[b.design];
  const bron = tekening ? await tekeningBron(tekening) : null;

  if (b.status === "mislukt" || b.status === "geannuleerd") {
    return (
      <div className="mx-auto max-w-xl pt-[10vh]">
        <p className="label mb-3">{b.nummer}</p>
        <h1 className="display text-4xl mb-4">{t.mislukt}</h1>
        <Link href={`/betalen/${b.id}`} className="label !text-white inline-block bg-inkt px-8 py-4 hover:bg-black">
          {t.opnieuw}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl pt-8 sm:pt-16 grid gap-10 sm:grid-cols-[14rem_1fr] sm:gap-16 items-start">
      {bron && formaat && (
        <PrintVoorbeeld
          className="w-48 sm:w-full"
          invoer={{ formaat, tekening: bron, straat: b.straat, huisnummer: b.huisnummerWeergave, stad: teksten.print.stad, eigenRegel: b.eigenRegel }}
        />
      )}
      <div>
        <p className="label mb-3">
          {t.nummer} {b.nummer}
        </p>
        <h1 className="display text-4xl sm:text-5xl mb-5">{t.kop}</h1>
        {b.status === "nieuw" ? (
          <p className="mb-6">{t.wachten}</p>
        ) : (
          <p className="mb-6">
            {t.bevestiging} {b.klant.email}.
          </p>
        )}
        <dl className="text-sm grid grid-cols-[7rem_1fr] gap-y-2 border-t border-lijn pt-5">
          <dt className="text-grijs">{teksten.afrekenen.design}</dt>
          <dd>{teksten.pand.designNaam[b.design]}</dd>
          <dt className="text-grijs">{teksten.afrekenen.formaat}</dt>
          <dd>{b.formaat.replace("x", " × ")} cm</dd>
          {b.eigenRegel && (
            <>
              <dt className="text-grijs">{teksten.afrekenen.eigenRegel}</dt>
              <dd className="italic">{b.eigenRegel}</dd>
            </>
          )}
          <dt className="text-grijs">{t.bezorging}</dt>
          <dd>
            {b.bezorgadres.naam}
            <br />
            {b.bezorgadres.straat} {b.bezorgadres.huisnummer}
            <br />
            {b.bezorgadres.postcode.replace(/^(\d{4})/, "$1 ")} {b.bezorgadres.plaats}
          </dd>
          <dt className="text-grijs">{teksten.afrekenen.totaal}</dt>
          <dd>{formatteerPrijs(b.prijsCent)}</dd>
        </dl>
        <p className="mt-8 text-sm text-grijs">{teksten.afrekenen.levertijd}</p>
        <Link href="/" className="label inline-block mt-8 underline underline-offset-4 hover:text-inkt">
          {t.verder}
        </Link>
      </div>
    </div>
  );
}
