import { Text } from '@react-three/drei'
import PropTypes from 'prop-types'
import { ExperimentTable } from '../ExperimentTable'
import { Chemical } from '../Chemical'

export function SoapLab({ position }) {
  return (
    <group position={position}>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color="#111827"
        anchorX="center"
        anchorY="middle"
      >
        Soap Lab: Turning Fats into Foam
      </Text>

      <ExperimentTable size={[3, 0.1, 1.5]} />

      <Chemical
        position={[-1, 0.3, 0]}
        color="#3b82f6"
        size={[0.2, 0.15, 0.6]}
        label="Sodium Hydroxide"
        opacity={0.9}
      />
      <Chemical
        position={[0, 0.3, 0]}
        color="#eab308"
        size={[0.15, 0.15, 0.5]}
        label="Olive Oil"
        opacity={0.8}
      />
      <Chemical
        position={[1, 0.3, 0]}
        color="#ADD8E6"
        size={[0.2, 0.2, 0.5]}
        label="Distilled Water"
        opacity={0.3}
      />
    </group>
  )
}

SoapLab.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
} 