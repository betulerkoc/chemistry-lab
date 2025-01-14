import PropTypes from 'prop-types'

export function Wall({ position, size }) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#f1f5f9" />
    </mesh>
  )
}

Wall.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
} 