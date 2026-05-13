import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FinishRide from '../components/FinishRide'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import LiveTracking from '../components/LiveTracking'

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location = useLocation()
  const rideData = location.state?.ride



  useGSAP(function () {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(0)'
      })
    } else {
      gsap.to(finishRidePanelRef.current, {
        transform: 'translateY(100%)'
      })
    }
  }, [finishRidePanel])


  return (
    <div className='h-screen relative flex flex-col justify-end'>

      <div className='fixed p-6 top-0 flex items-center justify-between w-screen'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-home' className=' h-10 w-10 bg-white flex items-center justify-center rounded-full'>
          <i className="text-lg font-medium ri-logout-box-r-line"></i>
        </Link>
      </div>

      <div className='h-1/5 p-6 flex flex-col justify-between relative bg-yellow-400 pt-10'>
        <div className='flex items-center justify-between'>
          <div>
            <h4 className='text-xl font-semibold'>{rideData ? `${rideData.pickup?.address || 'Pickup location'} → ${rideData.destination?.address || 'Destination'}` : 'Waiting for ride...'}</h4>
            <p className='text-slate-800 text-sm mt-1'>{rideData ? `Passenger: ${rideData.user?.name || rideData.userName || 'Unknown'}` : 'No ride data available'}</p>
          </div>
          <button className=' bg-green-600 text-white font-semibold p-3 px-6 rounded-lg' onClick={() => setFinishRidePanel(true)}>
            Complete Ride
          </button>
        </div>
        <div className='mt-4 flex items-center justify-between text-slate-800'>
          <span className='text-sm'>Distance to pickup</span>
          <span className='text-lg font-semibold'>{rideData?.distance || '4 KM'}</span>
        </div>
      </div>

      <div className='p-6 space-y-4'>
        {rideData ? (
          <div className='bg-white/10 p-6 rounded-3xl text-slate-100'>
            <h2 className='text-xl font-semibold mb-4'>Ride information</h2>
            <div className='grid gap-3 text-sm text-slate-200'>
              <div className='flex justify-between'>
                <span>Pickup</span>
                <span>{rideData.pickup?.address || 'N/A'}</span>
              </div>
              <div className='flex justify-between'>
                <span>Destination</span>
                <span>{rideData.destination?.address || 'N/A'}</span>
              </div>
              <div className='flex justify-between'>
                <span>Vehicle</span>
                <span>{rideData.vehicleType || rideData.vehicletype || 'Standard'}</span>
              </div>
              <div className='flex justify-between'>
                <span>Fare</span>
                <span>{rideData.fare ? `₹ ${rideData.fare}` : 'N/A'}</span>
              </div>
              {rideData.otp && (
                <div className='flex justify-between'>
                  <span>OTP</span>
                  <span>{rideData.otp}</span>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className='bg-white/10 p-6 rounded-3xl text-slate-200'>
            <p>No ride data was passed into this screen.</p>
            <p className='mt-2 text-slate-400'>Accept a ride from Captain Home to start navigation.</p>
          </div>
        )}
      </div>

      <div ref={finishRidePanelRef} className='fixed w-full z-[500] bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
        <FinishRide
          ride={rideData}
          setFinishRidePanel={setFinishRidePanel} />
      </div>

      <div className='h-screen fixed w-screen top-0 z-[-1]'>
        <LiveTracking />
      </div>

    </div>
  )
}

export default CaptainRiding