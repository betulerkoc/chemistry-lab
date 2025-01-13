import { Text } from '@react-three/drei'

function Room() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#f0f0f0" />
      </mesh>

      <mesh position={[0, 4, -10]}>
        <boxGeometry args={[20, 8, 0.2]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[0, 4, 10]}>
        <boxGeometry args={[20, 8, 0.2]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[-10, 4, 0]}>
        <boxGeometry args={[0.2, 8, 20]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>
      <mesh position={[10, 4, 0]}>
        <boxGeometry args={[0.2, 8, 20]} />
        <meshStandardMaterial color="#e0e0e0" />
      </mesh>

      <group position={[-6, 1, -6]}>
        {/* Station Name */}
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.4}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Soap Lab: Turning Fats into Foam
        </Text>

        <mesh>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#0b2a5c" />
        </mesh>

        <group position={[-1, 0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.15, 0.6]} />
            <meshStandardMaterial color="#1E90FF" transparent opacity={0.9} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.15} color="black">
            Sodium Hydroxide
          </Text>
        </group>
        <group position={[0, 0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.15, 0.15, 0.5]} />
            <meshStandardMaterial color="#FFD700" transparent opacity={0.8} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.15} color="black">
            Olive Oil
          </Text>
        </group>
        <group position={[1, 0.3, 0]}>
          <mesh>
            <cylinderGeometry args={[0.2, 0.2, 0.5]} />
            <meshStandardMaterial color="#ADD8E6" transparent opacity={0.3} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.15} color="black">
            Distilled Water
          </Text>
        </group>

        <group position={[-0.5, 0.0, 0.5]}>
          <mesh position={[0, 0.1, 0]}>
            <coneGeometry args={[0.15, 0.2, 32]} />
            <meshStandardMaterial color="#B0C4DE" transparent opacity={0.3} />
          </mesh>
          <Text position={[0, 0.5, 0]} fontSize={0.15} color="black">
            Funnel
          </Text>

        </group>
      </group>

      <group position={[6, 1, -6]}>
        <Text
          position={[0, 2.5, 0]}
          fontSize={0.4}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Synthesizing Aspirin: Science in Action
        </Text>

        {/* Lab Table */}
        <mesh>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#0b2a5c" />
        </mesh>

        {/* Water Bath - Increased size */}
        <group position={[-0.5, 0.1, 0]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 0.3, 32]} />
            <meshStandardMaterial color="#B0C4DE" metalness={0.5} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <cylinderGeometry args={[0.28, 0.28, 0.15, 32]} />
            <meshPhysicalMaterial color="#4FC3F7" transparent opacity={0.8} />
          </mesh>
        </group>

        {/* Chemicals - Increased size */}
        {/* Salicylic Acid */}
        <group position={[-1, 0.1, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.22]} />
            <meshStandardMaterial color="white" roughness={0.2} metalness={0.1} />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="black">
            Salicylic Acid
          </Text>
        </group>

        {/* Acetic Anhydride */}
        <group position={[-0.5, 0.2, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.15]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="black">
            Acetic Anhydride
          </Text>
        </group>

        {/* H2SO4 */}
        <group position={[0, 0.1, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.15]} />
            <meshStandardMaterial color="#FFD700" />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="black">
            Sulfuric Acid
          </Text>
        </group>

        {/* FeCl3 */}
        <group position={[0.5, 0.1, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.15]} />
            <meshStandardMaterial color="#0b2a5c" />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="black">
            Ferric chloride
          </Text>
        </group>

        {/* Water-Ethanol */}
        <group position={[1, 0.1, -0.5]}>
          <mesh>
            <cylinderGeometry args={[0.11, 0.11, 0.15]} />
            <meshStandardMaterial color="#E6E6FA" />
          </mesh>
          <Text position={[0, 0.2, 0]} fontSize={0.08} color="black">
            Water-Ethanol
          </Text>
        </group>
      </group>
    </group>
  )
}

export default Room;