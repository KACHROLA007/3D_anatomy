import { create } from 'zustand';
import type { NervousSystemRegion } from '../types/anatomy';

interface AnatomyState {
  selectedPartId: string | null;
  hoveredPartId: string | null;
  searchQuery: string;
  activeRegions: Set<NervousSystemRegion>;
  isRotating: boolean;
  // Actions
  selectPart: (id: string | null) => void;
  hoverPart: (id: string | null) => void;
  setSearchQuery: (q: string) => void;
  toggleRegion: (region: NervousSystemRegion) => void;
  toggleRotation: () => void;
}

export const useAnatomyStore = create<AnatomyState>((set) => ({
  selectedPartId: null,
  hoveredPartId: null,
  searchQuery: '',
  activeRegions: new Set(['brain', 'spinal_cord', 'cranial_nerves', 'peripheral_nerves', 'autonomic']),
  isRotating: true,

  selectPart: (id) => set({ selectedPartId: id }),
  hoverPart: (id) => set({ hoveredPartId: id }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  toggleRegion: (region) =>
    set((state) => {
      const next = new Set(state.activeRegions);
      if (next.has(region)) {
        next.delete(region);
      } else {
        next.add(region);
      }
      return { activeRegions: next };
    }),
  toggleRotation: () => set((state) => ({ isRotating: !state.isRotating })),
}));
