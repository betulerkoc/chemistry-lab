import PropTypes from 'prop-types'

export function Ceiling({ size }) {
  return (
    <group position={[0, 6, 0]}>
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={size} />
        <meshStandardMaterial
          color="#e0e0e0"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
    </group>
  )
}

Ceiling.propTypes = {
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
} 