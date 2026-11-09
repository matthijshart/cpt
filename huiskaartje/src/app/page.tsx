import Link from "next/link";
import { AdresZoeker } from "@/components/AdresZoeker";
import { PrintVoorbeeld } from "@/components/PrintVoorbeeld";
import { haalVoorbeelden, tekeningBron } from "@/lib/catalogus";
import { FORMATEN, type Design } from "@/lib/config";
import { teksten } from "@/lib/teksten";

export const dynamic = "force-dynamic";

export default async function Home() {
  const voorbeelden = await haalVoorbeelden(3);
  const designs: Design[] = ["zwartwit", "kleur", "zwartwit"];
  const prints = await Promise.all(
    voorbeelden.map(async (v, i) => {
      const design = v.tekeningen[designs[i]] ? designs[i] : (Object.keys(v.tekeningen)[0] as Design);
      const tekening = await tekeningBron(v.tekeningen[design]!);
      return { pand: v.pand, tekening };
    }),
  );

  return (
    <div className="mx-auto max-w-2xl pt-[12vh] sm:pt-[16vh]">
      <h1 className="text-3xl sm:text-4xl mb-1">{teksten.home.kop}</h1>
      <p className="text-grijs mb-6">{teksten.home.uitleg}</p>
      <AdresZoeker autoFocus />

      {prints.length > 0 && (
        <section className="mt-16 sm:mt-24" aria-label={teksten.home.voorbeelden}>
          <ul className="grid grid-cols-3 gap-3 sm:gap-6">
            {prints.map(({ pand, tekening }) => (
              <li key={pand.slug}>
                <Link href={`/pand/${pand.slug}`} className="block">
                  <PrintVoorbeeld
                    invoer={{ formaat: FORMATEN[1], tekening, straat: pand.straat, huisnummer: pand.huisnummerWeergave, stad: teksten.print.stad }}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
