import React from 'react'
import {Link, useNavigate} from 'react-router'
import { useState } from 'react'
import {useAuth} from '../context/AuthContext'


function Register() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const {signUp} = useAuth()


  async function handleSubmit(e){
    
    e.preventDefault()
    try {
        await signUp(email, password)
      } catch (err){
        setError(err.toString())
      } finally {
        setEmail('')
        setPassword('')
      }
    }


  return (
    <section className='register container'>
      <form className='register__form' onSubmit={handleSubmit}>
      <button type='button' onClick={() => {navigate('/')}} className='login__cancel__btn'>❌</button> 
      <h1 className='register__title'>Register</h1>
         <p style={{color:'red'}}>{error.slice(25)}</p>
         <label htmlFor="email">Email</label>
        <input id='email' value={email} onChange={e => setEmail(e.target.value)} type="text" placeholder='johndoe@gmail.com'/>
        <label htmlFor="password">Password</label>
        <input id='password' value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='*********'/>

        <div className='register__form__bottom'>
        <button type='submit'>Register</button>
        <p>Already a member? <Link to={'/login'}>Login Now</Link></p>
        </div>
      </form>
    </section>
  )
}

export default Register