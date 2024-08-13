import React from 'react'
import { Link } from 'react-router-dom';


function Header() {
  return (
    <div className=' text-cyan-700 bg-gray-800 flex justify-between px-5 py-4 text-xl'>
        <div className=' drop-shadow-lg font-bold'>Flashcard</div>
        <div className='space-x-5'>
        <Link to="/" className=' duration-300 hover:underline hover:decoration-cyan-800 hover:text-cyan-800'>Flashcard List</Link>
        <Link to="/dash" className=' duration-300 hover:underline hover:decoration-cyan-800 hover:text-cyan-800'>Dashboard</Link>
        </div>
    </div>
  )
}

export default Header