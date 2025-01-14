import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import MainLab from './components/MainLab';
import SoapMakingExperiment from './components/SoapMakingExperiment';
import AspirinSynthesisExperiment from './components/AspirinSynthesisExperiment';

function MobileMessage() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-[#87CEEB] to-[#5F9EA0] flex items-center justify-center p-6">
      <div className="bg-white/95 p-8 rounded-2xl shadow-xl backdrop-blur text-center text-black max-w-md">
        <h2 className="text-2xl font-bold mb-4">Desktop Only Experience</h2>
        <p className="text-gray-600">
        Oops! It looks like you’re on a mobile device. For the best experience with our virtual lab, please visit us on a desktop or laptop.
        </p>
        <div className="text-5xl mt-6 mb-2">💻</div>
      </div>
    </div>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth <= 768);
    }

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (isMobile) {
    return <MobileMessage />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLab />} />
        <Route path="/soap-making" element={<SoapMakingExperiment />} />
        <Route path="/aspirin-synthesis" element={<AspirinSynthesisExperiment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
