import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import type { Group } from 'three';
import { Vector3 } from 'three';
import useMousePosition from './useMousePosition';

const MOUSE_LERP_SPEED = 0.04;
const SEGMENT_COUNT = 80;
const PATH_WIDTH = 10;
const PATH_AMPLITUDE = 2.5;
const PATH_Y_OFFSET = -1.5;
const PATH_Z_START = -4;
const PATH_Z_AMPLITUDE = 2;
const PATH_Z_FREQUENCY = 0.8;
const MOUSE_INFLUENCE = 0.2;
const LINE_WIDTH = 1.5;
const LINE_OPACITY = 0.35;
const LINE_DASH_SIZE = 0.4;
const LINE_GAP_SIZE = 0.2;

function FlightPath(): React.ReactElement {
  const groupRef = useRef<Group>(null);
  const mouse = useMousePosition();

  const curvePoints = useMemo(() => {
    const points: Vector3[] = [];
    for (let i = 0; i <= SEGMENT_COUNT; i++) {
      const progress = i / SEGMENT_COUNT;
      const posX = -PATH_WIDTH / 2 + progress * PATH_WIDTH;
      const posY = Math.sin(progress * Math.PI) * PATH_AMPLITUDE + PATH_Y_OFFSET;
      const posZ = PATH_Z_START + Math.sin(progress * Math.PI * PATH_Z_FREQUENCY) * PATH_Z_AMPLITUDE;
      points.push(new Vector3(posX, posY, posZ));
    }
    return points;
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x += (mouse.current.x * MOUSE_INFLUENCE - groupRef.current.position.x) * MOUSE_LERP_SPEED;
    groupRef.current.position.y += (mouse.current.y * MOUSE_INFLUENCE - groupRef.current.position.y) * MOUSE_LERP_SPEED;
  });

  return (
    <group ref={groupRef}>
      <Line
        points={curvePoints}
        color="#06b6d4"
        lineWidth={LINE_WIDTH}
        transparent
        opacity={LINE_OPACITY}
        dashed
        dashSize={LINE_DASH_SIZE}
        gapSize={LINE_GAP_SIZE}
      />
    </group>
  );
}

export default FlightPath;
