import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
function App() {

  return (
  <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<h1>Welcome to the Quiz App!</h1>} />
    </Routes>
    </BrowserRouter>
  </div>
  )
}

export default App
