import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Group } from 'three';
import { useTheme } from '../../../context/ThemeContext';
import useMousePosition from './useMousePosition';

interface ICloudProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}

const WRAP_X = 12;
const MOUSE_PARALLAX_STRENGTH = 0.3;
const MOUSE_LERP = 0.03;

function Cloud({ position, scale = 1, speed = 0.3 }: ICloudProps): React.ReactElement {
  const groupRef = useRef<Group>(null);
  const mouse = useMousePosition();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const spheres = useMemo(() => {
    const count = 4 + Math.floor(Math.random() * 3);
    return Array.from({ length: count }, () => ({
      offset: [
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.4,
      ] as [number, number, number],
      radius: 0.2 + Math.random() * 0.25,
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

  const opacity = isDark ? 0.15 : 0.6;
  const color = isDark ? '#94a3b8' : '#f1f5f9';

  return (
    <group ref={groupRef} position={position} scale={scale}>
      {spheres.map((sphere, index) => (
        <mesh key={index} position={sphere.offset}>
          <sphereGeometry args={[sphere.radius, 10, 10]} />
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
