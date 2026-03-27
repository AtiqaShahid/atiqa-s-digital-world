import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 0.5) % 2;
    }
  });
  return (
    <gridHelper
      ref={ref}
      args={[100, 50, new THREE.Color("hsl(195, 100%, 50%)"), new THREE.Color("hsl(270, 80%, 60%)")]}
      position={[0, -3, 0]}
      material-opacity={0.08}
      material-transparent
    />
  );
}

function FloatingSphere() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshStandardMaterial
          color="hsl(195, 100%, 50%)"
          wireframe
          transparent
          opacity={0.3}
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.2, 0]} />
        <meshStandardMaterial
          color="hsl(270, 80%, 60%)"
          wireframe
          transparent
          opacity={0.2}
        />
      </mesh>
    </Float>
  );
}

function OrbitalRings() {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) {
      ring1.current.rotation.x = t * 0.3;
      ring1.current.rotation.z = t * 0.1;
    }
    if (ring2.current) {
      ring2.current.rotation.y = t * 0.2;
      ring2.current.rotation.x = Math.PI / 3;
    }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="hsl(195, 100%, 50%)" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3, 0.015, 16, 100]} />
        <meshStandardMaterial color="hsl(270, 80%, 60%)" transparent opacity={0.25} />
      </mesh>
    </>
  );
}

function ParticleField() {
  const count = 200;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="hsl(195, 100%, 70%)" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

const Scene3D = () => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.15} />
          <pointLight position={[5, 5, 5]} intensity={0.5} color="hsl(195, 100%, 50%)" />
          <pointLight position={[-5, -3, 3]} intensity={0.3} color="hsl(270, 80%, 60%)" />
          <pointLight position={[0, 3, -5]} intensity={0.2} color="hsl(160, 80%, 45%)" />

          <FloatingSphere />
          <OrbitalRings />
          <GridFloor />
          <ParticleField />
          <Stars radius={50} depth={50} count={1000} factor={2} saturation={0.5} fade speed={0.5} />

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            maxPolarAngle={Math.PI / 1.8}
            minPolarAngle={Math.PI / 3}
          />
          
          <fog attach="fog" args={["hsl(230, 25%, 5%)", 8, 25]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
