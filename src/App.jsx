import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import TaskBoard from './pages/TaskBoard'
import NotFound from './pages/NotFound'
import ProtectedRoute from "./components/ProtectedRoute"
import PublicRoute from './components/PublicRoute'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<PublicRoute><Home/></PublicRoute>}/>
      <Route path="/taskboard" element={<ProtectedRoute><TaskBoard/></ProtectedRoute>}/>
      <Route path="/login" element={<PublicRoute><Login/></PublicRoute>}/>
      <Route path="/register" element={<PublicRoute><Register/></PublicRoute>}/>
      <Route path="*" element={<NotFound/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
