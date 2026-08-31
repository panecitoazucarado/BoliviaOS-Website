import { useEffect } from "react";

/**
 * SecurityShield — Subsistema de protección y blindaje de cliente para BoliviaOS Portal.
 *
 * Protecciones activas:
 * - Deshabilita el menú contextual (Click Derecho).
 * - Bloquea atajos de inspección y herramientas de desarrollo (F12, Ctrl+Shift+I/J/C, Cmd+Opt+I/J/C).
 * - Bloquea visualización de código fuente en navegador (Ctrl+U / Cmd+Opt+U).
 * - Bloquea guardado o volcado no autorizado de la página (Ctrl+S, Ctrl+P).
 * - Deshabilita arrastre de imágenes para prevenir extracción directa.
 * - Mensaje disuasivo y neutralización en consola del navegador.
 */
export function SecurityShield() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // 1. Mensaje de advertencia disuasiva en consola de desarrollador
    const showSecurityBanner = () => {
      try {
        console.clear();
        console.log(
          "%c BoliviaOS Security Shield %c Sistema de Protección Activo ",
          "background: #0f6f43; color: #ffffff; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 4px 0 0 4px;",
          "background: #0d1520; color: #38bdf8; font-size: 14px; font-weight: bold; padding: 4px 8px; border-radius: 0 4px 4px 0;"
        );
        console.log(
          "%c[AVISO] El acceso y la modificación no autorizada de este sitio web están restringidos. Cualquier intento de alteración de estado será neutralizado.",
          "color: #94a3b8; font-size: 12px; font-family: monospace; margin-top: 6px;"
        );
      } catch {
        // Silenciar cualquier excepción de consola
      }
    };

    showSecurityBanner();

    // 2. Bloqueo de Click Derecho (Menú Contextual)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // 3. Bloqueo de Atajos de Teclado de Inspección y Extracción
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const cmdOrCtrl = isMac ? e.metaKey : e.ctrlKey;

      // F12 -> DevTools
      if (e.key === "F12" || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+Shift+I / Cmd+Option+I -> Inspeccionar Elemento
      // Ctrl+Shift+J / Cmd+Option+J -> Abrir Consola
      // Ctrl+Shift+C / Cmd+Option+C -> Selector de Elementos
      // Ctrl+Shift+K / Cmd+Option+K -> Firefox Dev Console
      if (
        (cmdOrCtrl && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c" || e.key === "K" || e.key === "k")) ||
        (isMac && e.metaKey && e.altKey && (e.key === "I" || e.key === "i" || e.key === "J" || e.key === "j" || e.key === "C" || e.key === "c" || e.key === "U" || e.key === "u"))
      ) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+U / Cmd+Option+U -> Ver Código Fuente (View Source)
      if (cmdOrCtrl && (e.key === "U" || e.key === "u")) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+S / Cmd+S -> Guardar Página Completa
      if (cmdOrCtrl && (e.key === "S" || e.key === "s")) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Ctrl+P / Cmd+P -> Imprimir Página
      if (cmdOrCtrl && (e.key === "P" || e.key === "p")) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
    };

    // 4. Bloqueo de arrastre de imágenes y assets
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === "IMG") {
        e.preventDefault();
      }
    };

    // Registrar listeners en la fase de captura más alta
    window.addEventListener("contextmenu", handleContextMenu, { capture: true });
    window.addEventListener("keydown", handleKeyDown, { capture: true });
    window.addEventListener("dragstart", handleDragStart, { capture: true });

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu, { capture: true });
      window.removeEventListener("keydown", handleKeyDown, { capture: true });
      window.removeEventListener("dragstart", handleDragStart, { capture: true });
    };
  }, []);

  return null;
}
