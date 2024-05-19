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
import ViewResult from './screens/ViewResult'
import AdminLogin from './screens/AdminLogin'


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
      <Route path="/adminpage" element={<Admin />} />
      <Route path="/quizReport/:id" element={<QuizReport />} />
      <Route path="/viewresult" element={<ViewResult />} />
      <Route path="/adminlogin" element={<AdminLogin />} />



    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
