"use client";

import { useState } from "react";
import Link from "next/link";
import { DESIGNS, EIGEN_REGEL_MAX, FORMATEN, STANDAARD_DESIGN, STANDAARD_FORMAAT, formatteerPrijs, vindFormaat, type Design, type FormaatCode } from "@/lib/config";
import { teksten } from "@/lib/teksten";
import { PrintVoorbeeld } from "./PrintVoorbeeld";
import type { TekeningBron } from "@/lib/print/sjabloon";

export interface PandBestellerProps {
  slug: string;
  straat: string;
  huisnummer: string;
  /** Tekening per design. Een design zonder tekening ontbreekt. */
  tekeningen: Partial<Record<Design, TekeningBron>>;
}

export function PandBesteller({ slug, straat, huisnummer, tekeningen }: PandBestellerProps) {
  const beschikbaar = DESIGNS.filter((d) => tekeningen[d]);
  const [design, setDesign] = useState<Design>(tekeningen[STANDAARD_DESIGN] ? STANDAARD_DESIGN : beschikbaar[0]);
  const [formaatCode, setFormaatCode] = useState<FormaatCode>(STANDAARD_FORMAAT);
  const [eigenRegel, setEigenRegel] = useState("");
  const formaat = vindFormaat(formaatCode) ?? FORMATEN[0];
  const tekening = tekeningen[design];

  const bestelUrl = `/afrekenen?${new URLSearchParams({ pand: slug, design, formaat: formaatCode, regel: eigenRegel })}`;

  return (
    <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] md:gap-16 md:items-start">
      <div className="-mx-4 sm:mx-0 bg-wand px-8 py-10 sm:px-14 sm:py-16 flex justify-center md:sticky md:top-8">
        {tekening && (
          <PrintVoorbeeld
            invoer={{ formaat, tekening, straat, huisnummer, stad: teksten.print.stad, eigenRegel }}
            className="w-full max-w-[22rem] md:max-w-[calc(78vh*0.72)]"
          />
        )}
      </div>

      <div className="flex flex-col gap-8 md:pt-4">
        <div>
          <h1 className="display text-[2rem] sm:text-5xl">
            {straat} {huisnummer}
          </h1>
          <p className="label mt-3">{teksten.print.stad}</p>
        </div>

        {beschikbaar.length > 1 && (
          <fieldset>
            <legend className="label mb-3">{teksten.pand.design}</legend>
            <div className="grid grid-cols-2 gap-2">
              {beschikbaar.map((d) => (
                <Keuze key={d} actief={design === d} onClick={() => setDesign(d)}>
                  {teksten.pand.designNaam[d]}
                </Keuze>
              ))}
            </div>
          </fieldset>
        )}

        <fieldset>
          <legend className="label mb-3">{teksten.pand.formaat}</legend>
          <div className="grid grid-cols-3 gap-2">
            {FORMATEN.map((f) => (
              <Keuze key={f.code} actief={formaatCode === f.code} onClick={() => setFormaatCode(f.code)}>
                <span className="block">{f.code.replace("x", " × ")} cm</span>
                <span className={`block text-sm ${formaatCode === f.code ? "text-white/70" : "text-grijs"}`}>{formatteerPrijs(f.prijsCent)}</span>
              </Keuze>
            ))}
          </div>
        </fieldset>

        <div>
          <label htmlFor="eigen-regel" className="label block mb-3">
            {teksten.pand.eigenRegel}
          </label>
          <input
            id="eigen-regel"
            type="text"
            maxLength={EIGEN_REGEL_MAX}
            value={eigenRegel}
            onChange={(e) => setEigenRegel(e.target.value.slice(0, EIGEN_REGEL_MAX))}
            placeholder={teksten.pand.eigenRegelVoorbeeld}
            className="w-full border-b border-inkt bg-transparent py-2 text-lg italic outline-none placeholder:text-grijs/60 placeholder:not-italic focus:border-b-2"
          />
          <p className="mt-2 text-xs text-grijs flex justify-between">
            <span>{teksten.pand.eigenRegelUitleg}</span>
            <span className="tabular-nums">
              {eigenRegel.length}/{EIGEN_REGEL_MAX}
            </span>
          </p>
        </div>

        <div className="flex items-baseline justify-between border-t border-lijn pt-6">
          <span className="text-3xl">{formatteerPrijs(formaat.prijsCent)}</span>
          <span className="label">{teksten.pand.inclusief}</span>
        </div>

        <Link
          href={bestelUrl}
          className="label !text-white block w-full bg-inkt text-center py-5 hover:bg-black transition-colors"
        >
          {teksten.pand.bestellen}
        </Link>

        <p className="text-sm text-grijs">
          {teksten.pand.verwijderVraag}{" "}
          <Link href={`/verwijderen?pand=${slug}`} className="underline underline-offset-4 hover:text-inkt">
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
      className={`border px-2 py-3 text-base leading-tight text-center transition-colors ${actief ? "border-inkt bg-inkt text-white" : "border-lijn bg-veld hover:border-inkt"}`}
    >
      {children}
    </button>
  );
}
