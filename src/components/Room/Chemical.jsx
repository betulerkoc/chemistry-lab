import { Text } from '@react-three/drei'
import PropTypes from 'prop-types'

export function Chemical({ position, color, size, label, opacity = 1 }) {
  return (
    <group position={position}>
      <mesh>
        <cylinderGeometry args={size} />
        <meshStandardMaterial color={color} transparent opacity={opacity} />
      </mesh>
      <Text position={[0, 0.5, 0]} fontSize={0.15} color="#111827">
        {label}
      </Text>
    </group>
  )
}

Chemical.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
  label: PropTypes.string.isRequired,
  opacity: PropTypes.number,
} 