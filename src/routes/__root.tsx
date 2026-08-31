import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Toaster } from "../components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BoliviaOS — Sistema Operativo y Entorno Multifunción para PlayStation 2 (PS2)" },
      {
        name: "description",
        content: "BoliviaOS es un entorno multifunción y sistema operativo homebrew para PlayStation 2 (PS2) basado en Open PS2 Loader. Incluye lanzador de juegos, explorador de archivos, reproductor de audio, editor de texto, terminal SuperTerminal CLI y utilidades de mantenimiento MCA.",
      },
      {
        name: "keywords",
        content: "BoliviaOS, BoliviaOS PS2, BoliviaOS PlayStation 2, Bolivia OS, Open PS2 Loader, PS2 Homebrew, PS2 ELF, PlayStation 2 OS, OPL Bolivia, PS2 File Explorer, Memory Card Annihilator, SuperTerminal PS2, Descargar BoliviaOS",
      },
      { name: "author", content: "José Manuel Alvarez (@Josema)" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "bingbot", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { property: "og:title", content: "BoliviaOS — Sistema Operativo y Entorno Multifunción para PlayStation 2 (PS2)" },
      {
        property: "og:description",
        content: "BoliviaOS amplía las capacidades de Open PS2 Loader reuniendo lanzamiento de juegos, exploración de archivos, reproducción de audio, edición de texto y utilidades de sistema en una sola interfaz integrada para la consola.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://boliviaos.site/" },
      { property: "og:site_name", content: "BoliviaOS" },
      { property: "og:locale", content: "es_BO" },
      { property: "og:locale:alternate", content: "es_ES" },
      { property: "og:image", content: "https://boliviaos.site/assets/boliviaos-symbol.png" },
      { property: "og:image:secure_url", content: "https://boliviaos.site/assets/boliviaos-symbol.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1170" },
      { property: "og:image:height", content: "598" },
      { property: "og:image:alt", content: "BoliviaOS — Sistema Operativo para PlayStation 2" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "BoliviaOS — Entorno Multifunción para PlayStation 2 (PS2)" },
      {
        name: "twitter:description",
        content: "BoliviaOS amplía las capacidades de Open PS2 Loader reuniendo lanzamiento de juegos, exploración de archivos, reproducción de audio, edición de texto y utilidades de sistema en una sola interfaz integrada para la consola.",
      },
      { name: "twitter:image", content: "https://boliviaos.site/assets/boliviaos-symbol.png" },
      { name: "twitter:image:alt", content: "BoliviaOS — Sistema Operativo para PlayStation 2" },
      { name: "theme-color", content: "#0f6f43" },
    ],
    links: [
      { rel: "canonical", href: "https://boliviaos.site/" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/assets/boliviaos-symbol.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Sora:wght@400;500;600;700;800&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster position="bottom-right" richColors />
    </QueryClientProvider>
  );
}
