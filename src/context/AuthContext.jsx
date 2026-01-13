import React from 'react'
import {createContext, useContext} from 'react'

const AuthContext = createContext()

const auth = true

export function AuthProvider({children}) {
  return <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
}
