export const site = {
  name: "BoliviaOS",
  subtitle: "Entorno multifunción para PlayStation 2",
  tagline: "Entorno integrado para PlayStation 2 basado en Open PS2 Loader.",
  developer: "José Manuel Alvarez (@Josema)",
  alias: "NightlySki_Zero",
  location: "Santa Cruz de la Sierra, Bolivia",
  basedOn: "OPNPS2LD-v1.2.0-Beta-2245-3e3f34e.7z",
  version: "Beta 1.0",
  year: 2026,
  fileSize: "5.7 MB",
  downloadUrl: "/downloads/BoliviaOS.ELF",
  downloadFileName: "BoliviaOS.ELF",
};

export const navLinks = [
  { label: "Inicio", href: "#home" },
  { label: "Proyecto", href: "#features" },
  { label: "Archivos", href: "#file-explorer" },
  { label: "Herramientas", href: "#tools" },
  { label: "Controles", href: "#dualshock" },
  { label: "Créditos", href: "#credits" },
];


export const toolSubLinks = [
  {
    title: "Descargar Videos .MP4 para BoliviaOS",
    description: "Convierte y descarga videos de YouTube listos para PS2 y PC",
    href: "/descargar-video",
    badge: "Nuevo",
    icon: "video",
  },
  {
    title: "Todas las herramientas integradas",
    description: "Lanzador de juegos, explorador de archivos, SuperTerminal y MCA",
    href: "/#tools",
    icon: "disc",
  },
  {
    title: "Reproductor Multimedia PS2",
    description: "Música MP3/OGG y visor de imágenes con aceleración IPU",
    href: "/#tools",
    icon: "media",
  },
  {
    title: "SuperTerminal CLI",
    description: "Consola interactiva de comandos UNIX para PlayStation 2",
    href: "/#tools",
    icon: "terminal",
  },
];

export const toolCategories = [
  {
    category: "Juegos",
    description: "Lanzamiento y configuración de títulos",
    items: [
      {
        title: "Lanzador de juegos",
        description:
          "Carga de juegos de PS2 y PS1 desde disco duro interno, USB, red local (SMB) y adaptador SD (MX4SIO), con modos de compatibilidad OPL, GSM y PadEmu.",
        status: "Disponible",
        icon: "disc",
      },
    ],
  },
  {
    category: "Multimedia",
    description: "Reproducción y visualización de medios",
    items: [
      {
        title: "Descargador de Videos YouTube (.MP4)",
        description:
          "Herramienta web integrada para descargar videos de YouTube directamente a tu computadora en formato .MP4 con solo pegar el enlace, listos para tu pendrive USB y reproducir en BoliviaOS para PS2.",
        status: "Nuevo",
        icon: "video",
        href: "/descargar-video",
      },
      {
        title: "Reproductor MP3 y OGG",
        description:
          "Decodificación y reproducción de audio MP3 y OGG Vorbis con lectura de metadatos ID3 y visualizador de espectro en pantalla.",
        status: "Disponible",
        icon: "media",
      },
      {
        title: "Visor de imágenes",
        description:
          "Visor de archivos JPG y PNG con dos motores independientes: decodificación JPEG por la IPU de la EE y visor PNG avanzado con zoom digital, paneo y análisis de transparencia.",
        status: "Disponible",
        icon: "files",
      },
      {
        title: "Visor de fuentes TTF",
        description:
          "Análisis y previsualización de fuentes TrueType en cuatro pestañas: pangramas y kerning, mapa de caracteres, escala de tamaños de 16 a 64 px y metadatos binarios de las tablas name, OS/2, head, hhea, cmap y maxp.",
        status: "Disponible",
        icon: "pencil",
      },
    ],
  },
  {
    category: "Desarrollo y texto",
    description: "Edición de archivos y consola de comandos",
    items: [
      {

        title: "Editor de texto plano",
        description:
          "Apertura y modificación de archivos de configuración (.cfg, .cnf, .txt) directamente desde la consola con teclado virtual.",
        status: "Disponible",
        icon: "pencil",
      },
      {
        title: "Editor de scripts JavaScript",
        description:
          "Entorno de edición para scripts y archivos de código dentro del ecosistema de herramientas de la consola.",
        status: "Disponible",
        icon: "code",
      },
      {
        title: "Terminal (SuperTerminal)",
        description:
          "Consola interactiva nativa para PlayStation 2 con soporte de teclado USB HID y virtual. Incluye gestión completa del sistema de archivos (cd, ls, tree, cp, mv, rm), integración con visores y editores (open, play, view, edit, launch), diagnóstico en tiempo real (sysinfo, meminfo, ifconfig, ping) y motor 3D ASCII a 60 FPS.",
        status: "Disponible",
        icon: "terminal",
      },
    ],
  },
  {
    category: "Sistema y hardware",
    description: "Mantenimiento y diagnóstico",
    items: [
      {
        title: "Memory Card Annihilator (MCA)",
        description:
          "Formateo físico a bajo nivel, desformateo (unformat), volcados raw de imagen (dump/restore) y reparación de sectores defectuosos en tarjetas de 8 MB a 128 MB. Módulo integrado del software original de código abierto Memory Card Annihilator desarrollado por ffgriever.",
        status: "Disponible",
        icon: "activity",
      },
    ],
  },
  {
    category: "En desarrollo",
    description: "Módulos en fase de implementación activa",
    items: [
      {
        title: "Visor de documentos PDF",
        description:
          "Lector de manuales y documentos en formato PDF para visualización directa en pantalla. Actualmente en desarrollo activo.",
        status: "En desarrollo",
        icon: "files",
      },
    ],
  },
];

export const tools = toolCategories.flatMap((c) => c.items);

export const modules = [
  "Lanzador de juegos",
  "Explorador de archivos",
  "SuperTerminal",
  "Editor de texto y código",
  "Reproductor MP3 / OGG",
  "Memory Card Annihilator",
  "Visor de imágenes",
  "Visor de fuentes TTF",
];

export const philosophy = [
  {
    title: "Compilación unificada (Unity Build)",
    text: "El código del Emotion Engine se compila en una sola unidad de traducción para maximizar las optimizaciones del compilador y evitar sobrecostes de enlace.",
  },
  {
    title: "Integridad de datos en transferencias",
    text: "Las operaciones de movimiento y copiado verifican el resultado de escritura antes de confirmar cambios, evitando pérdidas accidentales de información.",
  },
  {
    title: "Gestión estricta de memoria",
    text: "Debido a los 32 MB de RAM y la pila reducida (8–16 KB), los búferes de trabajo se ubican de forma estructurada en la sección .bss.",
  },
  {
    title: "Adaptación para pantallas CRT",
    text: "La interfaz utiliza trazados con grosores mínimos de 2 píxeles para prevenir el parpadeo de entrelazado en televisores CRT convencionales.",
  },
  {
    title: "Validación en consolas físicas",
    text: "Cada versión se prueba tanto en hardware real (modelos Fat y Slim) como en entornos de depuración y emulación.",
  },
];

export const socials: { label: string; href: string | null }[] = [
  { label: "Discord", href: null },
  { label: "GitHub", href: null },
  { label: "Facebook", href: null },
  { label: "YouTube", href: null },
];
