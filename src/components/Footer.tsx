import { Logo } from "./Logo";
import { site, navLinks } from "@/data/site";
import { Github, Youtube, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function Footer() {
  const handleGithubClick = () => {
    toast("Código fuente próximamente", {
      description:
        "El código fuente de BoliviaOS estará disponible dentro de unos días, se está trabajando antes de subirlo a GitHub.",
      icon: <Github className="h-4 w-4 text-primary" />,
      duration: 6000,
    });
  };

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-8">
        {/* Main Grid — Anthropic / OpenAI style layout */}
        <div className="grid grid-cols-1 gap-10 py-12 sm:grid-cols-2 md:grid-cols-12 md:gap-8 lg:py-20">
          
          {/* Col 1: Brand & Identity (spans 4 cols) */}
          <div className="flex flex-col justify-between space-y-6 md:col-span-4">
            <div className="space-y-4">
              <Logo />
              <p className="max-w-sm text-xs leading-relaxed text-muted-foreground sm:text-sm">
                Entorno multifunción para PlayStation 2 basado en Open PS2 Loader. Desarrollado para hardware real.
              </p>
              <div className="text-xs text-muted-foreground">
                <p className="font-medium text-foreground">{site.developer}</p>
                <p>{site.alias} · {site.location}</p>
              </div>
            </div>

            {/* Social & Status Row */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGithubClick}
                  aria-label="GitHub de BoliviaOS"
                  title="GitHub — Código fuente próximamente"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-surface hover:text-foreground active:scale-95"
                >
                  <Github className="h-4 w-4" aria-hidden="true" />
                </button>

                <a
                  href="https://www.youtube.com/@josemayt6235"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Canal de YouTube @josemayt6235"
                  title="YouTube — @josemayt6235"
                  className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-foreground/40 hover:bg-surface hover:text-foreground active:scale-95"
                >
                  <Youtube className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>

              <div className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-2.5 py-1 text-xs text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                <span className="font-medium text-foreground">{site.name}</span>
                <span>{site.version}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navegación (spans 2 cols) */}
          <div className="space-y-4 md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Navegación
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Herramientas (spans 3 cols) */}
          <div className="space-y-4 md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Módulos y funciones
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a href="#tools" className="text-muted-foreground transition-colors hover:text-foreground">
                  Lanzador de juegos
                </a>
              </li>
              <li>
                <a href="#file-explorer" className="text-muted-foreground transition-colors hover:text-foreground">
                  Explorador de archivos
                </a>
              </li>
              <li>
                <a href="#tools" className="text-muted-foreground transition-colors hover:text-foreground">
                  Terminal de comandos
                </a>
              </li>
              <li>
                <a href="#tools" className="text-muted-foreground transition-colors hover:text-foreground">
                  Reproductor de audio
                </a>
              </li>
              <li>
                <a href="#tools" className="text-muted-foreground transition-colors hover:text-foreground">
                  Editor de texto y scripts
                </a>
              </li>
              <li>
                <a href="#tools" className="text-muted-foreground transition-colors hover:text-foreground">
                  Mantenimiento MCA
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Recursos & Open Source (spans 3 cols) */}
          <div className="space-y-4 md:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
              Recursos externos
            </p>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <a
                  href="https://github.com/ps2homebrew/Open-PS2-Loader"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>Open PS2 Loader</span>
                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/ffgriever-pl/Memory-Card-Annihilator"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>Memory Card Annihilator</span>
                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/@josemayt6235"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span>Canal YouTube del proyecto</span>
                  <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href="#philosophy"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Avance en video
                </a>
              </li>
              <li>
                <a
                  href="#beta"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Descargar ejecutable ELF
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar — Strict Margins & Legal Disclaimer */}
        <div className="border-t border-border py-8 text-center">
          <p className="text-xs leading-relaxed text-muted-foreground/60">
            BoliviaOS no está afiliado ni respaldado por Sony Interactive Entertainment. PlayStation 2
          </p>
        </div>
      </div>
    </footer>
  );
}
