# 🧠 NeuroAtlas — Interactive 3D Nervous System Explorer

> **An interactive desktop application that lets you explore the human nervous system in stunning 3D — click on any brain structure, nerve, or spinal region to instantly learn its name, function, and clinical relevance.**

---

## 📖 Table of Contents

1. [What Is NeuroAtlas?](#-what-is-neuroatlas)
2. [Who Is This For?](#-who-is-this-for)
3. [What Can You Do With It?](#-what-can-you-do-with-it)
4. [Features at a Glance](#-features-at-a-glance)
5. [How to Run the App](#-how-to-run-the-app)
6. [How We Built It — Full Technical Documentation](#-how-we-built-it--full-technical-documentation)
7. [Data Sources & Credits](#-data-sources--credits)
8. [License](#-license)

---

## 🌟 What Is NeuroAtlas?

**NeuroAtlas** is a desktop application that displays a fully interactive, rotatable 3D model of the human nervous system. Instead of reading flat textbook diagrams, you can:

- 🖱️ **Hover** over any part to see its name pop up as a floating label
- 👆 **Click** any structure to open a detailed information card on the right
- 🔍 **Search** for any nerve or brain region by name using the top search bar
- 👁️ **Toggle** entire regions on/off (e.g., hide peripheral nerves, show only the brain)
- 🔄 **Rotate, zoom, and pan** around the model freely with your mouse or keyboard

Think of it as Google Maps — but for the inside of your head.

---

## 👥 Who Is This For?

| Audience | How NeuroAtlas Helps |
|---|---|
| 🎓 Medical / Nursing Students | Visualise spatial relationships of structures before exams |
| 👨‍🏫 Professors & Educators | Use as a live teaching aid in lectures |
| 🏥 Healthcare Professionals | Quick reference for anatomy refreshers |
| 🔬 Researchers | Understand high-level nervous system organization |
| 😊 Curious Minds | Simply fascinating to explore! |

---

## ✅ What Can You Do With It?

### Navigating the 3D Model

| Action | How To Do It |
|---|---|
| **Rotate** the model | Left-click and drag |
| **Zoom** in/out | Scroll the mouse wheel |
| **Pan** (move sideways/up/down) | Right-click and drag, or use **W A S D** / **Arrow keys** |
| **Zoom with keyboard** | Press **+** to zoom in, **-** to zoom out |
| **Fast spin** | Hold the **R** key |
| **Auto-rotate toggle** | Click the **"Rotating / Paused"** button in the top-right corner |

### Exploring Structures

| Action | How To Do It |
|---|---|
| **See a structure's name** | Hover your mouse over it — a label floats above it |
| **Open the info card** | Click on any highlighted part |
| **Close the info card** | Click the X button, or click empty space |
| **Jump to a related structure** | Click any chip in the "Related Structures" section of the info card |
| **Open full Wikipedia article** | Click "More Information" at the bottom of the info card |
| **Search by name** | Type in the search bar at the top |

### Filtering Regions

Use the **Toggle Regions** panel in the left sidebar to show/hide:

- 🧠 **Brain** (cerebrum, all 4 lobes, cerebellum, brainstem, deep structures)
- 🦴 **Spinal Cord**
- ⚡ **Cranial Nerves** (optic, vagus, trigeminal, facial, etc.)
- 🕸️ **Peripheral Nerves** (sciatic, brachial plexus, etc.)

---

## 🛠️ Features at a Glance

- ✅ Real medical-grade 3D model (from the open-source **Z-Anatomy** project)
- ✅ 20+ individually documented structures with descriptions
- ✅ Clinical relevance notes for every structure (what happens when it's damaged)
- ✅ Live search across all structures
- ✅ Smooth animations powered by **Framer Motion**
- ✅ Dark theme with colour-coded regions
- ✅ Works fully **offline** — no internet needed after installation
- ✅ Packaged as a portable **Windows .exe** — no installer required

---

## 🚀 How to Run the App

### Option A — Run the Pre-built App (Easiest — No Coding Required)

1. Find the file `NeuroAtlas.exe` inside the `electron-dist/` folder
2. Double-click it — done! The app opens immediately.
3. No installation, no setup, no internet connection needed.

---

### Option B — Run in Developer Mode (For Developers)

This requires [Node.js](https://nodejs.org) to be installed on your computer.

**Step 1 — Install dependencies**
```bash
npm install
```

**Step 2 — Start the development server**
```bash
npm run dev
```

This opens the app in your browser at `http://localhost:5173`. Changes to the code reload the browser automatically.

**Step 3 — (Optional) Build the desktop app**
```bash
npm run electron:build
```

This packages everything into a portable `NeuroAtlas.exe` file inside the `electron-dist/` folder.

---

## 🔬 How We Built It — Full Technical Documentation

> This section explains *exactly* how the project was built, from the ideas behind it to the code that powers it. Written so anyone — technical or not — can follow along.

---

### Project Overview

NeuroAtlas is a **desktop application** that wraps a **web application** inside a native window. Here is the big picture:

```
+----------------------------------------------------------+
|                    NeuroAtlas.exe                        |
|  +----------------------------------------------------+  |
|  |          Electron (Desktop Shell)                  |  |
|  |  +----------------------------------------------+  |  |
|  |  |       React Web App (runs inside)            |  |  |
|  |  |                                              |  |  |
|  |  +----------------------------------------------+  |  |
|  +----------------------------------------------------+  |
+----------------------------------------------------------+
```

The 3D model file (`human_body.glb`) is a **GLB** file — a compact binary format used for 3D assets (similar to a ZIP file but for 3D scenes).

---

### Tech Stack (Plain English)

| Technology | What It Is | Why We Used It |
|---|---|---|
| **React 19** | A JavaScript library for building user interfaces | Lets us build each panel (sidebar, header, info card) as an independent, reusable "component" |
| **TypeScript** | JavaScript with type-checking | Catches bugs before the app even runs — like a spell-checker for code |
| **Three.js** | A 3D graphics library for the web | Powers the actual 3D rendering of the anatomy model |
| **React Three Fiber** | Connects Three.js with React | Lets us write 3D scenes using React's syntax instead of raw Three.js code |
| **@react-three/drei** | A helper toolkit for React Three Fiber | Ready-made tools: orbit controls, environment lighting, HTML labels in 3D space |
| **Framer Motion** | An animation library for React | Drives the smooth slide-in/out animation of the information panel |
| **Zustand** | A state management library | Acts as shared memory for the app — tracks what is selected, which regions are visible, etc. |
| **Vite** | A fast build tool | Bundles all code into optimised files; extremely fast during development |
| **Electron** | A framework to wrap web apps as desktop apps | Packages our web app into a .exe file that runs like any normal desktop program |
| **electron-builder** | A packaging tool for Electron | Creates the final portable .exe file |
| **Oxlint** | A code linter | Flags potential bugs and style issues in the code |

---

### Folder Structure Explained

```
3D_anatomy/
|
+-- src/                          <- All the source code lives here
|   +-- main.tsx                  <- Entry point: mounts the React app
|   +-- App.tsx                   <- Root layout: arranges 3 panels (left sidebar, 3D canvas, right panel)
|   +-- index.css                 <- All visual styling (colours, fonts, layout, animations)
|   |
|   +-- components/
|   |   +-- scene/
|   |   |   +-- AnatomyCanvas.tsx     <- Sets up the 3D scene (camera, lights, controls)
|   |   |   +-- NervousSystemModel.tsx <- Loads the GLB model, handles click/hover, applies materials
|   |   |
|   |   +-- ui/
|   |       +-- Header.tsx        <- Top bar with search, rotation toggle, Controls & About modals
|   |       +-- InfoPanel.tsx     <- Right panel showing selected structure's details
|   |       +-- RegionToggle.tsx  <- Left sidebar buttons to show/hide regions
|   |       +-- StructureList.tsx <- Left sidebar list of all structures
|   |       +-- SearchBar.tsx     <- Search input that filters structures in real time
|   |       +-- Modal.tsx         <- Reusable popup dialog
|   |
|   +-- store/
|   |   +-- anatomyStore.ts       <- Global state: selected part, hovered part, active regions, rotation
|   |
|   +-- data/
|   |   +-- nervousSystem.ts      <- Database of 20+ structures with descriptions, functions, clinical notes
|   |
|   +-- types/
|       +-- anatomy.ts            <- TypeScript type definitions (data shapes)
|
+-- public/
|   +-- models/
|       +-- human_body.glb        <- The 3D anatomy model file
|
+-- electron-main.js              <- Electron entry point: creates the desktop window
+-- vite.config.ts                <- Vite bundler configuration
+-- package.json                  <- Project metadata, dependencies, and build scripts
+-- tsconfig.json                 <- TypeScript compiler settings
+-- electron-dist/                <- Output folder for the packaged .exe app
```

---

### How Each Piece Works

#### 1. The 3D Model (`NervousSystemModel.tsx`)

This is the heart of the app. Here is what happens step by step:

**Step 1 — Load the model**
The `.glb` file is loaded using `useGLTF` from `@react-three/drei`. This gives us a `scene` object containing hundreds of individual 3D meshes (one per anatomical part — for example, one mesh for the hippocampus, one for the sciatic nerve, etc.).

**Step 2 — Name mapping**
The Z-Anatomy model names meshes using very detailed medical terms (e.g., `"corticospinal tract"`, `"ophthalmic nerve"`). We wrote a function called `getStructureIdForMeshName()` that translates these raw names into our internal IDs (e.g., `"spinal_cord"`, `"trigeminal_nerve"`). This is essentially a large lookup dictionary.

**Step 3 — Dynamic materials**
Every time the app state changes, we loop through all meshes and update their appearance:
- If a mesh matches the **selected** structure → apply a **yellow glowing** material
- If it matches the **hovered** structure → apply a **lighter highlight** material
- Otherwise → apply the **default grey** translucent material

**Step 4 — Visibility filtering**
Meshes belonging to toggled-off regions are set to `visible = false`, making them disappear from the scene entirely.

**Step 5 — Floating label**
When you hover a structure, the `<Html>` component from Drei renders a small white tooltip floating in 3D space above the model. It always faces the camera.

---

#### 2. The 3D Canvas (`AnatomyCanvas.tsx`)

Sets up the entire 3D scene that the model lives inside:

- **Camera** — Positioned slightly above and in front of the model, with a 50-degree field of view (similar to a slightly wide-angle camera lens).
- **Lighting** — Four lights create a dramatic, clean medical-look feel:
  - A soft ambient light (base illumination across the whole scene)
  - A main directional light with cool white colour and shadow casting (acts like a studio key light)
  - A fill directional light from the opposite side (blue tint, softens shadows)
  - Two small point lights (purple and cyan) that create coloured highlights on the model's edges
- **OrbitControls** — The standard 3D mouse controls: drag to rotate, scroll to zoom, right-drag to pan.
- **CustomKeyboardControls** — Our own keyboard movement handler. It uses physics-based acceleration: pressing a key builds up speed, and releasing it causes smooth deceleration (like friction). This gives the navigation a smooth, polished feel.

---

#### 3. The Information Panel (`InfoPanel.tsx`)

When you click a structure, here is what happens:

1. The store's `selectedPartId` is updated to the clicked structure's ID (e.g., `"hippocampus"`).
2. `InfoPanel` reads that ID and looks up the full data in the `NERVOUS_SYSTEM_DATA` dictionary.
3. It renders a card with:
   - The structure's **name** and **Latin name**
   - A coloured **region badge** (e.g., "Brain" in purple, "Peripheral" in green)
   - A short **description** in plain English
   - A bulleted list of **key functions**
   - A highlighted **clinical relevance** box (what goes wrong when it is damaged)
   - Clickable **related structure chips** that let you jump to connected parts
   - A **"More Information"** button that opens the Wikipedia article
4. **Framer Motion** animates the entire panel: it slides in from the right side of the screen when opened and slides back out when closed. The transition uses a spring physics effect for a natural feel.

---

#### 4. The Data (`nervousSystem.ts`)

A hand-curated database of 20+ nervous system structures. Every entry follows this structure:

```
Structure entry example (Hippocampus):
  - id: hippocampus
  - name: Hippocampus
  - Latin name: Hippocampus
  - region: brain
  - description: "The seahorse-shaped structure critical for forming new long-term memories..."
  - functions: [Long-term memory formation, Spatial navigation, Emotional memory]
  - clinicalRelevance: "Bilateral damage (e.g. Alzheimer's disease, anoxia) causes anterograde amnesia..."
  - relatedStructures: [amygdala, thalamus, temporal_lobe]
  - colour: amber/gold
  - Wikipedia link
```

All descriptions and clinical notes were written to be medically accurate while remaining accessible to students.

---

#### 5. Global State (`anatomyStore.ts`)

Powered by **Zustand**, this is the app's central "memory". Any component anywhere in the app can read from it or write to it without complicated prop-passing.

Think of it like a shared whiteboard:
- **selectedPartId** — which structure is currently clicked (empty if none)
- **hoveredPartId** — which structure the mouse is currently over
- **searchQuery** — the text currently typed in the search bar
- **activeRegions** — a list of which anatomical regions are currently visible (brain, spinal cord, etc.)
- **isRotating** — whether the model is currently auto-rotating

When any of these values change, every component that uses them automatically updates — no manual refresh needed.

---

#### 6. The Desktop Shell (`electron-main.js`)

Electron wraps our web app in a real desktop window. Here is our custom setup:

1. **Starts a local HTTP server** on a random available port (e.g., `http://127.0.0.1:54321`)
2. **Serves the built React app** from the `dist/` folder, including all `.glb`, `.css`, `.js`, and image files with the correct file types
3. **Opens a browser window** pointing to that local server — this is what you see as the "app"
4. The window has no menu bar, a minimum size of 900×600, and a very dark background to prevent white flashing during startup.

> **Why a local server instead of loading files directly?**
> Loading a `.glb` 3D model directly from the file system via a `file://` path causes browser security errors (known as CORS errors). Running a tiny local HTTP server bypasses this completely and cleanly.

---

#### 7. The Build Pipeline

How the app goes from source code to a .exe file:

```
Source Code (TypeScript / TSX files)
        |
        v
   TypeScript Compiler  (checks for type errors — catches bugs early)
        |
        v
   Vite Bundler  (combines and optimises all JS, CSS, assets into dist/ folder)
        |
        v
   electron-builder  (wraps dist/ + electron-main.js into NeuroAtlas.exe)
```

All of this runs with a single command:
```bash
npm run electron:build
```

---

## 📦 Data Sources & Credits

| Resource | Source | License |
|---|---|---|
| 3D Anatomical Model | [Z-Anatomy Project](https://github.com/Z-Anatomy/Z-Anatomy) | CC BY-SA 4.0 |
| Reference Mesh Data | BodyParts3D, DBCLS | CC BY-SA 2.1 JP |
| Medical descriptions | Hand-written, Wikipedia-referenced | — |

**Built by Rohan Kachrola**

---

## 📄 License

This project is for educational and personal use. The 3D model assets are governed by their respective open-source licences (CC BY-SA 4.0 and CC BY-SA 2.1 JP). All attribution must be preserved in any redistributed version.

---

*Made with love, Three.js, and a lot of neuroanatomy textbooks.*
