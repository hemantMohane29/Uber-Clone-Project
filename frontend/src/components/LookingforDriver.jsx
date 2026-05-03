import React from 'react'

const LookingForDriver = ({ setLookingForDriver }) => {
  return (
    <div className='px-3 py-6 relative'>
      <h5
        onClick={() => setLookingForDriver(false)}
        className='absolute top-4 right-4 text-2xl cursor-pointer'
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>

      <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

      <div className='flex justify-center mb-6'>
        <img
          className='h-24 animate-pulse object-contain'
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n"
          alt="Car"
        />
      </div>

      <div className='w-full'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-user-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>Pickup</h3>
            <p className='text-sm -mt-1 text-gray-600'>Waiting for driver to accept</p>
          </div>
        </div>

        <div className='flex items-center gap-5 p-3 border-b-2'>
          <i className="text-lg ri-map-pin-fill"></i>
          <div>
            <h3 className='text-lg font-medium'>Destination</h3>
            <p className='text-sm -mt-1 text-gray-600'>Your destination</p>
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
    </div>
  )
}

export default LookingForDriver
