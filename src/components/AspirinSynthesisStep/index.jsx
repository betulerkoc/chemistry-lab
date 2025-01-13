import { Text } from '@react-three/drei'

function AspirinSynthesisStep({ onExperiment }) {
    return (
      <group 
        position={[6.5, 0, -5]}
        onClick={() => onExperiment(false, 'aspirin')}
      >  
        <mesh position={[0, 0.05, 0]}>
          <boxGeometry args={[1.5, 0.1, 1]} />
          <meshStandardMaterial
            color="#4CAF50"
            transparent
            opacity={0.5}
          />
        </mesh>
  
        <Text
          position={[0, 0.3, 0]}
          scale={[0.2, 0.2, 0.2]}
          color="black"
          textAlign="center"
        >
          Step here to explore the chemistry behind pain relief
        </Text>
      </group>
    )
  }

  export default AspirinSynthesisStep;    