import { ArrowRight, FolderTree, Terminal, Shield, Disc, Music, Pencil, Download } from "lucide-react";
import symbol from "@/assets/boliviaos-symbol.png.asset.json";
import { site } from "@/data/site";
import { Reveal } from "../Reveal";

const highlights = [
  { icon: Disc, label: "Lanzador de juegos (HDD, USB, Red SMB, MX4SIO)" },
  { icon: FolderTree, label: "Explorador de archivos (mc0:, mc1:, mass0:, mass1:, hdd0:, host:)" },
  { icon: Terminal, label: "Terminal para ejecutar comandos" },
  { icon: Music, label: "Reproductor de audio MP3 y OGG Vorbis" },
  { icon: Pencil, label: "Editor de texto (.txt, .cfg) y scripts JS" },
  { icon: Shield, label: "Mantenimiento y formateo MCA integrado" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden px-4 pt-28 pb-16 sm:px-6 sm:pt-36 sm:pb-24 md:pt-40 md:pb-32 md:px-8"
      style={{ background: "var(--gradient-soft)" }}
    >
      {/* Seamless unified grid canvas across the entire top presentation */}
      <div className="grid-canvas pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-6xl">
        {/* Top Hero: Headline + CTA + Logo */}
        <div className="grid items-center gap-10 lg:gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Un entorno multifunción para <span className="text-brand-gradient">PlayStation 2</span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
              BoliviaOS amplía las capacidades de Open PS2 Loader reuniendo lanzamiento de juegos,
              exploración de archivos, reproducción de audio, edición de texto y utilidades de sistema
              en una sola interfaz integrada para la consola.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#beta"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2.5 overflow-hidden rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] active:scale-98"
              >
                <Download className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Descargar BoliviaOS</span>
                <span
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
              </a>
              <a
                href="#features"
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold text-foreground transition-colors duration-300 hover:border-primary/40 hover:bg-surface active:scale-98"
              >
                Ver características
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-x-6 sm:gap-y-3">
              {highlights.map((h) => (
                <li
                  key={h.label}
                  className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                >
                  <h.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                  <span>{h.label}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8 text-xs text-muted-foreground">
              {site.location} — {site.developer} · {site.alias}
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute inset-6 rounded-[2.5rem] blur-3xl transition-opacity duration-700"
              style={{ background: "var(--gradient-brand)", opacity: 0.2 }}
            />
            <div className="card-soft card-lift relative flex flex-col items-center gap-6 p-8 sm:p-10 transition-all duration-300 hover:shadow-2xl">
              <picture>
                <source srcSet={symbol.url.replace(/\.png$/, ".webp")} type="image/webp" />
                <img
                  src={symbol.url}
                  alt="Logotipo de BoliviaOS"
                  width={1170}
                  height={598}
                  className="w-full max-w-[19rem] object-contain drop-shadow-sm transition-transform duration-500 hover:scale-[1.03]"
                  decoding="async"
                />
              </picture>
              <div className="w-full rounded-2xl border border-border/80 bg-surface/80 p-4 text-center backdrop-blur-sm">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  Versión actual
                </p>
                <p className="mt-1 font-display text-xl font-extrabold tracking-tight text-foreground">
                  {site.version}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Seamless Section: Propósito y funcionamiento / ¿Qué es BoliviaOS? */}
        <div id="features" className="scroll-mt-28 pt-16 mt-16">
          <Reveal>
            <div className="flex max-w-3xl flex-col gap-4">
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Propósito y funcionamiento
              </span>
              <h2 className="text-3xl font-bold leading-[1.1] text-foreground sm:text-4xl">
                ¿Qué es BoliviaOS?
              </h2>
              <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
                BoliviaOS es un proyecto de software para PlayStation 2 desarrollado sobre la base de Open PS2 Loader (OPL). Su objetivo es proporcionar un entorno integrado donde el usuario pueda gestionar juegos, navegar por el sistema de archivos, editar configuraciones y ejecutar utilidades técnicas sin necesidad de reiniciar la consola ni alternar entre aplicaciones ELF independientes.
              </p>
              <div className="brand-rule mt-1" />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
