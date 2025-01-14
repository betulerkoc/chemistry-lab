import { Text } from '@react-three/drei'

function SoapMakingStep() {
    return (
      <group position={[-6.5, 0, -5]}>  
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.5, 0.1, 1]} />
          <meshStandardMaterial
            color="#22c55e"
            transparent
            opacity={0.5}
          />
        </mesh>
  
        <Text
          position={[0, 0.3, 0]}
          scale={[0.2, 0.2, 0.2]}
          color="black"
          textAlign="center"
          anchorX="center"
          anchorY="middle"
        >
          Step here to make some bubbles
        </Text>
      </group>
    )
  }

  export default SoapMakingStep;    