import { Canvas } from '@react-three/fiber';
import Airplane from './hero3d/Airplane';
import Cloud from './hero3d/Cloud';
import FlightPath from './hero3d/FlightPath';
import Particles from './hero3d/Particles';
import { useTheme } from '../../context/ThemeContext';

interface ISceneProps {
  isDark: boolean;
}

function Scene({ isDark }: ISceneProps): React.ReactElement {
  return (
    <>
      <ambientLight intensity={isDark ? 0.2 : 0.5} />
      <directionalLight position={[5, 5, 5]} intensity={isDark ? 0.7 : 1} color={isDark ? '#93c5fd' : '#e0e7ff'} />
      <pointLight position={[-6, 3, -4]} intensity={isDark ? 0.6 : 0.3} color="#3b82f6" />
      <pointLight position={[6, -3, 2]} intensity={isDark ? 0.5 : 0.2} color="#06b6d4" />
      <pointLight position={[0, 5, 3]} intensity={isDark ? 0.4 : 0.2} color="#06b6d4" />
      {isDark && <pointLight position={[0, -4, 2]} intensity={0.3} color="#22d3ee" />}

      <Airplane />

      <Cloud position={[-6, 2.5, -3]} scale={1.2} speed={0.25} />
      <Cloud position={[4, 3, -4]} scale={0.9} speed={0.35} />
      <Cloud position={[-3, -1.5, -5]} scale={1.0} speed={0.2} />
      <Cloud position={[7, 1, -3.5]} scale={1.4} speed={0.3} />
      <Cloud position={[-8, 0.5, -4]} scale={0.8} speed={0.4} />
      <Cloud position={[2, -2.5, -6]} scale={1.1} speed={0.15} />
      <Cloud position={[9, -1, -5]} scale={0.7} speed={0.28} />

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
      camera={{ position: [0, 0, 8], fov: 50 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <Scene isDark={isDark} />
    </Canvas>
  );
}

export default FloatingShapes;
