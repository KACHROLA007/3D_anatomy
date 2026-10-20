import React, { useState } from 'react';
import { useAnatomyStore } from '../../store/anatomyStore';
import SearchBar from './SearchBar';
import Modal from './Modal';

export default function Header() {
  const { isRotating, toggleRotation } = useAnatomyStore();
  const [showInstructions, setShowInstructions] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  return (
    <>
      <header className="app-header">
        <div className="header-center" style={{ marginLeft: 0 }}>
          <SearchBar />
        </div>

        <div className="header-actions">
          <button className="action-btn" onClick={() => setShowInstructions(true)} title="Controls & Instructions">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            Controls
          </button>
          
          <button className="action-btn" onClick={() => setShowAbout(true)} title="About NeuroAtlas">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
            About
          </button>

          <button
            id="btn-rotate"
            className={`action-btn ${isRotating ? 'active' : ''}`}
            onClick={toggleRotation}
            title={isRotating ? 'Pause rotation' : 'Auto-rotate'}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M14 8A6 6 0 1 1 8.5 2.07" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M9 2l3 1-1 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {isRotating ? 'Rotating' : 'Paused'}
          </button>
        </div>
      </header>

      <Modal isOpen={showInstructions} onClose={() => setShowInstructions(false)} title="Camera Controls">
        <p>Use the following keys to navigate the 3D anatomical model:</p>
        <ul>
          <li><span className="key-badge">W</span> <span className="key-badge">A</span> <span className="key-badge">S</span> <span className="key-badge">D</span> — Pan camera</li>
          <li><span className="key-badge">↑</span> <span className="key-badge">↓</span> <span className="key-badge">←</span> <span className="key-badge">→</span> — Pan camera (Arrows)</li>
          <li><span className="key-badge">+</span> or <span className="key-badge">=</span> — Zoom In</li>
          <li><span className="key-badge">-</span> or <span className="key-badge">_</span> — Zoom Out</li>
          <li><span className="key-badge">Hold R</span> — Fast Rotation</li>
          <li><strong>Left Click + Drag</strong> — Orbit / Rotate Camera</li>
        </ul>
        <p>Click on any highlighted structure to view its clinical details in the sidebar.</p>
      </Modal>

      <Modal isOpen={showAbout} onClose={() => setShowAbout(false)} title="About NeuroAtlas">
        <p><strong>NeuroAtlas</strong> is an interactive 3D explorer for the human nervous system.</p>
        <p>This project utilizes high-fidelity open-source 3D medical datasets. The core anatomical model was derived from the prestigious <a href="https://github.com/Z-Anatomy/Z-Anatomy" target="_blank" rel="noreferrer" style={{color: 'inherit', fontWeight: 600}}>Z-Anatomy</a> project.</p>
        
        <h3>Editable Section</h3>
        <p>
          <em>(You can easily edit this text by opening <code>src/components/ui/Header.tsx</code> and modifying the HTML inside the About Modal section.)</em>
        </p>
        <p>Built for medical students, professors, and professionals requiring accurate spatial relationships of neuroanatomy.</p>
      </Modal>
    </>
  );
}
