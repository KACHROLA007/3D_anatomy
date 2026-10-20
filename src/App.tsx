import React from 'react';
import AnatomyCanvas from './components/scene/AnatomyCanvas';
import Header from './components/ui/Header';
import InfoPanel from './components/ui/InfoPanel';
import RegionToggle from './components/ui/RegionToggle';
import StructureList from './components/ui/StructureList';
import { useAnatomyStore } from './store/anatomyStore';

function HintOverlay() {
  const { selectedPartId } = useAnatomyStore();
  if (selectedPartId) return null;
  return (
    <div className="hint-overlay">
      <div className="hint-card">
        <div className="hint-icon">👆</div>
        <p>Click any structure to explore</p>
        <p className="hint-sub">Drag to rotate · Scroll to zoom</p>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-root">
      <Header />

      <div className="app-body">
        {/* Left sidebar */}
        <aside className="sidebar-left">
          <RegionToggle />
          <StructureList />
          <div className="attribution">
            <p>Data: Z-Anatomy (CC BY-SA 4.0)</p>
            <p>BodyParts3D (CC BY-SA 2.1 JP)</p>
            <p style={{ marginTop: '8px', fontWeight: 600, color: 'var(--ink)' }}>Made by Rohan Kachrola</p>
          </div>
        </aside>

        {/* 3D canvas */}
        <main className="canvas-area">
          <AnatomyCanvas />
          <HintOverlay />
        </main>

        {/* Right info panel */}
        <aside className="sidebar-right">
          <InfoPanel />
        </aside>
      </div>
    </div>
  );
}
