import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useAuth } from '../context/AuthContext'



export default function Task() {

    const navigate = useNavigate()

    const {addData, fetchUserData, globalUser} = useAuth()

    const [error, setError] = useState('')
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [status, setStatus] = useState('todo')

    async function handleSubmit(e){
    e.preventDefault()

    // error handling, required title, required date, (option description)
    if (!title && !date) {return}

    try {
    await addData(title, description, date, status)
    await fetchUserData(globalUser.uid)
  } catch(err){
    setError(err.toString())
  } finally {
    navigate('/taskboard')
    }

  }



  return (
       <section className='login container'>
      <form className='login__form' onSubmit={handleSubmit}>
     <button type='button' onClick={() => {navigate('/taskboard')}} className='login__cancel__btn'>❌</button> 
      <h1 className='login__title'>Add Task</h1>
        <p style={{color:'red'}}>{error}</p>
        <label htmlFor="title">Title</label>
        <input id='title' value={title} onChange={(e) => {setTitle(e.target.value)}} type="text" placeholder='Algebra'/>
        <label htmlFor="description">Description</label>
        <input id='description' value={description} onChange={(e) => {setDescription(e.target.value)}} type="text" placeholder="Finish reading chapter 2 of required reading in textbook"/>
        <label htmlFor="date">Date</label>
        <input type="date" value={date} onChange={(e) => {setDate(e.target.value)}} id='date' placeholder='2026-01-01' />
        <label htmlFor="status">Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="todo">Todo</option>
          <option value="doing">In Progress</option>
           <option value="done">Complete</option>
        </select>
        <div className='login__form__bottom'>
        <button type='submit'>Add</button>
        </div>
      </form>
    </section>
  )
}
