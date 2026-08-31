import { useState } from "react";
import {
  Keyboard,
  Gamepad2,
  FolderOpen,
  FileText,
  Music,
  Terminal,
  Image as ImageIcon,
} from "lucide-react";
import { Section, SectionHeading } from "../Section";
import { Reveal } from "../Reveal";

interface Binding {
  icons: string[];
  label: string;
  action: string;
}

interface SubsystemBindings {
  id: string;
  name: string;
  icon: typeof FolderOpen;
  description: string;
  bindings: Binding[];
}

const dualShockSubsystems: SubsystemBindings[] = [
  {
    id: "explorer",
    name: "Explorador de Archivos",
    icon: FolderOpen,
    description:
      "Navegación por el árbol de directorios y gestión de archivos en mc0:, mc1:, mass0:, mass1:, hdd0: y host:.",
    bindings: [
      {
        icons: ["/images/buttons/cross.png"],
        label: "Cruz",
        action: "Abrir carpeta · Ejecutar binario .ELF · Abrir en visor de audio, texto o imagen",
      },
      {
        icons: ["/images/buttons/circle.png"],
        label: "Círculo",
        action: "Volver al directorio anterior · Salir al menú principal de OPL desde la raíz",
      },
      {
        icons: ["/images/buttons/square.png"],
        label: "Cuadrado",
        action: "Marcar o desmarcar archivo individual para operaciones por lotes",
      },
      {
        icons: ["/images/buttons/triangle.png"],
        label: "Triángulo",
        action: "Alternador inteligente (Smart Toggle): Marcar o desmarcar todos los archivos",
      },
      {
        icons: ["/images/buttons/r1.png"],
        label: "R1",
        action: "Abrir menú contextual (Copiar, Cortar, Pegar, Renombrar, Eliminar)",
      },
      {
        icons: ["/images/buttons/select.png"],
        label: "SELECT",
        action: "Alternar modo de vista entre Lista detallada y Cuadrícula de iconos",
      },
      {
        icons: ["/images/buttons/start.png"],
        label: "START",
        action: "Abrir menú de configuración y opciones del explorador de archivos",
      },
      {
        icons: ["/images/buttons/dpad_up.png", "/images/buttons/l3.png"],
        label: "D-Pad / Stick analógico",
        action: "Navegación direccional fluida por archivos, carpetas y dispositivos",
      },
      {
        icons: ["/images/buttons/l2.png", "/images/buttons/r2.png"],
        label: "L2 / R2",
        action: "Desplazamiento rápido de página arriba / abajo (Page Up / Page Down)",
      },
    ],
  },
  {
    id: "editor",
    name: "Editor de Texto",
    icon: FileText,
    description:
      "Edición de archivos .txt, .cfg y scripts JS con cursor libre y teclado virtual en pantalla.",
    bindings: [
      {
        icons: ["/images/buttons/cross.png"],
        label: "Cruz",
        action: "Insertar carácter seleccionado en el teclado virtual en la posición del cursor",
      },
      {
        icons: ["/images/buttons/cross.png", "/images/buttons/dpad_up.png"],
        label: "Mantener Cruz + D-Pad",
        action: "Seleccionar bloque continuo de texto para copiar o cortar",
      },
      {
        icons: ["/images/buttons/square.png"],
        label: "Cuadrado",
        action: "Abrir u ocultar el teclado virtual en pantalla",
      },
      {
        icons: ["/images/buttons/triangle.png"],
        label: "Triángulo",
        action: "Borrar carácter anterior (Backspace) o eliminar bloque de texto seleccionado",
      },
      {
        icons: ["/images/buttons/circle.png"],
        label: "Círculo",
        action: "Salir del editor (solicita confirmación si existen cambios sin guardar)",
      },
      {
        icons: ["/images/buttons/r1.png"],
        label: "R1",
        action: "Abrir menú contextual de edición (Copiar, Pegar, Cortar, Seleccionar todo)",
      },
      {
        icons: ["/images/buttons/start.png"],
        label: "START",
        action: "Guardar archivo directamente en el almacenamiento activo",
      },
      {
        icons: ["/images/buttons/select.png"],
        label: "SELECT",
        action: "Insertar salto de línea (Enter)",
      },
      {
        icons: ["/images/buttons/l1.png"],
        label: "L1",
        action: "Retroceso rápido de 8 caracteres en la línea",
      },
      {
        icons: ["/images/buttons/l2.png", "/images/buttons/r2.png"],
        label: "L2 / R2",
        action: "Mover cursor al inicio de la línea (Home) o al final (End)",
      },
      {
        icons: ["/images/buttons/dpad_up.png"],
        label: "D-Pad / Stick analógico",
        action: "Mover el cursor por caracteres y líneas respetando codificación UTF-8",
      },
    ],
  },
  {
    id: "audio",
    name: "Reproductor de Música",
    icon: Music,
    description:
      "Control de pistas de audio MP3 y OGG Vorbis con visualizador de espectro y lectura de metadatos.",
    bindings: [
      {
        icons: ["/images/buttons/cross.png"],
        label: "Cruz",
        action: "Pausar o reanudar reproducción de audio en tiempo real",
      },
      {
        icons: ["/images/buttons/circle.png"],
        label: "Círculo",
        action: "Detener sesión de audio y regresar al explorador de archivos",
      },
      {
        icons: ["/images/buttons/square.png"],
        label: "Cuadrado",
        action: "Mostrar u ocultar panel flotante con metadatos ID3 y carátula del álbum",
      },
      {
        icons: ["/images/buttons/triangle.png"],
        label: "Triángulo",
        action: "Abrir menú de ajustes de audio, ecualizador y repetición de playlist",
      },
      {
        icons: ["/images/buttons/l1.png", "/images/buttons/r1.png"],
        label: "L1 / R1",
        action: "Pista anterior / Pista siguiente en la lista de reproducción",
      },
      {
        icons: ["/images/buttons/l2.png", "/images/buttons/r2.png"],
        label: "L2 / R2 (o D-Pad ◄►)",
        action: "Salto rápido de ±15s (tap) o scrubbing continuo en tiempo real (hold)",
      },
      {
        icons: ["/images/buttons/dpad_up.png", "/images/buttons/dpad_down.png"],
        label: "D-Pad ▲ / ▼",
        action: "Ajustar volumen de salida de audio en pasos graduales (en ajustes)",
      },
    ],
  },
  {
    id: "terminal",
    name: "SuperTerminal CLI",
    icon: Terminal,
    description:
      "Línea de comandos interactiva con teclado en pantalla, portapapeles y visualizador de salida.",
    bindings: [
      {
        icons: ["/images/buttons/cross.png"],
        label: "Cruz",
        action: "Escribir carácter en OSK (tap corto) / Menú de acentos y variantes (hold ~350ms)",
      },
      {
        icons: ["/images/buttons/square.png"],
        label: "Cuadrado",
        action: "Insertar espacio rápido sin mover el cursor a la barra espaciadora",
      },
      {
        icons: ["/images/buttons/triangle.png"],
        label: "Triángulo",
        action: "Borrar carácter anterior (Backspace UTF-8 seguro)",
      },
      {
        icons: ["/images/buttons/start.png"],
        label: "START",
        action: "Ejecutar la línea de comando ingresada en el intérprete",
      },
      {
        icons: ["/images/buttons/circle.png"],
        label: "Círculo",
        action: "Salir de la terminal y volver a OPL / Explorador de archivos",
      },
      {
        icons: ["/images/buttons/l1.png", "/images/buttons/r1.png"],
        label: "L1 / R1",
        action: "Alternar mayúsculas (Shift) / Modo de símbolos y números",
      },
      {
        icons: ["/images/buttons/select.png"],
        label: "SELECT",
        action: "Pegar texto directo desde el portapapeles en la posición del cursor",
      },
      {
        icons: ["/images/buttons/l2.png", "/images/buttons/r2.png"],
        label: "L2 / R2",
        action: "Abrir visor de portapapeles / Menú de ajustes y temas de la terminal",
      },
      {
        icons: ["/images/buttons/l3.png"],
        label: "L3 (Stick izquierdo)",
        action: "Alternar modo lectura/scroll de historial con D-Pad y L1/R1",
      },
      {
        icons: ["/images/buttons/dpad_up.png"],
        label: "D-Pad",
        action: "Navegación direccional por las teclas del teclado en pantalla (OSK)",
      },
    ],
  },
  {
    id: "image",
    name: "Visor de Imágenes",
    icon: ImageIcon,
    description:
      "Visualizador acelerado en Graphics Synthesizer para imágenes JPG, PNG y BMP con zoom y paneo.",
    bindings: [
      {
        icons: ["/images/buttons/cross.png", "/images/buttons/circle.png"],
        label: "Cruz / Círculo",
        action: "Salir del visor y regresar al explorador de archivos",
      },
      {
        icons: ["/images/buttons/r1.png", "/images/buttons/r2.png"],
        label: "R1 / R2",
        action: "Zoom In (hasta 6.0x) / Zoom Out (hasta 0.4x) con interpolación lerp fluida",
      },
      {
        icons: ["/images/buttons/dpad_up.png", "/images/buttons/l3.png"],
        label: "D-Pad / Stick analógico",
        action: "Desplazamiento panorámico (Pan / Scroll) por la imagen ampliada",
      },
      {
        icons: ["/images/buttons/l3.png"],
        label: "L3 (Stick izquierdo)",
        action: "Restablecer zoom a 1.0x y centrar la imagen en pantalla",
      },
      {
        icons: ["/images/buttons/r3.png"],
        label: "R3 (Stick derecho)",
        action: "Ocultar o mostrar la interfaz HUD de resolución y dimensiones",
      },
      {
        icons: ["/images/buttons/square.png"],
        label: "Cuadrado",
        action: "Alternar fondo ajedrezado para transparencias en imágenes PNG",
      },
      {
        icons: ["/images/buttons/start.png"],
        label: "START",
        action: "Abrir menú de ajustes y filtros de visualización",
      },
    ],
  },
];

const keyboardSubsystems: SubsystemBindings[] = [
  {
    id: "explorer",
    name: "Explorador de Archivos",
    icon: FolderOpen,
    description:
      "Control de navegación por unidades de almacenamiento (mc0:, mass:, hdd0:, smb:, host:).",
    bindings: [
      {
        icons: ["/images/keys_v2/flechas.png"],
        label: "Flechas / WASD",
        action: "Navegación direccional por la lista de archivos, carpetas y paneles de unidad",
      },
      {
        icons: ["/images/keys_v2/enter.png"],
        label: "Enter / Return",
        action: "Abrir directorio · Ejecutar binario .ELF · Abrir archivo en su visor correspondiente",
      },
      {
        icons: ["/images/keys_v2/backspace.png"],
        label: "Backspace",
        action: "Volver a la carpeta anterior o subir al directorio superior",
      },
      {
        icons: ["/images/keys_v2/esc.png"],
        label: "Escape",
        action: "Cerrar menú contextual desplegable o regresar a la raíz de unidades",
      },
      {
        icons: ["/images/keys_v2/tab.png", "/images/keys_v2/f1.png"],
        label: "Tab / F1",
        action: "Abrir menú contextual (Copiar, Cortar, Pegar, Renombrar, Eliminar)",
      },
      {
        icons: ["/images/keys_v2/space.png", "/images/keys_v2/insert.png"],
        label: "Espacio / Insert",
        action: "Marcar o desmarcar el elemento seleccionado para operaciones por lotes",
      },
      {
        icons: ["/images/keys_v2/f5.png"],
        label: "F5",
        action: "Actualizar y recargar la lista de archivos del dispositivo activo",
      },
      {
        icons: ["/images/keys_v2/f2.png"],
        label: "F2",
        action: "Abrir el menú de configuración y opciones del explorador de archivos",
      },
      {
        icons: ["/images/keys_v2/v.png"],
        label: "Tecla V",
        action: "Alternar modo de visualización entre Lista detallada y Cuadrícula de iconos",
      },
      {
        icons: ["/images/keys_v2/home.png", "/images/keys_v2/end.png"],
        label: "Inicio / Fin",
        action: "Mover la selección instantáneamente al primer o último archivo de la lista",
      },
      {
        icons: ["/images/keys_v2/pgup.png", "/images/keys_v2/pgdn.png"],
        label: "RePág / AvPág",
        action: "Desplazamiento vertical rápido por bloques de 10 elementos",
      },
    ],
  },
  {
    id: "editor",
    name: "Editor de Texto",
    icon: FileText,
    description:
      "Edición directa y escritura de scripts, código y archivos de texto con soporte UTF-8.",
    bindings: [
      {
        icons: ["/images/keys_v2/letras.png"],
        label: "Teclas A–Z / 0–9",
        action: "Escritura alfanumérica fluida directamente en el búfer de texto y scripts",
      },
      {
        icons: ["/images/keys_v2/flechas.png"],
        label: "Flechas de dirección",
        action: "Desplazar el cursor por caracteres y líneas respetando codepoints UTF-8",
      },
      {
        icons: ["/images/keys_v2/enter.png"],
        label: "Enter / Return",
        action: "Insertar un nuevo salto de línea en la posición actual del cursor",
      },
      {
        icons: ["/images/keys_v2/backspace.png"],
        label: "Backspace",
        action: "Borrar el carácter anterior o eliminar el bloque de texto seleccionado",
      },
      {
        icons: ["/images/keys_v2/delete.png"],
        label: "Supr / Delete",
        action: "Borrar el carácter siguiente o fusionar con la línea inferior",
      },
      {
        icons: ["/images/keys_v2/tab.png"],
        label: "Tabulador",
        action: "Insertar una sangría de 4 espacios en el texto",
      },
      {
        icons: ["/images/keys_v2/home.png", "/images/keys_v2/end.png"],
        label: "Inicio / Fin",
        action: "Mover el cursor al principio (posición 0) o al final de la línea actual",
      },
      {
        icons: ["/images/keys_v2/esc.png"],
        label: "Escape",
        action: "Cerrar menú o salir del editor con diálogo para guardar cambios modificados",
      },
    ],
  },
  {
    id: "audio",
    name: "Reproductor de Música",
    icon: Music,
    description:
      "Control de reproducción y playlists para archivos de audio MP3 y OGG Vorbis.",
    bindings: [
      {
        icons: ["/images/keys_v2/space.png"],
        label: "Barra Espaciadora",
        action: "Pausar o reanudar la reproducción de audio en tiempo real",
      },
      {
        icons: ["/images/keys_v2/flechas.png"],
        label: "Flechas ◄ / ► (o A / D)",
        action: "Retroceder o avanzar la posición en la pista de audio (Seek / Scrubbing)",
      },
      {
        icons: ["/images/keys_v2/flechas.png"],
        label: "Flechas ▲ / ▼ (o W / S)",
        action: "Subir o bajar el volumen de salida de audio en pasos graduales",
      },
      {
        icons: ["/images/keys_v2/tab.png"],
        label: "Tabulador",
        action: "Mostrar u ocultar el panel flotante de metadatos ID3 y carátula del álbum",
      },
      {
        icons: ["/images/keys_v2/enter.png"],
        label: "Enter",
        action: "Abrir menú de ajustes de audio y cambiar modo de repetición de playlist",
      },
      {
        icons: ["/images/keys_v2/esc.png", "/images/keys_v2/backspace.png"],
        label: "Esc / Backspace",
        action: "Detener la sesión de audio y regresar al explorador de archivos",
      },
    ],
  },
  {
    id: "terminal",
    name: "SuperTerminal CLI",
    icon: Terminal,
    description:
      "Consola interactiva con intérprete de comandos y utilidades UNIX para PlayStation 2.",
    bindings: [
      {
        icons: ["/images/keys_v2/letras.png"],
        label: "Entrada de Comandos",
        action: "Escritura interactiva de comandos, rutas y parámetros en la shell",
      },
      {
        icons: ["/images/keys_v2/enter.png"],
        label: "Enter",
        action: "Ejecutar la línea de comando ingresada en el intérprete",
      },
      {
        icons: ["/images/keys_v2/flechas.png"],
        label: "Flechas ▲ / ▼",
        action: "Navegar hacia atrás o hacia adelante por el historial de comandos ejecutados",
      },
      {
        icons: ["/images/keys_v2/tab.png"],
        label: "Tabulador",
        action: "Autocompletar nombres de comandos, ejecutables .ELF y rutas del sistema",
      },
      {
        icons: ["/images/keys_v2/backspace.png", "/images/keys_v2/delete.png"],
        label: "Backspace / Supr",
        action: "Borrar caracteres en la posición actual de la línea de comandos",
      },
      {
        icons: ["/images/keys_v2/ctrl_c.png", "/images/keys_v2/esc.png"],
        label: "Ctrl + C / Esc",
        action: "Interrumpir la ejecución del comando actual o limpiar la línea de entrada",
      },
      {
        icons: ["/images/keys_v2/ctrl_l.png"],
        label: "Ctrl + L",
        action: "Limpiar la pantalla de la consola manteniendo la sesión activa",
      },
    ],
  },
];

export function DualShock() {
  const [activeDs2Subsystem, setActiveDs2Subsystem] = useState("explorer");
  const [activeKbSubsystem, setActiveKbSubsystem] = useState("explorer");

  const currentDs2Subsystem: SubsystemBindings =
    dualShockSubsystems.find((s) => s.id === activeDs2Subsystem) ?? dualShockSubsystems[0]!;

  const currentKbSubsystem: SubsystemBindings =
    keyboardSubsystems.find((s) => s.id === activeKbSubsystem) ?? keyboardSubsystems[0]!;

  return (
    <Section id="dualshock">
      <SectionHeading
        eyebrow="Control y navegación"
        title="Dispositivos de entrada"
        intro="BoliviaOS reconoce dos métodos de entrada independientes: el mando DualShock 2 original de PlayStation 2 y teclados USB estándar. Cada aplicación del sistema asigna funciones directas a cada tecla."
      />

      {/* ══════════════════════════════════════════════════════════════════════
          1. SECCIÓN DUALSHOCK 2 CON PESTAÑAS POR APLICACIÓN
          ══════════════════════════════════════════════════════════════════════ */}
      <Reveal>
        <div className="mt-12 mb-4 flex items-center gap-2.5">
          <Gamepad2 className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-foreground">Mando DualShock 2</span>
          <span className="text-xs text-muted-foreground ml-1">
            — controlador nativo de PlayStation 2
          </span>
        </div>
        <p className="mb-6 max-w-3xl text-xs text-muted-foreground">
          El mapeo de botones del DualShock 2 cambia dinámicamente según la herramienta activa. Selecciona la aplicación para consultar sus controles exactos:
        </p>
      </Reveal>

      {/* Pestañas de aplicaciones para DualShock 2 */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {dualShockSubsystems.map((sub) => {
          const SubIcon = sub.icon;
          const isActive = sub.id === activeDs2Subsystem;
          return (
            <button
              type="button"
              key={sub.id}
              onClick={() => setActiveDs2Subsystem(sub.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-surface text-muted-foreground hover:bg-card hover:text-foreground border border-border"
              }`}
            >
              <SubIcon className="h-3.5 w-3.5" />
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* DualShock 2 visual card */}
        <Reveal>
          <div className="card-soft relative flex flex-col items-center justify-center p-5 sm:p-8 bg-surface overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-30 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--primary) 20%, transparent), transparent 70%)",
              }}
            />

            <div className="ds2-float relative z-10 flex items-center justify-center py-2 sm:py-3">
              <img
                src="/images/dualshock2.png"
                alt="Mando DualShock 2 para PlayStation 2"
                width={475}
                height={308}
                className="w-full max-w-[280px] sm:max-w-[320px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.35)] select-none"
                loading="lazy"
              />
            </div>

            <div className="mt-3 sm:mt-4 text-center z-10">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                DualShock 2 · {currentDs2Subsystem.name}
              </span>
              <p className="mt-1 text-xs text-muted-foreground max-w-xs mx-auto">
                {currentDs2Subsystem.description}
              </p>
            </div>
          </div>
        </Reveal>

        {/* Bindings para la aplicación activa de DualShock 2 */}
        <ul className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
          {currentDs2Subsystem.bindings.map((b) => (
            <li key={b.label}>
              <div className="flex items-center gap-3 sm:gap-3.5 rounded-xl border border-border bg-card p-3 h-full transition-colors hover:border-primary/40">
                <div className="flex shrink-0 items-center justify-center gap-1 min-w-[34px] sm:min-w-[38px] h-8 sm:h-9">
                  {b.icons.map((icon, iconIdx) => (
                    <img
                      key={iconIdx}
                      src={icon}
                      alt={b.label}
                      width={28}
                      height={28}
                      className="h-6 w-6 sm:h-7 sm:w-7 object-contain drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] select-none"
                      loading="lazy"
                    />
                  ))}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-foreground">
                    {b.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    {b.action}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          2. SECCIÓN TECLADO USB
          ══════════════════════════════════════════════════════════════════════ */}
      <Reveal>
        <div className="mt-14 sm:mt-16 mb-4 flex items-center gap-2.5">
          <Keyboard className="h-4 w-4 text-primary shrink-0" />
          <span className="text-sm font-semibold text-foreground">Teclado USB</span>
          <span className="text-xs text-muted-foreground ml-1">
            — soporte añadido en BoliviaOS
          </span>
        </div>
        <p className="mb-6 max-w-3xl text-xs text-muted-foreground">
          El driver USB HID de BoliviaOS reconoce teclados estándar conectados a los puertos USB de la PlayStation 2 (probado y validado en modelos como Knup KP-2201). El mapeo de teclas se adapta automáticamente a cada herramienta activa del sistema:
        </p>
      </Reveal>

      {/* Pestañas de aplicaciones para Teclado USB */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {keyboardSubsystems.map((sub) => {
          const SubIcon = sub.icon;
          const isActive = sub.id === activeKbSubsystem;
          return (
            <button
              type="button"
              key={sub.id}
              onClick={() => setActiveKbSubsystem(sub.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "bg-surface text-muted-foreground hover:bg-card hover:text-foreground border border-border"
              }`}
            >
              <SubIcon className="h-3.5 w-3.5" />
              <span>{sub.name}</span>
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Knup Keyboard visual card */}
        <Reveal>
          <div className="card-soft relative flex flex-col items-center justify-center p-5 sm:p-8 bg-surface overflow-hidden">
            <div
              className="pointer-events-none absolute inset-0 opacity-30 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, color-mix(in oklab, var(--gold) 20%, transparent), transparent 70%)",
              }}
            />

            <div className="ds2-float relative z-10 flex items-center justify-center py-2 sm:py-4">
              <img
                src="/images/keyboard_knup_v3.png"
                alt="Teclado USB Knup KP-2201 compatible con PlayStation 2"
                width={2452}
                height={642}
                className="w-full max-w-[300px] sm:max-w-[340px] object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] select-none rounded-lg"
                loading="lazy"
              />
            </div>

            <div className="mt-3 sm:mt-4 text-center z-10">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-gold">
                Teclado USB HID · Knup KP-2201
              </span>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Driver USB con soporte universal validado en hardware real
              </p>
            </div>
          </div>
        </Reveal>

        {/* Keyboard Bindings for active subsystem */}
        <ul className="grid gap-2.5 sm:gap-3 sm:grid-cols-2">
          {currentKbSubsystem.bindings.map((b) => (
            <li key={b.label}>
              <div className="flex items-center gap-3 sm:gap-3.5 rounded-xl border border-border bg-card p-3 h-full transition-colors hover:border-gold/40">
                <div className="flex shrink-0 items-center justify-center gap-1.5 min-w-[40px] sm:min-w-[48px] h-9 sm:h-11">
                  {b.icons.map((icon, iconIdx) => (
                    <img
                      key={iconIdx}
                      src={icon}
                      alt={b.label}
                      width={48}
                      height={44}
                      className="h-8 sm:h-10 w-auto max-w-[56px] sm:max-w-[64px] object-contain drop-shadow-[0_3px_6px_rgba(0,0,0,0.5)] select-none"
                      loading="lazy"
                    />
                  ))}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="text-xs font-semibold text-foreground">
                    {b.label}
                  </div>
                  <div className="text-[11px] text-muted-foreground leading-snug mt-0.5">
                    {b.action}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
