import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../components/home/home'
import Notfound from '../components/notfound/notfound'
import Signup from '../components/signup/signup'
import Login from '../components/login/login'
import User from '../components/userpage/user'
import AddAppointmentPage from '../components/addAppointmentPage/addAppointmentPage'
import EditAppointment from '../components/editAppointment/editAppointment'

const Routers = () => {
  return (
    <Routes>
      <Route path='*' element={<Notfound/>} />
      <Route  path='/'  element={<Home/>}  />
      <Route path='/signup' element={<Signup/>} />
      <Route path='/login' element={<Login/>}/ >
      <Route path='/login/:userid' element={<User/>} />
      <Route  path='/addappointment'  element={<AddAppointmentPage/>}    />
      <Route path='/editappointment' element={<EditAppointment/>} />
            
   
      
      

      
    </Routes>
  )
}

export default Routers