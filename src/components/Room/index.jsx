import { Text } from '@react-three/drei'

function Room() {
  return (
    <group>
      <group position={[0, 6, 0]}>
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[20, 0.5, 20]} /> 
          <meshStandardMaterial
            color="#e0e0e0"
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      </group>

      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f8fafc" />
      </mesh>

      <mesh position={[0, 4, -10]}>
        <boxGeometry args={[20, 8, 0.2]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      <mesh position={[0, 4, 10]}>
        <boxGeometry args={[20, 8, 0.2]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      <mesh position={[-10, 4, 0]}>
        <boxGeometry args={[0.2, 8, 20]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>
      <mesh position={[10, 4, 0]}>
        <boxGeometry args={[0.2, 8, 20]} />
        <meshStandardMaterial color="#f1f5f9" />
      </mesh>

      <group position={[-6, 1, -6]}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.4}
          color="#111827"
          anchorX="center"
          anchorY="middle"
        >
          Soap Lab: Turning Fats into Foam
        </Text>

        <mesh>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#374151" />
        </mesh>

        <group position={[-1, 0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.15, 0.6]} />
            <meshStandardMaterial color="#3b82f6" transparent opacity={0.9} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.15} color="#111827">
            Sodium Hydroxide
          </Text>
        </group>
        <group position={[0, 0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.5]} />
            <meshStandardMaterial color="#eab308" transparent opacity={0.8} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.15} color="#111827">
            Olive Oil
          </Text>
        </group>
        <group position={[1, 0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.5]} />
            <meshStandardMaterial color="#ADD8E6" transparent opacity={0.3} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.15} color="#111827">
            Distilled Water
          </Text>
        </group>

        <group position={[-0.5, 0.0, 0.5]}>
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.15, 0.2, 32]} />
            <meshStandardMaterial color="#94a3b8" transparent opacity={0.3} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.15} color="#111827">
            Funnel
          </Text>

        </group>
      </group>

      <group position={[6, 1, -6]}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.4}
          color="#111827"
          anchorX="center"
          anchorY="middle"
        >
          Synthesizing Aspirin: Science in Action
        </Text>

        <mesh>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#374151" />
        </mesh>

        <group position={[-0.5, 0.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.15, 32]} />
            <meshPhysicalMaterial color="#0ea5e9" transparent opacity={0.8} />
          </mesh>
        </group>

        <group position={[-1, 0.1, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.22]} />
            <meshStandardMaterial color="white" roughness={0.2} metalness={0.1} />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="#111827">
            Salicylic Acid
          </Text>
        </group>

        <group position={[-0.5, 0.2, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.15]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="#111827">
            Acetic Anhydride
          </Text>
        </group>

        <group position={[0, 0.1, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.15]} />
            <meshStandardMaterial color="#FFD700" />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="#111827">
            Sulfuric Acid
          </Text>
        </group>

        <group position={[0.5, 0.1, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.15]} />
            <meshStandardMaterial color="#0b2a5c" />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="#111827">
            Ferric chloride
          </Text>
        </group>

        <group position={[1, 0.1, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.15]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="#111827">
            Water-Ethanol
          </Text>
        </group>
      </group>
    </group>
  )
}

export default Room;