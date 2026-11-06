"use server";

/**
 * Verzoek van een bewoner om een pand uit de catalogus te halen.
 * In stap 1 alleen loggen; in stap 2 komt dit in het beheer terecht.
 */
export async function vraagVerwijdering(_vorige: { klaar: boolean }, form: FormData): Promise<{ klaar: boolean }> {
  const email = String(form.get("email") ?? "").trim();
  const pand = String(form.get("pand") ?? "").trim();
  if (!email.includes("@")) return { klaar: false };
  console.log(`[verwijderverzoek] ${new Date().toISOString()} pand=${pand} ${email}`);
  return { klaar: true };
}
