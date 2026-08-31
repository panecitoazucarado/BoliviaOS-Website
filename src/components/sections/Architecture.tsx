import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { modules } from "@/data/site";
import { Cpu, Layers, Network, HardDrive } from "lucide-react";

const architectureLayers = [
  {
    title: "Emotion Engine (EE — MIPS R5900 @ 294.9 MHz)",
    desc: "Capa de aplicación e interfaz. La interfaz visual, el explorador de archivos, los reproductores de audio, los editores y la terminal se ejecutan en el EE, compilados de forma monolítica para optimizar el uso de los 32 MB de RAM.",
    icon: Cpu,
    tag: "32 MB RDRAM / .bss",
  },
  {
    title: "Sub-system Interface (Bus SIF)",
    desc: "Canal bidireccional DMA de alta velocidad que enlaza el Emotion Engine con el IOP para el intercambio de llamadas a procedimientos remotos (RPC), sincronización de audio y transferencia de búferes.",
    icon: Network,
    tag: "SIF0 / SIF1 / SIF2",
  },
  {
    title: "I/O Processor (IOP — MIPS R3000A @ 36.8 MHz)",
    desc: "Capa de controladores y acceso a hardware. Gestiona los módulos IRX dedicados para almacenamiento en disco duro interno (ATA), memorias USB (BDM), red local Ethernet (SMB) y tarjetas de memoria.",
    icon: HardDrive,
    tag: "2 MB SRAM / Drivers IRX",
  },
  {
    title: "Graphics Synthesizer (GS @ 147.5 MHz)",
    desc: "Subsistema de renderizado visual 2D y 3D con 4 MB de eDRAM de alta velocidad (2.4 GB/s). Soporta resoluciones de video analógicas estándar y modos de salida ajustables mediante GSM.",
    icon: Layers,
    tag: "4 MB eDRAM / GSM",
  },
];

export function Architecture() {
  return (
    <Section id="architecture" className="bg-surface">
      <SectionHeading
        eyebrow="Estructura técnica"
        title="Arquitectura del software"
        intro="BoliviaOS distribuye sus tareas entre los procesadores de la consola, separando la lógica de usuario y renderizado en el Emotion Engine de los controladores de hardware en el IOP."
        align="center"
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {architectureLayers.map((layer, i) => (
          <Reveal key={layer.title} delay={i * 70}>
            <div className="card-soft card-lift flex flex-col justify-between h-full p-6">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10">
                    <layer.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-border bg-surface px-3 py-1 font-mono text-[0.68rem] text-primary">
                    {layer.tag}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-foreground">{layer.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{layer.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={120}>
        <div className="mt-14 flex flex-col items-center">
          <div
            className="rounded-full px-7 py-3 text-sm font-bold tracking-wide text-primary-foreground shadow-lg"
            style={{ background: "var(--gradient-brand)" }}
          >
            Módulos integrados en BoliviaOS.ELF
          </div>
          <div className="h-8 w-px bg-border" aria-hidden="true" />
          <ul className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {modules.map((m, i) => (
              <li key={m}>
                <Reveal delay={i * 40}>
                  <div className="card-soft card-lift px-4 py-3 text-center text-xs font-semibold text-foreground">
                    {m}
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
