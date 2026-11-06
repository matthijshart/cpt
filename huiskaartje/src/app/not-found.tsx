import Link from "next/link";
import { teksten } from "@/lib/teksten";

export default function NietGevonden() {
  return (
    <div className="mx-auto max-w-xl pt-[10vh]">
      <h1 className="text-2xl mb-3">{teksten.algemeen.nietGevonden}</h1>
      <Link href="/" className="underline">
        {teksten.algemeen.naarHome}
      </Link>
    </div>
  );
}
