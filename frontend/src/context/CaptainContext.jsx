import React from 'react'

export const CaptainDataContext = React.createContext()

const CaptainContext = ({ children }) => {
  const [captain, setCaptain] = React.useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    },
    vehicle: {
      color: '',
      plate: '',
      capacity: '',
      vehicleType: ''
    }
  })

  return (
    <CaptainDataContext.Provider value={[ captain, setCaptain ]}>
      {children}
    </CaptainDataContext.Provider>
  )
}

export default CaptainContext
