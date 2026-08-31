import { useState } from "react";
import { GitBranch, Shield, Layers, ChevronDown, ExternalLink } from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";

export function Credits() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Section id="credits" className="bg-surface">
      <SectionHeading
        eyebrow="Agradecimientos"
        title="Créditos y base de código abierto"
        intro="BoliviaOS es un proyecto independiente desarrollado para ampliar las capacidades de PlayStation 2. Este avance no habría sido posible sin el trabajo previo, la investigación y el código abierto compartido por los desarrolladores pioneros de la comunidad homebrew, a quienes expreso mi sincero agradecimiento y debido reconocimiento."
        align="center"
      />

      <div className="mx-auto mt-8 sm:mt-10 max-w-4xl">
        <Reveal>
          <div className="rounded-xl border border-border bg-card p-4 sm:p-6 md:p-8 shadow-xs">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="space-y-1">
                <h3 className="text-base font-semibold text-foreground sm:text-lg">
                  Atribución de componentes y autores
                </h3>
                <p className="max-w-xl text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  Consulta el desglose detallado de los desarrolladores, mantenedores, librerías y licencias que hacen posible este entorno.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsExpanded(!isExpanded)}
                aria-expanded={isExpanded}
                className="inline-flex w-full sm:w-auto shrink-0 cursor-pointer items-center justify-center gap-2 rounded-lg border border-border bg-surface px-4 py-2.5 text-xs font-semibold text-foreground transition-colors hover:border-foreground/30 hover:bg-surface/80 active:scale-98"
              >
                <span>{isExpanded ? "Ocultar detalles" : "Ver detalles completos"}</span>
                <ChevronDown
                  className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${
                    isExpanded ? "rotate-180" : "rotate-0"
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>

            {/* Resumen de proyectos base */}
            <div className="mt-6 grid grid-cols-1 gap-3 border-t border-border pt-6 sm:grid-cols-3">
              <div className="rounded-lg border border-border/70 bg-surface p-3.5">
                <div className="flex items-center gap-2 text-foreground">
                  <GitBranch className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <p className="text-xs font-semibold">Open PS2 Loader</p>
                </div>
                <p className="mt-1 text-[0.72rem] leading-normal text-muted-foreground">
                  Núcleo de carga, compatibilidad y módulos I/O (AFL v3.0).
                </p>
              </div>

              <div className="rounded-lg border border-border/70 bg-surface p-3.5">
                <div className="flex items-center gap-2 text-foreground">
                  <Shield className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <p className="text-xs font-semibold">Memory Card Annihilator</p>
                </div>
                <p className="mt-1 text-[0.72rem] leading-normal text-muted-foreground">
                  Rutinas de bajo nivel por ffgriever y colaboradores.
                </p>
              </div>

              <div className="rounded-lg border border-border/70 bg-surface p-3.5">
                <div className="flex items-center gap-2 text-foreground">
                  <Layers className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                  <p className="text-xs font-semibold">ps2dev & Herramientas</p>
                </div>
                <p className="mt-1 text-[0.72rem] leading-normal text-muted-foreground">
                  Toolchain MIPS, wLaunchELF y librerías de soporte.
                </p>
              </div>
            </div>

            {/* Contenido desplegable */}
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out ${
                isExpanded ? "mt-6 grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="space-y-6 border-t border-border pt-6">

                  {/* 1. OPL */}
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-4 w-4 text-foreground" aria-hidden="true" />
                        <h4 className="text-sm font-semibold text-foreground">
                          Open PS2 Loader (OPL)
                        </h4>
                      </div>
                      <a
                        href="https://github.com/ps2homebrew/Open-PS2-Loader"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline"
                      >
                        <span>Repositorio GitHub</span>
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      El subsistema de carga, compatibilidad de títulos, soporte SMB, red y módulos de entrada/salida provienen de Open PS2 Loader bajo licencia <strong className="text-foreground font-medium">Academic Free License v3.0</strong>.
                    </p>

                    <div className="grid gap-3 sm:grid-cols-3">
                      <div className="rounded-lg border border-border bg-surface p-3 text-xs">
                        <p className="font-semibold text-foreground mb-1">Fundadores</p>
                        <p className="text-muted-foreground leading-relaxed">
                          <strong>Ifcaro</strong> (creador original)<br />
                          <strong>jimmikaelkael</strong> (CDVDMAN, SMBMAN)<br />
                          <strong>polo35</strong> (HD Project)
                        </p>
                      </div>
                      <div className="rounded-lg border border-border bg-surface p-3 text-xs">
                        <p className="font-semibold text-foreground mb-1">Desarrolladores principales</p>
                        <p className="text-muted-foreground leading-relaxed">
                          volca · SP193 · Maximus32 · BatRastard · doctorxyz · crazyc · dlanor · reprep · belek666 · misfire · hominem.te.esse · izdubar
                        </p>
                      </div>
                      <div className="rounded-lg border border-border bg-surface p-3 text-xs">
                        <p className="font-semibold text-foreground mb-1">Diseño, QA y CI/CD</p>
                        <p className="text-muted-foreground leading-relaxed">
                          <strong>Berion</strong> (UI design)<br />
                          <strong>fjtrujy</strong> (CI/CD, Docker)<br />
                          RandQalan · yoshi314 · zero35 · LocalH
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* 2. MCA */}
                  <div className="space-y-3 border-t border-border pt-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-foreground" aria-hidden="true" />
                        <h4 className="text-sm font-semibold text-foreground">
                          Memory Card Annihilator (MCA)
                        </h4>
                      </div>
                      <a
                        href="https://github.com/ffgriever-pl/Memory-Card-Annihilator"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground hover:underline"
                      >
                        <span>Repositorio GitHub</span>
                        <ExternalLink className="h-3 w-3" aria-hidden="true" />
                      </a>
                    </div>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Software original desarrollado por <strong className="text-foreground font-medium">ffgriever</strong>, integrado con atribución directa y conservando íntegramente sus licencias de código abierto.
                    </p>

                    <div className="flex flex-wrap gap-2 text-xs">
                      <span className="rounded-md border border-border bg-surface px-2.5 py-1 text-muted-foreground">
                        <strong className="text-foreground font-medium">ffgriever</strong> — Autor original
                      </span>
                      <span className="rounded-md border border-border bg-surface px-2.5 py-1 text-muted-foreground">
                        <strong className="text-foreground font-medium">Berion</strong> — Diseño gráfico
                      </span>
                      <span className="rounded-md border border-border bg-surface px-2.5 py-1 text-muted-foreground">
                        <strong className="text-foreground font-medium">El_isra</strong> — Revisión y compilación PS2DEV v1.0
                      </span>
                      <span className="rounded-md border border-border bg-surface px-2.5 py-1 text-muted-foreground">
                        <strong className="text-foreground font-medium">El_Patas · HWNJ</strong> — Traducción al Español
                      </span>
                    </div>
                  </div>

                  {/* 3. Componentes adicionales */}
                  <div className="space-y-3 border-t border-border pt-6">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-foreground" aria-hidden="true" />
                      <h4 className="text-sm font-semibold text-foreground">
                        Componentes y librerías del ecosistema
                      </h4>
                    </div>
                    <ul className="grid gap-2 text-xs text-muted-foreground sm:grid-cols-2">
                      <li className="rounded-md border border-border bg-surface p-2.5">
                        <strong className="text-foreground font-medium">ps2dev / ps2sdk</strong> — Toolchain de compilación MIPS
                      </li>
                      <li className="rounded-md border border-border bg-surface p-2.5">
                        <strong className="text-foreground font-medium">wLaunchELF</strong> — Referencia en gestión de archivos
                      </li>
                      <li className="rounded-md border border-border bg-surface p-2.5">
                        <strong className="text-foreground font-medium">Eugene Plotnikov</strong> — Módulos SMSUTILS, SMSMAP, SMSTCPIP
                      </li>
                      <li className="rounded-md border border-border bg-surface p-2.5">
                        <strong className="text-foreground font-medium">Marcus R. Brown</strong> — Módulos DEV9 y ATAD
                      </li>
                      <li className="rounded-md border border-border bg-surface p-2.5">
                        <strong className="text-foreground font-medium">icyson55</strong> — OPL-CL y soporte de red
                      </li>
                      <li className="rounded-md border border-border bg-surface p-2.5">
                        <strong className="text-foreground font-medium">wolfSSL</strong> — Librería criptográfica embebida
                      </li>
                    </ul>
                  </div>

                  {/* Botón de cierre inferior */}
                  <div className="pt-2 text-center">
                    <button
                      type="button"
                      onClick={() => setIsExpanded(false)}
                      className="inline-flex cursor-pointer items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <span>Contraer panel</span>
                      <ChevronDown className="h-3.5 w-3.5 rotate-180" aria-hidden="true" />
                    </button>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </Section>
  );
}
