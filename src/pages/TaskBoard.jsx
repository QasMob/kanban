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

  const {globalData, setGlobalData, globalUser, deleteTask, fetchUserData} = useAuth()

  const navigate = useNavigate()

  function handleDelete(el) {
    setGlobalData(globalData.filter(item => item.id !== el.id))
    deleteTask(globalUser.uid, el.id)
  }


  return (
    <section className='container taskboard'>
    <button className='taskboard__btn'  onClick={() => navigate('/taskForm')}>Add Task</button>

      <div className='task'>
        <div className='task__container'>
        <h2>Todo</h2>
        <div className='todo'>
          {globalData.length > 0 && globalData.filter((el) => el.Status === 'todo')
          .map((el) => {
            return (
              <div className='todo__card' key={el.id}>
              <h3>{el.Title}</h3>
              <p>{el.Description}</p>
              <p>{el.Date}</p>
              <button onClick={() => handleDelete(el)}>Delete</button>
              </div>
            )
          })}
        </div>
        </div>
        <div className='task__container'>
          <h2>In Progress</h2>
         <div className='doing'>
             {globalData.length > 0 && globalData.filter((el) => el.Status === 'doing')
          .map((el) => {
            return (
              <div className='doing__card' key={el.id}>
              <h3>{el.Title}</h3>
              <p>{el.Description}</p>
              <p>{el.Date}</p>
              <button onClick={() => handleDelete(el)}>Delete</button>

              </div>
            )
          })}
         </div>
        </div>
          <div className='task__container'>
             <h2>Done</h2>
        <div className='done'>
             {globalData.length > 0 && globalData.filter((el) => el.Status === 'done')
          .map((el) => {
            return (
              <div className='done__card' key={el.id}>
              <h3>{el.Title}</h3>
              <p>{el.Description}</p>
              <p>{el.Date}</p>              
              <button onClick={() => handleDelete(el)}>Delete</button>
              </div>
            )
          })}
        </div>
          </div>
      </div>
    </section>
  )
}
export default TaskBoard