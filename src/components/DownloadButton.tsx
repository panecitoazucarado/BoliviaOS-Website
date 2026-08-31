import { Download } from "lucide-react";
import { site } from "@/data/site";

export function DownloadButton({
  label = "Descargar Beta 1.0",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      href={site.downloadUrl}
      download={site.downloadFileName}
      className={`group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] ${className}`}
    >
      <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
    </a>
  );
}
