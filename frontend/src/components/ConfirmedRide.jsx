import React from 'react'

const ConfirmedRide = ({ setConfirmedRide, pickupLocation, destination, setLookingForDriver }) => {
  return (
    <div className='px-3 py-6 relative'>

      <h5
        onClick={() => setConfirmedRide(false)}
        className='absolute top-4 right-4 text-2xl cursor-pointer'
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5'>Confirm your Ride</h3>

      <div className='flex justify-center mb-4'>
        <img
          className='h-28 object-contain'
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt="UberGo"
        />
      </div>

      <div className='w-full'>

        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-user-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>{pickupLocation || '562/11-A'}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Pickup Location</p>
          </div>
        </div>

        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>{destination || 'Kankariya Talab, Bhopal'}</h3>
            <p className='text-sm -mt-1 text-gray-600'>Destination</p>
          </div>
        </div>

        <div className='flex items-center gap-5 p-3'>
          <i className="text-lg ri-cash-line"></i>
          <div>
            <h3 className='text-lg font-medium'>₹193</h3>
            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
          </div>
        </div>

      </div>

      <button
        onClick={() => {
          setConfirmedRide(false)
          setLookingForDriver(true)
        }}
        className='w-full mt-5 bg-green-600 text-white font-semibold p-3 rounded-xl'>
        Confirm
      </button>

    </div>
  )
}

export default ConfirmedRide
