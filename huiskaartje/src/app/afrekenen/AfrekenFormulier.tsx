"use client";

import { useActionState, useState } from "react";
import { teksten } from "@/lib/teksten";
import { plaatsBestelling, type AfrekenStaat } from "./acties";

const t = teksten.afrekenen;

export function AfrekenFormulier(props: { pand: string; design: string; formaat: string; regel: string; herkomst: string; prijs: string }) {
  const [staat, actie, bezig] = useActionState<AfrekenStaat, FormData>(plaatsBestelling, { fouten: {}, waarden: {} });
  const [cadeau, setCadeau] = useState(staat.waarden.cadeau === "ja");
  const [anderAdres, setAnderAdres] = useState(staat.waarden.anderAdres === "ja");
  const w = staat.waarden;
  const f = staat.fouten;
  const heeftFouten = Object.keys(f).length > 0;

  return (
    <form action={actie} className="flex flex-col gap-10" noValidate>
      <input type="hidden" name="pand" value={props.pand} />
      <input type="hidden" name="design" value={props.design} />
      <input type="hidden" name="formaat" value={props.formaat} />
      <input type="hidden" name="regel" value={props.regel} />
      <input type="hidden" name="herkomst" value={props.herkomst} />

      {heeftFouten && (
        <p className="border-l-2 border-inkt pl-4 text-sm" role="alert">
          {f.product ?? t.fout}
        </p>
      )}

      <Sectie titel={t.gegevens}>
        <Veld naam="naam" label={t.naam} fout={f.naam} standaard={w.naam} autoComplete="name" />
        <Veld naam="email" label={t.email} type="email" fout={f.email} standaard={w.email} uitleg={t.emailUitleg} autoComplete="email" />
      </Sectie>

      <Sectie titel={t.cadeau}>
        <Vink naam="cadeau" label={t.isCadeau} aan={cadeau} onChange={setCadeau} />
        {cadeau && (
          <div className="flex flex-col gap-5 border-l border-lijn pl-5 mt-1">
            <Vink naam="anderAdres" label={t.anderAdres} aan={anderAdres} onChange={setAnderAdres} />
            {anderAdres && <Veld naam="ontvangerNaam" label={t.ontvangerNaam} fout={f.ontvangerNaam} standaard={w.ontvangerNaam} />}
            <div>
              <label htmlFor="kaartje" className="label block mb-2">
                {t.kaartje}
              </label>
              <textarea
                id="kaartje"
                name="kaartje"
                rows={3}
                maxLength={200}
                defaultValue={w.kaartje}
                placeholder={t.kaartjeVoorbeeld}
                className="w-full border border-lijn bg-veld px-3 py-3 text-base outline-none focus:border-inkt placeholder:text-grijs/60"
              />
              <p className="mt-1 text-xs text-grijs">{t.kaartjeUitleg}</p>
            </div>
            <Vink naam="geenFactuur" label={t.geenFactuur} standaardAan={w.geenFactuur ? w.geenFactuur === "ja" : true} />
          </div>
        )}
      </Sectie>

      <Sectie titel={t.bezorgadres}>
        <div className="grid grid-cols-[1fr_7rem] gap-3">
          <Veld naam="straat" label={t.straat} fout={f.straat} standaard={w.straat} autoComplete="address-line1" />
          <Veld naam="huisnummer" label={t.huisnummer} fout={f.huisnummer} standaard={w.huisnummer} />
        </div>
        <div className="grid grid-cols-[9rem_1fr] gap-3">
          <Veld naam="postcode" label={t.postcode} fout={f.postcode} standaard={w.postcode} autoComplete="postal-code" placeholder="1015 EA" />
          <Veld naam="plaats" label={t.plaats} fout={f.plaats} standaard={w.plaats} autoComplete="address-level2" />
        </div>
        <p className="text-sm text-grijs">{t.land}</p>
      </Sectie>

      <Sectie titel={t.betaalwijze}>
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(t.betaalwijzen) as (keyof typeof t.betaalwijzen)[]).map((k, i) => (
            <label
              key={k}
              className="relative border border-lijn bg-veld px-2 py-3 text-center cursor-pointer has-[:checked]:border-inkt has-[:checked]:bg-inkt has-[:checked]:text-white transition-colors"
            >
              <input type="radio" name="betaalwijze" value={k} defaultChecked={w.betaalwijze ? w.betaalwijze === k : i === 0} className="sr-only" />
              {t.betaalwijzen[k]}
            </label>
          ))}
        </div>
        {f.betaalwijze && <p className="text-sm">{f.betaalwijze}</p>}
        <p className="text-sm text-grijs">{t.betaalUitleg}</p>
      </Sectie>

      <button type="submit" disabled={bezig} className="label !text-white bg-inkt py-5 hover:bg-black transition-colors disabled:opacity-60">
        {bezig ? "…" : `${t.betalen} ${props.prijs}`}
      </button>
    </form>
  );
}

function Sectie({ titel, children }: { titel: string; children: React.ReactNode }) {
  return (
    <fieldset className="flex flex-col gap-5">
      <legend className="label mb-5">{titel}</legend>
      {children}
    </fieldset>
  );
}

function Veld({
  naam,
  label,
  fout,
  standaard,
  uitleg,
  type = "text",
  autoComplete,
  placeholder,
}: {
  naam: string;
  label: string;
  fout?: string;
  standaard?: string;
  uitleg?: string;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={naam} className="label block mb-2">
        {label}
      </label>
      <input
        id={naam}
        name={naam}
        type={type}
        defaultValue={standaard}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={fout ? true : undefined}
        className={`w-full border bg-veld px-3 py-3 text-base outline-none focus:border-inkt placeholder:text-grijs/50 ${fout ? "border-red-700" : "border-lijn"}`}
      />
      {fout ? <p className="mt-1 text-xs text-red-700">{fout}</p> : uitleg ? <p className="mt-1 text-xs text-grijs">{uitleg}</p> : null}
    </div>
  );
}

function Vink({
  naam,
  label,
  aan,
  onChange,
  standaardAan,
}: {
  naam: string;
  label: string;
  aan?: boolean;
  onChange?: (v: boolean) => void;
  standaardAan?: boolean;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <input
        type="checkbox"
        name={naam}
        value="ja"
        checked={onChange ? aan : undefined}
        defaultChecked={onChange ? undefined : standaardAan}
        onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
        className="size-5 accent-inkt"
      />
      <span>{label}</span>
    </label>
  );
}
