import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';

const PARTICLE_COUNT = 120;
const ROTATION_SPEED = 0.01;
const EMISSIVE_INTENSITY = 0.6;
const SPHERE_SEGMENTS = 6;
const SPREAD_X = 16;
const SPREAD_Y = 12;
const SPREAD_Z = 10;
const DEPTH_OFFSET = -3;

const COLORS = ['#06b6d4', '#3b82f6', '#22d3ee', '#60a5fa', '#0ea5e9'];

function generateParticlePositions(): [number, number, number][] {
  const positions: [number, number, number][] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions.push([
      (Math.random() - 0.5) * SPREAD_X,
      (Math.random() - 0.5) * SPREAD_Y,
      (Math.random() - 0.5) * SPREAD_Z + DEPTH_OFFSET,
    ]);
  }
  return positions;
}

function generateParticleSizes(): number[] {
  return Array.from({ length: PARTICLE_COUNT }, () => 0.015 + Math.random() * 0.025);
}

function generateParticleOpacities(): number[] {
  return Array.from({ length: PARTICLE_COUNT }, () => 0.3 + Math.random() * 0.5);
}

function generateParticleColors(): string[] {
  return Array.from({ length: PARTICLE_COUNT }, () => COLORS[Math.floor(Math.random() * COLORS.length)]);
}

const PARTICLE_POSITIONS = generateParticlePositions();
const PARTICLE_SIZES = generateParticleSizes();
const PARTICLE_OPACITIES = generateParticleOpacities();
const PARTICLE_COLORS = generateParticleColors();

function Particles(): React.ReactElement {
  const groupRef = useRef<Group>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * ROTATION_SPEED;
  });

  return (
    <group ref={groupRef}>
      {PARTICLE_POSITIONS.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[PARTICLE_SIZES[index], SPHERE_SEGMENTS, SPHERE_SEGMENTS]} />
          <meshStandardMaterial
            color={PARTICLE_COLORS[index]}
            emissive={PARTICLE_COLORS[index]}
            emissiveIntensity={EMISSIVE_INTENSITY}
            transparent
            opacity={PARTICLE_OPACITIES[index]}
          />
        </mesh>
      ))}
    </group>
  );
}

export default Particles;
