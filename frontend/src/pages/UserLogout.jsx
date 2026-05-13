import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const UserLogout = () => {
  const navigate = useNavigate()

  React.useEffect(() => {
    const token = localStorage.getItem('token')

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('token')
        localStorage.removeItem('userType')
        localStorage.removeItem('userId')
        navigate('/login')
      }
    }).catch((error) => {
      console.error('Logout error:', error.response?.data || error.message)
      localStorage.removeItem('token')
      localStorage.removeItem('userType')
      localStorage.removeItem('userId')
      navigate('/login')
    })
  }, [navigate])

  return (
    <div>
      Logging out...
    </div>
  )
}

export default UserLogout
