"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Preload } from "@react-three/drei";

function NetworkGridModel() {
  const meshRef = useRef<THREE.Mesh>(null);
  const geomRef = useRef<THREE.PlaneGeometry>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    if (geomRef.current) {
      const position = geomRef.current.attributes.position;
      for (let i = 0; i < position.count; i++) {
        const x = position.getX(i);
        const y = position.getY(i);
        
        const z = Math.sin(x * 0.4 + time * 0.5) * 0.4 + 
                  Math.cos(y * 0.4 + time * 0.6) * 0.4;
                  
        position.setZ(i, z);
      }
      position.needsUpdate = true;
    }
  });

  return (
    <group rotation={[-Math.PI / 3.5, 0, Math.PI / 12]} position={[0, -1, -1]}>
      <mesh ref={meshRef}>
        <planeGeometry ref={geomRef} args={[24, 24, 40, 40]} />
        <meshStandardMaterial 
          color="#10b981" 
          wireframe 
          transparent 
          opacity={0.12} 
          emissive="#10b981"
          emissiveIntensity={0.4}
        />
      </mesh>
      <points>
        <planeGeometry args={[24, 24, 40, 40]} />
        <pointsMaterial 
          color="#10b981" 
          size={0.04} 
          transparent 
          opacity={0.5}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

export function NanoBananaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 w-full h-full opacity-30">
      <Canvas camera={{ position: [0, 0, 8], fov: 55 }}>
        <fog attach="fog" args={['#030717', 4, 12]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#2dd4bf" />
        <NetworkGridModel />
        <Preload all />
      </Canvas>
    </div>
  );
}
