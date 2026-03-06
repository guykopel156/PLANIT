import { Canvas } from '@react-three/fiber';

import Airplane from './hero3d/Airplane';
import Cloud from './hero3d/Cloud';
import FlightPath from './hero3d/FlightPath';
import Particles from './hero3d/Particles';
import { useTheme } from '../../../context/ThemeContext';

// Light intensities
const AMBIENT_INTENSITY_DARK = 0.2;
const AMBIENT_INTENSITY_LIGHT = 0.5;
const DIRECTIONAL_INTENSITY_DARK = 0.7;
const DIRECTIONAL_INTENSITY_LIGHT = 1;
const POINT_BLUE_INTENSITY_DARK = 0.6;
const POINT_BLUE_INTENSITY_LIGHT = 0.3;
const POINT_CYAN_SIDE_INTENSITY_DARK = 0.5;
const POINT_CYAN_SIDE_INTENSITY_LIGHT = 0.2;
const POINT_CYAN_TOP_INTENSITY_DARK = 0.4;
const POINT_CYAN_TOP_INTENSITY_LIGHT = 0.2;
const POINT_GLOW_INTENSITY = 0.3;

// Camera
const CAMERA_Z = 8;
const CAMERA_FOV = 50;

// Cloud configurations
const CLOUD_CONFIGS: { position: [number, number, number]; scale: number; speed: number }[] = [
  { position: [-6, 2.5, -3], scale: 1.2, speed: 0.25 },
  { position: [4, 3, -4], scale: 0.9, speed: 0.35 },
  { position: [-3, -1.5, -5], scale: 1.0, speed: 0.2 },
  { position: [7, 1, -3.5], scale: 1.4, speed: 0.3 },
  { position: [-8, 0.5, -4], scale: 0.8, speed: 0.4 },
  { position: [2, -2.5, -6], scale: 1.1, speed: 0.15 },
  { position: [9, -1, -5], scale: 0.7, speed: 0.28 },
];

interface ISceneProps {
  isDark: boolean;
}

function Scene({ isDark }: ISceneProps): React.ReactElement {
  return (
    <>
      <ambientLight intensity={isDark ? AMBIENT_INTENSITY_DARK : AMBIENT_INTENSITY_LIGHT} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? DIRECTIONAL_INTENSITY_DARK : DIRECTIONAL_INTENSITY_LIGHT} color={isDark ? '#93c5fd' : '#e0e7ff'} />
      <pointLight position={[-6, 3, -4]} intensity={isDark ? POINT_BLUE_INTENSITY_DARK : POINT_BLUE_INTENSITY_LIGHT} color="#3b82f6" />
      <pointLight position={[6, -3, 2]} intensity={isDark ? POINT_CYAN_SIDE_INTENSITY_DARK : POINT_CYAN_SIDE_INTENSITY_LIGHT} color="#06b6d4" />
      <pointLight position={[0, 5, 3]} intensity={isDark ? POINT_CYAN_TOP_INTENSITY_DARK : POINT_CYAN_TOP_INTENSITY_LIGHT} color="#06b6d4" />
      {isDark && <pointLight position={[0, -4, 2]} intensity={POINT_GLOW_INTENSITY} color="#22d3ee" />}

      <Airplane />

      {CLOUD_CONFIGS.map((cloud, index) => (
        <Cloud key={index} position={cloud.position} scale={cloud.scale} speed={cloud.speed} />
      ))}

      <FlightPath />
      <Particles />
    </>
  );
}

function FloatingShapes(): React.ReactElement {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Canvas
      camera={{ position: [0, 0, CAMERA_Z], fov: CAMERA_FOV }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene isDark={isDark} />
    </Canvas>
  );
}

export default FloatingShapes;
