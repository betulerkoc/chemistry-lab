import { useState, useCallback } from 'react'

export const useMovement = () => {
    const [moveDirection, setMoveDirection] = useState({ x: 0, z: 0 })

    const handleKeyDown = useCallback((e) => {
        const directions = {
            w: { z: -1 },
            s: { z: 1 },
            a: { x: -1 },
            d: { x: 1 }
        }
        
        const direction = directions[e.key.toLowerCase()]
        if (direction) {
            setMoveDirection(prev => ({ ...prev, ...direction }))
        }
    }, [])

    const handleKeyUp = useCallback((e) => {
        const keys = {
            w: 'z',
            s: 'z',
            a: 'x',
            d: 'x'
        }
        
        const axis = keys[e.key.toLowerCase()]
        if (axis) {
            setMoveDirection(prev => ({ ...prev, [axis]: 0 }))
        }
    }, [])

    const setupMovementControls = useCallback(() => {
        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [handleKeyDown, handleKeyUp])

    return { moveDirection, setupMovementControls }
} 