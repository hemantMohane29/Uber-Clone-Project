import React from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  console.log(token)

  React.useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  //   if (!token) return null

  return (
    <div>
      {children}
    </div>
  )
}

export default UserProtectWrapper
