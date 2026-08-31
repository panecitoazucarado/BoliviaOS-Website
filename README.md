# BoliviaOS — Sitio Web Oficial

Repositorio del sitio web oficial de **BoliviaOS**, un entorno multifunción y sistema operativo homebrew para **PlayStation 2 (PS2)** basado en Open PS2 Loader.

---

## Acerca del Proyecto

BoliviaOS amplía las capacidades de Open PS2 Loader reuniendo lanzamiento de juegos, exploración de archivos, reproducción de audio, edición de código y utilidades de sistema avanzadas en una interfaz integrada y optimizada para el hardware de PlayStation 2.

### Características Principales de BoliviaOS

- **Lanzador de juegos**: Carga de títulos de PS2 y PS1 desde disco duro interno (HDD), almacenamiento USB, red local (SMB) y tarjetas SD (MX4SIO).
- **Explorador de archivos**: Acceso completo a todas las unidades del sistema (`mc0:`, `mc1:`, `mass0:`, `mass1:`, `hdd0:`, `host:`, `cdfs:`).
- **SuperTerminal CLI**: Consola interactiva nativa con comandos estándar UNIX, diagnósticos en tiempo real (`sysinfo`, `meminfo`, `ifconfig`, `ping`) y motor 3D ASCII a 60 FPS.
- **Reproductor de audio**: Decodificación por hardware de archivos MP3 y OGG Vorbis con visualizador de espectro.
- **Editor de texto y JavaScript**: Edición directa de archivos `.txt`, `.cfg` y scripts `.js` con resaltado de sintaxis en tiempo real, numeración de líneas y portapapeles.
- **Visor de imágenes**: Motor JPEG acelerado por la IPU del Emotion Engine y visor PNG avanzado con zoom de hasta 6x, paneo y análisis de transparencia.
- **Visor de fuentes TTF**: Previsualización y análisis de archivos TrueType en cuatro pestañas con parser binario de tablas (`name`, `OS/2`, `head`, `cmap`, `maxp`).
- **Memory Card Annihilator (MCA)**: Formateo, diagnóstico y rescate de tarjetas de memoria de 8 MB a 128 MB.
- **Control Dual**: Soporte completo para mando DualShock 2 y teclados físicos USB HID.

---

## Stack Tecnológico del Sitio Web

- **Framework**: React 19 + TanStack Start / TanStack Router
- **Estilos**: Tailwind CSS + Radix UI Primitives
- **Lenguaje**: TypeScript
- **Entorno y empaquetador**: Bun / Vite
- **Iconografía**: Lucide React + Assets vectoriales optimizados

---

## Desarrollo Local

Para ejecutar el portal web en tu entorno local:

```bash
# 1. Clonar el repositorio
git clone https://github.com/panecitoazucarado/BoliviaOS-Website.git
cd BoliviaOS-Website

# 2. Instalar dependencias
bun install

# 3. Iniciar el servidor de desarrollo
bun dev
```

El servidor estará disponible en `http://localhost:8080`.

### Compilación para Producción

```bash
# Generar el build optimizado
bun run build

# Previsualizar el build de producción
bun preview
```

---

## Autor

- **Desarrollador**: José Manuel Alvarez (*NightlySki_Zero*)
- **Ubicación**: Villa Montes, Tarija, Bolivia
- **Canal de YouTube**: [@josemayt6235](https://www.youtube.com/@josemayt6235)

---

## Licencia y Atribución

Este portal web y el proyecto BoliviaOS son desarrollos para la comunidad homebrew de PlayStation 2 por @Josema. PlayStation 2 es una marca registrada de Sony Interactive Entertainment Inc. Este proyecto es independiente y no está respaldado ni afiliado con Sony.
