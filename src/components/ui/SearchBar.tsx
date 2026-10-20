import React, { useCallback } from 'react';
import { useAnatomyStore } from '../../store/anatomyStore';
import { ALL_STRUCTURES } from '../../data/nervousSystem';

export default function SearchBar() {
  const { searchQuery, setSearchQuery, selectPart } = useAnatomyStore();

  const handleSelect = useCallback(
    (id: string) => {
      selectPart(id);
      setSearchQuery('');
    },
    [selectPart, setSearchQuery]
  );

  const results = searchQuery.length > 1
    ? ALL_STRUCTURES.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.latinName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (s.abbreviation?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false)
      ).slice(0, 6)
    : [];

  return (
    <div className="search-container">
      <div className="search-input-wrap">
        <svg className="search-icon" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.6" />
          <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
        <input
          id="anatomy-search"
          type="text"
          className="search-input"
          placeholder="Search structures, CN, lobes…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          autoComplete="off"
        />
        {searchQuery && (
          <button className="search-clear" onClick={() => setSearchQuery('')} aria-label="Clear search">×</button>
        )}
      </div>

      {results.length > 0 && (
        <ul className="search-dropdown" role="listbox">
          {results.map((s) => (
            <li key={s.id}>
              <button
                className="search-result-item"
                onClick={() => handleSelect(s.id)}
                role="option"
              >
                <span
                  className="search-result-dot"
                  style={{ background: s.color }}
                />
                <div>
                  <div className="search-result-name">{s.name}</div>
                  <div className="search-result-latin">{s.latinName}</div>
                </div>
                {s.abbreviation && (
                  <span className="search-result-abbrev">{s.abbreviation}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
