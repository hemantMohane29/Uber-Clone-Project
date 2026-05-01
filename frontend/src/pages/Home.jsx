import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="h-screen">
      <div 
        className='relative h-full bg-cover bg-center flex flex-col justify-between'
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1619059558110-c45be64b73ae?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`
        }}
      >
        {/* Logo */}
        <div className="pt-8 pl-9">
          <img 
            className='w-16' 
            src="https://www.edigitalagency.com.au/wp-content/uploads/new-Uber-logo-white-png-large-size.png" 
            alt="Uber Logo" 
          />
        </div>

        {/* Bottom Card */}
        <div className='bg-white pb-7 py-4 px-6 rounded-t-3xl'>
          <h2 className='text-2xl font-bold'>Get Started with Uber</h2>
          <Link 
            to="/login" 
            className='flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5 hover:bg-gray-900 transition-colors'
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home