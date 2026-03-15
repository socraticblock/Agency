"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Float, Preload } from "@react-three/drei";

function NanoBananaModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Base slow rotation
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.x += delta * 0.1;
      
      // Reactive parallax based on mouse
      const targetX = (state.pointer.x * Math.PI) / 6;
      const targetY = (state.pointer.y * Math.PI) / 6;
      
      meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;
      meshRef.current.rotation.x += (-targetY - meshRef.current.rotation.x) * 0.05;
    }
  });

  // Create a stylized, tapered nano-banana shape
  const geometry = useMemo(() => {
    // A Torus arc representing the curve of the banana
    const arc = Math.PI * 0.8;
    const geo = new THREE.TorusGeometry(2.5, 0.7, 16, 64, arc);
    const pos = geo.attributes.position;
    const vertex = new THREE.Vector3();
    const center = new THREE.Vector3();
    
    // Tapering the ends to make it look like a banana
    for (let i = 0; i < pos.count; i++) {
        vertex.fromBufferAttribute(pos, i);
        // Find angle in XY plane
        let angle = Math.atan2(vertex.y, vertex.x);
        if (angle < 0) angle += Math.PI * 2;
        
        // Normalized progress along the arc (0 to 1)
        const progress = Math.max(0, Math.min(1, angle / arc));
        
        // Sine wave tapering: thick in the middle, pinched at the ends
        const scale = Math.sin(progress * Math.PI) * 0.9 + 0.1; 
        
        // Find the center core of the tube for this angle
        center.set(Math.cos(angle) * 2.5, Math.sin(angle) * 2.5, 0);
        
        // Pinch the vertex towards the center core
        vertex.sub(center).multiplyScalar(scale).add(center);
        
        pos.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <group ref={meshRef}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
        {/* Center the arc so it rotates around its middle */}
        <group rotation={[0, 0, -Math.PI * 0.4]}>
          {/* Outer glowing wireframe shell */}
          <mesh geometry={geometry}>
            <meshStandardMaterial 
              color="#10b981" 
              wireframe 
              transparent 
              opacity={0.15} 
              emissive="#10b981"
              emissiveIntensity={0.8}
            />
          </mesh>
          {/* Inner core particles (The "Nano" aspect) */}
          <points geometry={geometry}>
            <pointsMaterial 
              color="#34d399" 
              size={0.04} 
              transparent 
              opacity={0.6}
              sizeAttenuation
            />
          </points>
        </group>
      </Float>
    </group>
  );
}

export function NanoBananaBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-30 w-full h-full opacity-60">
      <Canvas camera={{ position: [0, 0, 9], fov: 45 }}>
        <fog attach="fog" args={['#050505', 4, 15]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#10b981" />
        <NanoBananaModel />
        <Preload all />
      </Canvas>
    </div>
  );
}
