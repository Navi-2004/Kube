import { BrowserRouter,Route,Routes } from 'react-router-dom'
import React, { Profiler } from 'react'
import './App.css'
import Welcome from './screens/Welcome'
import Home from './screens/Home'
import CreateQuiz from './screens/CreateQuiz'
import AttendQuiz from './screens/AttendQuiz'
import Login from './screens/Login'
import Register from './screens/Register'
import Profile from './screens/Profile'


function App() {

  return (
  <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/create" element={<CreateQuiz />} />
      <Route path="/quiz/:id" element={<AttendQuiz />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />

    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
