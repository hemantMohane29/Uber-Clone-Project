import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { SocketContext } from '../context/SocketContext'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
  const location = useLocation()
  const ride = location.state?.ride
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!socket) return

    const handleRideEnded = () => {
      navigate('/home')
    }

    socket.on('ride-ended', handleRideEnded)
    return () => {
      socket.off('ride-ended', handleRideEnded)
    }
  }, [socket, navigate])

  const captainName = ride?.captain?.fullname?.firstname || ride?.captain?.name || 'Driver name'
  const plateNumber = ride?.captain?.vehicle?.plate || ride?.captain?.plate || 'MP 04 AB 4521'
  const vehicleName = ride?.captain?.vehicle?.model || ride?.captain?.vehicleModel || 'Maruti Suzuki Alto'
  const pickupAddress = ride?.pickup?.address || ride?.pickupAddress || '562/11-A, Kankariya Talab'
  const destinationAddress = ride?.destination?.address || ride?.destinationAddress || 'Your destination'
  const fare = ride?.fare || ride?.price || '193'
  const paymentMode = ride?.paymentMode || 'Cash'

  return (
    <div className='h-screen'>
      <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full'>
        <i className="text-lg font-medium ri-home-5-line"></i>
      </Link>
      <div className='h-1/2'>
        <LiveTracking />

      </div>
      <div className='h-1/2 p-4'>
        <div className='flex items-center justify-between'>
          <img className='h-12' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Driver" />
          <div className='text-right'>
            <h2 className='text-lg font-medium capitalize'>{captainName}</h2>
            <h4 className='text-xl font-semibold -mt-1 -mb-1'>{plateNumber}</h4>
            <p className='text-sm text-gray-600'>{vehicleName}</p>
          </div>
        </div>

        <div className='flex gap-2 justify-between flex-col items-center'>
          <div className='w-full mt-5'>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-2-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>Pickup</h3>
                <p className='text-sm -mt-1 text-gray-600'>{pickupAddress}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3 border-b-2'>
              <i className="text-lg ri-map-pin-fill"></i>
              <div>
                <h3 className='text-lg font-medium'>Destination</h3>
                <p className='text-sm -mt-1 text-gray-600'>{destinationAddress}</p>
              </div>
            </div>
            <div className='flex items-center gap-5 p-3'>
              <i className="ri-currency-line"></i>
              <div>
                <h3 className='text-lg font-medium'>₹{fare}</h3>
                <p className='text-sm -mt-1 text-gray-600'>{paymentMode}</p>
              </div>
            </div>
            {ride?.otp && (
              <div className='flex items-center gap-5 p-3 border-t-2 mt-3'>
                <i className="text-lg ri-lock-2-line"></i>
                <div>
                  <h3 className='text-lg font-medium'>OTP</h3>
                  <p className='text-sm -mt-1 text-gray-600'>{ride.otp}</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
        {!ride && (
          <p className='mt-3 text-sm text-gray-500'>No ride data received. Return to Home to start a new ride.</p>
        )}
      </div>
    </div>
  )
}

export default Riding