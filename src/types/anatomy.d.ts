export type NervousSystemRegion =
  | 'brain'
  | 'spinal_cord'
  | 'cranial_nerves'
  | 'peripheral_nerves'
  | 'autonomic';

export interface NerveStructure {
  id: string;
  name: string;
  latinName: string;
  abbreviation?: string;
  region: NervousSystemRegion;
  shortDescription: string;
  moreInfoUrl: string;
  clinicalRelevance: string;
  functions: string[];
  color: string;            // hex, used for mesh material
  position: [number, number, number]; // approximate 3D position for label anchor
  relatedStructures: string[]; // ids of related nerves
}

export interface AnatomyStore {
  selectedPartId: string | null;
  hoveredPartId: string | null;
  searchQuery: string;
  isInfoPanelOpen: boolean;
  isRotating: boolean;
}
