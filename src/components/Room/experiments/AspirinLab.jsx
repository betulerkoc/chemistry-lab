import { Text } from '@react-three/drei'
import PropTypes from 'prop-types'
import { ExperimentTable } from '../ExperimentTable'
import { Chemical } from '../Chemical'

export function AspirinLab({ position }) {
  return (
    <group position={position}>
      <Text
        position={[0, 2.5, 0]}
        fontSize={0.4}
        color="#111827"
        anchorX="center"
        anchorY="middle"
      >
        Synthesizing Aspirin: Science in Action
      </Text>

      <ExperimentTable size={[3, 0.1, 1.5]} />

      <Chemical
        position={[-1, 0.1, -0.5]}
        color="white"
        size={[0.11, 0.11, 0.22]}
        label="Salicylic Acid"
      />
      <Chemical
        position={[-0.5, 0.2, -0.5]}
        color="#E6E6FA"
        size={[0.11, 0.11, 0.15]}
        label="Acetic Anhydride"
      />
      <Chemical
        position={[0, 0.1, -0.5]}
        color="#FFD700"
        size={[0.11, 0.11, 0.15]}
        label="Sulfuric Acid"
      />
      <Chemical
        position={[0.5, 0.1, -0.5]}
        color="#0b2a5c"
        size={[0.11, 0.11, 0.15]}
        label="Ferric chloride"
      />
      <Chemical
        position={[1, 0.1, -0.5]}
        color="#E6E6FA"
        size={[0.11, 0.11, 0.15]}
        label="Water-Ethanol"
      />
    </group>
  )
}

AspirinLab.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
} 