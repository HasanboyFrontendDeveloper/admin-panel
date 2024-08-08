import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { Home, Login } from './Pages'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const token = localStorage.getItem('token') || ''
  const navigate = useNavigate()

  useEffect(() => {
    if (token.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey')) {
      navigate('/')
    }else{
      navigate('/login')
    }
    
  }, [])
  


  return (
    <div className=''>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <ToastContainer />
    </div>
  )
}

export default App