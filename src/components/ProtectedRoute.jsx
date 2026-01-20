import React from 'react'
import { Navigate, Outlet } from 'react-router'
import Header from './Header'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute() {

const {globalUser, isLoading} = useAuth()

 const isAuth = globalUser


  return (
    isLoading ? <p>Loading...</p> :isAuth ?  
    <>
    <Header/>
    <Outlet/>
    </> : <Navigate to='/' replace/> 

  )
}

export default ProtectedRoute