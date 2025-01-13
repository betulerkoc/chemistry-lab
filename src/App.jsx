import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLab from './components/MainLab';
import SoapMakingExperiment from './components/SoapMakingExperiment';
import AspirinSynthesisExperiment from './components/AspirinSynthesisExperiment';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLab />} />
        <Route path="/soap-making" element={<SoapMakingExperiment />} />
        <Route path="/aspirin-synthesis" element={<AspirinSynthesisExperiment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
