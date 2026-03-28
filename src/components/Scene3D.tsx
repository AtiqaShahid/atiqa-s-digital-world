import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { Suspense, useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

// Zone camera positions and color configs
const zoneConfigs: Record<string, {
  primary: string; secondary: string; fog: string; intensity: number;
  camera: [number, number, number]; lookAt: [number, number, number];
}> = {
  hero: {
    primary: "hsl(195, 100%, 50%)", secondary: "hsl(270, 80%, 60%)",
    fog: "hsl(230, 25%, 5%)", intensity: 1,
    camera: [0, 0, 8], lookAt: [0, 0, 0],
  },
  projects: {
    primary: "hsl(270, 80%, 60%)", secondary: "hsl(330, 85%, 60%)",
    fog: "hsl(260, 25%, 4%)", intensity: 1.2,
    camera: [6, 2, 6], lookAt: [2, 0, -2],
  },
  skills: {
    primary: "hsl(160, 80%, 45%)", secondary: "hsl(195, 100%, 50%)",
    fog: "hsl(180, 20%, 4%)", intensity: 1.1,
    camera: [-5, 3, 5], lookAt: [-2, 1, 0],
  },
  about: {
    primary: "hsl(270, 80%, 60%)", secondary: "hsl(195, 100%, 50%)",
    fog: "hsl(250, 25%, 5%)", intensity: 0.8,
    camera: [0, 4, 7], lookAt: [0, 2, 0],
  },
  contact: {
    primary: "hsl(330, 85%, 60%)", secondary: "hsl(270, 80%, 60%)",
    fog: "hsl(300, 20%, 4%)", intensity: 0.9,
    camera: [4, 1, 9], lookAt: [0, 0, 2],
  },
};

function CameraController({ activeZone }: { activeZone: string }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 8));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const mouseOffset = useRef({ x: 0, y: 0 });
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const config = zoneConfigs[activeZone] || zoneConfigs.hero;
    targetPos.current.set(...config.camera);
    targetLookAt.current.set(...config.lookAt);
  }, [activeZone]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current.x = ((e.clientX / window.innerWidth) - 0.5) * 0.6;
      mouseTarget.current.y = ((e.clientY / window.innerHeight) - 0.5) * -0.4;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    // Smooth mouse offset
    mouseOffset.current.x += (mouseTarget.current.x - mouseOffset.current.x) * 0.03;
    mouseOffset.current.y += (mouseTarget.current.y - mouseOffset.current.y) * 0.03;

    // Smooth camera position with inertia
    camera.position.lerp(
      new THREE.Vector3(
        targetPos.current.x + mouseOffset.current.x * 1.5,
        targetPos.current.y + mouseOffset.current.y * 1,
        targetPos.current.z
      ),
      0.035
    );

    // Smooth look-at
    currentLookAt.current.lerp(targetLookAt.current, 0.035);
    camera.lookAt(currentLookAt.current);
  });

  return null;
}

function GridFloor() {
  const ref = useRef<THREE.GridHelper>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.z = (state.clock.elapsedTime * 0.8) % 2;
    }
  });
  return (
    <gridHelper
      ref={ref}
      args={[100, 60, new THREE.Color("hsl(195, 100%, 50%)"), new THREE.Color("hsl(270, 80%, 60%)")]}
      position={[0, -3, 0]}
      material-opacity={0.1}
      material-transparent
    />
  );
}

function FloatingSphere({ activeZone }: { activeZone: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const config = zoneConfigs[activeZone] || zoneConfigs.hero;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15;
      meshRef.current.rotation.y = t * 0.25;
      meshRef.current.scale.setScalar(1 + Math.sin(t * 0.5) * 0.05);
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.2;
      innerRef.current.rotation.z = t * 0.15;
    }
    if (coreRef.current) {
      coreRef.current.scale.setScalar(0.6 + Math.sin(t * 2) * 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1.5}>
      <group>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.8, 1]} />
          <meshStandardMaterial color={config.primary} wireframe transparent opacity={0.25} />
        </mesh>
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[1.3, 2]} />
          <meshStandardMaterial color={config.secondary} wireframe transparent opacity={0.15} />
        </mesh>
        <mesh ref={coreRef}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color={config.primary} emissive={config.primary} emissiveIntensity={2} transparent opacity={0.6} />
        </mesh>
      </group>
    </Float>
  );
}

function OrbitalRings({ activeZone }: { activeZone: string }) {
  const ring1 = useRef<THREE.Mesh>(null);
  const ring2 = useRef<THREE.Mesh>(null);
  const ring3 = useRef<THREE.Mesh>(null);
  const config = zoneConfigs[activeZone] || zoneConfigs.hero;

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ring1.current) { ring1.current.rotation.x = t * 0.3; ring1.current.rotation.z = t * 0.1; }
    if (ring2.current) { ring2.current.rotation.y = t * 0.2; ring2.current.rotation.x = Math.PI / 3; }
    if (ring3.current) { ring3.current.rotation.z = t * 0.15; ring3.current.rotation.y = t * 0.25; }
  });

  return (
    <>
      <mesh ref={ring1}>
        <torusGeometry args={[2.8, 0.015, 16, 100]} />
        <meshStandardMaterial color={config.primary} transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring2}>
        <torusGeometry args={[3.3, 0.01, 16, 100]} />
        <meshStandardMaterial color={config.secondary} transparent opacity={0.25} />
      </mesh>
      <mesh ref={ring3}>
        <torusGeometry args={[3.8, 0.008, 16, 100]} />
        <meshStandardMaterial color={config.primary} transparent opacity={0.15} />
      </mesh>
    </>
  );
}

function FloatingNodes({ activeZone }: { activeZone: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const config = zoneConfigs[activeZone] || zoneConfigs.hero;

  const nodes = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const r = 4 + Math.random() * 3;
      arr.push({
        pos: [Math.cos(angle) * r, (Math.random() - 0.5) * 4, Math.sin(angle) * r] as [number, number, number],
        size: 0.04 + Math.random() * 0.08,
        speed: 0.5 + Math.random() * 1,
      });
    }
    return arr;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <Float key={i} speed={node.speed} floatIntensity={0.5}>
          <mesh position={node.pos}>
            <octahedronGeometry args={[node.size, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? config.primary : config.secondary}
              emissive={i % 2 === 0 ? config.primary : config.secondary}
              emissiveIntensity={3}
              transparent
              opacity={0.8}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ZoneHotspots({ activeZone }: { activeZone: string }) {
  const groupRef = useRef<THREE.Group>(null);

  // Pulsing hotspot nodes positioned around the world
  const hotspots = useMemo(() => [
    { pos: [3, 1, -3] as [number, number, number], zone: "projects", color: "hsl(270, 80%, 60%)" },
    { pos: [-4, 2, -1] as [number, number, number], zone: "skills", color: "hsl(160, 80%, 45%)" },
    { pos: [0, 3.5, -2] as [number, number, number], zone: "about", color: "hsl(270, 80%, 60%)" },
    { pos: [3, 0.5, 3] as [number, number, number], zone: "contact", color: "hsl(330, 85%, 60%)" },
  ], []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const t = state.clock.elapsedTime + i * 1.5;
        child.scale.setScalar(1 + Math.sin(t * 2) * 0.15);
      });
    }
  });

  return (
    <group ref={groupRef}>
      {hotspots.filter(h => h.zone !== activeZone).map((hotspot, i) => (
        <Float key={i} speed={1} floatIntensity={0.3}>
          <mesh position={hotspot.pos}>
            <sphereGeometry args={[0.12, 16, 16]} />
            <meshStandardMaterial
              color={hotspot.color}
              emissive={hotspot.color}
              emissiveIntensity={4}
              transparent
              opacity={0.7}
            />
          </mesh>
          {/* Outer glow ring */}
          <mesh position={hotspot.pos} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.18, 0.22, 32]} />
            <meshStandardMaterial
              color={hotspot.color}
              emissive={hotspot.color}
              emissiveIntensity={2}
              transparent
              opacity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function ParticleField() {
  const count = 400;
  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 50;
      p[i * 3 + 1] = (Math.random() - 0.5) * 30;
      p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.01;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.03;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="hsl(195, 100%, 70%)" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function ZoneLights({ activeZone }: { activeZone: string }) {
  const config = zoneConfigs[activeZone] || zoneConfigs.hero;
  const light1 = useRef<THREE.PointLight>(null);
  const light2 = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (light1.current) {
      light1.current.position.x = Math.sin(t * 0.3) * 6;
      light1.current.position.z = Math.cos(t * 0.3) * 6;
      light1.current.intensity = 0.4 + Math.sin(t) * 0.1;
    }
    if (light2.current) {
      light2.current.position.x = Math.cos(t * 0.2) * 5;
      light2.current.position.z = Math.sin(t * 0.2) * 5;
    }
  });

  return (
    <>
      <ambientLight intensity={0.12 * config.intensity} />
      <pointLight ref={light1} position={[5, 5, 5]} intensity={0.5 * config.intensity} color={config.primary} />
      <pointLight ref={light2} position={[-5, -3, 3]} intensity={0.3 * config.intensity} color={config.secondary} />
      <pointLight position={[0, 4, -5]} intensity={0.15 * config.intensity} color="hsl(160, 80%, 45%)" />
    </>
  );
}

interface Scene3DProps {
  activeZone?: string;
}

const Scene3D = ({ activeZone = "hero" }: Scene3DProps) => {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <CameraController activeZone={activeZone} />
          <ZoneLights activeZone={activeZone} />

          <FloatingSphere activeZone={activeZone} />
          <OrbitalRings activeZone={activeZone} />
          <FloatingNodes activeZone={activeZone} />
          <ZoneHotspots activeZone={activeZone} />
          <GridFloor />
          <ParticleField />
          <Stars radius={50} depth={50} count={1500} factor={2} saturation={0.5} fade speed={0.3} />

          <fog attach="fog" args={["hsl(230, 25%, 5%)", 6, 25]} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene3D;
