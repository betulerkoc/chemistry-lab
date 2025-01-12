import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

function OilStream({ isPouring }) {
  const streamRef = useRef();
  
  useFrame(() => {
    if (isPouring && streamRef.current) {
      streamRef.current.scale.y += 0.1;
      if (streamRef.current.scale.y > 2) {
        streamRef.current.scale.y = 0;
      }
    }
  });

  return (
    <mesh
      ref={streamRef}
      position={[-2.5, 3, 1.5]}
      visible={isPouring}
    >
      <cylinderGeometry args={[0.05, 0.05, 1]} />
      <meshStandardMaterial color="#FFD700" transparent opacity={0.8} />
    </mesh>
  );
}

export default OilStream; 