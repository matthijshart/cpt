"use client";

import { useActionState } from "react";
import { teksten } from "@/lib/teksten";
import { vraagVerwijdering } from "./acties";

export function VerwijderFormulier({ pandSlug }: { pandSlug: string }) {
  const [staat, actie, bezig] = useActionState(vraagVerwijdering, { klaar: false });
  if (staat.klaar) return <p className="border-l-2 border-inkt pl-4">{teksten.verwijderen.bedankt}</p>;
  return (
    <form action={actie} className="flex flex-col gap-3 sm:flex-row">
      <input type="hidden" name="pand" value={pandSlug} />
      <label htmlFor="email" className="sr-only">
        {teksten.verwijderen.email}
      </label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autoComplete="email"
        placeholder={teksten.verwijderen.email}
        className="flex-1 border border-lijn bg-veld px-3 py-3 text-base outline-none focus:border-inkt"
      />
      <button type="submit" disabled={bezig} className="bg-inkt text-white px-5 py-3 text-base disabled:opacity-60">
        {teksten.verwijderen.versturen}
      </button>
    </form>
  );
}
