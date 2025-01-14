import { Text } from '@react-three/drei'
import PropTypes from 'prop-types'
import { Wall } from './Wall'
import { Floor } from './Floor'
import { Ceiling } from './Ceiling'
import { SoapLab } from './experiments/SoapLab'
import { AspirinLab } from './experiments/AspirinLab'

const ROOM_SIZE = {
  width: 20,
  height: 8,
  depth: 20,
}

function Room() {
  return (
    <group>
      <Ceiling size={[ROOM_SIZE.width, 0.5, ROOM_SIZE.depth]} />
      <Floor size={[ROOM_SIZE.width, ROOM_SIZE.depth]} />

      <Wall position={[0, 4, -10]} size={[ROOM_SIZE.width, ROOM_SIZE.height, 0.2]} />
      <Wall position={[0, 4, 10]} size={[ROOM_SIZE.width, ROOM_SIZE.height, 0.2]} />
      <Wall position={[-10, 4, 0]} size={[0.2, ROOM_SIZE.height, ROOM_SIZE.depth]} />
      <Wall position={[10, 4, 0]} size={[0.2, ROOM_SIZE.height, ROOM_SIZE.depth]} />

      <SoapLab position={[-6, 1, -6]} />
      <AspirinLab position={[6, 1, -6]} />
    </group>
  )
}

export default Room