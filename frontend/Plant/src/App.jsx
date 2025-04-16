import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LandingPage from './Components/LandingPage'
import { Routes,Route } from 'react-router-dom'
import AboutPage from './Components/AboutPage'
import ProfilePage from './Components/ProfilePage'
import Chatbot from './Components/Chatbot'
import Login from './Components/Login'
import Signup from './Components/Signup'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/chatbot" element={<Chatbot/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
    </Routes>
    </>
  )
}

export default App
