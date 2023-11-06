import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export default function UserContextProvider(props) {
  const [user, setUser] = useState()
  return (
    <UserContext.Provider value={{
      user: user, setUser: (data) => {
        setUser(data)
      }
    }}>
      {props.children}
    </UserContext.Provider>
  )
}
