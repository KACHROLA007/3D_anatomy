import React from 'react';
import { useAnatomyStore } from '../../store/anatomyStore';
import { ALL_STRUCTURES } from '../../data/nervousSystem';

const REGION_COLORS: Record<string, string> = {
  brain: '#c084fc',
  spinal_cord: '#38bdf8',
  cranial_nerves: '#06b6d4',
  peripheral_nerves: '#34d399',
};

export default function StructureList() {
  const { selectedPartId, selectPart, activeRegions } = useAnatomyStore();

  const grouped = ALL_STRUCTURES.reduce<Record<string, typeof ALL_STRUCTURES>>((acc, s) => {
    if (!acc[s.region]) acc[s.region] = [];
    acc[s.region].push(s);
    return acc;
  }, {});

  return (
    <div className="structure-list">
      <p className="structure-list-title">All Structures</p>
      {Object.entries(grouped).map(([region, structures]) => {
        if (!activeRegions.has(region as any)) return null;
        
        return (
          <div key={region} className="structure-group">
          <div
            className="structure-group-header"
            style={{ color: REGION_COLORS[region] ?? '#888' }}
          >
            {region.replace('_', ' ').toUpperCase()}
          </div>
          {structures.map((s) => {
            const isActive = activeRegions.has(s.region);
            const isSelected = selectedPartId === s.id;
            return (
              <button
                key={s.id}
                className={`structure-item ${isSelected ? 'selected' : ''} ${!isActive ? 'dimmed' : ''}`}
                style={isSelected ? { borderLeftColor: s.color } : {}}
                onClick={() => selectPart(isSelected ? null : s.id)}
              >
                <span className="structure-dot" style={{ background: s.color }} />
                <div className="structure-item-info">
                  <span className="structure-item-name">{s.name}</span>
                  {s.abbreviation && (
                    <span className="structure-item-abbrev">{s.abbreviation}</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
        );
      })}
    </div>
  );
}
