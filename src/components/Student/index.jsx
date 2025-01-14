import { useMovement } from './hooks/useMovement'
import { useCollisionDetection } from './hooks/useCollisionDetection'
import { useEffect, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import StudentModel from './StudentModel'

const Student = ({ onExperiment }) => {
    const studentRef = useRef()
    const [wearing, setWearing] = useState(false)
    const [isWalking, setIsWalking] = useState(false)
    const [legRotation, setLegRotation] = useState(0)
    const speed = 0.1

    const { moveDirection, setupMovementControls } = useMovement()
    const { checkExperimentArea } = useCollisionDetection(onExperiment, wearing)
    
    useEffect(() => {
        const cleanup = setupMovementControls()
        return cleanup
    }, [setupMovementControls])

    useFrame((state, delta) => {
        if (!studentRef.current) return

        const newX = studentRef.current.position.x + moveDirection.x * speed
        const newZ = studentRef.current.position.z + moveDirection.z * speed

        // Check safety area
        const isOnSafetyStep =
            Math.abs(studentRef.current.position.x - 0) < 0.5 &&
            Math.abs(studentRef.current.position.z - (-1.5)) < 0.2

        if (isOnSafetyStep && !wearing) {
            setWearing(true)
        }

        checkExperimentArea(studentRef.current.position)

        // Update position with boundaries
        studentRef.current.position.x = Math.max(-8, Math.min(8, newX))
        studentRef.current.position.z = Math.max(-8, Math.min(8, newZ))

        // Update walking animation
        const isMoving = moveDirection.x !== 0 || moveDirection.z !== 0
        setIsWalking(isMoving)
        if (isMoving) {
            setLegRotation(prev => (prev + delta * 10) % (Math.PI * 2))
        } else {
            setLegRotation(0)
        }
    })

    return (
        <group ref={studentRef} position={[0, 0, 0]} rotation={[0, Math.PI, 0]}>
            <StudentModel 
                isWalking={isWalking}
                legRotation={legRotation}
                wearing={wearing}
            />
        </group>
    )
}

export default Student