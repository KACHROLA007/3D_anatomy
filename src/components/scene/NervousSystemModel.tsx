import React, { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Html, useGLTF } from '@react-three/drei';
import { useAnatomyStore } from '../../store/anatomyStore';
import { ALL_STRUCTURES } from '../../data/nervousSystem';

// Map Z-Anatomy mesh names to our internal structure IDs
function getStructureIdForMeshName(meshName: string): string | null {
  const normalized = meshName.toLowerCase();

  // Specific cranial and peripheral nerves
  if (normalized.includes('sciatic')) return 'sciatic_nerve';
  if (normalized.includes('vagus')) return 'vagus_nerve';
  if (normalized.includes('trigeminal') || normalized.includes('ophthalmic') || normalized.includes('maxillary') || normalized.includes('mandibular')) return 'trigeminal_nerve';
  if (normalized.includes('facial nerve')) return 'facial_nerve';
  if (normalized.includes('optic')) return 'optic_nerve';
  if (normalized.includes('brachial plexus') || normalized.includes('trunk of brachial plexus') || normalized.includes('cord of brachial plexus')) return 'brachial_plexus';

  // Spinal cord (Z-Anatomy splits this heavily into dura, ganglia, roots, etc.)
  if (normalized.includes('spinal') || normalized.includes('corticospinal') || normalized.includes('reticulospinal') || normalized.includes('vestibulospinal') || normalized.includes('tectospinal')) return 'spinal_cord';

  // Brainstem
  if (normalized.includes('brainstem') || normalized.includes('medulla') || normalized.includes('pons') || normalized.includes('midbrain') || normalized.includes('olive') || normalized.includes('pyramid') || normalized.includes('colliculus') || normalized.includes('peduncle') || normalized.includes('tegmentum')) return 'brainstem';

  // Cerebellum (all the tiny lobules)
  if (normalized.includes('cerebellum') || normalized.includes('lobule') || normalized.includes('vermis') || normalized.includes('flocculus') || normalized.includes('tonsil') || normalized.includes('culmen') || normalized.includes('declive')) return 'cerebellum';

  // Deep brain structures
  if (normalized.includes('hippocampus') || normalized.includes('hippocampal') || normalized.includes('dentate gyrus')) return 'hippocampus';
  if (normalized.includes('amygdala') || normalized.includes('amygdaloid')) return 'amygdala';
  if (normalized.includes('thalamus') || normalized.includes('thalamic') || normalized.includes('geniculate')) return 'thalamus';
  if (normalized.includes('hypothalamus') || normalized.includes('hypothalamic') || normalized.includes('mammillary') || normalized.includes('infundibulum')) return 'hypothalamus';
  if (normalized.includes('corpus callosum') || normalized.includes('splenium') || normalized.includes('genu') || normalized.includes('rostrum')) return 'corpus_callosum';

  // Lobes (often broken into gyri)
  if (normalized.includes('frontal lobe') || normalized.includes('frontal gyrus') || normalized.includes('precentral')) return 'frontal_lobe';
  if (normalized.includes('parietal lobe') || normalized.includes('parietal gyrus') || normalized.includes('postcentral') || normalized.includes('precuneus')) return 'parietal_lobe';
  if (normalized.includes('temporal lobe') || normalized.includes('temporal gyrus')) return 'temporal_lobe';
  if (normalized.includes('occipital lobe') || normalized.includes('occipital gyrus') || normalized.includes('cuneus')) return 'occipital_lobe';

  // Fallback for general brain/cerebrum (gyri, sulci, cortex, ventricles)
  if (normalized.includes('brain') || normalized.includes('cerebrum') || normalized.includes('gyrus') || normalized.includes('sulcus') || normalized.includes('cortex') || normalized.includes('ventricle') || normalized.includes('matter')) return 'cerebrum';

  return null;
}

// Fallback region guesser for unmapped tiny parts
function getFallbackRegion(meshName: string): string {
  const normalized = meshName.toLowerCase();
  if (normalized.includes('nerve') || normalized.includes('plexus') || normalized.includes('ganglion') || normalized.includes('root')) return 'peripheral_nerves';
  if (normalized.includes('spinal') || normalized.includes('tract')) return 'spinal_cord';
  return 'brain';
}

export default function NervousSystemModel() {
  const groupRef = useRef<THREE.Group>(null);
  const { isRotating, selectedPartId, hoveredPartId, selectPart, hoverPart, activeRegions } = useAnatomyStore();
  const { scene } = useGLTF('./models/human_body.glb');

  // Custom materials for our clean medical theme
  const defaultMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#888888',
    roughness: 0.6,
    metalness: 0.1,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  }), []);

  const hoverMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#333333',
    roughness: 0.4,
    metalness: 0.1,
    transparent: true,
    opacity: 1.0,
    emissive: '#222222',
    side: THREE.DoubleSide
  }), []);

  const selectMat = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: '#eab308', // Yellow
    roughness: 0.3,
    metalness: 0.2,
    transparent: false,
    opacity: 1.0,
    emissive: '#4d3800',
    side: THREE.DoubleSide
  }), []);

  const [fastRotate, setFastRotate] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => { if (e.key.toLowerCase() === 'r') setFastRotate(true); };
    const up = (e: KeyboardEvent) => { if (e.key.toLowerCase() === 'r') setFastRotate(false); };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => { window.removeEventListener('keydown', down); window.removeEventListener('keyup', up); }
  }, []);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      if (fastRotate) {
        groupRef.current.rotation.y += delta * 0.8;
      } else if (isRotating) {
        groupRef.current.rotation.y += delta * 0.18;
      }
    }
  });

  // Apply materials dynamically based on selection state
  useEffect(() => {
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;

        const meshStructId = getStructureIdForMeshName(mesh.name) || mesh.name;
        const isSelected = selectedPartId !== null && meshStructId === selectedPartId;
        const isHovered = hoveredPartId !== null && meshStructId === hoveredPartId;

        mesh.material = isSelected ? selectMat : isHovered ? hoverMat : defaultMat;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        // Toggle visibility based on active region
        const struct = ALL_STRUCTURES.find(s => s.id === meshStructId);
        const region = struct ? struct.region : getFallbackRegion(mesh.name);
        mesh.visible = activeRegions.has(region as any);
      }
    });
  }, [scene, selectedPartId, hoveredPartId, defaultMat, hoverMat, selectMat, activeRegions]);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (e.object && e.object.name) {
      const id = getStructureIdForMeshName(e.object.name) || e.object.name;
      hoverPart(id);
    }
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    hoverPart(null);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    if (e.object && e.object.name) {
      const id = getStructureIdForMeshName(e.object.name) || e.object.name;
      selectPart(selectedPartId === id ? null : id);
    }
  };

  return (
    <group ref={groupRef} position={[0, -4.5, 0]}>
      <primitive
        object={scene}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
        scale={3.5}
      />

      {/* Floating label for hovered part */}
      {hoveredPartId && (() => {
        const struct = ALL_STRUCTURES.find(s => s.id === hoveredPartId);
        const labelName = struct ? struct.name : hoveredPartId.replace(/_/g, ' ').replace(/\.[lr]$/i, '');
        return (
          <Html position={[0, 1.5, 0]} center distanceFactor={4} style={{ pointerEvents: 'none' }}>
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              border: '1px solid rgba(0,0,0,0.15)',
              borderRadius: '6px',
              padding: '6px 12px',
              color: '#000',
              fontSize: '12px',
              fontWeight: 600,
              boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
              whiteSpace: 'nowrap'
            }}>
              {labelName}
            </div>
          </Html>
        );
      })()}
    </group>
  );
}

useGLTF.preload('./models/human_body.glb');
