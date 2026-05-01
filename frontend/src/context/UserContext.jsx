import React from 'react'

export const UserDataContext = React.createContext()

const Usercontext = ({children}) => {

 const [user, setUser] = React.useState({
 
  email:'',
  fullname:{
    firstname:'',
    lastname:''
  }
})

  return (
    
    <div>
         <UserDataContext.Provider value={[user, setUser]}>
           {children}
         </UserDataContext.Provider>
    </div> 
  )
}

export default Usercontext
