import { useState } from "react";
import {
  Pencil,
  Code2,
  Files,
  Music,
  Terminal,
  Disc,
  Activity,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Video,
  Youtube,
  Search,
  Download,
  AlertCircle,
  Film,
  type LucideIcon,
} from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";
import { toolCategories } from "@/data/site";

const icons: Record<string, LucideIcon> = {
  pencil: Pencil,
  code: Code2,
  files: Files,
  media: Music,
  terminal: Terminal,
  disc: Disc,
  activity: Activity,
  video: Video,
};

interface ScreenshotSlide {
  src: string;
  width: number;
  height: number;
  alt: string;
  label: string;
}

// Screenshot hero card — supports single or multiple slides (Instagram Story style)
function ScreenshotHeroCard({
  tool,
  groupIdx,
  itemIdx,
  Icon,
  imageSrc,
  imageWidth,
  imageHeight,
  imageAlt,
  chromeLabel,
  slides,
  bullets,
  credits,
}: {
  tool: { title: string; description: string; status: string };
  groupIdx: number;
  itemIdx: number;
  Icon: LucideIcon;
  imageSrc?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  chromeLabel?: string;
  slides?: ScreenshotSlide[];
  bullets: string[];
  credits?: {
    author: string;
    repoUrl: string;
    description: string;
  };
}) {
  const [activeSlide, setActiveSlide] = useState(0);

  const hasSlides = Boolean(slides && slides.length > 0);
  const currentSlide = hasSlides ? slides![activeSlide]! : null;

  const displaySrc = currentSlide ? currentSlide.src : imageSrc!;
  const displayWidth = currentSlide ? currentSlide.width : imageWidth!;
  const displayHeight = currentSlide ? currentSlide.height : imageHeight!;
  const displayAlt = currentSlide ? currentSlide.alt : imageAlt!;
  const displayChrome = chromeLabel ?? (currentSlide ? currentSlide.label : "BoliviaOS");

  return (
    <Reveal
      delay={groupIdx * 60 + itemIdx * 40}
      className="sm:col-span-2 lg:col-span-3"
    >
      <article className="card-soft card-lift overflow-hidden bg-card">
        <div className="grid gap-0 lg:grid-cols-[0.55fr_0.45fr] lg:items-stretch">
          {/* Left — info */}
          <div className="flex flex-col justify-between p-4 sm:p-6">
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="shrink-0 rounded-full border border-primary/25 bg-primary/8 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-primary">
                  {tool.status}
                </span>
              </div>
              <h4 className="mt-3.5 text-sm sm:text-base font-bold text-foreground">{tool.title}</h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {tool.description}
              </p>

              {/* Feature bullets */}
              <ul className="mt-3.5 space-y-1.5">
                {bullets.map((feat) => (
                  <li
                    key={feat}
                    className="flex items-start gap-2 text-[0.72rem] text-muted-foreground"
                  >
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* Author Credits Box (e.g. Memory Card Annihilator by ffgriever) */}
              {credits && (
                <div className="mt-4 rounded-xl border border-gold/30 bg-gold/5 p-3 sm:p-3.5 text-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-gold text-[0.72rem]">
                    <span>Atribución y autoría original</span>
                  </div>
                  <p className="mt-1 text-[0.68rem] text-muted-foreground leading-relaxed">
                    {credits.description}
                  </p>
                  <a
                    href={credits.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 font-mono text-[0.65rem] font-semibold text-gold hover:underline"
                  >
                    <span className="truncate max-w-[240px] sm:max-w-none">{credits.repoUrl.replace("https://", "")}</span>
                    <ExternalLink className="h-2.5 w-2.5 shrink-0" />
                  </a>
                </div>
              )}
            </div>

            <p className="mt-4 font-mono text-[0.62rem] text-primary/60">
              MODEL SCPH-90006 · BoliviaOS r1.0
            </p>
          </div>

          {/* Right — real PS2 screenshot with Story-style switching if multiple slides */}
          <div className="relative overflow-hidden bg-black lg:border-l lg:border-border flex flex-col">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2 shrink-0">
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-crimson/70" />
                <span className="h-2 w-2 rounded-full bg-gold/80" />
                <span className="h-2 w-2 rounded-full bg-primary/70" />
              </span>
              <span className="font-mono text-[0.6rem] text-white/40 truncate max-w-[140px] sm:max-w-none">{displayChrome}</span>
              <span className="font-mono text-[0.6rem] text-primary/60">NTSC · 60fps</span>
            </div>

            {/* Viewport container */}
            <div className="relative flex-1 flex items-center justify-center bg-black group min-h-[180px]">
              {/* Instagram Story-style progress segments */}
              {hasSlides && (
                <div className="absolute top-2 left-3 right-3 z-30 flex items-center gap-1.5 pointer-events-auto">
                  {slides!.map((s, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveSlide(idx)}
                      className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                        idx === activeSlide
                          ? "bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
                          : "bg-white/25 hover:bg-white/60"
                      }`}
                      aria-label={`Ver captura ${idx + 1}: ${s.label}`}
                    />
                  ))}
                </div>
              )}

              {/* Screenshot Image */}
              <picture key={displaySrc}>
                <source srcSet={displaySrc.replace(/\.png$/, ".webp")} type="image/webp" />
                <img
                  src={displaySrc}
                  alt={displayAlt}
                  width={displayWidth}
                  height={displayHeight}
                  className="w-full h-auto object-contain select-none transition-opacity duration-300"
                  loading="lazy"
                  decoding="async"
                />
              </picture>

              {/* Navigation Chevrons for multi-slide */}
              {hasSlides && (
                <>
                  <button
                    onClick={() =>
                      setActiveSlide((prev) => (prev > 0 ? prev - 1 : slides!.length - 1))
                    }
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-30 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-black/60 hover:bg-black/90 text-white/90 border border-white/15 transition-all opacity-85 hover:opacity-100 backdrop-blur-sm active:scale-95"
                    aria-label="Captura anterior"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      setActiveSlide((prev) => (prev < slides!.length - 1 ? prev + 1 : 0))
                    }
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-30 grid h-8 w-8 sm:h-9 sm:w-9 place-items-center rounded-full bg-black/60 hover:bg-black/90 text-white/90 border border-white/15 transition-all opacity-85 hover:opacity-100 backdrop-blur-sm active:scale-95"
                    aria-label="Siguiente captura"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>

                  {/* Story badge indicator */}
                  <div className="absolute bottom-2.5 left-2.5 z-30 flex items-center gap-1.5 sm:gap-2 rounded-full bg-black/70 backdrop-blur-md px-2.5 py-1 text-[0.6rem] sm:text-[0.65rem] text-white/90 border border-white/10 select-none max-w-[calc(100%-1.5rem)] truncate">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse shrink-0" />
                    <span className="font-medium truncate">{currentSlide!.label}</span>
                    <span className="text-white/40 shrink-0">
                      ({activeSlide + 1}/{slides!.length})
                    </span>
                  </div>
                </>
              )}

              {/* CRT scanline overlay */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(0,0,0,0.9) 1px, rgba(0,0,0,0.9) 2px)",
                  backgroundSize: "100% 2px",
                }}
              />
              {/* Corner glow */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  background:
                    "radial-gradient(ellipse at 50% 0%, color-mix(in oklab, var(--primary) 30%, transparent), transparent 60%)",
                }}
              />
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

// YouTube Downloader interactive hero card
function YouTubeDownloaderHeroCard({
  tool,
  groupIdx,
  itemIdx,
  Icon,
}: {
  tool: { title: string; description: string; status: string; href?: string };
  groupIdx: number;
  itemIdx: number;
  Icon: LucideIcon;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [video, setVideo] = useState<{
    id: string;
    title: string;
    author: string;
    thumbnail: string;
    originalUrl: string;
  } | null>(null);

  const processUrl = async (inputUrl?: string) => {
    const target = (inputUrl ?? url).trim();
    setError(null);
    if (!target) {
      setError("Pega un enlace de YouTube válido.");
      return;
    }

    const shortsMatch = target.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i);
    const watchMatch = target.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
    const youtuBeMatch = target.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
    const embedMatch = target.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
    const id =
      shortsMatch?.[1] ||
      watchMatch?.[1] ||
      youtuBeMatch?.[1] ||
      embedMatch?.[1] ||
      (/^[a-zA-Z0-9_-]{11}$/.test(target) ? target : null);

    if (!id) {
      setError("No se reconoció un enlace de YouTube válido.");
      return;
    }

    setLoading(true);
    try {
      const cleanUrl = `https://www.youtube.com/watch?v=${id}`;
      let title = `Video de YouTube (${id})`;
      let author = "YouTube";
      let thumbnail = `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

      try {
        const res = await fetch(`https://www.youtube.com/oembed?url=${encodeURIComponent(cleanUrl)}&format=json`);
        if (res.ok) {
          const data = await res.json();
          if (data.title) title = data.title;
          if (data.author_name) author = data.author_name;
          if (data.thumbnail_url) thumbnail = data.thumbnail_url;
        }
      } catch (_) {}

      setVideo({ id, title, author, thumbnail, originalUrl: cleanUrl });
    } catch (_) {
      setError("Error al procesar el enlace.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setUrl(text);
        processUrl(text);
      }
    } catch (_) {
      const el = document.getElementById("tools-yt-input");
      if (el) el.focus();
    }
  };

  return (
    <Reveal delay={groupIdx * 60 + itemIdx * 40} className="sm:col-span-2 lg:col-span-3">
      <article className="card-soft card-lift overflow-hidden bg-card border-primary/40 ring-1 ring-primary/20 shadow-md">
        <div className="grid gap-0 lg:grid-cols-[0.55fr_0.45fr] lg:items-stretch">
          {/* Left info & input */}
          <div className="flex flex-col justify-between p-4 sm:p-6">
            <div>
              <div className="flex items-start justify-between gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                </span>
                <span className="shrink-0 rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-primary">
                  Web App · 100% Funcional
                </span>
              </div>

              <h4 className="mt-3.5 text-sm sm:text-base font-bold text-foreground">
                {tool.title}
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                {tool.description}
              </p>

              {/* Interactive Input Form */}
              <div className="mt-4 rounded-xl border border-border bg-surface/60 p-2.5 sm:p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    processUrl();
                  }}
                  className="flex gap-2"
                >
                  <div className="relative flex-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-muted-foreground">
                      <Youtube className="h-4 w-4 text-crimson" />
                    </div>
                    <input
                      id="tools-yt-input"
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="Pega el enlace de YouTube aquí..."
                      className="w-full rounded-lg border border-border bg-background pl-8 pr-14 py-2 text-xs text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                    <button
                      type="button"
                      onClick={handlePaste}
                      className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded bg-surface-2 px-2 py-0.5 text-[0.65rem] font-semibold text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      Pegar
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex shrink-0 items-center justify-center gap-1.5 rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-50 cursor-pointer"
                  >
                    {loading ? (
                      <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    ) : (
                      <Search className="h-3.5 w-3.5" />
                    )}
                    <span>Buscar</span>
                  </button>
                </form>

                {error && (
                  <p className="mt-2 text-[0.7rem] text-destructive flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    <span>{error}</span>
                  </p>
                )}

                <div className="mt-2 flex items-center justify-between text-[0.68rem] text-muted-foreground">
                  <button
                    type="button"
                    onClick={() => {
                      const test = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                      setUrl(test);
                      processUrl(test);
                    }}
                    className="text-primary hover:underline cursor-pointer"
                  >
                    Probar video demo
                  </button>
                  <a
                    href="/descargar-video"
                    className="font-semibold text-primary hover:underline inline-flex items-center gap-1"
                  >
                    <span>Pantalla completa</span>
                    <ExternalLink className="h-2.5 w-2.5" />
                  </a>
                </div>
              </div>

              {/* Feature bullets */}
              <ul className="mt-3.5 space-y-1.5">
                {[
                  "Descarga de videos en formato .MP4 optimizado para pendrive USB (mass0:/)",
                  "Resoluciones mod-16 recomendadas para PlayStation 2 (360p y 480p)",
                  "Extracción de pista de audio estéreo en formato MP3 para el reproductor de BoliviaOS",
                  "Múltiples servidores de descarga integrados para garantizar 100% de disponibilidad",
                ].map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-[0.72rem] text-muted-foreground">
                    <span className="mt-0.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-4 font-mono text-[0.62rem] text-primary/60">
              BOLIVIAOS WEB COMPANION · YOUTUBE MP4 ENGINE
            </p>
          </div>

          {/* Right — live preview or demo state */}
          <div className="relative overflow-hidden bg-black lg:border-l lg:border-border flex flex-col justify-between">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-3 py-2 shrink-0">
              <span className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-crimson/70" />
                <span className="h-2 w-2 rounded-full bg-gold/80" />
                <span className="h-2 w-2 rounded-full bg-primary/70" />
              </span>
              <span className="font-mono text-[0.6rem] text-white/40 truncate">
                {video ? video.title : "Descargador YouTube MP4 — BoliviaOS"}
              </span>
              <span className="font-mono text-[0.6rem] text-primary/60">MP4 · USB Ready</span>
            </div>

            {/* Viewport / Results */}
            <div className="relative flex-1 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-black via-zinc-950 to-black text-center min-h-[220px]">
              {video ? (
                <div className="w-full space-y-3 animate-in fade-in duration-200">
                  <div className="relative mx-auto aspect-video max-w-[280px] overflow-hidden rounded-lg border border-white/15 shadow-lg">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-1.5 right-1.5 rounded bg-primary px-1.5 py-0.5 text-[0.6rem] font-bold text-primary-foreground">
                      Compatible PS2
                    </div>
                  </div>

                  <h5 className="text-xs font-bold text-white line-clamp-1 px-2">
                    {video.title}
                  </h5>

                  <div className="grid grid-cols-2 gap-1.5 max-w-[320px] mx-auto pt-1">
                    <a
                      href={`https://cobalt.tools/?u=${encodeURIComponent(video.originalUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-lg bg-primary px-2.5 py-1.5 text-[0.68rem] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                      <Download className="h-3 w-3" />
                      <span>Cobalt Ultra</span>
                    </a>
                    <a
                      href={`https://savefrom.net/#url=${encodeURIComponent(video.originalUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-[0.68rem] font-semibold text-white hover:bg-white/20 transition-colors border border-white/15"
                    >
                      <Download className="h-3 w-3" />
                      <span>SaveFrom</span>
                    </a>
                    <a
                      href={`https://www.y2mate.com/youtube/${video.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-[0.68rem] font-semibold text-white hover:bg-white/20 transition-colors border border-white/15"
                    >
                      <Download className="h-3 w-3" />
                      <span>Y2Mate</span>
                    </a>
                    <a
                      href={`https://snapsave.io/es?url=${encodeURIComponent(video.originalUrl)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1 rounded-lg bg-white/10 px-2.5 py-1.5 text-[0.68rem] font-semibold text-white hover:bg-white/20 transition-colors border border-white/15"
                    >
                      <Download className="h-3 w-3" />
                      <span>SnapSave</span>
                    </a>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 py-4">
                  <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary border border-primary/20">
                    <Film className="h-6 w-6" />
                  </div>
                  <h5 className="text-xs font-semibold text-white">
                    Pega un enlace para descargar en 1 Clic
                  </h5>
                  <p className="text-[0.68rem] text-white/50 max-w-[240px] mx-auto">
                    Obtén el archivo .mp4 listo para copiar a tu memoria USB y reproducir con BoliviaOS en tu consola PS2.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function Tools() {
  return (
    <Section id="tools">
      <SectionHeading
        eyebrow="Módulos y utilidades"
        title="Herramientas del sistema"
        intro="BoliviaOS incorpora un conjunto de utilidades diseñadas para trabajar directamente sobre el hardware y el sistema de archivos de la PlayStation 2."
      />

      <div className="mt-12 space-y-10">
        {toolCategories.map((group, groupIdx) => (
          <div key={group.category}>
            {/* Category header */}
            <div className="flex items-center gap-3 border-b border-border pb-3">
              <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-foreground">
                {group.category}
              </h3>
              <span className="text-xs text-muted-foreground">— {group.description}</span>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {group.items.map((tool, itemIdx) => {
                const Icon = icons[tool.icon] ?? Files;
                const isDev = tool.status === "En desarrollo";

                // Game launcher — wide hero card with real PS2 screenshot
                if (tool.title === "Lanzador de juegos") {
                  return (
                    <ScreenshotHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                      imageSrc="/images/lanzador-juegos.png"
                      imageWidth={2170}
                      imageHeight={1628}
                      imageAlt="Captura real del Lanzador de Juegos de BoliviaOS corriendo en PlayStation 2"
                      chromeLabel="Lanzador de Juegos — BoliviaOS"
                      bullets={[
                        "Carga de títulos PS2 y PS1 desde HDD interno, USB (FAT32/exFAT), SMB y MX4SIO",
                        "Núcleo de compatibilidad OPL optimizado con soporte de modos 1 al 6",
                        "Selector de resolución de video GSM con salida hasta 1080p",
                        "Soporte de mandos inalámbricos Bluetooth con PADEMU (DualShock 3 y DualShock 4)",
                      ]}
                    />
                  );
                }

                // YouTube Downloader — wide interactive hero card
                if (tool.title === "Descargador de Videos YouTube (.MP4)") {
                  return (
                    <YouTubeDownloaderHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                    />
                  );
                }

                // MP3 player — wide hero card with real PS2 screenshot
                if (tool.title === "Reproductor MP3 y OGG") {
                  return (
                    <ScreenshotHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                      imageSrc="/images/reproductor-mp3.png"
                      imageWidth={2106}
                      imageHeight={1576}
                      imageAlt="Captura real del Reproductor de Música de BoliviaOS corriendo en PlayStation 2"
                      chromeLabel="Reproductor MP3 — BoliviaOS"
                      bullets={[
                        "Decodificación MP3 y OGG Vorbis en hardware PS2",
                        "Lectura de metadatos ID3v1 / ID3v2 y carátula embebida",
                        "Visualizador de espectro de audio en tiempo real",
                        "Controles de volumen, seek y repetición de playlist",
                      ]}
                    />
                  );
                }

                // Image viewer — wide hero card with real PS2 screenshot
                if (tool.title === "Visor de imágenes") {
                  return (
                    <ScreenshotHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                      imageSrc="/images/visor-imagenes.png"
                      imageWidth={3024}
                      imageHeight={1964}
                      imageAlt="Captura real del Visor de Imágenes PNG de BoliviaOS corriendo en PlayStation 2"
                      chromeLabel="Visor de Imágenes — BoliviaOS"
                      bullets={[
                        "Decodificación JPEG mediante la IPU del Emotion Engine con corrección de relación de aspecto para NTSC y PAL",
                        "Visor PNG avanzado con zoom digital hasta 6x con interpolación suave, paneo por D-pad y reset de vista con L3",
                        "Cuadrícula compositiva configurable con 8 presets, 10 colores y ajuste automático de contraste por luminancia de la imagen",
                        "Panel de metadatos PNG con dimensiones, profundidad de bits, tipo de color, ratio de compresión y estadísticas de transparencia",
                      ]}
                    />
                  );
                }

                // Text editor — wide hero card with real PS2 screenshot
                if (tool.title === "Editor de texto plano") {
                  return (
                    <ScreenshotHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                      imageSrc="/images/editor-texto.png"
                      imageWidth={2170}
                      imageHeight={1636}
                      imageAlt="Captura real del Editor de Texto de BoliviaOS corriendo en PlayStation 2"
                      chromeLabel="Editor de Texto — BoliviaOS"
                      bullets={[
                        "Edición directa de archivos .cfg, .cnf y .txt en PS2",
                        "Cursor UTF-8 con navegación por flechas y WASD",
                        "Soporte de indentación (Tab = 4 espacios)",
                        "Diálogo de guardado al salir con cambios pendientes",
                      ]}
                    />
                  );
                }

                // JavaScript code editor — wide hero card with real PS2 screenshot
                if (tool.title === "Editor de scripts JavaScript") {
                  return (
                    <ScreenshotHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                      imageSrc="/images/editor-javascript.png"
                      imageWidth={2176}
                      imageHeight={1630}
                      imageAlt="Captura real del Editor de Código JavaScript de BoliviaOS corriendo en PlayStation 2"
                      chromeLabel="Editor JavaScript — BoliviaOS"
                      bullets={[
                        "Resaltado de sintaxis JS en tiempo real (palabras clave, cadenas, comentarios y plantillas)",
                        "Columna lateral con numeración de líneas y desplazamiento horizontal para líneas extensas",
                        "Selección de bloques de código con menú contextual para copiar, cortar y pegar texto",
                        "Carga y guardado directo de archivos .js en unidades USB, HDD interno o Memory Card",
                      ]}
                    />
                  );
                }

                // Font viewer — wide hero card with real PS2 screenshot
                if (tool.title === "Visor de fuentes TTF") {
                  return (
                    <ScreenshotHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                      imageSrc="/images/visor-fuentes.png"
                      imageWidth={2166}
                      imageHeight={1624}
                      imageAlt="Captura real del Visor de Fuentes TTF de BoliviaOS corriendo en PlayStation 2"
                      chromeLabel="Visor de Fuentes TTF — BoliviaOS"
                      bullets={[
                        "Cuatro pestañas: pangramas y kerning, mapa de caracteres, escala de 16 a 64 px y metadatos técnicos del archivo TTF",
                        "Renderiza cinco tamaños simultáneamente (16, 24, 36, 48 y 64 px) mediante FreeType con detección de cobertura Unicode real",
                        "Parser binario propio de tablas TTF: nombre de familia, estilo, número de glifos, UPM, ascendente, descendente y rangos Unicode",
                        "Scroll 2D bidireccional con física de inercia y rebote elástico, y control de seguridad de memoria RAM para fuentes mayores a 1.5 MB",
                      ]}
                    />
                  );
                }

                // SuperTerminal CLI — wide hero card with real PS2 screenshot
                if (tool.title === "Terminal (SuperTerminal)") {
                  return (
                    <ScreenshotHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                      imageSrc="/images/terminal-comandos.png"
                      imageWidth={2194}
                      imageHeight={1634}
                      imageAlt="Captura real de la Terminal de Comandos (SuperTerminal) de BoliviaOS corriendo en PlayStation 2"
                      chromeLabel="SuperTerminal CLI — BoliviaOS"
                      bullets={[
                        "Gestión de almacenamiento: cd, ls, dir, pwd, tree, find, stat, cp, mv, rm, df, mkdir, touch",
                        "Visores y ejecución: open <archivo>, play <audio.mp3>, view <img/pdf>, edit <txt/js>, launch <elf>",
                        "Diagnóstico de hardware y red: sysinfo, meminfo, ifconfig, netstat, ping <host>, uname, date",
                        "Entorno y utilidades: animation donut (3D ASCII 60 FPS), history, echo, clear, help, whoami, user",
                      ]}
                    />
                  );
                }

                // Memory Card Annihilator (MCA) — Story-style multi-slide hero card with full author attribution
                if (tool.title === "Memory Card Annihilator (MCA)") {
                  return (
                    <ScreenshotHeroCard
                      key={tool.title}
                      tool={tool}
                      groupIdx={groupIdx}
                      itemIdx={itemIdx}
                      Icon={Icon}
                      chromeLabel="Memory Card Annihilator v2.0 — ffgriever"
                      slides={[
                        {
                          src: "/images/mca-annihilator-1.png",
                          width: 2166,
                          height: 1630,
                          alt: "Pantalla principal de selección de Memory Card en Memory Card Annihilator",
                          label: "Menú Principal y Selección de Ranura",
                        },
                        {
                          src: "/images/mca-annihilator-2.png",
                          width: 2174,
                          height: 1630,
                          alt: "Opciones de Formateo, Desformateo y Volcado en Memory Card Annihilator",
                          label: "Opciones de Formateo y Reparación",
                        },
                      ]}
                      bullets={[
                        "Formateo físico a bajo nivel respetando la geometría de bloques de la tarjeta",
                        "Desformateo (Unformat) y recuperación de datos en tarjetas dañadas",
                        "Volcado raw (Dump) y restauración de imágenes completas hacia USB",
                        "Soporte integral para tarjetas oficiales de 8 MB y tarjetas clonadas de hasta 128 MB",
                      ]}
                      credits={{
                        author: "ffgriever (ffgriever-pl)",
                        repoUrl: "https://github.com/ffgriever-pl/Memory-Card-Annihilator",
                        description:
                          "Esta herramienta no ha sido desarrollada por el autor de BoliviaOS. Es una integración directa del proyecto de código abierto original Memory Card Annihilator (creado por ffgriever), ampliamente considerado el mejor y más seguro software de la escena PS2 para formatear y reparar Memory Cards.",
                      }}
                    />
                  );
                }

                // All other tools — standard compact card
                const hasLink = Boolean((tool as any).href);
                return (
                  <Reveal key={tool.title} delay={groupIdx * 60 + itemIdx * 40}>
                    <article
                      className={`card-soft card-lift flex flex-col justify-between h-full p-5 ${
                        isDev
                          ? "border-dashed border-border/80 bg-surface/40"
                          : hasLink
                          ? "border-primary/40 bg-card ring-1 ring-primary/15 shadow-sm"
                          : "bg-card"
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <span
                            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl ${
                              isDev
                                ? "bg-gold/15 text-gold"
                                : hasLink
                                ? "bg-primary/15 text-primary"
                                : "bg-primary/10 text-primary"
                            }`}
                          >
                            <Icon className="h-4.5 w-4.5" aria-hidden="true" />
                          </span>
                          <span
                            className={`shrink-0 rounded-full px-2.5 py-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.12em] ${
                              isDev
                                ? "border border-gold/30 bg-gold/10 text-gold"
                                : "border border-primary/25 bg-primary/8 text-primary"
                            }`}
                          >
                            {tool.status}
                          </span>
                        </div>
                        <h4 className="mt-4 text-sm font-bold text-foreground">{tool.title}</h4>
                        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                          {tool.description}
                        </p>
                      </div>

                      {hasLink && (
                        <div className="mt-4 pt-3 border-t border-border/60">
                          <a
                            href={(tool as any).href}
                            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-xs"
                          >
                            <span>Abrir herramienta web</span>
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
