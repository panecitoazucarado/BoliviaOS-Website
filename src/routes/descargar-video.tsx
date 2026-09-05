import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Search,
  Download,
  Video,
  Youtube,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Tv,
  Film,
  Music,
  ShieldCheck,
  Usb,
  ArrowRight,
  RotateCcw,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const pageTitle = "Descargador de Videos YouTube (.MP4) — BoliviaOS para PlayStation 2";
const pageDescription =
  "Descarga videos de YouTube en formato .MP4 directamente a tu computadora con solo colocar el enlace. Listo para transferir a tu pendrive USB (mass0:/) y reproducir en tu PlayStation 2 con BoliviaOS sin errores.";

export const Route = createFileRoute("/descargar-video")({
  component: DescargarVideoPage,
  head: () => ({
    meta: [
      { title: pageTitle },
      { name: "description", content: pageDescription },
      {
        name: "keywords",
        content:
          "descargar videos youtube mp4, youtube downloader ps2, descargar mp4 boliviaos, convertidor youtube boliviaos, descargar musica youtube ps2, playstation 2 video player, mass0 videos ps2",
      },
      { property: "og:title", content: pageTitle },
      { property: "og:description", content: pageDescription },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://boliviaos.site/descargar-video" },
      { property: "og:image", content: "https://boliviaos.site/assets/boliviaos-symbol.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: pageTitle },
      { name: "twitter:description", content: pageDescription },
      { name: "twitter:image", content: "https://boliviaos.site/assets/boliviaos-symbol.png" },
    ],
    links: [{ rel: "canonical", href: "https://boliviaos.site/descargar-video" }],
  }),
});

interface VideoData {
  id: string;
  originalUrl: string;
  title: string;
  author: string;
  authorUrl: string;
  thumbnail: string;
}

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const trimmed = url.trim();

  // 1. Shorts: youtube.com/shorts/ID
  const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/i);
  if (shortsMatch && shortsMatch[1]) return shortsMatch[1];

  // 2. Standard watch: youtube.com/watch?v=ID
  const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/i);
  if (watchMatch && watchMatch[1]) return watchMatch[1];

  // 3. Short URL: youtu.be/ID
  const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/i);
  if (youtuBeMatch && youtuBeMatch[1]) return youtuBeMatch[1];

  // 4. Embed: youtube.com/embed/ID
  const embedMatch = trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/i);
  if (embedMatch && embedMatch[1]) return embedMatch[1];

  // 5. Raw 11 chars
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return trimmed;
  }

  return null;
}

export function DescargarVideoPage() {
  const [inputUrl, setInputUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"video" | "audio">("video");

  const handleProcessUrl = async (urlToProcess?: string) => {
    const target = urlToProcess ?? inputUrl;
    setError(null);

    if (!target.trim()) {
      setError("Por favor ingresa o pega un enlace de YouTube válido.");
      return;
    }

    const videoId = extractYouTubeId(target);
    if (!videoId) {
      setError(
        "No se pudo identificar un enlace de YouTube válido. Asegúrate de que tenga el formato https://www.youtube.com/watch?v=... o https://youtu.be/..."
      );
      return;
    }

    setLoading(true);

    try {
      // Usamos el endpoint oficial de oEmbed de YouTube (CORS libre y sin API keys)
      const cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;
      const oembedEndpoint = `https://www.youtube.com/oembed?url=${encodeURIComponent(cleanUrl)}&format=json`;

      let title = `Video de YouTube (${videoId})`;
      let author = "Canal de YouTube";
      let authorUrl = `https://www.youtube.com/watch?v=${videoId}`;
      let thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

      try {
        const response = await fetch(oembedEndpoint);
        if (response.ok) {
          const json = await response.json();
          if (json.title) title = json.title;
          if (json.author_name) author = json.author_name;
          if (json.author_url) authorUrl = json.author_url;
          if (json.thumbnail_url) thumbnail = json.thumbnail_url;
        }
      } catch (oembedErr) {
        console.warn("oEmbed fetch failed, using direct thumbnail fallback", oembedErr);
        thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
      }

      setVideoData({
        id: videoId,
        originalUrl: cleanUrl,
        title,
        author,
        authorUrl,
        thumbnail,
      });
    } catch (err) {
      setError("Ocurrió un error al procesar el enlace. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (text) {
        setInputUrl(text);
        handleProcessUrl(text);
      }
    } catch (err) {
      const inputEl = document.getElementById("yt-input-field");
      if (inputEl) inputEl.focus();
    }
  };

  const handleCopyTitle = () => {
    if (videoData) {
      navigator.clipboard.writeText(videoData.title);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadServers = videoData
    ? [
        {
          name: "Servidor 1: Cobalt Ultra (Recomendado)",
          desc: "El convertidor de código abierto más rápido, ultra limpio y sin anuncios.",
          badge: "Rápido y Limpio",
          color: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
          url: `https://cobalt.tools/?u=${encodeURIComponent(videoData.originalUrl)}`,
        },
        {
          name: "Servidor 2: SaveFrom Direct",
          desc: "Descarga directa de video MP4 en múltiples resoluciones (360p, 480p, 720p).",
          badge: "Alta Compatibilidad",
          color: "bg-sky-500/10 text-sky-600 border-sky-500/20",
          url: `https://savefrom.net/#url=${encodeURIComponent(videoData.originalUrl)}`,
        },
        {
          name: "Servidor 3: Y2Mate Direct",
          desc: "Selector completo de calidades MP4 y extracción de pista de audio MP3.",
          badge: "Múltiples Calidades",
          color: "bg-amber-500/10 text-amber-600 border-amber-500/20",
          url: `https://www.y2mate.com/youtube/${videoData.id}`,
        },
        {
          name: "Servidor 4: SnapSave HD",
          desc: "Descarga de alta velocidad optimizada para dispositivos y almacenamiento externo.",
          badge: "Mirror Alternativo",
          color: "bg-purple-500/10 text-purple-600 border-purple-500/20",
          url: `https://snapsave.io/es?url=${encodeURIComponent(videoData.originalUrl)}`,
        },
      ]
    : [];

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <Navbar />

      <main className="flex-1 pt-24 pb-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden px-5 py-8 sm:px-8 lg:py-12">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/8 px-3.5 py-1 text-xs font-semibold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Herramienta Oficial Web · BoliviaOS</span>
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              Descargar Videos de YouTube en{" "}
              <span className="bg-gradient-to-r from-crimson via-gold to-primary bg-clip-text text-transparent">
                .MP4
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Coloca el enlace de cualquier video de YouTube y descárgalo directamente en formato{" "}
              <strong className="text-foreground">.MP4</strong> a tu computadora. Pásalo a tu pendrive USB
              para reproducirlo con total fluidez en tu{" "}
              <strong className="text-foreground">Sony PlayStation 2</strong> con BoliviaOS o disfrútalo en tu PC.
            </p>

            {/* Input Box Card */}
            <div className="mt-8 mx-auto max-w-2xl rounded-2xl border border-border bg-card p-3 sm:p-4 shadow-xl ring-1 ring-black/5">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleProcessUrl();
                }}
                className="flex flex-col sm:flex-row items-stretch gap-2.5"
              >
                <div className="relative flex-1">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-muted-foreground">
                    <Youtube className="h-5 w-5 text-crimson" />
                  </div>
                  <input
                    id="yt-input-field"
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Pega el enlace de YouTube aquí (ej: https://www.youtube.com/watch?v=...)"
                    className="w-full rounded-xl border border-border bg-surface/50 pl-10 pr-20 py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary focus:bg-background focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  />
                  <button
                    type="button"
                    onClick={handlePaste}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-surface px-2.5 py-1 text-[0.7rem] font-semibold text-muted-foreground hover:bg-surface-2 hover:text-foreground transition-all"
                  >
                    Pegar
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-xs sm:text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md disabled:opacity-50 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      <span>Procesando...</span>
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      <span>Buscar Video</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick test buttons */}
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[0.72rem] text-muted-foreground">
                <span>¿No tienes un enlace a mano?</span>
                <button
                  type="button"
                  onClick={() => {
                    const testUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
                    setInputUrl(testUrl);
                    handleProcessUrl(testUrl);
                  }}
                  className="font-medium text-primary hover:underline cursor-pointer"
                >
                  Probar con video de demostración
                </button>
              </div>

              {error && (
                <div className="mt-3 flex items-center gap-2 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs text-destructive text-left">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Video Result Section */}
        {videoData && (
          <section className="px-5 py-6 sm:px-8">
            <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-xl ring-1 ring-black/5 animate-in fade-in slide-in-from-bottom-3 duration-300">
              <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Video verificado y listo para descargar</span>
                </div>
                <span className="font-mono text-[0.68rem] text-muted-foreground">
                  ID: {videoData.id}
                </span>
              </div>

              <div className="grid gap-6 md:grid-cols-[0.45fr_0.55fr] md:items-start">
                {/* Thumbnail Preview */}
                <div className="relative overflow-hidden rounded-xl bg-black border border-border/80 aspect-video group">
                  <img
                    src={videoData.thumbnail}
                    alt={videoData.title}
                    className="h-full w-full object-cover select-none transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
                  
                  <div className="absolute top-2.5 left-2.5 rounded-md bg-black/70 px-2 py-0.5 text-[0.65rem] font-bold text-white backdrop-blur-xs flex items-center gap-1">
                    <Film className="h-3 w-3 text-primary" />
                    <span>MP4 Ready</span>
                  </div>

                  <div className="absolute bottom-2.5 right-2.5 rounded-md bg-primary px-2 py-0.5 text-[0.65rem] font-bold text-primary-foreground shadow-xs">
                    Compatible PS2
                  </div>
                </div>

                {/* Details & Actions */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-base sm:text-lg font-bold text-foreground leading-snug">
                      {videoData.title}
                    </h2>

                    <div className="mt-2 flex items-center justify-between gap-2">
                      <a
                        href={videoData.authorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                      >
                        <span>{videoData.author}</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>

                      <button
                        type="button"
                        onClick={handleCopyTitle}
                        className="inline-flex items-center gap-1 text-[0.7rem] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                        title="Copiar título"
                      >
                        {copied ? <Check className="h-3 w-3 text-primary" /> : <Copy className="h-3 w-3" />}
                        <span>{copied ? "Copiado" : "Copiar"}</span>
                      </button>
                    </div>

                    {/* Format Selector Tabs */}
                    <div className="mt-5 flex gap-1.5 rounded-xl bg-surface p-1 border border-border/60">
                      <button
                        type="button"
                        onClick={() => setActiveTab("video")}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          activeTab === "video"
                            ? "bg-card text-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Video className="h-3.5 w-3.5 text-primary" />
                        <span>Video .MP4</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTab("audio")}
                        className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-semibold transition-all cursor-pointer ${
                          activeTab === "audio"
                            ? "bg-card text-foreground shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Music className="h-3.5 w-3.5 text-gold" />
                        <span>Solo Audio .MP3</span>
                      </button>
                    </div>

                    {/* Quality Badges */}
                    <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-3 text-xs">
                      <div className="flex items-center gap-2 font-semibold text-primary text-[0.72rem]">
                        <Tv className="h-3.5 w-3.5" />
                        <span>Perfil sugerido para PlayStation 2:</span>
                      </div>
                      <p className="mt-1 text-[0.7rem] text-muted-foreground leading-relaxed">
                        Selecciona resolución <strong>360p o 480p</strong> para transferencias rápidas a tu USB 1.1 y reproducción óptima en hardware real de PS2.
                      </p>
                    </div>
                  </div>

                  {/* Reset button */}
                  <div className="mt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => {
                        setVideoData(null);
                        setInputUrl("");
                      }}
                      className="inline-flex items-center gap-1.5 text-[0.72rem] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Descargar otro video</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Download Servers List */}
              <div className="mt-7 border-t border-border/80 pt-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Servidores de Descarga en 1 Clic (Sin Fallas)
                  </h3>
                  <span className="text-[0.68rem] text-muted-foreground">
                    Haz clic en cualquier servidor para iniciar
                  </span>
                </div>

                <div className="grid gap-2.5 sm:grid-cols-2">
                  {downloadServers.map((server) => (
                    <a
                      key={server.name}
                      href={server.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col justify-between rounded-xl border border-border/80 bg-surface/40 p-3.5 transition-all duration-200 hover:border-primary/40 hover:bg-surface hover:shadow-md"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <span className="font-semibold text-xs text-foreground group-hover:text-primary transition-colors">
                            {server.name}
                          </span>
                          <span
                            className={`rounded-full border px-2 py-0.5 text-[0.6rem] font-bold ${server.color}`}
                          >
                            {server.badge}
                          </span>
                        </div>
                        <p className="mt-1 text-[0.68rem] text-muted-foreground leading-relaxed">
                          {server.desc}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between border-t border-border/50 pt-2 text-[0.7rem] font-semibold text-primary">
                        <span>Descargar archivo ahora</span>
                        <Download className="h-3.5 w-3.5 transition-transform group-hover:translate-y-0.5" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* How to play on PS2 Guide */}
        <section className="px-5 py-10 sm:px-8">
          <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="text-center max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 px-3 py-0.5 text-xs font-semibold text-gold">
                <Usb className="h-3.5 w-3.5" />
                <span>Guía Paso a Paso</span>
              </div>
              <h2 className="mt-2 text-xl font-bold sm:text-2xl text-foreground">
                ¿Cómo ver tu video en la consola PlayStation 2?
              </h2>
              <p className="mt-1.5 text-xs text-muted-foreground sm:text-sm">
                Sigue estos 3 sencillos pasos para disfrutar tus videos favoritos directamente en tu PS2.
              </p>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl border border-border/80 bg-surface/50 p-4">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-xs font-bold text-primary-foreground">
                  1
                </div>
                <h3 className="mt-3 text-xs sm:text-sm font-bold text-foreground">
                  Descarga en .MP4
                </h3>
                <p className="mt-1.5 text-[0.72rem] text-muted-foreground leading-relaxed">
                  Pega el enlace en esta herramienta y descarga el archivo en resolución 360p o 480p a tu computadora.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface/50 p-4">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-xs font-bold text-gold-foreground">
                  2
                </div>
                <h3 className="mt-3 text-xs sm:text-sm font-bold text-foreground">
                  Cópialo al USB (FAT32)
                </h3>
                <p className="mt-1.5 text-[0.72rem] text-muted-foreground leading-relaxed">
                  Inserta tu pendrive USB formateado en FAT32 y copia el archivo .mp4 en la raíz o en una carpeta de videos.
                </p>
              </div>

              <div className="rounded-xl border border-border/80 bg-surface/50 p-4">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-crimson text-xs font-bold text-white">
                  3
                </div>
                <h3 className="mt-3 text-xs sm:text-sm font-bold text-foreground">
                  Abre BoliviaOS en tu PS2
                </h3>
                <p className="mt-1.5 text-[0.72rem] text-muted-foreground leading-relaxed">
                  Conecta el USB a la PS2, inicia BoliviaOS, entra al Explorador de Archivos, abre <strong>mass0:/</strong> y presiona <strong>X</strong> sobre tu video.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-surface/30 p-3.5 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>Compatible con todos los modelos de PS2 (Fat y Slim) vía USB, HDD interno o MX4SIO.</span>
              </div>

              <a
                href="/#tools"
                className="inline-flex items-center gap-1 font-semibold text-primary hover:underline"
              >
                <span>Ver características de BoliviaOS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
