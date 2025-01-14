const StudentModel = ({ isWalking, legRotation, wearing }) => {
    return (
        <>
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
        </>
    )
}

export default StudentModel 