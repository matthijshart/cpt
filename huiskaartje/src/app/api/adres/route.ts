import { NextResponse } from "next/server";
import { zoekAdressen } from "@/lib/pdok";

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q") ?? "";
  if (q.trim().length < 2) return NextResponse.json([]);
  try {
    const suggesties = await zoekAdressen(q);
    return NextResponse.json(suggesties, {
      headers: { "Cache-Control": "public, max-age=3600, s-maxage=86400" },
    });
  } catch (e) {
    console.error("adreszoeker", e);
    return NextResponse.json([], { status: 502 });
  }
}
