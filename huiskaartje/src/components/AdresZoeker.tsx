"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { AdresSuggestie } from "@/lib/pdok";
import { teksten } from "@/lib/teksten";

export function AdresZoeker({ autoFocus = false }: { autoFocus?: boolean }) {
  const router = useRouter();
  const id = useId();
  const [q, setQ] = useState("");
  const [suggesties, setSuggesties] = useState<AdresSuggestie[]>([]);
  const [actief, setActief] = useState(-1);
  const [open, setOpen] = useState(false);
  const [bezig, setBezig] = useState(false);
  const [gezocht, setGezocht] = useState("");
  const [onderweg, setOnderweg] = useState(false);
  const laatste = useRef(0);

  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  function opInvoer(waarde: string) {
    setQ(waarde);
    setOnderweg(false);
    if (timer.current) clearTimeout(timer.current);
    const schoon = waarde.trim();
    const nummer = ++laatste.current;
    if (schoon.length < 2) {
      setSuggesties([]);
      setGezocht("");
      return;
    }
    timer.current = setTimeout(async () => {
      setBezig(true);
      try {
        const res = await fetch(`/api/adres?q=${encodeURIComponent(schoon)}`);
        const data = (await res.json()) as AdresSuggestie[];
        if (nummer === laatste.current) {
          setSuggesties(data);
          setGezocht(schoon);
          setActief(data.length ? 0 : -1);
          setOpen(true);
        }
      } catch {
        if (nummer === laatste.current) setSuggesties([]);
      } finally {
        if (nummer === laatste.current) setBezig(false);
      }
    }, 150);
  }

  function kies(s: AdresSuggestie) {
    setOnderweg(true);
    setOpen(false);
    setQ(s.regel1);
    router.push(`/ga/${s.pdokId}`);
  }

  function opToets(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActief((a) => Math.min(a + 1, suggesties.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActief((a) => Math.max(a - 1, 0));
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  }

  function opVerzenden(e: React.FormEvent) {
    e.preventDefault();
    const s = suggesties[actief] ?? suggesties[0];
    if (s) kies(s);
  }

  const toonLijst = open && q.trim().length >= 2 && !onderweg;
  const geenResultaat = toonLijst && !bezig && suggesties.length === 0 && gezocht === q.trim();
  const lijstId = `${id}-lijst`;

  return (
    <form onSubmit={opVerzenden} className="relative" role="search">
      <label htmlFor={`${id}-veld`} className="sr-only">
        {teksten.home.placeholder}
      </label>
      <div className="flex items-stretch border-b-2 border-inkt focus-within:border-inkt">
        <input
          id={`${id}-veld`}
          type="text"
          inputMode="text"
          autoComplete="off"
          autoCorrect="off"
          spellCheck={false}
          autoFocus={autoFocus}
          enterKeyHint="search"
          placeholder={teksten.home.placeholder}
          value={q}
          onChange={(e) => opInvoer(e.target.value)}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 120)}
          onKeyDown={opToets}
          role="combobox"
          aria-expanded={toonLijst && suggesties.length > 0}
          aria-controls={lijstId}
          aria-activedescendant={actief >= 0 ? `${lijstId}-${actief}` : undefined}
          className="w-full bg-transparent py-3 text-2xl sm:text-3xl placeholder:text-grijs/60 outline-none"
        />
        <button type="submit" className="pl-3 text-base text-grijs hover:text-inkt" aria-label={teksten.home.zoeken}>
          {onderweg || bezig ? "…" : "→"}
        </button>
      </div>

      {toonLijst && (suggesties.length > 0 || geenResultaat) && (
        <ul
          id={lijstId}
          role="listbox"
          className="absolute left-0 right-0 z-10 mt-1 bg-white border border-lijn shadow-[0_12px_32px_-12px_rgba(0,0,0,0.25)]"
        >
          {suggesties.map((s, i) => (
            <li
              key={s.pandSlug}
              id={`${lijstId}-${i}`}
              role="option"
              aria-selected={i === actief}
              onMouseDown={(e) => {
                e.preventDefault();
                kies(s);
              }}
              onMouseEnter={() => setActief(i)}
              className={`px-4 py-3 cursor-pointer flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-x-3 ${i === actief ? "bg-veld" : ""}`}
            >
              <span className="text-lg">{s.regel1}</span>
              <span className="text-sm text-grijs whitespace-nowrap">{s.regel2}</span>
            </li>
          ))}
          {geenResultaat && <li className="px-4 py-3 text-grijs">{teksten.home.geenResultaten}</li>}
        </ul>
      )}
    </form>
  );
}
