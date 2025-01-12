import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useNavigate } from 'react-router-dom';
import Room from '../Room';
import Student from '../Student';
import SafetyShelf from '../SafetyShelf';
import SafetyStep from '../SafetyStep';
import SoapMakingStep from '../SoapMakingStep';

function MainLab() {
    const [showWarning, setShowWarning] = useState(false)
    const [showEnterPrompt, setShowEnterPrompt] = useState(false)
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && showEnterPrompt) {
          navigate('/soap-making');
        }
      };
  
      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }, [showEnterPrompt, navigate]);
  
    const handleExperiment = (hasEquipment) => {
      if (!hasEquipment) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      } else {
        setShowEnterPrompt(true);
      }
    }
  
    return (
      <>
        <div style={{ width: '100vw', height: '100vh', background: '#87CEEB' }}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Room />
            <SafetyShelf />
            <SafetyStep />
            <SoapMakingStep />
            <Student onExperiment={handleExperiment} />
  
            <OrbitControls />
            <gridHelper args={[20, 20]} />
          </Canvas>
  
          {showWarning && (
            <div style={{
              position: 'fixed',
              top: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              backgroundColor: '#ff3333',
              color: 'white',
              padding: '15px 30px',
              borderRadius: '8px',
              zIndex: 99999,
              fontWeight: 'bold',
              fontSize: '24px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
              border: '2px solid #ff0000',
              pointerEvents: 'none',
              userSelect: 'none'
            }}>
              ⚠️ Wear safety equipment first!
            </div>
          )}
  
          {showEnterPrompt && (
            <div style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              color: '#000',
              padding: '20px 40px',
              borderRadius: '10px',
              zIndex: 99999,
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
            }}>
              <h2>Press ENTER to Start Experiment</h2>
              <div style={{
                fontSize: '40px',
                marginTop: '10px',
                animation: 'pulse 1.5s infinite'
              }}>
                ⌨️
              </div>
            </div>
          )}
  
          <style>
            {`
              @keyframes pulse {
                0% { transform: scale(1); }
                50% { transform: scale(1.1); }
                100% { transform: scale(1); }
              }
            `}
          </style>
        </div>
      </>
    )
  }

  export default MainLab;