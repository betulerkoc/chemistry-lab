import { useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useNavigate } from 'react-router-dom';
import Room from '../Room';
import Student from '../Student';
import SafetyShelf from '../SafetyShelf';
import SafetyStep from '../SafetyStep';
import SoapMakingStep from '../SoapMakingStep';
import AspirinSynthesisStep from '../AspirinSynthesisStep';

function MainLab() {
    const [showWarning, setShowWarning] = useState(false)
    const [showEnterPrompt, setShowEnterPrompt] = useState(false)
    const [experimentType, setExperimentType] = useState(null)
    const navigate = useNavigate();
  
    useEffect(() => {
      const handleKeyPress = (e) => {
        if (e.key === 'Enter' && showEnterPrompt) {
          navigate(experimentType === 'soap' ? '/soap-making' : '/aspirin-synthesis');
        }
      };
  
      window.addEventListener('keypress', handleKeyPress);
      return () => window.removeEventListener('keypress', handleKeyPress);
    }, [showEnterPrompt, navigate, experimentType]);
  
    const handleExperiment = (hasEquipment, type) => {
      if (!hasEquipment) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
      } else {
        setExperimentType(type);
        setShowEnterPrompt(true);
      }
    }
  
    return (
      <>
        <div className="w-screen h-screen bg-gradient-to-b from-[#87CEEB] to-[#5F9EA0]">
          <Canvas
            camera={{
              position: [0, 2, 2],
              fov: 60,
            }}
          >
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Room />
            <SafetyShelf />
            <SafetyStep />
            <SoapMakingStep />
            <AspirinSynthesisStep />
            <Student onExperiment={handleExperiment} />
  
            <OrbitControls 
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              minDistance={8}
              maxDistance={20}
              maxPolarAngle={Math.PI / 2}
              target={[0, 1, 0]}
            />
            <gridHelper args={[20, 20]} />
          </Canvas>
  
          {showWarning && (
            <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-red-500/95 text-white px-8 py-4 rounded-xl z-[99999] font-bold text-2xl shadow-lg shadow-red-500/20 border-2 border-red-500/30 backdrop-blur animate-slide-down">
              ⚠️ Wear safety equipment first!
            </div>
          )}
  
          {showEnterPrompt && (
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/95 text-gray-800 px-12 py-8 rounded-2xl z-[99999] text-center shadow-xl backdrop-blur border border-white/30">
              <h2 className="m-0 mb-5 text-3xl bg-gradient-to-r from-[#2196F3] to-[#00BCD4] bg-clip-text text-transparent">
                Press ENTER to Start Experiment
              </h2>
              <div className="text-5xl mt-4 animate-pulse-slow">
                ⌨️
              </div>
            </div>
          )}
  
          <div className="fixed bottom-5 left-5 bg-white/90 p-5 rounded-2xl shadow-lg backdrop-blur border border-white/20 text-black text-gray-800 z-10">
            <p className="m-0 mb-3 font-bold text-lg border-b-2 border-black/10 pb-2">
              Controls:
            </p>
            <ul className="list-none p-0 m-0 leading-8">
              {[
                { key: 'W', action: 'Move forward' },
                { key: 'S', action: 'Move backward' },
                { key: 'A', action: 'Move left' },
                { key: 'D', action: 'Move right' },
              ].map(({ key, action }) => (
                <li key={key} className="flex items-center gap-2">
                  <span className="text-lg">⌨️</span> {key}: {action}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  export default MainLab;