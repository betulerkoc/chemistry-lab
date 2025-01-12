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
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Soap Making Station
        </Text>

        <mesh>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#8b4513" />
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
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Combustion Station
        </Text>

        <mesh>
          <boxGeometry args={[3, 0.1, 1.5]} />
          <meshStandardMaterial color="#8b4513" />
        </mesh>
      </group>
    </group>
  )
}

export default Room;