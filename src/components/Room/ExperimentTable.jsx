import PropTypes from 'prop-types'

export function ExperimentTable({ size }) {
  return (
    <mesh>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#374151" />
    </mesh>
  )
}

ExperimentTable.propTypes = {
  size: PropTypes.arrayOf(PropTypes.number).isRequired,
} 