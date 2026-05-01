import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    // const [userData, setUserData] = useState({})
  
  
    const submitHandler = (e) => {
       e.preventDefault()
      //  console.log(email, password);
      setCaptainData({
        email: email,
        password: password
       })
       console.log(captainData);
       setEmail('')
       setPassword('')
    }
return (
    <div className='p-7 flex flex-col justify-between h-screen '>
    <div>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <img className='w-16 mb-10' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="Uber Logo" />

      <h3 className='text-lg font-medium mb-3'>What's your email</h3>

      <input 
        type="email" 
        required 
        className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg ' 
        placeholder='email@example.com' 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <h3 className='text-lg font-medium mb-3'>Enter Password</h3>

      <input 
        type="password" 
        required 
        className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg ' 
        placeholder='Enter Password' 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className='bg-black text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg '> Login </button>

      <p className='text-sm text-gray-600 text-center'>
        Join a fleet - <Link to='/captain-signup' className='text-blue-500'>Register as a captain</Link> 
      </p>
      </form>
    </div>
    <div>
      <Link to='/login' className='bg-green-500 flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg '> Sign in as User  </Link>
    </div>
    </div>
  )
}

export default Captainlogin
