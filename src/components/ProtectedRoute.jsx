import React from 'react'

function ProtectedRoute({children}) {

 const isAuth = true


  return (
    <div>{isAuth && children}</div>
  )
}

export default ProtectedRoute