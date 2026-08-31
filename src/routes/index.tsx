import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Hero } from "@/components/sections/Hero";
import { FileExplorerSection } from "@/components/sections/FileExplorer";
import { Tools } from "@/components/sections/Tools";
import { DualShock } from "@/components/sections/DualShock";
import { Philosophy } from "@/components/sections/Philosophy";
import { Beta } from "@/components/sections/Beta";
import { Credits } from "@/components/sections/Credits";

const title = "BoliviaOS — Sistema Operativo y Entorno Multifunción para PlayStation 2 (PS2)";
const description =
  "BoliviaOS es un entorno multifunción y sistema operativo homebrew para PlayStation 2 (PS2) basado en Open PS2 Loader. Reúne explorador de archivos (mc, mass, hdd, host), reproductor de audio MP3/OGG fluido en hardware real, lanzador de juegos, editor de texto, terminal SuperTerminal CLI y utilidades MCA.";
const keywords =
  "BoliviaOS, BoliviaOS PS2, BoliviaOS PlayStation 2, Bolivia OS, Open PS2 Loader, PS2 Homebrew, PS2 ELF, PlayStation 2 OS, OPL Bolivia, explorador de archivos ps2, reproductor mp3 ps2, reproductor ogg ps2, Memory Card Annihilator, SuperTerminal PS2, Descargar BoliviaOS, BoliviaOS ELF, PS2 file manager, PS2 audio player";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "keywords", content: keywords },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://boliviaos.site/" },
      { property: "og:site_name", content: "BoliviaOS" },
      { property: "og:locale", content: "es_BO" },
      { property: "og:locale:alternate", content: "es_ES" },
      {
        property: "og:image",
        content: "https://boliviaos.site/assets/boliviaos-symbol.png",
      },
      { property: "og:image:secure_url", content: "https://boliviaos.site/assets/boliviaos-symbol.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1170" },
      { property: "og:image:height", content: "598" },
      { property: "og:image:alt", content: "BoliviaOS — Sistema Operativo para PlayStation 2" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      {
        name: "twitter:image",
        content: "https://boliviaos.site/assets/boliviaos-symbol.png",
      },
      { name: "twitter:image:alt", content: "BoliviaOS — Sistema Operativo para PlayStation 2" },
    ],
    links: [{ rel: "canonical", href: "https://boliviaos.site/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "@id": "https://boliviaos.site/#software",
              name: "BoliviaOS",
              alternateName: [
                "BoliviaOS PS2",
                "Bolivia OS PlayStation 2",
                "BoliviaOS Homebrew",
                "BoliviaOS OPL",
                "Explorador de Archivos BoliviaOS PS2"
              ],
              applicationCategory: "UtilitiesApplication, MultimediaApplication, GameApplication",
              operatingSystem: "Sony PlayStation 2",
              softwareVersion: "Beta 1.0",
              fileFormat: "application/x-executable",
              fileSize: "5.7MB",
              downloadUrl: "https://boliviaos.site/downloads/BoliviaOS.ELF",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
                availability: "https://schema.org/InStock",
              },
              description,
              author: {
                "@type": "Person",
                name: "José Manuel Alvarez",
                alternateName: "NightlySki_Zero",
                jobTitle: "Desarrollador de Software",
              },
              screenshot: "https://boliviaos.site/images/file-explorer.png",
              featureList: [
                "Explorador de archivos nativo con soporte mc0:, mc1:, mass0:, hdd0:, host:, cdfs:, m4s0:",
                "Reproductor de audio MP3 y OGG Vorbis fluido y optimizado para hardware real PS2",
                "Lanzador de juegos PS2 y PS1 desde HDD, USB, red SMB y MX4SIO",
                "Editor de texto y código (.txt, .cfg, .cnf, .js)",
                "Terminal SuperTerminal CLI interactiva con comandos UNIX nativos",
                "Memory Card Annihilator (MCA) para formateo y rescate de tarjetas",
                "Soporte nativo para mando DualShock 2 y teclados USB HID",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://boliviaos.site/#website",
              url: "https://boliviaos.site/",
              name: "BoliviaOS",
              description: "Sitio oficial de BoliviaOS para PlayStation 2",
              inLanguage: "es",
              publisher: {
                "@type": "Person",
                name: "José Manuel Alvarez",
              },
              potentialAction: {
                "@type": "SearchAction",
                target: "https://boliviaos.site/?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            },
            {
              "@type": "FAQPage",
              "@id": "https://boliviaos.site/#faq",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "¿Qué es BoliviaOS para PlayStation 2?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "BoliviaOS es un entorno multifunción y sistema operativo homebrew para PlayStation 2 basado en Open PS2 Loader (OPL). Integra explorador de archivos para memory card y USB, reproductor de audio MP3 y OGG Vorbis, editor de texto, terminal de comandos SuperTerminal CLI, lanzador de juegos y utilidades de mantenimiento de tarjetas de memoria MCA.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Cómo descargar e instalar BoliviaOS en una consola PS2 física?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Puedes descargar el binario ejecutable BoliviaOS.ELF de forma gratuita desde https://boliviaos.site/#beta. Cópialo a una memoria USB (mass:/) y ejecútalo en tu consola PlayStation 2 usando uLaunchELF o configúralo como tu aplicación de arranque predeterminada con FreeMCBoot u Open PS2 Loader.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Qué dispositivos y rutas soporta el explorador de archivos de BoliviaOS?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "El explorador de archivos de BoliviaOS soporta navegación y gestión completa en Memory Cards (mc0:/, mc1:/), unidades USB (mass0:/), disco duro interno (hdd0:/), carpetas compartidas por red local PC (host:/), lector óptico (cdfs:/) y tarjetas SD MX4SIO (m4s0:/).",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿El reproductor de música de BoliviaOS reproduce archivos MP3 y OGG sin cortes en PS2?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sí, BoliviaOS incluye un motor de audio de doble búfer sincronizado con SPU2 que permite reproducir música MP3 y OGG Vorbis de forma ultra fluida y sin cortes en hardware real de PlayStation 2, con lectura de metadatos ID3, soporte de carátulas y visualizadores de espectro en tiempo real.",
                  },
                },
              ],
            },
            {
              "@type": "BreadcrumbList",
              "@id": "https://boliviaos.site/#breadcrumbs",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Inicio",
                  item: "https://boliviaos.site/#home",
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: "Explorador de Archivos",
                  item: "https://boliviaos.site/#file-explorer",
                },
                {
                  "@type": "ListItem",
                  position: 3,
                  name: "Herramientas y Reproductor",
                  item: "https://boliviaos.site/#tools",
                },
                {
                  "@type": "ListItem",
                  position: 4,
                  name: "Descargar Beta 1.0",
                  item: "https://boliviaos.site/#beta",
                },
              ],
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgressBar />
      <Navbar />
      <main>
        <Hero />
        <FileExplorerSection />
        <Tools />
        <DualShock />
        <Philosophy />
        <Beta />
        <Credits />
      </main>
      <Footer />
    </div>
  );
}
