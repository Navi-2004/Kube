import { BrowserRouter,Route,Routes } from 'react-router-dom'
import React from 'react'
import './App.css'
import Welcome from './screens/Welcome'
import Home from './screens/Home'
import CreateQuiz from './screens/CreateQuiz'
import AttendQuiz from './screens/AttendQuiz'

function App() {

  return (
  <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/create" element={<CreateQuiz />} />
      <Route path="/quiz/:id" element={<AttendQuiz />} />

    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
