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
        <header className="px-4 pt-5 pb-2 sm:px-8">
          <Link href="/" className="text-lg font-medium tracking-tight">
            {teksten.site.naam}
          </Link>
        </header>
        <main className="flex-1 px-4 sm:px-8">{children}</main>
        <footer className="px-4 sm:px-8 py-8 mt-16 text-sm text-grijs">
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {voetLinks.map(([href, naam]) => (
              <Link key={href} href={href} className="hover:text-inkt">
                {naam}
              </Link>
            ))}
          </nav>
        </footer>
      </body>
    </html>
  );
}
