import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group, Mesh } from 'three';
import { useTheme } from '../../../../context/ThemeContext';
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
const WINDSHIELD_OPACITY = 0.7;
const EMISSIVE_BOOST = 1.5;
const PROPELLER_OPACITY = 0.8;
const STRIPE_OPACITY = 0.6;
const EMISSIVE_DARK = 0.6;
const EMISSIVE_LIGHT = 0.1;
const ACCENT_DARK = '#06b6d4';
const ACCENT_LIGHT = '#3b82f6';
const BODY_DARK = '#e2e8f0';
const BODY_LIGHT = '#ffffff';
const WINDSHIELD_DARK = '#67e8f9';
const WINDSHIELD_LIGHT = '#93c5fd';

// Fuselage geometry
const FUSELAGE_RADIUS_TOP = 0.18;
const FUSELAGE_RADIUS_BOTTOM = 0.22;
const FUSELAGE_LENGTH = 1.6;
const FUSELAGE_SEGMENTS = 12;
const FUSELAGE_ROUGHNESS = 0.3;
const FUSELAGE_METALNESS = 0.1;

// Tail fin geometry
const TAIL_X = -0.7;
const TAIL_Y = 0.15;
const TAIL_WIDTH = 0.3;
const TAIL_HEIGHT = 0.03;
const TAIL_DEPTH = 0.8;

// Wing geometry
const WING_WIDTH = 0.5;
const WING_HEIGHT = 0.04;
const WING_SPAN = 2.4;

// Nose geometry
const NOSE_X = 0.9;
const NOSE_RADIUS = 0.18;
const NOSE_SEGMENTS = 12;
const NOSE_ROUGHNESS = 0.2;
const NOSE_METALNESS = 0.3;

// Wing tip geometry
const WING_TIP_WIDTH = 0.3;
const WING_TIP_HEIGHT = 0.03;
const WING_TIP_DEPTH = 0.15;
const WING_TIP_Z_OFFSET = 1.2;
const WING_TIP_ROUGHNESS = 0.2;

// Vertical stabilizer geometry
const STABILIZER_X = -0.75;
const STABILIZER_Y = 0.25;
const STABILIZER_ROTATION = -0.3;
const STABILIZER_WIDTH = 0.35;
const STABILIZER_HEIGHT = 0.4;
const STABILIZER_DEPTH = 0.04;

// Windshield geometry
const WINDSHIELD_X = 0.55;
const WINDSHIELD_Y = 0.12;
const WINDSHIELD_ROTATION = 0.2;
const WINDSHIELD_WIDTH = 0.25;
const WINDSHIELD_HEIGHT = 0.1;
const WINDSHIELD_DEPTH = 0.2;
const WINDSHIELD_ROUGHNESS = 0.1;
const WINDSHIELD_METALNESS = 0.5;

// Stripe geometry
const STRIPE_Y = 0.05;
const STRIPE_RADIUS = 0.23;
const STRIPE_LENGTH = 1.2;
const STRIPE_OPEN_START = 1.2;
const STRIPE_OPEN_LENGTH = 0.8;

// Propeller geometry
const PROPELLER_X = 1.0;
const PROPELLER_WIDTH = 0.6;
const PROPELLER_HEIGHT = 0.04;
const PROPELLER_DEPTH = 0.03;

function AirplaneFuselage({ bodyColor }: { bodyColor: string }): React.ReactElement {
  return (
    <>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[FUSELAGE_RADIUS_TOP, FUSELAGE_RADIUS_BOTTOM, FUSELAGE_LENGTH, FUSELAGE_SEGMENTS]} />
        <meshStandardMaterial color={bodyColor} roughness={FUSELAGE_ROUGHNESS} metalness={FUSELAGE_METALNESS} />
      </mesh>
      <mesh position={[TAIL_X, TAIL_Y, 0]}>
        <boxGeometry args={[TAIL_WIDTH, TAIL_HEIGHT, TAIL_DEPTH]} />
        <meshStandardMaterial color={bodyColor} roughness={FUSELAGE_ROUGHNESS} metalness={FUSELAGE_METALNESS} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[WING_WIDTH, WING_HEIGHT, WING_SPAN]} />
        <meshStandardMaterial color={bodyColor} roughness={FUSELAGE_ROUGHNESS} metalness={FUSELAGE_METALNESS} />
      </mesh>
    </>
  );
}

function AirplaneAccents({ accentColor, emissiveIntensity, isDark }: { accentColor: string; emissiveIntensity: number; isDark: boolean }): React.ReactElement {
  return (
    <>
      <mesh position={[NOSE_X, 0, 0]}>
        <sphereGeometry args={[NOSE_RADIUS, NOSE_SEGMENTS, NOSE_SEGMENTS]} />
        <meshStandardMaterial color={accentColor} roughness={NOSE_ROUGHNESS} metalness={NOSE_METALNESS} emissive={accentColor} emissiveIntensity={emissiveIntensity} />
      </mesh>
      <mesh position={[0, 0, WING_TIP_Z_OFFSET]}>
        <boxGeometry args={[WING_TIP_WIDTH, WING_TIP_HEIGHT, WING_TIP_DEPTH]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity} roughness={WING_TIP_ROUGHNESS} />
      </mesh>
      <mesh position={[0, 0, -WING_TIP_Z_OFFSET]}>
        <boxGeometry args={[WING_TIP_WIDTH, WING_TIP_HEIGHT, WING_TIP_DEPTH]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity} roughness={WING_TIP_ROUGHNESS} />
      </mesh>
      <mesh position={[STABILIZER_X, STABILIZER_Y, 0]} rotation={[0, 0, STABILIZER_ROTATION]}>
        <boxGeometry args={[STABILIZER_WIDTH, STABILIZER_HEIGHT, STABILIZER_DEPTH]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity} roughness={WING_TIP_ROUGHNESS} />
      </mesh>
      <mesh position={[WINDSHIELD_X, WINDSHIELD_Y, 0]} rotation={[0, 0, WINDSHIELD_ROTATION]}>
        <boxGeometry args={[WINDSHIELD_WIDTH, WINDSHIELD_HEIGHT, WINDSHIELD_DEPTH]} />
        <meshStandardMaterial color={isDark ? WINDSHIELD_DARK : WINDSHIELD_LIGHT} roughness={WINDSHIELD_ROUGHNESS} metalness={WINDSHIELD_METALNESS} transparent opacity={WINDSHIELD_OPACITY} />
      </mesh>
      <mesh position={[0, STRIPE_Y, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[STRIPE_RADIUS, STRIPE_RADIUS, STRIPE_LENGTH, FUSELAGE_SEGMENTS, 1, true, STRIPE_OPEN_START, STRIPE_OPEN_LENGTH]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity} transparent opacity={STRIPE_OPACITY} />
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

  const accentColor = isDark ? ACCENT_DARK : ACCENT_LIGHT;
  const bodyColor = isDark ? BODY_DARK : BODY_LIGHT;
  const emissiveIntensity = isDark ? EMISSIVE_DARK : EMISSIVE_LIGHT;

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
      <mesh ref={propellerRef} position={[PROPELLER_X, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[PROPELLER_WIDTH, PROPELLER_HEIGHT, PROPELLER_DEPTH]} />
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={emissiveIntensity * EMISSIVE_BOOST} transparent opacity={PROPELLER_OPACITY} />
      </mesh>
    </group>
  );
}

export default Airplane;
