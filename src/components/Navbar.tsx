import { useEffect, useState, useRef } from "react";
import { Menu, X, Download, ChevronDown, Video, Disc, Music, Terminal, Wrench, Sparkles } from "lucide-react";
import { Logo } from "./Logo";
import { navLinks, toolSubLinks } from "@/data/site";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setToolsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setToolsDropdownOpen(false);
    }, 150);
  };

  const getSubIcon = (iconName?: string) => {
    switch (iconName) {
      case "video":
        return <Video className="h-4 w-4 text-primary" />;
      case "disc":
        return <Disc className="h-4 w-4 text-muted-foreground" />;
      case "media":
        return <Music className="h-4 w-4 text-muted-foreground" />;
      case "terminal":
        return <Terminal className="h-4 w-4 text-muted-foreground" />;
      default:
        return <Wrench className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl shadow-xs"
          : "border-b border-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto grid w-full max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-3.5 sm:px-8"
      >
        <a href="/#home" className="min-w-0 truncate" aria-label="BoliviaOS inicio">
          <Logo />
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center flex-wrap gap-0.5">
            {navLinks.map((link) => {
              const targetHref = link.href.startsWith("#") ? `/${link.href}` : link.href;

              if (link.label === "Herramientas") {
                return (
                  <li
                    key={link.href}
                    className="relative"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button
                      type="button"
                      onClick={() => setToolsDropdownOpen((v) => !v)}
                      aria-expanded={toolsDropdownOpen}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 xl:px-3 xl:text-sm ${
                        toolsDropdownOpen
                          ? "bg-surface text-foreground"
                          : "text-muted-foreground hover:bg-surface hover:text-foreground"
                      }`}
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-3 w-3 transition-transform duration-200 ${
                          toolsDropdownOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>

                    {/* Desktop Dropdown Menu */}
                    <div
                      className={`absolute left-0 top-full pt-2 transition-all duration-200 z-50 ${
                        toolsDropdownOpen
                          ? "pointer-events-auto opacity-100 translate-y-0"
                          : "pointer-events-none opacity-0 -translate-y-1"
                      }`}
                    >
                      <div className="w-80 rounded-2xl border border-border/80 bg-background/95 p-2 shadow-2xl backdrop-blur-xl ring-1 ring-black/5">
                        <div className="px-2.5 py-1.5 mb-1">
                          <span className="text-[0.65rem] font-bold uppercase tracking-wider text-muted-foreground/80">
                            Herramientas y Utilidades
                          </span>
                        </div>

                        <div className="space-y-1">
                          {toolSubLinks.map((sub, idx) => (
                            <a
                              key={sub.title}
                              href={sub.href}
                              onClick={() => setToolsDropdownOpen(false)}
                              className={`group flex items-start gap-3 rounded-xl p-2.5 text-xs transition-all ${
                                idx === 0
                                  ? "bg-primary/8 border border-primary/20 hover:bg-primary/12"
                                  : "hover:bg-surface/80"
                              }`}
                            >
                              <div
                                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                                  idx === 0 ? "bg-primary/15 text-primary" : "bg-surface"
                                }`}
                              >
                                {getSubIcon(sub.icon)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-1.5">
                                  <span
                                    className={`font-semibold truncate ${
                                      idx === 0 ? "text-primary" : "text-foreground group-hover:text-primary"
                                    }`}
                                  >
                                    {sub.title}
                                  </span>
                                  {sub.badge && (
                                    <span className="shrink-0 rounded-full bg-primary/20 px-1.5 py-0.2 text-[0.58rem] font-bold text-primary">
                                      {sub.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="mt-0.5 text-[0.68rem] text-muted-foreground leading-tight line-clamp-2">
                                  {sub.description}
                                </p>
                              </div>
                            </a>
                          ))}
                        </div>

                        <div className="mt-2 border-t border-border/60 pt-2 px-2 pb-1">
                          <a
                            href="/#tools"
                            onClick={() => setToolsDropdownOpen(false)}
                            className="flex items-center justify-between text-[0.7rem] font-semibold text-primary hover:underline"
                          >
                            <span>Ver todas en la página principal</span>
                            <span>→</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <a
                    href={targetHref}
                    className="rounded-full px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-surface hover:text-foreground xl:px-3 xl:text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="/#beta"
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
            {navLinks.map((link) => {
              const targetHref = link.href.startsWith("#") ? `/${link.href}` : link.href;

              if (link.label === "Herramientas") {
                return (
                  <li key={link.href} className="border-b border-border/70 py-2">
                    <button
                      type="button"
                      onClick={() => setMobileToolsOpen((v) => !v)}
                      className="flex w-full items-center justify-between py-1 text-sm font-medium text-foreground"
                    >
                      <span>{link.label}</span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          mobileToolsOpen ? "rotate-180 text-primary" : "text-muted-foreground"
                        }`}
                      />
                    </button>

                    {mobileToolsOpen ? (
                      <div className="mt-2 space-y-1.5 pl-2">
                        {toolSubLinks.map((sub, idx) => (
                          <a
                            key={sub.title}
                            href={sub.href}
                            onClick={() => setOpen(false)}
                            className={`flex items-center gap-2.5 rounded-lg p-2 text-xs ${
                              idx === 0
                                ? "bg-primary/10 font-semibold text-primary"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <div className="shrink-0">{getSubIcon(sub.icon)}</div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5">
                                <span className="truncate">{sub.title}</span>
                                {sub.badge && (
                                  <span className="rounded-full bg-primary/20 px-1.5 py-0.2 text-[0.55rem] font-bold text-primary">
                                    {sub.badge}
                                  </span>
                                )}
                              </div>
                            </div>
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </li>
                );
              }

              return (
                <li key={link.href}>
                  <a
                    href={targetHref}
                    onClick={() => setOpen(false)}
                    className="block border-b border-border/70 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <a
            href="/#beta"
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
