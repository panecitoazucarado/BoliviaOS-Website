import symbol from "@/assets/boliviaos-symbol.png.asset.json";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src={symbol.url}
        alt=""
        width={1170}
        height={598}
        className="h-8 w-auto shrink-0 object-contain"
        aria-hidden="true"
      />
      <span className="font-display text-[1.05rem] font-bold tracking-tight text-foreground">
        Bolivia<span className="text-primary">OS</span>
      </span>
      <span className="sr-only">BoliviaOS</span>
    </span>
  );
}
