import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnatomyStore } from '../../store/anatomyStore';
import { NERVOUS_SYSTEM_DATA, REGION_LABELS } from '../../data/nervousSystem';

const REGION_COLORS: Record<string, string> = {
  brain: '#c084fc',
  spinal_cord: '#38bdf8',
  cranial_nerves: '#06b6d4',
  peripheral_nerves: '#34d399',
  autonomic: '#f97316',
};

export default function InfoPanel() {
  const { selectedPartId, selectPart } = useAnatomyStore();
  const structure = selectedPartId ? NERVOUS_SYSTEM_DATA[selectedPartId] : null;

  return (
    <AnimatePresence>
      {structure && (
        <motion.div
          key={selectedPartId}
          className="info-panel"
          initial={{ x: 340, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 340, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        >
          {/* Header */}
          <div className="info-panel-header">
            <div>
              <div
                className="region-badge"
                style={{ background: `${REGION_COLORS[structure.region]}22`, color: REGION_COLORS[structure.region], borderColor: `${REGION_COLORS[structure.region]}55` }}
              >
                {REGION_LABELS[structure.region]}
              </div>
              <h2 className="info-name">{structure.name}</h2>
              {structure.abbreviation && (
                <span className="info-abbrev">{structure.abbreviation}</span>
              )}
              <p className="info-latin">{structure.latinName}</p>
            </div>
            <button className="close-btn" onClick={() => selectPart(null)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M2 2l14 14M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Color accent bar */}
          <div className="color-bar" style={{ background: `linear-gradient(90deg, ${structure.color}cc, transparent)` }} />

          {/* Short description */}
          <div className="info-section">
            <p className="info-description">{structure.shortDescription}</p>
          </div>

          {/* Functions */}
          <div className="info-section">
            <h3 className="section-title">Key Functions</h3>
            <ul className="function-list">
              {structure.functions.map((fn) => (
                <li key={fn} className="function-item">
                  <span className="function-dot" style={{ background: structure.color }} />
                  {fn}
                </li>
              ))}
            </ul>
          </div>

          {/* Clinical relevance */}
          <div className="info-section clinical-box">
            <h3 className="section-title" style={{ color: '#f87171' }}>
              <span className="clinical-icon">⚕</span> Clinical Relevance
            </h3>
            <p className="clinical-text">{structure.clinicalRelevance}</p>
          </div>

          {/* Related structures */}
          {structure.relatedStructures.length > 0 && (
            <div className="info-section">
              <h3 className="section-title">Related Structures</h3>
              <div className="related-list">
                {structure.relatedStructures
                  .filter((rid) => NERVOUS_SYSTEM_DATA[rid])
                  .map((rid) => {
                    const rel = NERVOUS_SYSTEM_DATA[rid];
                    return (
                      <button
                        key={rid}
                        className="related-chip"
                        style={{ borderColor: `${rel.color}55`, color: rel.color }}
                        onClick={() => selectPart(rid)}
                      >
                        {rel.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          )}

          {/* More info button */}
          <a
            href={structure.moreInfoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="more-info-btn"
            style={{ '--accent': structure.color } as React.CSSProperties}
          >
            <span>More Information</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
