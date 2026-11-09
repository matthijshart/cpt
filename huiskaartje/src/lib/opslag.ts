/**
 * Bestandsopslag. Lokaal een map (opslag/), later objectopslag achter dezelfde functies.
 */
import { readFile } from "node:fs/promises";
import { join, normalize } from "node:path";

const MAP = process.env.HUISKAARTJE_OPSLAG ?? join(process.cwd(), "opslag");

function veiligPad(pad: string): string {
  const schoon = normalize(pad).replace(/^(\.\.(\/|\\|$))+/, "");
  if (schoon.includes("..")) throw new Error("Ongeldig pad");
  return join(MAP, schoon);
}

export async function leesBestand(pad: string): Promise<Buffer> {
  return readFile(veiligPad(pad));
}
