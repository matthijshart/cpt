import { notFound } from "next/navigation";
import { haalBestelling } from "@/lib/bestellingen";
import { formatteerPrijs } from "@/lib/config";
import { teksten } from "@/lib/teksten";

export const dynamic = "force-dynamic";
export const metadata = { title: teksten.betalen.test };

/** Nepbetaalpagina. Staat model voor de pagina van Mollie, bewust in een andere stijl. */
export default async function Betalen({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const b = await haalBestelling(id);
  if (!b || !b.betalingId) notFound();
  const t = teksten.betalen;
  return (
    <div className="mx-auto max-w-md mt-16 border border-inkt bg-white p-8 font-mono text-sm">
      <p className="uppercase tracking-widest text-xs mb-6 bg-inkt text-white inline-block px-2 py-1">{t.test}</p>
      <p className="mb-6">{t.uitleg}</p>
      <dl className="grid grid-cols-[6rem_1fr] gap-y-2 mb-8">
        <dt className="text-grijs">{t.aan}</dt>
        <dd>{teksten.site.naam}</dd>
        <dt className="text-grijs">{t.bedrag}</dt>
        <dd>{formatteerPrijs(b.prijsCent)}</dd>
        <dt className="text-grijs">{teksten.afrekenen.betaalwijze}</dt>
        <dd>{teksten.afrekenen.betaalwijzen[b.betaalwijze as keyof typeof teksten.afrekenen.betaalwijzen] ?? b.betaalwijze}</dd>
        <dt className="text-grijs">Ref.</dt>
        <dd>{b.nummer}</dd>
      </dl>
      <form method="post" action="/api/betaling/nep" className="flex flex-col gap-2">
        <input type="hidden" name="betalingId" value={b.betalingId} />
        <button name="uitkomst" value="betaald" className="border border-inkt bg-inkt text-white py-3 hover:bg-black">
          {t.geslaagd}
        </button>
        <button name="uitkomst" value="mislukt" className="border border-inkt py-3 hover:bg-wand">
          {t.mislukt}
        </button>
        <button name="uitkomst" value="geannuleerd" className="border border-lijn py-3 text-grijs hover:bg-wand">
          {t.annuleren}
        </button>
      </form>
    </div>
  );
}
