import { useEffect, useState } from "react";
import { Menu, X, Download } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, site } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8"
      >
        <a href="#home" className="min-w-0 truncate" aria-label="BoliviaOS inicio">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center flex-wrap gap-0.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-surface hover:text-foreground xl:px-3 xl:text-sm"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#beta"
            className="ml-2 inline-flex shrink-0 items-center gap-2 rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-primary-foreground transition-transform duration-200 hover:-translate-y-0.5 xl:px-4 xl:py-2 xl:text-sm"
          >
            <Download className="h-3.5 w-3.5" aria-hidden="true" />
            Descargar
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="shrink-0 rounded-full border border-border p-2 text-foreground lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div
          id="mobile-menu"
          className="border-t border-border bg-background/95 px-5 pb-6 pt-2 backdrop-blur-xl lg:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-border/70 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#beta"
            onClick={() => setOpen(false)}
            className="mt-5 block rounded-full bg-primary px-4 py-3 text-center text-sm font-semibold text-primary-foreground"
          >
            Descargar
          </a>
        </div>
      ) : null}
    </header>
  );
}
