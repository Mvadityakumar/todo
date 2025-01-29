import React, {  useState } from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const Signup = () => {
  const [userexistance,setuserexistance]=useState('')

  let navigate=useNavigate()


  const signupCancelBtn=()=>{
    navigate("/")
  }

  const postuserdata = async (userdetails) => {
    if(!userexistance){
      try {
        await axios.post('https://todoserver-gahb.onrender.com/register-user', userdetails);
        console.log('User registered successfully');
        alert("User registered successfully")
        navigate('/login'); // Navigate after successful registration
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }
  };


  const userChecking=(e)=>{
    axios.get('https://todoserver-gahb.onrender.com/users').then(users=>{
      var user=users.data.find(userdetails=>{
        return userdetails.userid===e.target.value
      })

     
      if(user){
        setuserexistance("User Id alredy exists")
        // console.log(user);
      }else{
        setuserexistance("")
      }
      
      
      
      


      
    })
  }






  return (
    <div className='d-flex justify-content-center align-items-center vh-100'>
        <div className='bg-white p-4  rounded rounded-3'>
            <h3 className='bi bi-person fw-bold'>Register User</h3>
            <Formik initialValues={{userid:"",username:"",password:"",email:"",mobile:""}} validationSchema={yup.object({
              userid:yup.string().required('User Id is Required'),
              username:yup.string().required('Username is required'),
              password:yup.string().required('Password is required'),
              email:yup.string().required('Email is required'),
              mobile:yup.string().required('Mobile Number is required')
})} onSubmit={(userdetails)=>{
 postuserdata(userdetails)
  
  

  
}}  >
              <Form>
                <dl>
                  <dt>User Id</dt>
                  <dd><Field type='text' onKeyUp={(e)=>userChecking(e)}  name='userid' id='useridinput' className='form-control'  /></dd>
                  <dd className='text-danger'><ErrorMessage name='userid' />{userexistance}</dd>
                  <dt>User Name</dt>
                  <dd><Field type='text' name='username' id='usernameinput' className='form-control'  /></dd>
                  <dd className='text-danger'><ErrorMessage name='username' /></dd>
                  <dt>Password</dt>
                  <dd><Field type='password' name='password' id='passwordinput' className='form-control'  /></dd>
                  <dd className='text-danger'><ErrorMessage name='password' /></dd>
                  <dt>Email</dt>
                  <dd><Field type='mail' name='email' id='emailinput' className='form-control'  /></dd>
                  <dd className='text-danger'><ErrorMessage name='email' /></dd>
                  <dt>Mobile Number</dt>
                  <dd><Field type='text' name='mobile' id='mobileinput' className='form-control'  /></dd>
                  <dd className='text-danger'><ErrorMessage name='mobile' /></dd>
                 
                </dl>
                <div className='d-flex justify-content-center  gap-1' >
                  <button type="submit" className='btn btn-warning w-100'>Register</button>
                  <button onClick={signupCancelBtn} type="button" className='btn btn-danger w-100'>Cancel</button>
                 
                </div>
              </Form>
            </Formik>
            

          


        </div>
    </div>
  )
}

export default Signup