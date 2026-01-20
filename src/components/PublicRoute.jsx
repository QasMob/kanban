import React, { Children } from 'react'
import { Navigate, Outlet } from 'react-router'
import Header from '../components/Header'
import { useAuth } from '../context/AuthContext'

function PublicRoute() {

  const {globalUser, isLoading} = useAuth()
  
  const isAuth = globalUser
  
  return (
    isLoading ? <p>Loading...</p> :
    isAuth ? <Navigate to='/taskboard' replace={true}/>
    : (
    <>
    <Header/>
    <Outlet/>
    </>

    )
  )
}

export default PublicRoute