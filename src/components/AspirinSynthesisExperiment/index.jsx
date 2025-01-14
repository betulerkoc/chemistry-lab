import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import AspirinQuiz from '../AspirinQuiz';

function AspirinSynthesisExperiment() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [salicylicAcidPosition, setSalicylicAcidPosition] = useState([-4, 1.3, -2]);
    const [aceticAnhydridePosition, setAceticAnhydridePosition] = useState([-2, 1.3, -2]);
    const [isPouring, setIsPouring] = useState(false);
    const [showSpatula, setShowSpatula] = useState(false);
    const [spatulaPosition, setSpatulaPosition] = useState([-4, 1.3, -2]);
    const [pouringAceticAnhydride, setPouringAceticAnhydride] = useState(false);
    const [isShaking, setIsShaking] = useState(false);
    const [pouringSulfuricAcid, setPouringSulfuricAcid] = useState(false);
    const [showPipette, setShowPipette] = useState(false);
    const [pipettePosition, setPipettePosition] = useState([-4, 1.3, -2]);
    const [warningText, setWarningText] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [isHeating, setIsHeating] = useState(false);
    const [showTemperature, setShowTemperature] = useState(false);
    const [currentTemp, setCurrentTemp] = useState(55);
    const [showThermometer, setShowThermometer] = useState(false);
    const [thermometerPosition, setThermometerPosition] = useState([1, 1.5, 0]);
    const [isStirring, setIsStirring] = useState(false);
    const [stirAngle, setStirAngle] = useState(0);
    const [flaskPosition, setFlaskPosition] = useState([-3, 1.3, 1]);
    const [flaskRotation, setFlaskRotation] = useState([0, 0, 0]);
    const [showBeaker, setShowBeaker] = useState(false);
    const [beakerPosition, setBeakerPosition] = useState([-1, 1.6, 1]);
    const [showPurificationSpatula, setShowPurificationSpatula] = useState(false);
    const [purificationSpatulaPosition, setPurificationSpatulaPosition] = useState([]);
    const [transferringPowder, setTransferringPowder] = useState(false);
    const [transferringEthanol, setTransferringEthanol] = useState(false);
    const [waterBeakerPosition, setWaterBeakerPosition] = useState([0.5, 1.3, 2]);
    const [pouringToWater, setPouringToWater] = useState(false);
    const [movingToIceBath, setMovingToIceBath] = useState(false);
    const [filterPaperPosition, setFilterPaperPosition] = useState([4, 2, 1.6]);
    const [quizCompleted, setQuizCompleted] = useState(false);

    const handleStep = (step) => {
        if (step === 'Acid Preparation') {
            setShowNotification(true);
            setNotificationText('Add 1.3 g of salicylic acid');
            setShowSpatula(true);
            setTimeout(() => {
                setSpatulaPosition([-3, 2, 0]);
                setTimeout(() => {
                    setSpatulaPosition([-3, 1.5, 0]);
                    setIsPouring(true);
                    setTimeout(() => {
                        setSpatulaPosition([-4, 1.3, -2]);
                        setIsPouring(false);
                        setShowSpatula(false);
                        setNotificationText('Add 1.9 mL of acetic anhydride into an Erlenmeyer flask');
                        setTimeout(() => {
                            setPouringAceticAnhydride(true);
                            setTimeout(() => {
                                setPouringAceticAnhydride(false);
                                setNotificationText('Shake the mixture');
                                setIsShaking(true);
                                setTimeout(() => {
                                    setIsShaking(false);
                                    setShowNotification(false);
                                }, 6000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 500);
        } else if (step === 'Acid Catalyst Addition') {
            setShowNotification(true);
            setShowWarning(true);
            setNotificationText('Add 4 drops of concentrated H₂SO₄ to the flask ');
            setWarningText('⚠️ WARNING: Sulfuric acid is highly corrosive. Handle with extreme care!');
            setShowPipette(true);
            setPipettePosition([-2, 1.3, -2]);
            setTimeout(() => {
                setPipettePosition([-3, 2, 0]);
                setTimeout(() => {
                    setPipettePosition([-3, 1.5, 0]);
                    setPouringSulfuricAcid(true);
                    setTimeout(() => {
                        setPouringSulfuricAcid(false);
                        setPipettePosition([-2, 1.3, -2]);
                        setShowPipette(false);
                        setShowNotification(false);
                        setShowWarning(false);
                    }, 2000);
                }, 1000);
            }, 1000);
        } else if (step === 'Heating Phase') {
            setShowNotification(true);
            setNotificationText('Heat the mixture in a water bath for 20 minutes');
            setIsHeating(true);
            setShowThermometer(true);
            setThermometerPosition([-0.5, 2, 1.5]); 
            setTimeout(() => {
                setNotificationText('Keep the temperature below 60°C');
                setShowTemperature(true);
                setThermometerPosition([-0.5, 2, 1.5]); 
                let temp = 55;
                const tempInterval = setInterval(() => {
                    temp += 5;
                    if (temp <= 65) {
                        setCurrentTemp(temp);
                    }
                }, 2000);

                setTimeout(() => {
                    setIsHeating(false);
                    setShowTemperature(false);
                    setShowNotification(false);
                    clearInterval(tempInterval);
                    setCurrentTemp(25);
                    setThermometerPosition([1, 1.5, 0]);
                    setShowThermometer(false);
                }, 3000);

            }, 2000);
        } else if (step === 'Cooling and Precipitation') {
            setShowNotification(true);
            setNotificationText('Let it cool and stir');
            setIsStirring(true);

            const stirInterval = setInterval(() => {
                setStirAngle(prev => prev + 0.1);
            }, 50);

            setTimeout(() => {
                setIsStirring(false);
                setShowNotification(false);
                clearInterval(stirInterval); 
            }, 5000);
        } else if (step === 'Filtration') {
            setShowNotification(true);
            setNotificationText('Filter the precipitate');

            setFlaskPosition([4, 2.5, 1.5]);

            setTimeout(() => {
                setFlaskRotation([0, 0, Math.PI / 3]);
                setIsPouring(true);

                setTimeout(() => {
                    setFlaskPosition([-3, 1.3, 1]);
                    setFlaskRotation([0, 0, 0]);
                    setIsPouring(false);
                    setShowNotification(false);
                }, 3000);
            }, 2000);
        } else if (step === 'Purification') {
            setShowNotification(true);
            setNotificationText('Dissolve the solid in a water-ethanol mixture by heating');
            setShowBeaker(true);

            setTimeout(() => {
                setTransferringEthanol(true);
                setTimeout(() => {
                    setTransferringEthanol(false);

                    setShowPurificationSpatula(true);
                    setTimeout(() => {
                        setPurificationSpatulaPosition([4, 2, 1.5]);
                        setTimeout(() => {
                            setTransferringPowder(true);
                            setTimeout(() => {
                                setPurificationSpatulaPosition([-1, 2, 1]);
                                setTimeout(() => {
                                    setTransferringPowder(false);
                                    setShowPurificationSpatula(false);

                                }, 1000);
                            }, 1000);
                        }, 1000);
                    }, 1000);
                }, 1000);
            }, 1000);
            setTimeout(() => {
                setNotificationText('Pour the hot solution into 10 mL of room temperature water and place it in an ice bath.');

                setBeakerPosition([-0.2, 2, 1.5]); 
                setTimeout(() => {
                    setBeakerPosition([-0.2, 2, 1.8]);
                    setPouringToWater(true);
                    setTimeout(() => {
                        setPouringToWater(false);
                        setShowBeaker(false);
                        setWaterBeakerPosition([1.8, 1.6, 1]); 
                        setMovingToIceBath(true);
                        setTimeout(() => {
                            setMovingToIceBath(false);
                            setShowNotification(false);
                        }, 2000);
                    }, 2000);
                }, 1500);
            }, 13000); 
        } else if (step === 'Final Steps') {
            setShowNotification(true);
            setNotificationText('Filter and rinse the crystals.');

            setWaterBeakerPosition([4, 2.5, 1.5]); 

            setTimeout(() => {
                setWaterBeakerPosition([4, 2.5, 1.5]);
                setPouringToWater(true);

                setTimeout(() => {
                    setPouringToWater(false);
                    setWaterBeakerPosition([1.8, 1.6, 1]); 
                    setShowNotification(false);
                }, 3000);
            }, 2000);
        } else if (step === 'Purity Check') {
            setShowNotification(true);
            setNotificationText('Conduct a FeCl₃ test to check the product\'s purity');
            
            setFilterPaperPosition([0, 1.3, 3]); 
            
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        } else {
            setShowNotification(true);
            setNotificationText(`Performing: ${step}`);
            setTimeout(() => setShowNotification(false), 3000);
        }
    };

    const handleQuizComplete = (passed) => {
        setQuizCompleted(passed);
    };

    return (
        <div className="w-screen h-screen">
            <Canvas
                camera={{
                    position: [0, 2, 10],
                    fov: 50
                }}
            >
                <ambientLight intensity={0.5} />
                <directionalLight position={[5, 5, 5]} intensity={1} />

                <mesh position={[0, -0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <planeGeometry args={[100, 100]} />
                    <meshStandardMaterial color="#808080" />
                </mesh>

                <mesh position={[0, 10, -10]}>
                    <planeGeometry args={[100, 50]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>

                <mesh position={[0, 1, 0]}>
                    <boxGeometry args={[12, 0.2, 6]} />
                    <meshStandardMaterial color="#404040" />
                </mesh>

                <group position={[-1, 1.3, 1]}>
                    <mesh>
                        <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
                        <meshStandardMaterial
                            color="#B0C4DE"
                            metalness={0.5}
                            roughness={0.2}
                        />
                    </mesh>

                    <mesh position={[0, 0.1, 0]}>
                        <cylinderGeometry args={[0.75, 0.75, 0.3, 32]} />
                        <meshPhysicalMaterial
                            color="#4FC3F7"
                            transparent
                            opacity={0.8}
                            roughness={0.1}
                            metalness={0.3}
                            transmission={0.3}
                        />
                    </mesh>

                    {[...Array(5)].map((_, i) => (
                        <mesh
                            key={i}
                            position={[0, 0.25, 0]}
                            rotation={[Math.PI / 2, 0, Math.sin(Date.now() * 0.001 + i) * 0.1]}
                        >
                            <ringGeometry args={[0.2 + i * 0.1, 0.22 + i * 0.1, 32]} />
                            <meshStandardMaterial
                                color="#81D4FA"
                                transparent
                                opacity={0.3 - i * 0.05}
                            />
                        </mesh>
                    ))}

                    <group position={[0.9, 0, 0]}>
                        <mesh position={[0, 0, 0]}>
                            <boxGeometry args={[0.3, 0.4, 0.1]} />
                            <meshStandardMaterial color="#424242" />
                        </mesh>

                        <mesh position={[0, 0.1, 0.06]}>
                            <planeGeometry args={[0.2, 0.1]} />
                            <meshStandardMaterial color="#000000" />
                        </mesh>

                        {[0, -0.15].map((y, i) => (
                            <mesh key={i} position={[0, y, 0.06]}>
                                <cylinderGeometry args={[0.03, 0.03, 0.02, 16]} />
                                <meshStandardMaterial color="#FF0000" />
                            </mesh>
                        ))}
                    </group>

                    <Text
                        position={[0, 0.7, 0]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Water Bath
                    </Text>
                </group>

                {showThermometer && (
                    <group position={thermometerPosition}>

                        <mesh position={[0, -0.15, 0]}>
                            <sphereGeometry args={[0.06, 16, 16]} />
                            <meshStandardMaterial color="#FF0000" />
                        </mesh>

                        <mesh position={[0, 0.1, 0]}>
                            <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
                            <meshStandardMaterial color="#FFFFFF" />
                        </mesh>

                        {showTemperature && (
                            <Text
                                position={[0.15, 0, 0]}
                                fontSize={0.12}
                                color="#FF0000"
                                anchorX="left"
                                anchorY="middle"
                            >
                                {`${currentTemp}°C`}
                            </Text>
                        )}
                    </group>
                )}

                <group position={salicylicAcidPosition}>
                    <mesh>
                        <cylinderGeometry args={[0.3, 0.3, 0.6]} />
                        <meshStandardMaterial color="white" roughness={0.2} metalness={0.1} />
                    </mesh>
                    <mesh position={[0, 0.35, 0]}>
                        <cylinderGeometry args={[0.15, 0.15, 0.1]} />
                        <meshStandardMaterial color="white" roughness={0.2} metalness={0.1} />
                    </mesh>
                    <mesh position={[0, 0.45, 0]}>
                        <cylinderGeometry args={[0.17, 0.17, 0.1]} />
                        <meshStandardMaterial color="#444" roughness={0.3} />
                    </mesh>
                    <Text position={[0, 0.7, 0]} fontSize={0.2} color="black">
                        Salicylic Acid
                    </Text>
                </group>

                <group position={aceticAnhydridePosition}>
                    <mesh>
                        <cylinderGeometry args={[0.3, 0.3, 0.4]} />
                        <meshStandardMaterial color="#E6E6FA" />
                    </mesh>
                    <Text
                        position={[0, 0.5, 0]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Acetic Anhydride
                    </Text>
                </group>

                <group position={[0, 1.3, -2]}>
                    <mesh>
                        <cylinderGeometry args={[0.3, 0.3, 0.4]} />
                        <meshStandardMaterial color="#FFD700" />
                    </mesh>
                    <Text
                        position={[0, 0.5, 0]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Sulfuric Acid
                    </Text>
                </group>

                <group position={[2, 1.3, -2]}>
                    <mesh>
                        <cylinderGeometry args={[0.3, 0.3, 0.4]} />
                        <meshStandardMaterial color="#0b2a5c" />
                    </mesh>
                    <Text
                        position={[0, 0.5, 0]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Ferric Chloride
                    </Text>
                </group>

                <group position={[4, 1.3, -2]}>
                    <mesh>
                        <cylinderGeometry args={[0.3, 0.3, 0.4]} />
                        <meshStandardMaterial color="#E6E6FA" />
                    </mesh>
                    <Text
                        position={[0, 0.5, 0]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Water-Ethanol
                    </Text>
                </group>

                <group
                    position={[
                        isHeating ? -1 : flaskPosition[0],
                        isHeating ? 1.6 : flaskPosition[1],
                        flaskPosition[2]
                    ]}
                    rotation={[
                        flaskRotation[0],
                        flaskRotation[1],
                        isShaking ? Math.sin(Date.now() * 0.002) * 0.08 : flaskRotation[2]
                    ]}
                >
                    <mesh>
                        <cylinderGeometry args={[0.4, 0.2, 0.6]} />
                        <meshPhysicalMaterial
                            color="#B0C4DE"
                            transparent
                            opacity={0.3}
                            roughness={0}
                            metalness={0}
                            clearcoat={1}
                            clearcoatRoughness={0}
                            ior={1.5}
                        />
                    </mesh>
                    <mesh position={[0, 0.35, 0]}>
                        <cylinderGeometry args={[0.15, 0.15, 0.2]} />
                        <meshPhysicalMaterial
                            color="#B0C4DE"
                            transparent
                            opacity={0.3}
                            roughness={0}
                            clearcoat={1}
                        />
                    </mesh>
                    <Text position={[0, 0.7, 0]} fontSize={0.2} color="black">
                        Conical Flask
                    </Text>

                    {isStirring && (
                        <group >
                            <mesh position={[0, 0.4, 0]} rotation={[0, stirAngle, Math.PI / 6]}>
                                <cylinderGeometry args={[0.02, 0.02, 0.8]} />
                                <meshStandardMaterial color="#B0C4DE" />
                            </mesh>
                        </group>
                    )}

                </group>

                <group position={[4, 1.1, 1.5]}>
                    <mesh position={[0.25, 0.3, 0.144]} rotation={[-0.2, 0, 0.3]}>
                        <cylinderGeometry args={[0.015, 0.015, 0.7]} />
                        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[-0.25, 0.3, 0.144]} rotation={[-0.3, 0, -0.3]}>
                        <cylinderGeometry args={[0.015, 0.015, 0.7]} />
                        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[0, 0.3, -0.289]} rotation={[0.4, 0, 0]}>
                        <cylinderGeometry args={[0.015, 0.015, 0.7]} />
                        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
                    </mesh>

                    <mesh
                        position={[0, 0.6, 0]}
                        rotation={[Math.PI / 2, 0, 0]}
                    >
                        <torusGeometry args={[0.15, 0.015, 16, 32]} />
                        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
                    </mesh>

                    <group position={[0, 0.7, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.2, 0.03, 0.25]} />
                            <meshPhysicalMaterial
                                color="#ffffff"
                                transparent={true}
                                opacity={0.4}
                                roughness={0}
                                metalness={0}
                                clearcoat={1}
                            />
                        </mesh>

                        <mesh position={[0, 0.05, 0]} rotation={[-Math.PI, 0, 0]}>
                            <coneGeometry args={[0.2, 0.22, 33]} />
                            <meshStandardMaterial
                                color="#F5F5F5"
                                side={2}
                                roughness={1}
                                metalness={0}
                            />
                        </mesh>
                    </group>

                    <group position={[0, 0.25, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.2, 0.2, 0.4]} />
                            <meshStandardMaterial color="#B0C4DE" transparent opacity={0.3} />
                        </mesh>
                    </group>

                    <Text
                        position={[0, 1.2, 0]}
                        fontSize={0.15}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Filtration Setup
                    </Text>
                </group>

                {showSpatula && (
                    <group position={spatulaPosition}>
                        <mesh rotation={[0, 0, Math.PI / 4]}>
                            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                            <meshStandardMaterial color="#4a4a4a" />
                        </mesh>
                        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                            <boxGeometry args={[0.15, 0.02, 0.08]} />
                            <meshStandardMaterial color="#717171" />
                        </mesh>
                        {isPouring && (
                            <mesh position={[0.15, -0.1, 0]}>
                                <sphereGeometry args={[0.03, 8, 8]} />
                                <meshStandardMaterial color="white" />
                            </mesh>
                        )}
                    </group>
                )}

                {pouringAceticAnhydride && (
                    <mesh position={[-2, 2.5, -1.5]}>
                        <cylinderGeometry args={[0.05, 0.05, 1]} />
                        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
                    </mesh>
                )}

                {pouringSulfuricAcid && (
                    <mesh position={[0, 2.5, -1.5]}>
                        <cylinderGeometry args={[0.05, 0.05, 1]} />
                        <meshStandardMaterial color="yellow" transparent opacity={0.8} />
                    </mesh>
                )}

                {showPipette && (
                    <group position={pipettePosition}>
                        <mesh>
                            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                            <meshStandardMaterial color="#4a4a4a" />
                        </mesh>
                    </group>
                )}

                {showBeaker && (
                    <group
                        position={beakerPosition}
                        rotation={[0, 0, pouringToWater ? Math.PI / 4 : 0]}
                    >
                        <mesh>
                            <cylinderGeometry args={[0.3, 0.3, 0.6]} />
                            <meshPhysicalMaterial
                                color="#B0C4DE"
                                transparent
                                opacity={0.3}
                                roughness={0}
                                metalness={0}
                                clearcoat={1}
                                clearcoatRoughness={0}
                                ior={1.5}
                            />
                        </mesh>

                        <mesh position={[0, -0.1, 0]}>
                            <cylinderGeometry args={[0.28, 0.28, 0.35]} />
                            <meshStandardMaterial
                                color="#E6E6FA"
                                transparent
                                opacity={0.4}
                            />
                        </mesh>

                        {isStirring && (
                            <mesh position={[0, 0.1, 0]} rotation={[0, stirAngle, Math.PI / 6]}>
                                <cylinderGeometry args={[0.02, 0.02, 0.5]} />
                                <meshStandardMaterial color="#B0C4DE" />
                            </mesh>
                        )}
                    </group>
                )}

                {showPurificationSpatula && (
                    <group position={purificationSpatulaPosition}>
                        <mesh rotation={[0, 0, Math.PI / 4]}>
                            <cylinderGeometry args={[0.02, 0.02, 0.4]} />
                            <meshStandardMaterial color="#4a4a4a" />
                        </mesh>
                        <mesh position={[0.15, 0, 0]} rotation={[0, 0, Math.PI / 4]}>
                            <boxGeometry args={[0.15, 0.02, 0.08]} />
                            <meshStandardMaterial color="#717171" />
                        </mesh>
                        {transferringPowder && (
                            <mesh position={[0.15, -0.1, 0]}>
                                <sphereGeometry args={[0.03, 8, 8]} />
                                <meshStandardMaterial color="white" />
                            </mesh>
                        )}
                    </group>
                )}

                {transferringEthanol && (
                    <mesh position={[4, 2, -2]}>
                        <cylinderGeometry args={[0.05, 0.05, 1]} />
                        <meshStandardMaterial color="#E6E6FA" transparent opacity={0.6} />
                    </mesh>
                )}

                <group position={[1.8, 1.3, 1]}>
                    <mesh>
                        <cylinderGeometry args={[0.8, 0.8, 0.6, 32]} />
                        <meshStandardMaterial
                            color="#B0C4DE"
                            metalness={0.5}
                            roughness={0.2}
                        />
                    </mesh>

                    <mesh position={[0, 0.1, 0]}>
                        <cylinderGeometry args={[0.75, 0.75, 0.3, 32]} />
                        <meshPhysicalMaterial
                            color="#ADD8E6"
                            transparent
                            opacity={0.9}
                            roughness={0.1}
                            metalness={0.3}
                            transmission={0.3}
                        />
                    </mesh>

                    {[...Array(24)].map((_, i) => (
                        <mesh
                            key={i}
                            position={[
                                Math.sin(i * 1.5) * 0.35,
                                0.2,
                                Math.cos(i * 1.5) * 0.35
                            ]}
                            rotation={[
                                i * 0.5,
                                i * 0.3,
                                i * 0.4
                            ]}
                            scale={[0.8, 0.8, 0.8]}
                        >
                            <boxGeometry args={[0.15, 0.15, 0.15]} />
                            <meshPhysicalMaterial
                                color="#F0F8FF"
                                transparent
                                opacity={0.7}
                                roughness={0.1}
                                metalness={0.2}
                                transmission={0.4}
                                clearcoat={1}
                                clearcoatRoughness={0.1}
                            />
                        </mesh>
                    ))}

                    {[...Array(20)].map((_, i) => (
                        <mesh
                            key={`crushed-${i}`}
                            position={[
                                Math.sin(i * 3) * 0.3,
                                0.25,
                                Math.cos(i * 3) * 0.3
                            ]}
                            rotation={[i, i * 0.5, i * 0.3]}
                            scale={[0.3]}
                        >
                            <octahedronGeometry args={[0.05]} />
                            <meshPhysicalMaterial
                                color="#F0F8FF"
                                transparent
                                opacity={0.6}
                                roughness={0.2}
                                metalness={0.1}
                                transmission={0.3}
                            />
                        </mesh>
                    ))}

                    {[...Array(5)].map((_, i) => (
                        <mesh
                            key={`mist-${i}`}
                            position={[0, 0.4, 0]}
                            rotation={[Math.PI / 2, 0, i * 0.1]}
                        >
                            <ringGeometry args={[0.2 + i * 0.1, 0.22 + i * 0.1, 32]} />
                            <meshStandardMaterial
                                color="#E6E6FA"
                                transparent
                                opacity={0.3 - i * 0.05}
                            />
                        </mesh>
                    ))}
                    {[...Array(8)].map((_, i) => (
                        <mesh
                            key={`crystal-${i}`}
                            position={[
                                Math.sin(i * Math.PI / 4) * 0.4,
                                0.31,
                                Math.cos(i * Math.PI / 4) * 0.4
                            ]}
                            rotation={[0, i * Math.PI / 4, 0]}
                            scale={[0.1, 0.05, 0.1]}
                        >
                            <coneGeometry args={[1, 1, 4]} />
                            <meshPhysicalMaterial
                                color="#FFFFFF"
                                transparent
                                opacity={0.4}
                                roughness={0.1}
                                metalness={0.3}
                            />
                        </mesh>
                    ))}

                    <Text
                        position={[0, 0.7, 0]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Ice Bath
                    </Text>
                </group>

                <group position={waterBeakerPosition}>
                    <mesh>
                        <cylinderGeometry args={[0.2, 0.2, 0.5]} />
                        <meshStandardMaterial
                            color="#ADD8E6"
                            transparent
                            opacity={0.6}
                        />
                    </mesh>
                    {pouringToWater && (
                        <mesh position={[0, -0.1, 0]}>
                            <cylinderGeometry args={[0.18, 0.18, 0.3]} />
                            <meshStandardMaterial
                                color="#E6E6FA"
                                transparent
                                opacity={0.4}
                            />
                        </mesh>
                    )}
                    <Text
                        position={[0, 0.7, 0]}
                        fontSize={0.2}
                        color="black"
                        anchorX="center"
                        anchorY="middle"
                    >
                        Water
                    </Text>
                </group>

                {pouringToWater && (
                    <mesh position={[4, 2.2, 1.5]}>
                        <cylinderGeometry args={[0.05, 0.05, 0.4]} />
                        <meshStandardMaterial 
                            color="#ADD8E6" 
                            transparent 
                            opacity={0.6}
                        />
                    </mesh>
                )}

                <group position={filterPaperPosition}>
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <circleGeometry args={[0.18, 32]} />
                        <meshStandardMaterial color="#FFFFFF" />
                    </mesh>
                    <group position={[0, 0.01, 0]}>
                        {[...Array(15)].map((_, i) => (
                            <mesh
                                key={`crystal-${i}`}
                                position={[
                                    (Math.random() - 0.5) * 0.3,
                                    0,
                                    (Math.random() - 0.5) * 0.3
                                ]}
                                rotation={[
                                    Math.random() * Math.PI,
                                    Math.random() * Math.PI,
                                    Math.random() * Math.PI
                                ]}
                                scale={[0.02, 0.02, 0.02]}
                            >
                                <octahedronGeometry />
                                <meshStandardMaterial color="#FFFFFF" />
                            </mesh>
                        ))}
                    </group>
                </group>

                <OrbitControls />
            </Canvas>

            {quizCompleted && (
                <>
                    <div className="fixed right-5 top-5 bg-white/90 p-5 rounded-lg shadow-md text-black">
                        <h2 className="m-0 mb-4">Aspirin Synthesis</h2>
                        <div className="flex flex-col gap-2">
                            {[
                                'Acid Preparation',
                                'Acid Catalyst Addition',
                                'Heating Phase',
                                'Cooling and Precipitation',
                                'Filtration',
                                'Purification',
                                'Final Steps',
                                'Purity Check'
                            ].map((step, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleStep(step)}
                                    className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer w-50 text-left hover:bg-green-600"
                                >
                                    {`${index + 1}. ${step}`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="fixed left-5 top-5 bg-white/90 p-5 rounded-lg shadow-md max-w-[300px] text-black">
                        <h2 className="m-0 mb-4">Reaction Overview</h2>
                        <div className="bg-gray-100/90 p-3 rounded text-sm font-mono leading-relaxed">
                            <div className="mb-3">
                                <strong>Synthesis Reaction:</strong><br />
                                C₇H₆O₃ + (CH₃CO)₂O → C₉H₈O₄ + CH₃COOH
                            </div>
                            <div>
                                <strong>Conditions:</strong><br />
                                • Temperature: ~85°C<br />
                                • Catalyst: H₂SO₄<br />
                                • Time: ~15 minutes
                            </div>
                        </div>
                    </div>

                    {showNotification && (
                        <div className="absolute top-5 left-1/2 -translate-x-1/2 bg-black p-5 rounded-lg shadow-md z-50 text-white font-bold">
                            {notificationText}
                        </div>
                    )}

                    {showWarning && (
                        <div className="fixed bottom-2.5 left-1/2 -translate-x-1/2 bg-red-600 text-white p-4 px-8 rounded-lg z-50 font-bold text-xl shadow-lg border-2 border-red-500 select-none pointer-events-none">
                            {warningText}
                        </div>
                    )}
                </>
            )}

            {!quizCompleted && (
                <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
                    <AspirinQuiz onQuizComplete={handleQuizComplete} />
                </div>
            )}
        </div>
    )
}

export default AspirinSynthesisExperiment;