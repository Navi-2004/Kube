import React from 'react'
import { Link } from 'react-router-dom'

const Welcome = () => {
  return (
    <div>
        <h1>Welcome To Kube</h1>
        <Link to="/home"><button className='text-white'>Enter</button></Link>
    </div>
  )
}

export default Welcome