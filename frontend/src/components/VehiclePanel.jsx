import React from 'react'

const vehicles = [
  {
    name: 'UberGo',
    capacity: 4,
    time: '2 mins away',
    desc: 'Affordable, compact rides',
    price: '₹193',
    img: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=956/height=538/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy8yOWZiYjhiMC03NWIxLTRlMmEtODUzMy0zYTM2NGU3MDQyZmEucG5n'
  },
  {
    name: 'UberAuto',
    capacity: 3,
    time: '2 mins away',
    desc: 'Affordable, Auto rides',
    price: '₹99',
    img: 'https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png'
  },
  {
    name: 'Moto',
    capacity: 1,
    time: '2 mins away',
    desc: 'Affordable, motorcycle rides',
    price: '₹65',
    img: 'https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n'
  }
]

const VehiclePanel = ({ setVehiclePanelOpen, setConfirmedRide }) => {
  return (
    <div className='px-3 py-6 relative'>
      <h5
        onClick={() => setVehiclePanelOpen(false)}
        className='absolute top-4 right-4 text-2xl cursor-pointer'
      >
        <i className="ri-arrow-down-s-line"></i>
      </h5>

      <h3 className='font-bold text-lg mb-5'>Choose a ride</h3>

      {vehicles.map((vehicle, index) => (
        <div
          key={index}
          onClick={() => {
            setVehiclePanelOpen(false)
            setConfirmedRide(true)
          }}
          className='flex items-center gap-4 mb-2 p-3 w-full rounded-xl border border-transparent active:border-2 active:border-black cursor-pointer'
        >
          {/* Fixed width image container so all rows align */}
          <div className='w-16 flex-shrink-0 flex items-center justify-center'>
            <img
              className='h-12 w-full object-contain'
              src={vehicle.img}
              alt={vehicle.name}
            />
          </div>

          {/* Text info */}
          <div className='flex-1'>
            <h4 className='font-medium text-base'>
              {vehicle.name} &nbsp;
              <i className="ri-user-fill text-sm"></i> {vehicle.capacity}
            </h4>
            <h5 className='font-medium text-sm text-gray-500'>{vehicle.time}</h5>
            <p className='font-normal text-xs text-gray-600'>{vehicle.desc}</p>
          </div>

          {/* Price */}
          <h2 className='text-xl font-semibold flex-shrink-0'>{vehicle.price}</h2>
        </div>
      ))}
    </div>
  )
}

export default VehiclePanel
