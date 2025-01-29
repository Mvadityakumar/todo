import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  let navigate=useNavigate()


  const createAccountBtn=()=>{
    navigate('/signup')
  }

  const loginbtn=()=>{
    navigate('/login')
  }



  return (
   <div className='d-flex justify-content-center vh-100 align-items-center gap-4'>
    
      <button onClick={createAccountBtn} className='btn btn-primary'>Create account</button>
      <button onClick={loginbtn} className='btn btn-success'>Login</button>
    
   </div>
  )
}

export default Home;