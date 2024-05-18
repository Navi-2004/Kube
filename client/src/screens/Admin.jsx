import React from 'react'
import { Link } from 'react-router-dom'

const Admin = () => {
  return (
    <div>
        <div className="mt-8 mb-4">
        <h2 className="text-3xl font-bold mb-2">Welcome to Quiz App</h2>
        <p className="text-lg mb-4">Create a quiz and challenge your friends!</p>
        <Link to="/create">
          <button >
            Create Quiz
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Admin