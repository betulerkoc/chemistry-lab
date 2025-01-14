import PropTypes from 'prop-types'

export function Floor({ size }) {
  return (
    <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={size} />
      <meshStandardMaterial color="#f8fafc" />
    </mesh>
  )
}

Floor.propTypes = {
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
} 