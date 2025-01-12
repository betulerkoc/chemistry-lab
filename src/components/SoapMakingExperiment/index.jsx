import { useState, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'

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
    const baseBeakerRef = useRef();
  
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
  
    return (
      <div style={{ width: '100vw', height: '100vh', background: '#87CEEB' }}>
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
            <meshStandardMaterial color="#8B4513" />
          </mesh>

          <group position={[-2.5, 1.5, 1.5]}>
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
  
          <group position={[0, 1.5, -1.5]}>
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

          <group position={[4, 1.5, 0]}>
            <mesh>
              <coneGeometry args={[0.2, 0.3, 32]} />
              <meshStandardMaterial color="#B0C4DE" transparent opacity={0.3} />
            </mesh>
            <mesh position={[0, -0.2, 0]}>
              <cylinderGeometry args={[0.02, 0.02, 0.1]} />
              <meshStandardMaterial color="#B0C4DE" transparent opacity={0.3} />
            </mesh>
            <Text
              position={[0, 0.7, 0]}
              fontSize={0.2}
              color="black"
              anchorX="center"
              anchorY="middle"
            >
              Funnel
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
            <group position={[-2.5, 2, 1.5]}>
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
  
          <OrbitControls
            enableZoom={true}
            enablePan={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
          />
        </Canvas>
  
        {showNotification && (
          <div style={{
            position: 'fixed',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '20px',
            zIndex: 1000,
            fontSize: '16px',
            fontWeight: 'bold'
          }}>
            {notificationText}
          </div>
        )}

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
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '200px'
              }}>
                4. Heat the Mixture
              </button>
            </li>
            <li>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '200px'
              }}>
                5. Prepare Salt Solution
              </button>
            </li>
            <li>
              <button style={{
                padding: '10px 20px',
                backgroundColor: '#4CAF50',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '200px'
              }}>
                6. Separate Soap
              </button>
            </li>
          </ol>
        </div>
      </div>
    )
  }

  export default SoapMakingExperiment;