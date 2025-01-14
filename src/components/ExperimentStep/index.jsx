import { Text } from '@react-three/drei'

function ExperimentStep({ 
    position = [0, 0, 0],
    size = [1, 0.1, 0.4],
    color = "#22c55e",
    opacity = 0.5,
    text,
    textScale = [0.2, 0.2, 0.2],
    textPosition = [0, 0.3, 0]
}) {
    return (
        <group position={position}>
            <mesh position={[0, 0.05, 0]}>
                <boxGeometry args={size} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={opacity}
                />
            </mesh>
            <Text
                position={textPosition}
                scale={textScale}
                color="black"
                textAlign="center"
                anchorX="center"
                anchorY="middle"
            >
                {text}
            </Text>
        </group>
    )
}

export default ExperimentStep; 