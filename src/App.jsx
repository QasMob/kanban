import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import TaskBoard from './pages/TaskBoard'
import NotFound from './pages/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from './components/PublicRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Task from './components/Task'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route element={<PublicRoute/>}>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>} />
      </Route>

      <Route element={<ProtectedRoute/>}>
      <Route path="/taskboard" element={<TaskBoard/>}/>
      <Route path="/taskForm" element={<Task/>}/>
     </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
