"use client";

import { useState } from "react";
import Link from "next/link";
import { DESIGNS, EIGEN_REGEL_MAX, FORMATEN, STANDAARD_DESIGN, STANDAARD_FORMAAT, formatteerPrijs, vindFormaat, type Design, type FormaatCode } from "@/lib/config";
import { teksten } from "@/lib/teksten";
import { PrintVoorbeeld } from "./PrintVoorbeeld";

export interface PandBestellerProps {
  slug: string;
  straat: string;
  huisnummer: string;
  /** SVG-tekst per design. Een design zonder tekening ontbreekt. */
  tekeningen: Partial<Record<Design, string>>;
}

export function PandBesteller({ slug, straat, huisnummer, tekeningen }: PandBestellerProps) {
  const beschikbaar = DESIGNS.filter((d) => tekeningen[d]);
  const [design, setDesign] = useState<Design>(tekeningen[STANDAARD_DESIGN] ? STANDAARD_DESIGN : beschikbaar[0]);
  const [formaatCode, setFormaatCode] = useState<FormaatCode>(STANDAARD_FORMAAT);
  const [eigenRegel, setEigenRegel] = useState("");
  const formaat = vindFormaat(formaatCode) ?? FORMATEN[0];
  const svg = tekeningen[design];

  const bestelUrl = `/afrekenen?${new URLSearchParams({ pand: slug, design, formaat: formaatCode, regel: eigenRegel })}`;

  return (
    <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:gap-14 md:items-start">
      <div className="md:sticky md:top-6">
        {svg && (
          <PrintVoorbeeld
            invoer={{ formaat, tekeningSvg: svg, straat, huisnummer, stad: teksten.print.stad, eigenRegel }}
            className="mx-auto max-w-[26rem] md:max-w-[calc(84vh*0.72)]"
          />
        )}
      </div>

      <div className="flex flex-col gap-7">
        <div>
          <h1 className="text-2xl">
            {straat} {huisnummer}
          </h1>
        </div>

        <fieldset>
          <legend className="text-sm text-grijs mb-2">{teksten.pand.design}</legend>
          <div className="grid grid-cols-2 gap-2">
            {beschikbaar.map((d) => (
              <Keuze key={d} actief={design === d} onClick={() => setDesign(d)}>
                {teksten.pand.designNaam[d]}
              </Keuze>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm text-grijs mb-2">{teksten.pand.formaat}</legend>
          <div className="grid grid-cols-3 gap-2">
            {FORMATEN.map((f) => (
              <Keuze key={f.code} actief={formaatCode === f.code} onClick={() => setFormaatCode(f.code)}>
                <span className="block">{f.code.replace("x", " × ")} cm</span>
                <span className="block text-sm text-grijs">{formatteerPrijs(f.prijsCent)}</span>
              </Keuze>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="eigen-regel" className="block text-sm text-grijs mb-2">
            {teksten.pand.eigenRegel}
          </label>
          <input
            id="eigen-regel"
            type="text"
            maxLength={EIGEN_REGEL_MAX}
            value={eigenRegel}
            onChange={(e) => setEigenRegel(e.target.value.slice(0, EIGEN_REGEL_MAX))}
            placeholder={teksten.pand.eigenRegelVoorbeeld}
            className="w-full border border-lijn bg-veld px-3 py-3 text-base outline-none focus:border-inkt placeholder:text-grijs/60"
          />
          <p className="mt-1 text-xs text-grijs flex justify-between">
            <span>{teksten.pand.eigenRegelUitleg}</span>
            <span>
              {eigenRegel.length}/{EIGEN_REGEL_MAX}
            </span>
          </p>
        </div>

        <div className="flex items-baseline justify-between border-t border-lijn pt-5">
          <span className="text-2xl">{formatteerPrijs(formaat.prijsCent)}</span>
          <span className="text-sm text-grijs">{teksten.pand.inclusief}</span>
        </div>

        <Link
          href={bestelUrl}
          className="block w-full bg-inkt text-white text-center py-4 text-lg hover:bg-black"
        >
          {teksten.pand.bestellen}
        </Link>

        <p className="text-sm text-grijs">
          {teksten.pand.verwijderVraag}{" "}
          <Link href={`/verwijderen?pand=${slug}`} className="underline hover:text-inkt">
            {teksten.pand.verwijderLink}
          </Link>
          .
        </p>
      </div>
    </div>
  );
}

function Keuze({ actief, onClick, children }: { actief: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={actief}
      className={`border px-2 py-3 text-base leading-tight text-center ${actief ? "border-inkt ring-1 ring-inkt" : "border-lijn hover:border-grijs"}`}
    >
      {children}
    </button>
  );
}
