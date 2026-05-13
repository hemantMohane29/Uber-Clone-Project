import React from 'react'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()
  const { setCaptain } = React.useContext(CaptainDataContext)
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    if (!token) {
      navigate('/captain-login')
      return
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        setCaptain(response.data.captain)
      }
      setIsLoading(false)
    }).catch(() => {
      localStorage.removeItem('token')
      navigate('/captain-login')
    })
  }, [token, navigate, setCaptain])

  if (isLoading) return <div>Loading...</div>

  return (
    <>
      {children}
    </>
  )
}

export default CaptainProtectWrapper
