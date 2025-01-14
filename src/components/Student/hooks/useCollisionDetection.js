export const useCollisionDetection = (onExperiment, wearing) => {
    const checkExperimentArea = (position) => {
        const experimentAreas = {
            soap: { x: -6.5, z: -5 },
            aspirin: { x: 6.5, z: -5 }
        }
        
        const tolerance = 1
        
        Object.entries(experimentAreas).forEach(([type, area]) => {
            if (Math.abs(position.x - area.x) < tolerance && 
                Math.abs(position.z - area.z) < tolerance) {
                onExperiment(wearing, type)
            }
        })
    }

    return { checkExperimentArea }
} 