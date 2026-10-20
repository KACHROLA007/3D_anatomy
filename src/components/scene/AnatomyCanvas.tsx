import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import NervousSystemModel from './NervousSystemModel';
import { useAnatomyStore } from '../../store/anatomyStore';
import { useThree, useFrame } from '@react-three/fiber';
import { useRef, useEffect } from 'react';

import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';

function CustomKeyboardControls({ controlsRef }: { controlsRef: React.RefObject<OrbitControlsImpl> }) {
  const { camera } = useThree();
  const keys = useRef({ plus: false, minus: false, up: false, down: false, left: false, right: false });
  const velocity = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') keys.current.plus = true;
      if (e.key === '-' || e.key === '_') keys.current.minus = true;
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') keys.current.up = true;
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') keys.current.down = true;
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.current.left = true;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.current.right = true;
    };
    const up = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') keys.current.plus = false;
      if (e.key === '-' || e.key === '_') keys.current.minus = false;
      if (e.key === 'ArrowUp' || e.key.toLowerCase() === 'w') keys.current.up = false;
      if (e.key === 'ArrowDown' || e.key.toLowerCase() === 's') keys.current.down = false;
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 'a') keys.current.left = false;
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'd') keys.current.right = false;
    };
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    }
  }, []);

  useFrame((_, delta) => {
     if (!controlsRef.current) return;
     
     // Acceleration and smooth damping (friction)
     const panAccel = 1.2; // Reduced for slower, more precise panning
     const zoomAccel = 2.5; // Reduced for slower zoom
     const friction = 0.85; // 0.85 provides a nice buttery slide

     // Accelerate based on key presses
     if (keys.current.plus) velocity.current.z -= zoomAccel;
     if (keys.current.minus) velocity.current.z += zoomAccel;
     
     if (keys.current.up) velocity.current.y += panAccel;
     if (keys.current.down) velocity.current.y -= panAccel;
     if (keys.current.left) velocity.current.x -= panAccel;
     if (keys.current.right) velocity.current.x += panAccel;

     // Apply friction (slows down smoothly when keys are released)
     velocity.current.x *= friction;
     velocity.current.y *= friction;
     velocity.current.z *= friction;

     // Stop entirely when very slow to save resources
     if (Math.abs(velocity.current.x) < 0.01) velocity.current.x = 0;
     if (Math.abs(velocity.current.y) < 0.01) velocity.current.y = 0;
     if (Math.abs(velocity.current.z) < 0.01) velocity.current.z = 0;

     const hasVelocity = velocity.current.x !== 0 || velocity.current.y !== 0 || velocity.current.z !== 0;

     if (hasVelocity) {
        // Handle Zoom (Local Z)
        if (velocity.current.z !== 0) {
           camera.translateZ(velocity.current.z * delta);
        }

        // Handle Pan (Local X and Y)
        if (velocity.current.x !== 0 || velocity.current.y !== 0) {
           const oldPos = camera.position.clone();
           camera.translateX(velocity.current.x * delta);
           camera.translateY(velocity.current.y * delta);
           
           const deltaPos = camera.position.clone().sub(oldPos);
           controlsRef.current.target.add(deltaPos);
        }

        controlsRef.current.update();
     }
  });
  return null;
}

function SceneLights() {
  return (
    <>
      <ambientLight intensity={0.25} />
      <directionalLight
        position={[3, 5, 3]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        color="#e0d4ff"
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.5} color="#80c8ff" />
      <pointLight position={[0, 3, 1]} intensity={0.8} color="#c084fc" distance={6} />
      <pointLight position={[0, 0, 2]} intensity={0.4} color="#38bdf8" distance={5} />
    </>
  );
}

function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshBasicMaterial color="#c084fc" wireframe />
    </mesh>
  );
}

export default function AnatomyCanvas() {
  const { isRotating, selectPart } = useAnatomyStore();
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.5, 3.2], fov: 50, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: false }}
      style={{ background: 'transparent', width: '100%', height: '100%', position: 'absolute', inset: 0 }}
      onPointerMissed={() => selectPart(null)}
    >
      <SceneLights />

      <Environment preset="studio" />
      <CustomKeyboardControls controlsRef={controlsRef} />

      <Suspense fallback={<LoadingFallback />}>
        <NervousSystemModel />
      </Suspense>

      <OrbitControls
        ref={controlsRef}
        keyPanSpeed={10}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        autoRotate={false}
        minDistance={1.5}
        maxDistance={12}
        minPolarAngle={0.1}
        maxPolarAngle={Math.PI - 0.1}
        makeDefault
      />
    </Canvas>
  );
}
