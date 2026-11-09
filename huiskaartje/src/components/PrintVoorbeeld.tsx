import { maakPrintSvg, type PrintInvoer } from "@/lib/print/sjabloon";

/**
 * Toont een print zoals het sjabloon hem oplevert, in een dunne zwarte lijst.
 * Werkt op de server en in de browser. De SVG komt uit ons eigen sjabloon;
 * de enige gebruikersinvoer is de eigen regel, die het sjabloon escapet.
 */
export function PrintVoorbeeld({ invoer, className = "" }: { invoer: PrintInvoer; className?: string }) {
  const svg = maakPrintSvg(invoer);
  return <div className={`print-voorbeeld lijst ${className}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}
