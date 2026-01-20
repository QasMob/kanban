import React from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router'

function TaskBoard() {
  // todo, in progress, done
  // flexbox /or grid
  // button to create a task 
  // form: title, description, due date
  // card ui: marker (green, yellow, red) -> clickable/editable
  
  // set data, set the doc (id) = globalUser.id whos logged in
  // when retriving the data from user on useEffect aka on page load 
  // match doc with id -> globalUser.uid 

  const {globalData, globalUser} = useAuth()

  const navigate = useNavigate()
  
  return (
    <section className='container taskboard'>
    <button onClick={() => navigate('/')}>Add Task</button>

    </section>
  )
}

export default TaskBoard