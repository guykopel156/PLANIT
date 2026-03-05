import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';
import { useTheme } from '../../../context/ThemeContext';
import useMousePosition from './useMousePosition';

const MOUSE_LERP = 0.04;
const BOB_SPEED = 0.8;
const BOB_AMPLITUDE = 0.3;
const PITCH_STRENGTH = 0.15;
const YAW_STRENGTH = -0.1;
const BANK_STRENGTH = 0.08;
const PROPELLER_SPEED = 0.3;
const AIRPLANE_SCALE = 2.5;
const INITIAL_YAW = -0.3;

function AirplaneFuselage({ bodyColor }: { bodyColor: string }): React.ReactElement {
  return (
    <>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.18, 0.22, 1.6, 12]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[-0.7, 0.15, 0]}>
        <boxGeometry args={[0.3, 0.03, 0.8]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.5, 0.04, 2.4]} />
        <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.1} />
      </mesh>
    </>
  );
}

function AirplaneAccents({ accentColor, emissiveIntensity, isDark }: { accentColor: string; emissiveIntensity: number; isDark: boolean }): React.ReactElement {
  return (
    <>
      <mesh position={[0.9, 0, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color={accentColor} roughness={0.2} metalness={0.3} emissive={accentColor} emissiveIntensity={emissiveIntensity} />
      </mesh>
      <mesh position={[0, 0, 1.2]}>
        <boxGeometry args={[0.3, 0.03, 0.15]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0, -1.2]}>
        <boxGeometry args={[0.3, 0.03, 0.15]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity} roughness={0.2} />
      </mesh>
      <mesh position={[-0.75, 0.25, 0]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.35, 0.4, 0.04]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity} roughness={0.2} />
      </mesh>
      <mesh position={[0.55, 0.12, 0]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[0.25, 0.1, 0.2]} />
        <meshStandardMaterial color={isDark ? '#67e8f9' : '#93c5fd'} roughness={0.1} metalness={0.5} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.23, 0.23, 1.2, 12, 1, true, 1.2, 0.8]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity} transparent opacity={0.6} />
      </mesh>
    </>
  );
}

function Airplane(): React.ReactElement {
  const groupRef = useRef<Group>(null);
  const propellerRef = useRef<Mesh>(null);
  const mouse = useMousePosition();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentColor = isDark ? '#06b6d4' : '#3b82f6';
  const bodyColor = isDark ? '#e2e8f0' : '#ffffff';
  const emissiveIntensity = isDark ? 0.6 : 0.1;

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;

    groupRef.current.position.y = Math.sin(time * BOB_SPEED) * BOB_AMPLITUDE;

    const targetRotX = mouse.current.y * PITCH_STRENGTH;
    const targetRotY = mouse.current.x * YAW_STRENGTH;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * MOUSE_LERP;
    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * MOUSE_LERP;
    groupRef.current.rotation.z += (mouse.current.x * BANK_STRENGTH - groupRef.current.rotation.z) * MOUSE_LERP;

    if (propellerRef.current) {
      propellerRef.current.rotation.z += PROPELLER_SPEED;
    }
  });

  return (
    <group ref={groupRef} scale={AIRPLANE_SCALE} rotation={[0, INITIAL_YAW, 0]}>
      <AirplaneFuselage bodyColor={bodyColor} />
      <AirplaneAccents accentColor={accentColor} emissiveIntensity={emissiveIntensity} isDark={isDark} />
      <mesh ref={propellerRef} position={[1.0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.03]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity * 1.5} transparent opacity={0.8} />
      </mesh>
    </group>
  );
}

export default Airplane;
