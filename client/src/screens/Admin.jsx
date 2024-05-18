import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import AdminScoreReport from '../components/AdminScoreReport'

const Admin = () => {
  return (
    <div>
      <Navbar />
    <div>
        <div className="mt-8 mb-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Welcome to Quiz App</h2>
        <p className="text-lg mb-4">Create a quiz and challenge your friends!</p>
        <Link to="/create">
          <button >
            Create Quiz
          </button>
        </Link>
      </div>
    </div>
    <AdminScoreReport />
    </div>
  )
}

export default Admin