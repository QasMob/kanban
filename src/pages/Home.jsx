import React from 'react'
import { useNavigate } from 'react-router'

function Home() {

  const navigate = useNavigate()
  return (
    <section className='home container'>
      <div className='home__hero'>
        <h1>Task Tracking System for Students ✏️</h1>
        <p>Organize tasks, track deadlines, stay productive!</p>
        <button onClick={() => {navigate('/login')}} className='header__button'>Get Started</button>
      </div>
    </section>
  )
}

export default Home