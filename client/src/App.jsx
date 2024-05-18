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
import Admin from './screens/Admin'
import QuizReport from './screens/QuizReport'


function App() {

  return (
  <div>
    <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={<Welcome />} /> */}
      <Route path="/" element={<Home />} /> 
      <Route path="/create" element={<CreateQuiz />} />
      <Route path="/quiz/:id" element={<AttendQuiz />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/quizReport/:id" element={<QuizReport />} />


    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
