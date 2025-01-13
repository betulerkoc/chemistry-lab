import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import SoapQuiz from '../SoapQuiz';

function SoapMakingExperiment() {
    const [showNotification, setShowNotification] = useState(false);
    const [notificationText, setNotificationText] = useState('');
    const [isPouring, setIsPouring] = useState(false);
    const [isPouringBase, setIsPouringBase] = useState(false);
    const [oilLevel, setOilLevel] = useState(0);
    const [baseLevel, setBaseLevel] = useState(0);
    const [waterLevel, setWaterLevel] = useState(0);
    const [ethanolLevel, setEthanolLevel] = useState(0);
    const [isMixing, setIsMixing] = useState(false);
    const [pourProgress, setPourProgress] = useState(0);
    const [pourHeight, setPourHeight] = useState(0);
    const [isStirring, setIsStirring] = useState(false);
    const [stirAngle, setStirAngle] = useState(0);
    const [pouringEthanol, setPouringEthanol] = useState(false);
    const [pouringWater, setPouringWater] = useState(false);
    const [pouringSodium, setPouringSodium] = useState(false);
    const [isHeating, setIsHeating] = useState(false);
    const [heatingTime, setHeatingTime] = useState(0);
    const [saltLevel, setSaltLevel] = useState(0);
    const [saltWaterLevel, setSaltWaterLevel] = useState(0);
    const [isPouringSalt, setIsPouringSalt] = useState(false);
    const [isPouringSaltWater, setIsPouringSaltWater] = useState(false);
    const [isSeparating, setIsSeparating] = useState(false);
    const [separationTime, setSeparationTime] = useState(0);
    const [isPouringSoap, setIsPouringSoap] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const baseBeakerRef = useRef();
    const oilBeakerRef = useRef();
    const saltBeakerRef = useRef();
  
    const handlePrepareOil = () => {
      setNotificationText('Adding 10 g of oil to a 250 mL beaker');
      setShowNotification(true);
      setIsPouring(true);
  
      let level = 0;
      const interval = setInterval(() => {
        level += 0.01;
        setOilLevel(level);
        if (level >= 0.3) {
          clearInterval(interval);
          setIsPouring(false);
          setTimeout(() => setShowNotification(false), 1000);
        }
      }, 50);
    };
  
    const handlePrepareBase = () => {

      const sequence = async () => {
        setNotificationText('Adding 20 mL of water');
        setShowNotification(true);
        setPouringWater(true);
  
        let level = 0;
        const waterInterval = setInterval(() => {
          level += 0.01;
          setWaterLevel(level);
          if (level >= 0.15) {
            clearInterval(waterInterval);
            setPouringWater(false);
          }
        }, 50);

        setTimeout(() => {
          setNotificationText('Adding 20 mL of ethanol');
          setPouringEthanol(true);
          let ethanolLevel = 0;
          const ethanolInterval = setInterval(() => {
            ethanolLevel += 0.01;
            setEthanolLevel(ethanolLevel);
            if (ethanolLevel >= 0.15) {
              clearInterval(ethanolInterval);
              setPouringEthanol(false);
            }
          }, 50);
        }, 2000);
  
        setTimeout(() => {
          setNotificationText('Adding 5g of sodium hydroxide');
          setPouringSodium(true);
          let baseLevel = 0;
          const baseInterval = setInterval(() => {
            baseLevel += 0.01;
            setBaseLevel(baseLevel);
            if (baseLevel >= 0.3) {
              clearInterval(baseInterval);
              setPouringSodium(false);
              setTimeout(() => setShowNotification(false), 1000);
            }
          }, 50);
        }, 4000);
      };
  
      sequence();
    };
  
    const handleMixSolutions = () => {
      setShowNotification(true);
      setNotificationText('Gradually add the basic solution to the oil in 5 mL portions while stirring');
      setIsMixing(true);
  
      let progress = 0;
      const pourInterval = setInterval(() => {
        progress += 0.01;
        setPourProgress(progress);
  
        if (baseBeakerRef.current) {
          baseBeakerRef.current.position.x = -2.2; 
          baseBeakerRef.current.position.y = progress > 0.25 ? 2.3 : 1.5; 
          if (progress > 0.25) {
            baseBeakerRef.current.rotation.z = Math.PI / 4;
          }
        }
  
        if (progress >= 1) {
          clearInterval(pourInterval);
          setIsMixing(false);
          setPourProgress(0);
  
          setIsStirring(true);
          const stirInterval = setInterval(() => {
            setStirAngle(angle => angle + 0.1);
          }, 20);
  
          setTimeout(() => {
            clearInterval(stirInterval);
            setIsStirring(false);
            setShowNotification(false);
            
            if (baseBeakerRef.current) {
              baseBeakerRef.current.position.x = 0;
              baseBeakerRef.current.position.y = 1.5;
              baseBeakerRef.current.rotation.z = 0;
            }
          }, 3000);
        }
      }, 50);
    };
  
    const handleHeatMixture = () => {
      setNotificationText('Heat the oil-base mixture using a burner until saponification is complete.');
      setShowNotification(true);
      setIsHeating(true);

      if (oilBeakerRef.current) {
        oilBeakerRef.current.position.x = 2;
        oilBeakerRef.current.position.y = 2;
        oilBeakerRef.current.position.z = 0.5;
      }

      let timer = 0;
      const heatInterval = setInterval(() => {
        timer += 1;
        setHeatingTime(timer);
        
        if (timer >= 10) {
          clearInterval(heatInterval);
          setIsHeating(false);
          setHeatingTime(0);
          
          if (oilBeakerRef.current) {
            oilBeakerRef.current.position.x = -2.5;
            oilBeakerRef.current.position.y = 1.5;
            oilBeakerRef.current.position.z = 1.5;
          }
          
          setNotificationText('Allow it to cool to room temperature and check the pH.');
          setTimeout(() => setShowNotification(false), 5000);
        }
      }, 1000);
    };
  
    const handlePrepareSaltSolution = () => {
      setNotificationText('Dissolve 50 g of sodium chloride in 150 mL of water in a beaker.');
      setShowNotification(true);
      setIsPouringSalt(true);
      let saltAmount = 0;
      const saltInterval = setInterval(() => {
        saltAmount += 0.01;
        setSaltLevel(saltAmount);
        if (saltAmount >= 0.15) {
          clearInterval(saltInterval);
          setIsPouringSalt(false);
          setIsPouringSaltWater(true);
          let waterAmount = 0;
          const waterInterval = setInterval(() => {
            waterAmount += 0.01;
            setSaltWaterLevel(waterAmount);
            if (waterAmount >= 0.3) {
              clearInterval(waterInterval);
              setIsPouringSaltWater(false);
              setTimeout(() => setShowNotification(false), 1000);
            }
          }, 50);
        }
      }, 50);
    };
  
    const handleSeparateSoap = () => {
      setNotificationText('Add the soap solution to the salt solution, stir for at least 10 minutes');
      setShowNotification(true);
      setIsSeparating(true);

      if (oilBeakerRef.current) {
        oilBeakerRef.current.position.x = -3.8;
        oilBeakerRef.current.position.y = 2;
        oilBeakerRef.current.position.z = 1.5;

        setTimeout(() => {
          oilBeakerRef.current.rotation.z = Math.PI / 4; 
          setTimeout(() => {
            setIsPouringSoap(false);
            oilBeakerRef.current.rotation.z = 0;
            
            setIsStirring(true);
            let time = 0;
            const stirInterval = setInterval(() => {
              time += 1;
              setSeparationTime(time);
              setStirAngle(angle => angle + 10);
              
              if (time >= 10) {
                clearInterval(stirInterval);
                setIsStirring(false);
                setIsSeparating(false);
                setSeparationTime(0);

                if (oilBeakerRef.current) {
                  oilBeakerRef.current.position.x = -2.5;
                  oilBeakerRef.current.position.y = 1.5;
                }
            
                setNotificationText('Cool the mixture');
            
                setTimeout(() => {
                  setNotificationText('Filter the soap solution');
                
                  if (saltBeakerRef.current) {
                    saltBeakerRef.current.position.x = 4.2;
                    saltBeakerRef.current.position.y = 2.5;
                    saltBeakerRef.current.position.z = 1.5;
                    
                    setTimeout(() => {
                      saltBeakerRef.current.rotation.z = Math.PI / 4;

                      setTimeout(() => {
                        saltBeakerRef.current.position.x = -4;
                        saltBeakerRef.current.position.y = 1.5;
                        saltBeakerRef.current.position.z = 1.5;
                        saltBeakerRef.current.rotation.z = 0;
                        setNotificationText('Dry the soap and weigh it');
                        setTimeout(() => {
                          setShowNotification(false);
                        }, 5000);
                      }, 5000);
                    }, 2000);
                  }
                }, 7000);
              }
            }, 1000);
          }, 2000);
        }, 1000);
      }
    };
  
    const handleQuizComplete = (passed) => {
        setQuizCompleted(passed);
    };
  
    return (
      <div style={{ width: '100vw', height: '100vh' }}>
        <Canvas
            camera={{
                position: [10, 5, 10],
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
                <meshStandardMaterial color="#0b2a5c" />
            </mesh>

            <group ref={oilBeakerRef} position={[-2.5, 1.5, 1.5]}>
                <mesh>
                    <cylinderGeometry args={[0.25, 0.2, 0.5]} />
                    <meshStandardMaterial color="#B0C4DE" transparent opacity={0.2} />
                </mesh>
                {oilLevel > 0 && (
                    <mesh position={[0, -0.25 + (oilLevel / 2), 0]}>
                        <cylinderGeometry args={[0.19, 0.19, oilLevel]} />
                        <meshStandardMaterial color="#FFD700" transparent opacity={0.8} />
                    </mesh>
                )}
            </group>

            <group position={[-4, 1.5, -1.5]}>
                <mesh>
                    <cylinderGeometry args={[0.2, 0.15, 0.6]} />
                    <meshStandardMaterial color="#1E90FF" transparent opacity={0.9} />
                </mesh>
                <mesh position={[0, 0.35, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.1]} />
                    <meshStandardMaterial color="#1E90FF" />
                </mesh>
                <Text
                    position={[0, 0.7, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Sodium Hydroxide
                </Text>
            </group>
  
            <group position={[2, 1.1, 0.5]}>  
                <mesh position={[0, 0, 0]}>
                    <cylinderGeometry args={[0.15, 0.2, 0.1]} />
                    <meshStandardMaterial
                        color="#1a1a1a"
                        metalness={0.9}
                        roughness={0.3}
                        envMapIntensity={1}
                    />
                </mesh>

                <mesh position={[0, 0.05, 0]}>
                    <torusGeometry args={[0.18, 0.01, 16, 32]} />
                    <meshStandardMaterial color="#2a2a2a" metalness={0.85} roughness={0.3} />
                </mesh>
  
                <group position={[0.15, 0.05, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.25]} />
                        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
                    </mesh>
                    <mesh position={[0.12, 0, 0]}>
                        <torusGeometry args={[0.03, 0.01, 16, 32]} rotation={[0, Math.PI / 2, 0]} />
                        <meshStandardMaterial color="#3a3a3a" metalness={0.7} roughness={0.3} />
                    </mesh>
                </group>
  
                <group position={[0, 0.2, 0]}>
                    <mesh>
                        <cylinderGeometry args={[0.05, 0.05, 0.5]} />
                        <meshStandardMaterial color="#4a4a4a" metalness={0.7} roughness={0.3} />
                    </mesh>
                    <mesh position={[0, 0.25, 0]}>
                        <cylinderGeometry args={[0.06, 0.05, 0.02]} />
                        <meshStandardMaterial color="#3a3a3a" metalness={0.8} roughness={0.2} />
                    </mesh>
                    
                </group>
                <group position={[0.15, 0.15, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 2]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.12]} />
                        <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
                    </mesh>
                    <group position={[0.08, 0, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.04, 0.04, 0.02]} rotation={[Math.PI / 2, 0, 0]} />
                            <meshStandardMaterial color="#1a1a1a" metalness={0.9} roughness={0.1} />
                        </mesh>
                        {Array.from({ length: 8 }).map((_, i) => (
                            <mesh key={i} position={[
                                0,
                                Math.cos(i * Math.PI / 4) * 0.03,
                                Math.sin(i * Math.PI / 4) * 0.03
                            ]}>
                                <boxGeometry args={[0.02, 0.01, 0.01]} />
                                <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
                            </mesh>
                        ))}
                    </group>
                </group>
  
                <group>
                    {[0, (2 * Math.PI) / 3, (4 * Math.PI) / 3].map((angle, i) => (
                        <group key={i}>
                            <mesh position={[
                                Math.cos(angle) * 0.25,
                                0.3,
                                Math.sin(angle) * 0.25
                            ]}>
                                <cylinderGeometry args={[0.02, 0.02, 0.6]} />
                                <meshStandardMaterial color="#707070" metalness={0.7} roughness={0.3} />
                            </mesh>
                            <mesh position={[
                                Math.cos(angle) * 0.25,
                                0.55,
                                Math.sin(angle) * 0.25
                            ]}>
                                <sphereGeometry args={[0.025, 16, 16]} />
                                <meshStandardMaterial color="#707070" metalness={0.7} roughness={0.3} />
                            </mesh>
                            <group position={[
                                Math.cos(angle) * 0.,
                                0.05,
                                Math.sin(angle) * 0.3
                            ]}>
                                <mesh rotation={[0, angle, 0]}>
                                    <cylinderGeometry args={[0.02, 0.02, 0.1]} rotation={[Math.PI / 2, 0, 0]} />
                                    <meshStandardMaterial color="#707070" metalness={0.7} roughness={0.3} />
                                </mesh>
                                <mesh position={[0, -0.02, 0]}>
                                    <sphereGeometry args={[0.02, 16, 16]} />
                                    <meshStandardMaterial color="#2a2a2a" metalness={0.3} roughness={0.9} />
                                </mesh>
                            </group>
                        </group>
                    ))}
                    <group position={[0, 0.62, 0]}>
                        <mesh>
                            <cylinderGeometry args={[0.23, 0.23, 0.005]} />
                            <meshStandardMaterial
                                color="#909090"
                                wireframe={true}
                                wireframeLinewidth={1}
                                metalness={0.8}
                                roughness={0.2}
                            />
                        </mesh>
                        <mesh>
                            <cylinderGeometry args={[0.22, 0.22, 0.005]} />
                            <meshStandardMaterial
                                color="#f0f0f0"
                                metalness={0.1}
                                roughness={0.9}
                            />
                        </mesh>
                    </group>
                </group>
  
                <group position={[0, 0.5, 0]}>
                    <mesh>
                        <coneGeometry args={[0.02, 0.25, 32]} />
                        <meshStandardMaterial
                            color="#4287f5"
                            transparent={true}
                            opacity={0.7}
                            emissive="#4287f5"
                            emissiveIntensity={3}
                        />
                    </mesh>
                    <mesh>
                        <coneGeometry args={[0.03, 0.2, 32]} />
                        <meshStandardMaterial
                            color="#4287f5"
                            transparent={true}
                            opacity={0.5}
                            emissive="#4287f5"
                            emissiveIntensity={2}
                        />
                    </mesh>
                    <mesh>
                        <coneGeometry args={[0.05, 0.15, 32]} />
                        <meshStandardMaterial
                            color="#f59342"
                            transparent={true}
                            opacity={0.3}
                            emissive="#f59342"
                            emissiveIntensity={1.5}
                        />
                    </mesh>
                </group>
                <Text
                    position={[0, 1.1, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Bunsen Burner
                </Text>
            </group>
  
            <group position={[2.5, 1.5, -1.5]}>
                <mesh>
                    <cylinderGeometry args={[0.15, 0.15, 0.5]} />
                    <meshStandardMaterial color="#FFD700" transparent opacity={0.8} />
                </mesh>
                <mesh position={[0, 0.3, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.1]} />
                    <meshStandardMaterial color="#FFD700" transparent opacity={0.8} />
                </mesh>
                <Text
                    position={[0, 0.7, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Olive Oil
                </Text>
            </group>
  
            <group position={[4, 1.5, -1.5]}>
                <mesh>
                    <cylinderGeometry args={[0.2, 0.2, 0.5]} />
                    <meshStandardMaterial color="#ADD8E6" transparent opacity={0.3} />
                </mesh>
                <Text
                    position={[0, 0.7, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Distilled Water
                </Text>
            </group>
  
            <group position={[-4, 1.5, 0]}>
                <mesh>
                    <cylinderGeometry args={[0.18, 0.18, 0.45]} />
                    <meshStandardMaterial color="#E6E6FA" transparent opacity={0.6} />
                </mesh>
                <mesh position={[0, 0.275, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.1]} />
                    <meshStandardMaterial color="#E6E6FA" transparent opacity={0.6} />
                </mesh>
                <mesh position={[0, 0.35, 0]}>
                    <cylinderGeometry args={[0.07, 0.07, 0.05]} />
                    <meshStandardMaterial color="#4B0082" />
                </mesh>
                <Text
                    position={[0, 0.7, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Ethanol
                </Text>
            </group>

            <group ref={baseBeakerRef} position={[0, 1.5, 1.5]}>
                <mesh>
                    <cylinderGeometry args={[0.25, 0.2, 0.5]} />
                    <meshStandardMaterial color="#B0C4DE" transparent opacity={0.2} />
                </mesh>
                {waterLevel > 0 && (
                    <mesh position={[0, -0.25 + (waterLevel / 2), 0]}>
                        <cylinderGeometry args={[0.19, 0.19, waterLevel]} />
                        <meshStandardMaterial color="#ADD8E6" transparent opacity={0.3} />
                    </mesh>
                )}
                {ethanolLevel > 0 && (
                    <mesh position={[0, -0.25 + (waterLevel) + (ethanolLevel / 2), 0]}>
                        <cylinderGeometry args={[0.19, 0.19, ethanolLevel]} />
                        <meshStandardMaterial color="#E6E6FA" transparent opacity={0.4} />
                    </mesh>
                )}
                {baseLevel > 0 && (
                    <mesh position={[0, -0.25 + (waterLevel) + (ethanolLevel) + (baseLevel / 2), 0]}>
                        <cylinderGeometry args={[0.19, 0.19, baseLevel]} />
                        <meshStandardMaterial color="#1E90FF" transparent opacity={0.5} />
                    </mesh>
                )}
            </group>
  
            {isPouring && (
                <mesh position={[-2.5, 2.5, 1.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                    <meshStandardMaterial color="#FFD700" transparent opacity={0.8} />
                </mesh>
            )}
  
            {isMixing && (
                <>
                    {pourProgress > 0.25 && (
                        <mesh
                            position={[-2.2, 2.1 - pourHeight, 1.5]}
                            rotation={[0, 0, -Math.PI / 4]}
                        >
                            <cylinderGeometry args={[0.02, 0.02, 0.3]} />
                            <meshStandardMaterial color="#1E90FF" transparent opacity={0.8} />
                        </mesh>
                    )}

                    {pourProgress > 0.25 && (
                        <mesh position={[-2.5, 1.5 + ((pourProgress - 0.25) * 0.4 / 0.75 * 0.3 / 2), 1.5]}>
                            <cylinderGeometry args={[0.19, 0.19, (pourProgress - 0.25) * 0.4 / 0.75 * 0.3]} />
                            <meshStandardMaterial color="#1E90FF" transparent opacity={0.5} />
                        </mesh>
                    )}
                </>
            )}
  
            {isStirring && (
                <group position={isSeparating ? [-4, 2, 1.5] : [-2.5, 2, 1.5]}>
                    <mesh rotation={[0, stirAngle, Math.PI / 6]}>
                        <cylinderGeometry args={[0.02, 0.02, 0.8]} />
                        <meshStandardMaterial color="#B0C4DE" />
                    </mesh>
                </group>
            )}
  
            {pouringWater && (
                <mesh position={[4, 2.5, -1.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                    <meshStandardMaterial color="#ADD8E6" transparent opacity={0.3} />
                </mesh>
            )}
  
            {pouringEthanol && (
                <mesh position={[-4, 2.5, 0]}>
                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                    <meshStandardMaterial color="#E6E6FA" transparent opacity={0.6} />
                </mesh>
            )}
  
            {pouringSodium && (
                <mesh position={[-4, 2.5, -1.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                    <meshStandardMaterial color="#1E90FF" transparent opacity={0.9} />
                </mesh>
            )}
  
            <group position={[-2, 1.5, -1.5]}>
                <mesh>
                    <cylinderGeometry args={[0.2, 0.15, 0.6]} />
                    <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
                </mesh>
                <mesh position={[0, 0.35, 0]}>
                    <cylinderGeometry args={[0.08, 0.08, 0.1]} />
                    <meshStandardMaterial color="#FFFFFF" />
                </mesh>
                <Text
                    position={[0, 0.7, 0]}
                    fontSize={0.2}
                    color="black"
                    anchorX="center"
                    anchorY="middle"
                >
                    Sodium Chloride
                </Text>
            </group>
  
            <group ref={saltBeakerRef} position={[-4, 1.5, 1.5]}>
                <mesh>
                    <cylinderGeometry args={[0.25, 0.2, 0.5]} />
                    <meshStandardMaterial color="#B0C4DE" transparent opacity={0.2} />
                </mesh>
                {saltLevel > 0 && (
                    <mesh position={[0, -0.25 + (saltLevel / 2), 0]}>
                        <cylinderGeometry args={[0.19, 0.19, saltLevel]} />
                        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
                    </mesh>
                )}
                {saltWaterLevel > 0 && (
                    <mesh position={[0, -0.25 + saltLevel + (saltWaterLevel / 2), 0]}>
                        <cylinderGeometry args={[0.19, 0.19, saltWaterLevel]} />
                        <meshStandardMaterial color="#ADD8E6" transparent opacity={0.4} />
                    </mesh>
                )}
            </group>

            {isPouringSalt && (
                <mesh position={[-2, 2.5, -1.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                    <meshStandardMaterial color="#FFFFFF" transparent opacity={0.8} />
                </mesh>
            )}

            {isPouringSaltWater && (
                <mesh position={[4, 2.5, -1.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                    <meshStandardMaterial color="#ADD8E6" transparent opacity={0.3} />
                </mesh>
            )}
  
            {isPouringSoap && (
                <mesh position={[-4.4, 2, 1.5]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.8]} />
                    <meshStandardMaterial color="#FFD700" transparent opacity={0.8} />
                </mesh>
            )}
  
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minDistance={2}
                maxDistance={20}
            />

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
        </Canvas>

        {quizCompleted && (
            <>
                <div style={{
                    position: 'fixed',
                    right: '20px',
                    top: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    borderRadius: '10px',
                    color: 'black',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}>
                    <h2>Soap Making Steps</h2>
                    <ol style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                    }}>
                        <li>
                            <button
                                onClick={handlePrepareOil}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    width: '200px'
                                }}
                            >
                                1. Prepare Oil
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handlePrepareBase}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    width: '200px'
                                }}
                            >
                                2. Prepare Base Solution
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={handleMixSolutions}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    width: '200px'
                                }}
                            >
                                3. Mix Oil and Base
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={handleHeatMixture}
                                disabled={isHeating}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: isHeating ? 'not-allowed' : 'pointer',
                                    width: '200px'
                                }}
                            >
                                4. Heat the Mixture {isHeating ? `(${10 - heatingTime}s)` : ''}
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={handlePrepareSaltSolution}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    width: '200px'
                                }}
                            >
                                5. Prepare Salt Solution
                            </button>
                        </li>
                        <li>
                            <button 
                                onClick={handleSeparateSoap}
                                disabled={isSeparating}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: isSeparating ? 'not-allowed' : 'pointer',
                                    width: '200px'
                                }}
                            >
                                6. Separate Soap {isSeparating ? `(${10 - separationTime}s)` : ''}
                            </button>
                        </li>
                    </ol>
                </div>

                <div style={{
                    position: 'fixed',
                    left: '20px',
                    top: '20px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '20px',
                    borderRadius: '10px',
                    color: 'black',
                    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
                    maxWidth: '400px'
                }}>
                    <h2>Chemical Reactions</h2>
                    <div style={{
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        backgroundColor: 'rgba(240, 240, 240, 0.9)',
                        padding: '10px',
                        borderRadius: '5px',
                        marginBottom: '10px'
                    }}>
                        <strong>1. Saponification Reaction:</strong>
                        <br />
                        Fat/Oil + NaOH → Soap + Glycerol
                        <br />
                        <br />
                        <strong>Detailed Reaction:</strong>
                        <br />
                        C₃H₅(OOCR)₃ + 3NaOH → 3RCOONa + C₃H₅(OH)₃
                        <br />
                        <em style={{ fontSize: '12px' }}>
                            (Triglyceride + Sodium Hydroxide → Sodium Salt of Fatty Acid + Glycerol)
                        </em>
                    </div>
                    <div style={{
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        fontSize: '14px',
                        lineHeight: '1.5',
                        backgroundColor: 'rgba(240, 240, 240, 0.9)',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>
                        <strong>2. Salting Out Process:</strong>
                        <br />
                        Addition of NaCl causes soap to precipitate out of solution
                        <br />
                        <em style={{ fontSize: '12px' }}>
                            (Separates soap from glycerol and impurities)
                        </em>
                    </div>
                </div>
            </>
        )}

        {!quizCompleted && (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000
            }}>
                <SoapQuiz onQuizComplete={handleQuizComplete} />
            </div>
        )}
      </div>
    )
  }

  export default SoapMakingExperiment;