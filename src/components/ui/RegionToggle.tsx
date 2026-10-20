import React from 'react';
import { useAnatomyStore } from '../../store/anatomyStore';
import type { NervousSystemRegion } from '../../types/anatomy';

const REGIONS: { id: NervousSystemRegion; label: string; icon: string; color: string }[] = [
  { id: 'brain', label: 'Brain', icon: '🧠', color: '#c084fc' },
  { id: 'spinal_cord', label: 'Spinal Cord', icon: '🦴', color: '#38bdf8' },
  { id: 'cranial_nerves', label: 'Cranial Nerves', icon: '⚡', color: '#06b6d4' },
  { id: 'peripheral_nerves', label: 'Peripheral', icon: '🕸', color: '#34d399' },
];

export default function RegionToggle() {
  const { activeRegions, toggleRegion } = useAnatomyStore();

  return (
    <div className="region-toggle">
      <p className="toggle-label">Toggle Regions</p>
      <div className="toggle-buttons">
        {REGIONS.map(({ id, label, icon, color }) => {
          const active = activeRegions.has(id);
          return (
            <button
              key={id}
              id={`toggle-${id}`}
              className={`toggle-btn ${active ? 'active' : ''}`}

              onClick={() => toggleRegion(id)}
              title={`Toggle ${label}`}
            >
              <span className="toggle-icon">{icon}</span>
              <span className="toggle-text">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
