import Link from "next/link";
import { AdresZoeker } from "@/components/AdresZoeker";
import { PrintVoorbeeld } from "@/components/PrintVoorbeeld";
import { haalVoorbeelden, tekeningBron } from "@/lib/catalogus";
import { FORMATEN, formatteerPrijs, type Design } from "@/lib/config";
import { teksten } from "@/lib/teksten";

export const dynamic = "force-dynamic";

export default async function Home() {
  const voorbeelden = await haalVoorbeelden(3);
  const voorkeur: Design[] = ["kleur", "kleur", "kleur"];
  const prints = await Promise.all(
    voorbeelden.map(async (v, i) => {
      const design = v.tekeningen[voorkeur[i]] ? voorkeur[i] : (Object.keys(v.tekeningen)[0] as Design);
      const tekening = await tekeningBron(v.tekeningen[design]!);
      return { pand: v.pand, tekening };
    }),
  );
  const laagstePrijs = Math.min(...FORMATEN.map((f) => f.prijsCent));

  return (
    <div className="mx-auto max-w-6xl">
      <section className="mx-auto max-w-2xl text-center pt-14 sm:pt-28">
        <h1 className="display text-[2.75rem] sm:text-7xl mb-4">
          {teksten.home.kop1} <em>{teksten.home.kop2}</em>
        </h1>
        <p className="text-grijs text-lg sm:text-xl mb-8 sm:mb-10">{teksten.home.uitleg}</p>
        <AdresZoeker autoFocus />
      </section>

      {prints.length > 0 && (
        <section className="mt-20 sm:mt-32" aria-label={teksten.home.voorbeelden}>
          <ul className="flex gap-5 overflow-x-auto snap-x snap-mandatory scrollbalk-weg -mx-4 px-4 pb-4 sm:grid sm:grid-cols-3 sm:gap-10 sm:mx-0 sm:px-0 sm:overflow-visible">
            {prints.map(({ pand, tekening }) => (
              <li key={pand.slug} className="snap-center shrink-0 w-[72vw] max-w-sm sm:w-auto sm:max-w-none">
                <Link href={`/pand/${pand.slug}`} className="group block">
                  <PrintVoorbeeld
                    className="transition-transform duration-300 group-hover:-translate-y-1"
                    invoer={{
                      formaat: FORMATEN[1],
                      tekening,
                      straat: pand.straat,
                      huisnummer: pand.huisnummerWeergave,
                      stad: teksten.print.stad,
                    }}
                  />
                  <span className="sr-only">
                    {pand.straat} {pand.huisnummerWeergave}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="label text-center mt-12">
            {teksten.home.vanaf} {formatteerPrijs(laagstePrijs)} · {teksten.home.verzending}
          </p>
        </section>
      )}
    </div>
  );
}
