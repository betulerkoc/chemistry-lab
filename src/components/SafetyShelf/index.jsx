import { Text } from '@react-three/drei'

function SafetyShelf() {
    return (
        <group position={[0, 0, -2]}>
            <mesh position={[0, 1.5, 0]}>
                <boxGeometry args={[3, 0.1, 1]} />
                <meshStandardMaterial color="#8b4513" />
            </mesh>
            <mesh position={[0, 1, 0.4]}>
                <boxGeometry args={[3, 1, 0.1]} />
                <meshStandardMaterial color="#a0522d" />
            </mesh>

            <group position={[-0.8, 1.6, 0]}>
                <mesh position={[0, 0.2, 0.2]} rotation={[0, 0, Math.PI / 6]}>
                    <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                    <meshStandardMaterial color="#c0c0c0" />
                </mesh>

                <group position={[0, -0.2, 0.2]}>
                    <mesh position={[0, 0, 0]}>
                        <boxGeometry args={[0.4, 0.8, 0.1]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                    <mesh position={[0, 0.35, 0]}>
                        <boxGeometry args={[0.3, 0.1, 0.15]} />
                        <meshStandardMaterial color="#ffffff" />
                    </mesh>
                    {[-0.05, -0.15, -0.25].map((y, i) => (
                        <mesh key={i} position={[-0.15, y, 0.06]}>
                            <cylinderGeometry args={[0.02, 0.02, 0.02]} />
                            <meshStandardMaterial color="#dcdcdc" />
                        </mesh>
                    ))}
                </group>
            </group>

            <group position={[0, 1.6, 0]}>
                <mesh position={[0, 0, 0.2]}>
                    <boxGeometry args={[0.4, 0.15, 0.05]} />
                    <meshStandardMaterial color="#b2dfee" transparent opacity={0.3} />
                </mesh>
                <mesh position={[0, 0.07, 0.2]}>
                    <boxGeometry args={[0.42, 0.03, 0.06]} />
                    <meshStandardMaterial color="#1c1c1c" />
                </mesh>
                {[-0.21, 0.21].map((x, i) => (
                    <mesh key={i} position={[x, 0, 0.15]} rotation={[0, i ? -0.3 : 0.3, 0]}>
                        <boxGeometry args={[0.02, 0.04, 0.3]} />
                        <meshStandardMaterial color="#1c1c1c" />
                    </mesh>
                ))}
            </group>

            <group position={[0.8, 1.6, 0]}>
                <mesh position={[0, 0, 0.2]}>
                    <boxGeometry args={[0.4, 0.25, 0.2]} />
                    <meshStandardMaterial color="#ffffff" />
                </mesh>
                <mesh position={[0, 0, 0.31]}>
                    <boxGeometry args={[0.35, 0.2, 0.01]} />
                    <meshStandardMaterial color="#87ceeb" />
                </mesh>
                <mesh position={[0, 0.1, 0.2]}>
                    <boxGeometry args={[0.35, 0.05, 0.15]} />
                    <meshStandardMaterial color="#e6e6e6" />
                </mesh>
            </group>

            <group position={[0, 2, 0.4]}>
                <mesh>
                    <boxGeometry args={[2.5, 0.3, 0.05]} />
                    <meshStandardMaterial color="#f5f5f5" />
                </mesh>
                <Text
                    position={[0, 0.05, 0.03]}
                    fontSize={0.15}
                    color="#000000"
                    anchorX="center"
                    anchorY="middle"
                >
                    LAB SAFETY EQUIPMENT
                </Text>
                <Text
                    position={[-0.8, -0.05, 0.03]}
                    fontSize={0.08}
                    color="#444444"
                    anchorX="center"
                    anchorY="middle"
                >
                    Lab Coat
                </Text>

                <Text
                    position={[0, -0.05, 0.03]}
                    fontSize={0.08}
                    color="#444444"
                    anchorX="center"
                    anchorY="middle"
                >
                    Safety Glasses
                </Text>

                <Text
                    position={[0.8, -0.05, 0.03]}
                    fontSize={0.08}
                    color="#444444"
                    anchorX="center"
                    anchorY="middle"
                >
                    Safety Gloves
                </Text>
            </group>
        </group>
    )
}

export default SafetyShelf;   