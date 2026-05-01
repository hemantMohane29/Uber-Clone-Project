import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Captainlogin from './pages/Captainlogin'
import Captainsignup from './pages/Captainsignup'
import Userlogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'

const App = () => {
  return (

    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Userlogin />} />
        <Route path="/signup" element={<UserSignup />} />
        <Route path="/captain-login" element={<Captainlogin />} />
        <Route path="/captain-signup" element={<Captainsignup />} />
      </Routes>
    </div>
  )
}

export default App
