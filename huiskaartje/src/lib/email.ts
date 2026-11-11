/**
 * E-mail. Lokaal loggen; later een maildienst achter dezelfde functie.
 */
export interface Email {
  aan: string;
  onderwerp: string;
  tekst: string;
}

export async function verstuurEmail(e: Email): Promise<void> {
  if (process.env.EMAIL_DIENST) {
    throw new Error("Maildienst nog niet aangesloten");
  }
  console.log(`[email] aan: ${e.aan}\n[email] onderwerp: ${e.onderwerp}\n${e.tekst.replace(/^/gm, "[email] ")}`);
}
