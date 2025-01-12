import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLab from './components/MainLab';
import SoapMakingExperiment from './components/SoapMakingExperiment';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLab />} />
        <Route path="/soap-making" element={<SoapMakingExperiment />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
