import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'

const Home = () => {
  return (
    <main>
        <Navbar />
        {/* the rest of the content here */}
        <Outlet />
    </main>
  )
}

export default Home