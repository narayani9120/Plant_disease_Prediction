import './App.css'
import LandingPage from './Components/LandingPage'
import { Routes,Route } from 'react-router-dom'
import AboutPage from './Components/AboutPage'
import Chatbot from './Components/Chatbot'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Profile from './Components/Profile'

function App() {
 
  return (
    <>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/profile" element={<Profile />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
    </Routes>
    </>
  )
}

export default App
