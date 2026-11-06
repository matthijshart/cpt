"use server";

/**
 * Wachtlijst. In stap 1 alleen loggen; in stap 2 gaat dit de database in.
 */
export async function schrijfInOpWachtlijst(_vorige: { klaar: boolean }, form: FormData): Promise<{ klaar: boolean }> {
  const email = String(form.get("email") ?? "").trim();
  const adres = String(form.get("adres") ?? "").trim();
  const pdokId = String(form.get("pdokId") ?? "").trim();
  if (!email.includes("@")) return { klaar: false };
  console.log(`[wachtlijst] ${new Date().toISOString()} ${adres} (${pdokId}) ${email}`);
  return { klaar: true };
}
