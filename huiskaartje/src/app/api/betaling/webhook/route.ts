import { verwerkWebhook } from "./verwerk";

/** Webhook voor de betaaldienst. Mollie stuurt een POST met id=<betalingId>. */
export async function POST(req: Request) {
  const form = await req.formData().catch(() => null);
  const id = String(form?.get("id") ?? "");
  if (id) await verwerkWebhook(id);
  return new Response("ok");
}
