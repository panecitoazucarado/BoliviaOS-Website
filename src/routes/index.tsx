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
  "BoliviaOS es un entorno multifunción y sistema operativo homebrew para PlayStation 2 (PS2) basado en Open PS2 Loader. Reúne lanzador de juegos, explorador de archivos, reproductor de audio MP3/OGG, editor de texto, terminal SuperTerminal CLI y mantenimiento MCA.";
const keywords =
  "BoliviaOS, BoliviaOS PS2, BoliviaOS PlayStation 2, Bolivia OS, Open PS2 Loader, PS2 Homebrew, PS2 ELF, PlayStation 2 OS, OPL Bolivia, PS2 File Explorer, Memory Card Annihilator, SuperTerminal PS2, Descargar BoliviaOS";

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
      { property: "og:url", content: "/" },
      {
        property: "og:image",
        content: "/assets/boliviaos-symbol.png",
      },
      { property: "og:image:alt", content: "BoliviaOS para PlayStation 2" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      {
        name: "twitter:image",
        content: "/assets/boliviaos-symbol.png",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "@id": "https://boliviaos.com/#software",
              name: "BoliviaOS",
              alternateName: ["BoliviaOS PS2", "Bolivia OS PlayStation 2", "BoliviaOS Homebrew"],
              applicationCategory: "UtilitiesApplication, MultimediaApplication, GameApplication",
              operatingSystem: "PlayStation 2",
              softwareVersion: "Beta 1.0",
              fileFormat: "application/x-executable",
              fileSize: "5.7MB",
              downloadUrl: "https://boliviaos.com/downloads/BoliviaOS.ELF",
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
              screenshot: "https://boliviaos.com/images/file-explorer.png",
              featureList: [
                "Lanzador de juegos PS2 y PS1 desde HDD, USB, SMB y MX4SIO",
                "Explorador de archivos integral (mc0:, mc1:, mass0:, hdd0:, host:, cdfs:)",
                "Reproductor de música MP3 y OGG Vorbis en hardware real",
                "Editor de texto y código (.txt, .cfg, .js)",
                "SuperTerminal CLI interactiva con comandos UNIX nativos",
                "Memory Card Annihilator (MCA) para formateo y rescate de tarjetas",
                "Soporte nativo para mando DualShock 2 y teclados USB HID",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://boliviaos.com/#website",
              url: "https://boliviaos.com/",
              name: "BoliviaOS",
              description: "Sitio oficial de BoliviaOS para PlayStation 2",
              inLanguage: "es",
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
