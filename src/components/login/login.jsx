import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from 'yup'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useCookies } from 'react-cookie'

const Login = () => {
  const[cookie,setcookie,removecookie]=useCookies(['usernamecookie','useridcookie'])
  const[userIdErrMsg,setuserIdErrMsg]=useState('')
  const[passwordErrMsg,setpasswordErrMsg]=useState('')
  let navigate=useNavigate()
  let params=useParams()

  const loginCancelBtn=()=>{
    navigate('/')
  }

  const loginBtn=(userdetails)=>{
    axios.get("https://todoserver-gahb.onrender.com/users").then(users=>{
      // console.log(users.data);
      // console.log(userdetails.password);
      

      var user=users.data.find(details=>{
        return details.userid===userdetails.userid
      })
      // console.log(users.data);
      
      // console.log(user.password);
      // console.log(user);

      if(user){
        
          setuserIdErrMsg("")
          if(user.password===userdetails.password){
            setpasswordErrMsg("")
            // console.log(user.username);
            // console.log(user.userid);
            
            setcookie("usernamecookie",user.username)
            setcookie("useridcookie",user.userid)
            // console.log(cookie['usernamecookie']);
            // console.log(cookie['useridcookie']);
            

           
              navigate(`/login/${user.userid}`)

           
            
            

            
          }else{
            setpasswordErrMsg(" Password is Invalid")
          }
        
       
      }
      else{
        setuserIdErrMsg("UserId is Invalid")
      }
    })
  }

  return (

    <div className='d-flex justify-content-center align-items-center vh-100'>
      <div className='bg-white p-4 rounded rounded-3'>
        <h1 className='bi bi-person fw-bold'>User Login</h1>
        <Formik 
        initialValues={{userid:"",password:""}} 
        validationSchema={yup.object({
          userid:yup.string().required("User Id Required"),
          password:yup.string().required("Password Required")
          })}
        onSubmit={userdetails=>{
          loginBtn(userdetails)
          
        }}>
          {
            form=><Form>
            <dl>
              <dt>User Id</dt>
              <dd><Field className='form-control'  type='text' id="useridinput" name='userid' /></dd>
              <dd className='text-danger'><ErrorMessage className='p-2'  name='userid' /> <div>{userIdErrMsg}</div> </dd>
              <dt>Password</dt>
              <dd><Field  type='password' name='password' id="passwordinput" className='form-control' /></dd>
              <dd className='text-danger '><ErrorMessage  className='me-3' name='password' /><div>{passwordErrMsg}</div></dd>
            </dl>
            <div className='d-flex gap-2' >
              <button   type='submit' className='btn btn-warning w-100'>Login</button>
              <button onClick={loginCancelBtn} type='button' className='btn btn-danger w-100'>Cancel</button>
            </div>
          </Form>
          }
          
        </Formik>
      </div>
    </div>
  )
}

export default Login