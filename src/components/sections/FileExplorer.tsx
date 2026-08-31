import { Folder, FileText, HardDrive, Usb, ShieldCheck, Zap, RefreshCw, Cpu } from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";

const devices = [
  { name: "mc0:/", desc: "Memory Card ranura 1 (8 MB - 128 MB)", icon: HardDrive },
  { name: "mc1:/", desc: "Memory Card ranura 2 (8 MB - 128 MB)", icon: HardDrive },
  { name: "mass0:/", desc: "Almacenamiento USB (FAT32 / exFAT BDM)", icon: Usb },
  { name: "hdd0:/", desc: "Disco duro interno (APA / PFS)", icon: HardDrive },
  { name: "host:/", desc: "Enlace de red con PC (ps2link / FIO)", icon: Cpu },
  { name: "cdfs:/", desc: "Unidad óptica de CD/DVD", icon: HardDrive },
];

const entries = [
  { name: "APPS", type: "dir", size: "<DIR>" },
  { name: "ART", type: "dir", size: "<DIR>" },
  { name: "CD", type: "dir", size: "<DIR>" },
  { name: "DVD", type: "dir", size: "<DIR>" },
  { name: "VMC", type: "dir", size: "<DIR>" },
  { name: "BoliviaOS.ELF", type: "file", size: "5.7 MB" },
  { name: "conf_opl.cfg", type: "file", size: "256 B" },
  { name: "system.cnf", type: "file", size: "128 B" },
];

const features = [
  {
    title: "Compatibilidad con todas las unidades",
    desc: "Lectura y navegación en Memory Cards (mc0:, mc1:), almacenamiento USB (mass0:), disco duro interno (hdd0:), conexión de red con PC (host:) y unidad óptica (cdfs:).",
    icon: ShieldCheck,
  },
  {
    title: "Operaciones de archivo seguras",
    desc: "Copiado, corte, pegado, renombrado y eliminación. En operaciones de movimiento, el archivo origen solo se retira tras verificar que la copia de destino se completó íntegramente.",
    icon: Zap,
  },
  {
    title: "Búferes de transferencia optimizados",
    desc: "Uso de búferes alineados en memoria adaptados al tipo de dispositivo: 1 MB para disco interno, 384 KB para red y 128 KB para USB y tarjetas de memoria.",
    icon: RefreshCw,
  },
  {
    title: "Mantenimiento de tarjetas (MCA)",
    desc: "Integración de funciones de Memory Card Annihilator para formatear unidades desde 8 MB hasta 128 MB y reparar sectores defectuosos.",
    icon: Cpu,
  },
];

export function FileExplorerSection() {
  return (
    <Section id="file-explorer" className="bg-surface">
      <SectionHeading
        eyebrow="Gestión de almacenamiento"
        title="Explorador de archivos integrado"
        intro="Permite examinar directorios, transferir datos y administrar el contenido de las distintas unidades conectadas a la PlayStation 2 de forma segura."
      />

      <div className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
        <Reveal>
          {/* Real BoliviaOS File Explorer — captured running on PS2 hardware via PCSX2 */}
          <div className="card-soft overflow-hidden" aria-hidden="true">
            {/* Title bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border bg-card px-3.5 py-2.5 sm:px-4 sm:py-3">
              <span className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <span className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-crimson/70" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-gold/80" />
                  <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-primary/70" />
                </span>
                <span className="truncate">BoliviaOS — Explorador de Archivos</span>
              </span>
              <span className="font-mono text-[0.62rem] sm:text-[0.68rem] text-primary">MODEL SCPH-90006</span>
            </div>

            {/* Real PS2 screenshot */}
            <div className="relative bg-black">
              <img
                src="/images/file-explorer.png"
                alt="Captura real del Explorador de Archivos de BoliviaOS corriendo en PlayStation 2"
                width={2178}
                height={1620}
                className="w-full h-auto object-contain select-none"
                loading="lazy"
              />
              {/* Subtle CRT scanline overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.8) 1px, rgba(0,0,0,0.8) 2px)",
                  backgroundSize: "100% 2px",
                }}
              />
            </div>

            {/* Status bar */}
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-border bg-card px-3.5 py-2 sm:px-4 sm:py-2.5 text-[0.63rem] sm:text-[0.67rem] font-medium text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary/80" />
                Captura real en PlayStation 2
              </span>
              <span>8 unidades detectadas</span>
              <span className="font-mono text-[0.6rem] sm:text-[0.63rem] text-primary/70">BoliviaOS r1.0</span>
            </div>
          </div>
        </Reveal>


        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 60}>
              <div className="card-soft card-lift p-4 flex gap-3.5 items-start">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10">
                  <f.icon className="h-4 w-4 text-primary" aria-hidden="true" />
                </span>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{f.title}</h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
