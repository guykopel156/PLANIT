import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import type { Vector2 } from 'three';
import { Vector2 as ThreeVector2 } from 'three';

const MOUSE_FOLLOW_STRENGTH = 0.25;

function useMousePosition(): React.RefObject<Vector2> {
  const mouse = useRef<Vector2>(new ThreeVector2(0, 0));
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    mouse.current.set(
      pointer.x * viewport.width * MOUSE_FOLLOW_STRENGTH,
      pointer.y * viewport.height * MOUSE_FOLLOW_STRENGTH,
    );
  });

  return mouse;
}

export default useMousePosition;
