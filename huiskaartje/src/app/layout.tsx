import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { teksten } from "@/lib/teksten";

export const metadata: Metadata = {
  title: { default: teksten.site.naam, template: `%s · ${teksten.site.naam}` },
  description: teksten.site.omschrijving,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const voetLinks = [
  ["/over", teksten.voet.over],
  ["/veelgestelde-vragen", teksten.voet.vragen],
  ["/voorwaarden", teksten.voet.voorwaarden],
  ["/privacy", teksten.voet.privacy],
  ["/colofon", teksten.voet.colofon],
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <header className="px-4 sm:px-8">
          <div className="mx-auto max-w-6xl flex items-baseline justify-between py-5 border-b border-lijn">
            <Link href="/" className="text-xl tracking-tight">
              {teksten.site.naam}
            </Link>
            <span className="label">{teksten.print.stad}</span>
          </div>
        </header>
        <main className="flex-1 px-4 sm:px-8">{children}</main>
        <footer className="px-4 sm:px-8 mt-24">
          <div className="mx-auto max-w-6xl border-t border-lijn py-8 flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between">
            <nav className="flex flex-wrap gap-x-6 gap-y-3">
              {voetLinks.map(([href, naam]) => (
                <Link key={href} href={href} className="label hover:text-inkt">
                  {naam}
                </Link>
              ))}
            </nav>
            <span className="label">{teksten.site.naam}</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
