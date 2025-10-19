import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignupPage from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path='/' element={<HomePage /> }></Route >

        <Route path='/signup' element={<SignupPage /> }></Route >

        <Route path='/login' element={<LoginPage /> }></Route >

        <Route path='/' element={<SettingsPage /> }></Route >

        <Route path='/' element={<ProfilePage /> }></Route >

      </Routes>
    </div>
  )
}

export default App