import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Userlogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userData, setUserData] = useState({})


  const submitHandler = (e) => {
     e.preventDefault()
    //  console.log(email, password);
    setUserData({
      email: email,
      password: password
     })
     console.log(userData);
     setEmail('')
     setPassword('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen '>
    <div>
      <form onSubmit={(e)=>{
        submitHandler(e)
      }}>
        <img className='w-20 mb-10' src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png" alt="Uber Logo" />

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
        New here - <Link to='/signup' className='text-blue-500'>Create new Account</Link> 
      </p>
      </form>
    </div>
    <div>
      <Link to='/captain-login' className='bg-yellow-500 flex items-center justify-center text-white font-semibold mb-5 rounded px-4 py-2 border w-full text-lg '> Sign in as Captain  </Link>
    </div>
    </div>
  )
}

export default Userlogin
