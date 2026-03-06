import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { useTheme } from '../../../../context/ThemeContext';
import useMousePosition from './useMousePosition';

interface ICloudProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}

const WRAP_X = 12;
const MOUSE_PARALLAX_STRENGTH = 0.3;
const MOUSE_LERP = 0.03;
const HALF = 0.5;
const CLOUD_OPACITY_DARK = 0.15;
const CLOUD_OPACITY_LIGHT = 0.6;
const CLOUD_COLOR_DARK = '#94a3b8';
const CLOUD_COLOR_LIGHT = '#f1f5f9';
const MIN_SPHERE_COUNT = 4;
const SPHERE_COUNT_RANGE = 3;
const OFFSET_SPREAD_X = 0.8;
const OFFSET_SPREAD_Y = 0.3;
const OFFSET_SPREAD_Z = 0.4;
const MIN_RADIUS = 0.2;
const RADIUS_RANGE = 0.25;
const SPHERE_WIDTH_SEGMENTS = 10;
const SPHERE_HEIGHT_SEGMENTS = 10;

function Cloud({ position, scale = 1, speed = 0.3 }: ICloudProps): React.ReactElement {
  const groupRef = useRef<Group>(null);
  const mouse = useMousePosition();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const spheres = useMemo(() => {
    const count = MIN_SPHERE_COUNT + Math.floor(Math.random() * SPHERE_COUNT_RANGE);
    return Array.from({ length: count }, (): { offset: [number, number, number]; radius: number } => ({
      offset: [
        (Math.random() - HALF) * OFFSET_SPREAD_X,
        (Math.random() - HALF) * OFFSET_SPREAD_Y,
        (Math.random() - HALF) * OFFSET_SPREAD_Z,
      ],
      radius: MIN_RADIUS + Math.random() * RADIUS_RANGE,
    }));
  }, []);

  useFrame((_state, delta) => {
    if (!groupRef.current) return;

    groupRef.current.position.x -= speed * delta;

    if (groupRef.current.position.x < -WRAP_X) {
      groupRef.current.position.x = WRAP_X;
    }

    const targetY = position[1] + mouse.current.y * MOUSE_PARALLAX_STRENGTH;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * MOUSE_LERP;
  });

  const opacity = isDark ? CLOUD_OPACITY_DARK : CLOUD_OPACITY_LIGHT;
  const color = isDark ? CLOUD_COLOR_DARK : CLOUD_COLOR_LIGHT;

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {spheres.map((sphere, index) => (
        <mesh key={index} position={sphere.offset}>
          <sphereGeometry args={[sphere.radius, SPHERE_WIDTH_SEGMENTS, SPHERE_HEIGHT_SEGMENTS]} />
          <meshStandardMaterial
            color={color}
            transparent
            opacity={opacity}
            roughness={1}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

export default Cloud;
