import React, { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel.jsx'
import VehiclePanel from '../components/VehiclePanel.jsx'
import ConfirmedRide from '../components/ConfirmedRide.jsx'
import LookingForDriver from '../components/LookingforDriver.jsx'
import WaitingforDriver from '../components/WaitingforDriver.jsx'

const Home = () => {
  const [pickupLocation, setPickupLocation] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false)
  const [confirmedRide, setConfirmedRide] = useState(false)
  const [lookingForDriver, setLookingForDriver] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)

  const panelRef = React.useRef(null)
  const logoRef = React.useRef(null)
  const arrowRef = React.useRef(null)
  const vehiclePanelRef = React.useRef(null)
  const confirmedRideRef = React.useRef(null)
  const lookingForDriverRef = React.useRef(null)
  const waitingForDriverRef = React.useRef(null)

  const submitHandler = (e) => {
    e.preventDefault()
    setVehiclePanelOpen(true)
    setPanelOpen(false)
  }

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, { height: '70%', duration: 0.4, padding: '20px' })
      gsap.to(logoRef.current, { opacity: 0, y: -20, duration: 0.3, pointerEvents: 'none' })
      gsap.to(arrowRef.current, { opacity: 1, duration: 0.3, delay: 0.2 })
    } else {
      gsap.to(panelRef.current, { height: '0%', duration: 0.4 })
      gsap.to(logoRef.current, { opacity: 1, y: 0, duration: 0.3, pointerEvents: 'auto' })
      gsap.to(arrowRef.current, { opacity: 0, duration: 0.2 })
    }
  }, [panelOpen])

  useGSAP(() => {
    if (vehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(0)',
        duration: 0.4
      })
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4
      })
    }
  }, [vehiclePanelOpen])

  useGSAP(() => {
    if (confirmedRide) {
      gsap.to(confirmedRideRef.current, {
        transform: 'translateY(0)',
        duration: 0.4
      })
    } else {
      gsap.to(confirmedRideRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4
      })
    }
  }, [confirmedRide])

  useGSAP(() => {
    if (lookingForDriver) {
      gsap.to(lookingForDriverRef.current, {
        transform: 'translateY(0)',
        duration: 0.4
      })
    } else {
      gsap.to(lookingForDriverRef.current, {
        transform: 'translateY(100%)',
        duration: 0.4
      })
    }
    }, [lookingForDriver]) 

    useGSAP(() => {
      if (waitingForDriver) {
        gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(0)',
          duration: 0.4
        })
      } else {
        gsap.to(waitingForDriverRef.current, {
          transform: 'translateY(100%)',
          duration: 0.4
        })
      }
    }, [waitingForDriver])



  return (
    <div className='h-screen relative overflow-hidden'>
      <img
        ref={logoRef}
        className='w-16 absolute left-5 top-5 z-10'
        src="https://download.logo.wine/logo/Uber/Uber-Logo.wine.png"
        alt="Uber Logo"
      />

      <div className='h-screen w-screen'>
        <img
          className='h-full w-full object-cover'
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        />
      </div>

      <div className='flex flex-col justify-end absolute top-0 w-full h-screen'>

        <div className='h-[30%] p-5 bg-white relative'>
          <h5
            ref={arrowRef}
            onClick={() => setPanelOpen(false)}
            className='absolute top-6 right-3 text-2xl opacity-0 cursor-pointer'
          >
            <i className="ri-arrow-down-s-line"></i>
          </h5>
          <h4 className='text-2xl font-semibold'>Find a trip</h4>

          <form onSubmit={submitHandler}>
            <div className='relative'>
              <div className="line absolute h-16 w-1 top-[50%] left-5 -translate-y-1/2 bg-gray-600 rounded-full z-10"></div>
              <input
                className='bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3'
                type="text"
                placeholder='Add a pick-up location'
                onClick={() => setPanelOpen(true)}
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
              />
              <input
                className='bg-[#eeeeee] px-12 py-2 text-base rounded-lg w-full mt-3'
                type="text"
                placeholder='Enter your destination'
                onClick={() => setPanelOpen(true)}
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              />
            </div>
            <button
              type='submit'
              className='bg-black text-white w-full py-2 mt-4 rounded-lg font-medium'
            >
              Find Ride
            </button>
          </form>
        </div>

        <div ref={panelRef} className='bg-white h-0 overflow-hidden'>
          <LocationSearchPanel
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            pickupLocation={pickupLocation}
            destination={destination}
          />
        </div>

      </div>

      {/* Vehicle Panel - slides up from bottom */}
      <div
        ref={vehiclePanelRef}
        className='fixed z-10 bottom-0  w-full translate-y-full bg-white px-3 py-6 pt-12'>
        <VehiclePanel setConfirmedRide={setConfirmedRide} setVehiclePanelOpen={setVehiclePanelOpen} />
      </div>

      {/* Confirmed Ride Panel - slides up from bottom */}
      <div
        ref={confirmedRideRef}
        className='fixed z-10 bottom-0  w-full translate-y-full bg-white px-3 py-6 pt-12'>
        <ConfirmedRide
          setConfirmedRide={setConfirmedRide}
          pickupLocation={pickupLocation}
          destination={destination}
          setLookingForDriver={setLookingForDriver}
        />
      </div>

      <div
        ref={lookingForDriverRef}
        className='fixed z-10 bottom-0  w-full translate-y-full bg-white px-3 py-6 pt-12'>
        <LookingForDriver setLookingForDriver={setLookingForDriver} />
      </div>
  
     <div
        ref={waitingForDriverRef}
        className='fixed z-10 bottom-0  w-full translate-y-full bg-white px-3 py-6 pt-12'>
        <WaitingforDriver setWaitingForDriver={setWaitingForDriver} />
      </div>


    </div>
  )
}

export default Home
