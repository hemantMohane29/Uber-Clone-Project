import React from 'react'
import { Link } from 'react-router-dom'

const Captainsignup = () => {
  const [firstName, setFirstName] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [userdata, setUserData] = React.useState({})

  const submitHandler = (e) => {
    e.preventDefault()

    setUserData({
      fullname: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password
    })


    console.log(userdata)
    setFirstName('')
    setLastName('')
    setEmail('')
    setPassword('')
  }


  return (
  <div className='p-7 flex flex-col justify-between h-screen '>
      <div>
        <img className='w-16 mb-10' src="https://pngimg.com/uploads/uber/uber_PNG24.png" alt="Uber Logo" />
        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg font-medium mb-2' > what's Our Captain's name?</h3>
          <div className='flex gap-4 mb-6 '>
            <input
              required
              className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base '
              type="text"
              placeholder='first name'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <input
              required
              className='bg-[#eeeeee]  w-1/2 rounded px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='last name'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>

          <h3 className='text-lg font-medium mb-3'>What's Our Captain's gmail </h3>

          <input
            type="email"
            required
            className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            placeholder='email@example.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3 className='text-lg font-medium mb-3'>Enter Password</h3>

          <input
            type="password"
            required
            className='bg-[#eeeeee] mb-2 rounded px-4 py-2 border w-full text-lg placeholder:text-base '
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-black text-white font-semibold mb-2 rounded px-4 py-2 border w-full text-lg '> Login </button>

          <p className='text-sm text-gray-600 text-center'>
            Alreay have a account? <Link to='/captain-login' className='text-blue-500'>login here</Link>
          </p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span>apply.</p>
      </div>
    </div>
  )
}

export default Captainsignup
