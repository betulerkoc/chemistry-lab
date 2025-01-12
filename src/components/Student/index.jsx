import { useState, useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useNavigate } from 'react-router-dom';

function Student({ onExperiment }) {
    const studentRef = useRef()
    const speed = 0.1
    const [moveDirection, setMoveDirection] = useState({ x: 0, z: 0 })
    const [isWalking, setIsWalking] = useState(false)
    const [legRotation, setLegRotation] = useState(0)
    const [wearing, setWearing] = useState(false)
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleKeyDown = (e) => {
        switch (e.key.toLowerCase()) {
          case 'w':
            setMoveDirection(prev => ({ ...prev, z: -1 }))
            break
          case 's':
            setMoveDirection(prev => ({ ...prev, z: 1 }))
            break
          case 'a':
            setMoveDirection(prev => ({ ...prev, x: -1 }))
            break
          case 'd':
            setMoveDirection(prev => ({ ...prev, x: 1 }))
            break
        }
      }
  
      const handleKeyUp = (e) => {
        switch (e.key.toLowerCase()) {
          case 'w':
          case 's':
            setMoveDirection(prev => ({ ...prev, z: 0 }))
            break
          case 'a':
          case 'd':
            setMoveDirection(prev => ({ ...prev, x: 0 }))
            break
        }
      }
  
      window.addEventListener('keydown', handleKeyDown)
      window.addEventListener('keyup', handleKeyUp)
  
      return () => {
        window.removeEventListener('keydown', handleKeyDown)
        window.removeEventListener('keyup', handleKeyUp)
      }
    }, [])
  
    useFrame((state, delta) => {
      if (studentRef.current) {
        const newX = studentRef.current.position.x + moveDirection.x * speed
        const newZ = studentRef.current.position.z + moveDirection.z * speed
  
        const isOnSafetyStep =
          Math.abs(studentRef.current.position.x - 0) < 0.5 &&
          Math.abs(studentRef.current.position.z - (-1.5)) < 0.2;
  
        if (isOnSafetyStep && !wearing) {
          setWearing(true)
        }
  
        const isOnExperimentStep =
          Math.abs(studentRef.current.position.x - (-6)) < 0.5 &&
          Math.abs(studentRef.current.position.z - (-5)) < 0.2; 

        if (moveDirection.x !== 0 || moveDirection.z !== 0) {
          console.log('Student position:',
            studentRef.current.position.x.toFixed(2),
            studentRef.current.position.z.toFixed(2)
          );
        }
  
        if (isOnExperimentStep) {
          onExperiment(wearing)
        }
  
        studentRef.current.position.x = Math.max(-8, Math.min(8, newX))
        studentRef.current.position.z = Math.max(-8, Math.min(8, newZ))
  
        const isMoving = moveDirection.x !== 0 || moveDirection.z !== 0
        setIsWalking(isMoving)
        if (isMoving) {
          setLegRotation(prev => (prev + delta * 10) % (Math.PI * 2))
        } else {
          setLegRotation(0)
        }
      }
    })
  
    return (
      <group ref={studentRef} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>

        <mesh position={[-0.2, 0.5, 0]} rotation={[isWalking ? Math.sin(legRotation) * 0.3 : 0, 0, 0]}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0.2, 0.5, 0]} rotation={[isWalking ? -Math.sin(legRotation) * 0.3 : 0, 0, 0]}>
          <boxGeometry args={[0.2, 1, 0.2]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
  
        <mesh position={[-0.5, 1.6, 0]} rotation={[isWalking ? -Math.sin(legRotation) * 0.3 : 0, 0, 0]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color={wearing ? "#e6e6e6" : "#2196F3"} />
        </mesh>
        <mesh position={[0.5, 1.6, 0]} rotation={[isWalking ? Math.sin(legRotation) * 0.3 : 0, 0, 0]}>
          <boxGeometry args={[0.2, 0.8, 0.2]} />
          <meshStandardMaterial color={wearing ? "#e6e6e6" : "#2196F3"} />
        </mesh>

        <mesh position={[0, 1.6, 0]}>
          <boxGeometry args={[0.8, 1.2, 0.4]} />
          <meshStandardMaterial color={wearing ? "white" : "#2196F3"} />
        </mesh>
  
        <mesh position={[0, 2.4, 0]}>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>
  
        {wearing && (
          <>
            <mesh position={[0, 2.4, 0.15]}>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial color="#a0a0a0" transparent opacity={0.5} />
            </mesh>
  
            <mesh position={[0, 2.1, 0]}>
              <boxGeometry args={[0.6, 0.1, 0.3]} />
              <meshStandardMaterial color="white" />
            </mesh>

            {[-0.2, 0, 0.2].map((y, i) => (
              <mesh key={i} position={[0, 1.6 + y, 0.21]}>
                <cylinderGeometry args={[0.03, 0.03, 0.02]} />
                <meshStandardMaterial color="#dcdcdc" />
              </mesh>
            ))}
          </>
        )}
      </group>
    )
  }

  export default Student;