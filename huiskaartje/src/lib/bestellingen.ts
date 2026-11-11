/**
 * Bestellingen. In stap 1 in het geheugen van de server; in stap 2 de database,
 * achter dezelfde functies.
 */
import { randomBytes } from "node:crypto";
import type { Bestelling, BestelStatus } from "./types";

const g = globalThis as unknown as { __bestellingen?: Map<string, Bestelling> };
const winkel = (g.__bestellingen ??= new Map<string, Bestelling>());

export async function maakBestelling(invoer: Omit<Bestelling, "id" | "nummer" | "aangemaakt" | "status" | "betalingId">): Promise<Bestelling> {
  const id = randomBytes(12).toString("base64url");
  const nummer = `HK-${String(100000 + winkel.size + 1).slice(1)}`;
  const b: Bestelling = { ...invoer, id, nummer, aangemaakt: new Date().toISOString(), status: "nieuw", betalingId: null };
  winkel.set(id, b);
  return b;
}

export async function haalBestelling(id: string): Promise<Bestelling | null> {
  return winkel.get(id) ?? null;
}

export async function koppelBetaling(id: string, betalingId: string): Promise<void> {
  const b = winkel.get(id);
  if (b) b.betalingId = betalingId;
}

export async function zetBestelStatus(id: string, status: BestelStatus): Promise<Bestelling | null> {
  const b = winkel.get(id);
  if (!b) return null;
  b.status = status;
  return b;
}

export async function alleBestellingen(): Promise<Bestelling[]> {
  return [...winkel.values()].sort((a, b) => b.aangemaakt.localeCompare(a.aangemaakt));
}
