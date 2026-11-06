import { maakPrintSvg, type PrintInvoer } from "@/lib/print/sjabloon";

/**
 * Toont een print zoals het sjabloon hem oplevert. Werkt op de server en in de browser.
 * De SVG komt uit ons eigen sjabloon en onze eigen tekeningen, geen gebruikersinvoer
 * behalve de eigen regel, die het sjabloon escapet.
 */
export function PrintVoorbeeld({ invoer, className = "" }: { invoer: PrintInvoer; className?: string }) {
  const svg = maakPrintSvg(invoer);
  return (
    <div
      className={`print-voorbeeld border border-lijn shadow-[0_1px_2px_rgba(0,0,0,0.05),0_16px_40px_-20px_rgba(0,0,0,0.25)] ${className}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
