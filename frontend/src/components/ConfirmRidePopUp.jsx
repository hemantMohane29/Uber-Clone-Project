import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: { rideId: ride?._id, otp },
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      if (response.status === 200) {
        setConfirmRidePopupPanel(false)
        navigate('/captain-riding', { state: { ride: response.data } })
      }
    } catch (err) {
      console.error('Start ride error:', err.response?.data || err.message)
    }
  }

  return (
    <div className='relative'>
      <h5
        onClick={() => {
          setConfirmRidePopupPanel(false)
          setRidePopupPanel(true)
        }}
        className='absolute top-0 right-0 text-2xl cursor-pointer'
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5'>Confirm Ride to Start</h3>

      <div className='flex items-center justify-between bg-yellow-400 rounded-xl p-3 mb-4'>
        <div className='flex items-center gap-3'>
          <img
            className='h-12 w-12 rounded-full object-cover'
            src="https://i.pravatar.cc/150?img=5"
            alt="User"
          />
          <h4 className='text-lg font-medium'>
            {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
          </h4>
        </div>
        <h5 className='text-lg font-semibold'>2.2 KM</h5>
      </div>

      <div className='w-full mb-4'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-user-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>{ride?.pickup || 'Pickup'}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Pickup Location</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>{ride?.destination || 'Destination'}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Destination</p>
          </div>
        </div>
        <div className='flex items-center gap-5 p-3'>
          <i className="text-lg ri-cash-line"></i>
          <div>
            <h3 className='text-lg font-medium'>₹{ride?.fare || '193'}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
          </div>
        </div>
      </div>

      <form onSubmit={submitHandler}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder='Enter OTP'
          className='bg-[#eeeeee] px-4 py-3 rounded-lg w-full text-lg mb-4 text-center tracking-widest font-mono'
          maxLength={6}
          required
        />
        <button
          type='submit'
          className='w-full bg-green-600 text-white font-semibold py-3 rounded-xl'
        >
          Confirm Ride
        </button>
        <button
          type='button'
          onClick={() => {
            setConfirmRidePopupPanel(false)
            setRidePopupPanel(false)
          }}
          className='w-full mt-3 bg-red-500 text-white font-semibold py-3 rounded-xl'
        >
          Cancel
        </button>
      </form>
    </div>
  )
}

export default ConfirmRidePopUp
