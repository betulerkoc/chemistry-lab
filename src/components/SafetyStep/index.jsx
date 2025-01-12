import { Text } from '@react-three/drei'

function SafetyStep() {
    return (
        <group position={[0, 0, -1]}> 
            <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={[1, 0.1, 0.4]} />
                <meshStandardMaterial
                    color="#FF4444"
                    transparent
                    opacity={0.8}
                />
            </mesh>
            <Text
                position={[0, 0.3, 0]}
                scale={[0.3, 0.3, 0.3]}
                color="black"
            >
                WEAR EQUIPMENT
            </Text>
        </group>
    )
}

export default SafetyStep;