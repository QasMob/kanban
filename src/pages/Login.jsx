import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import {useAuth} from '../context/AuthContext'

function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const {signIn} = useAuth()

  async function handleSubmit(e){
    e.preventDefault()

    try {
      await signIn(email, password)
    } catch(err){
      setError(err.toString())
    } finally {
      setEmail('')
      setPassword('')
    }

  }


  return (
    <section className='login container'>
      <form className='login__form' onSubmit={handleSubmit}>
      <button type='button' onClick={() => {navigate('/')}} className='login__cancel__btn'>❌</button> 
      <h1 className='login__title'>Login</h1>
        <p style={{color:'red'}}>{error.slice(25)}</p>
        <label htmlFor="email">Email</label>
        <input id='email' value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder='johndoe@gmail.com'/>
        <label htmlFor="password">Password</label>
        <input id='password' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='*********'/>

        <div className='login__form__bottom'>
        <button type='submit'>Login</button>
        <p>Not a member? <Link to={'/register'}>Register Now</Link></p>
        </div>
      </form>
    </section>
  )
}

export default Login