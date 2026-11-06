# Huiskaartje

Winkel voor prints van Amsterdamse panden. Next.js, TypeScript, Tailwind.

## Lokaal starten

```bash
npm install
npm run dev
```

Open http://localhost:3000. Er is geen account of sleutel nodig. Adressen komen
live van de PDOK Locatieserver. In `npm run dev` staan de voorbeeldpanden aan
(verzonnen gevels op echte adressen, zie `src/data/voorbeeld`); in een
productiebuild en op Vercel staan ze uit. Zie `.env.example`.

## Scripts

- `npm run dev`: ontwikkelserver
- `npm run build` en `npm start`: productiebuild (zonder voorbeelddata)
- `npm run lint`, `npm run typecheck`
- `npm run voorbeeld:gevels`: tekent de voorbeeldgevels opnieuw naar `src/data/voorbeeld/tekeningen`

## Opbouw

- `src/lib/config.ts`: formaten, prijzen, designs
- `src/lib/teksten.ts`: alle teksten
- `src/lib/pdok.ts`: adressen zoeken bij PDOK
- `src/lib/catalogus.ts`: panden, adressen, tekeningen (nu in het geheugen, straks database)
- `src/lib/print/sjabloon.ts`: het printsjabloon, voor het voorbeeld op de site en straks de pdf
- `src/app`: de pagina's
