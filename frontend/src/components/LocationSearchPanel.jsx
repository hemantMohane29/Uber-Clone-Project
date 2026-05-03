import React from 'react'

const locations = [
  '24B, Kishor Garden Cafe, Lalbag Burhanpur',
  '12A, MG Road, Indore',
  '5, Vijay Nagar Square, Indore',
  '88, Palasia, Indore',
  '3, Rajwada, Indore',
]

const LocationSearchPanel = ({ setPanelOpen, setVehiclePanelOpen, pickupLocation, destination }) => {
  return (
    <div>
      {locations.map((elem, index) => (
        <div
          key={index}
          onClick={() => {
            setPanelOpen(false)
            setVehiclePanelOpen(true)
          }}
          className='flex gap-4 my-4 items-center justify-start active:bg-gray-200 cursor-pointer rounded-xl p-2 border border-gray-200'
        >
          <h2 className='bg-[#eee] h-8 flex items-center justify-center w-10 rounded-full'>
            <i className="ri-map-pin-line"></i>
          </h2>
          <h4 className='font-medium'>{elem}</h4>
        </div>
      ))}
    </div>
  )
}

export default LocationSearchPanel
