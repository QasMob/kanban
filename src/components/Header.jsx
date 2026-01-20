import React from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header() {
  const navigate = useNavigate()
  const {globalUser, logout} = useAuth()
  const {pathname: path} = useLocation()


  


  function checkButton(){
    if (globalUser){
      logout()
      return navigate('/')

    } else {
      return navigate('/login')
    }
  }

  return (
    <section className='container'>
       <div className='home__header'>
        <h1 className='header__title'><Link to={'/'}>Kanban</Link></h1>
        {path === '/login' || path === '/register' ? null : <div className='header__right'>
          <button onClick={checkButton} className='header__button'>{globalUser ? 'Logout' : 'Sign Up'}</button>
        </div>}
      </div>
      </section>
  )
}

export default Header