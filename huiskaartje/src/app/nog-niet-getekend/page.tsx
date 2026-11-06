import Link from "next/link";
import { teksten } from "@/lib/teksten";
import { WachtlijstFormulier } from "./WachtlijstFormulier";

export const dynamic = "force-dynamic";

export default async function NogNietGetekend({ searchParams }: { searchParams: Promise<{ naam?: string; id?: string }> }) {
  const { naam, id } = await searchParams;
  return (
    <div className="mx-auto max-w-xl pt-[10vh]">
      <p className="text-sm text-grijs mb-1">{naam ? `${naam}, Amsterdam` : teksten.nogNietGetekend.geenAdres}</p>
      <h1 className="text-2xl mb-3">{teksten.nogNietGetekend.kop}</h1>
      <p className="mb-6">{teksten.nogNietGetekend.uitleg}</p>
      <WachtlijstFormulier adresNaam={naam ?? ""} pdokId={id ?? ""} />
      <p className="mt-8 text-sm">
        <Link href="/" className="underline">
          {teksten.nogNietGetekend.terug}
        </Link>
      </p>
    </div>
  );
}
