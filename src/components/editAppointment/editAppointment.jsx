
import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import {useLocation, useNavigate} from 'react-router-dom'
import * as yup from 'yup'


const EditAppointment = () => {
    const[appointmentidErrorMsg,setappointmentidErrorMsg]=useState('')
    const[cookie]=useCookies(['useridcookie','usernamecookie'])
    let navigate=useNavigate()
    const location=useLocation()
    const {appointmentidparam,titleparam,descriptionparam,dateparam}=location.state 

    const editAppointmentCancelBtn=()=>{
        navigate(`/login/${cookie['useridcookie']}`)
    }

   

    

    const puttingappointmentdetails=(details)=>{
        var extradetails={
            date:document.getElementById("timeinput").value,
            userid:cookie['useridcookie']
            
        }
        var actualdetails={...extradetails,...details }
        
        
        axios.put(`https://todoserver-gahb.onrender.com/edit-appointment/${appointmentidparam}/${cookie['useridcookie']}`,actualdetails).then(()=>{
            console.log("data updated");
            
            navigate(`/login/${cookie['useridcookie']}`)
        })
    
    }

    const appointmentIdChecking=(e)=>{
        axios.get(`https://todoserver-gahb.onrender.com/get-appointments/${cookie['useridcookie']}`).then(details=>{
            var id=details.data.find(details=>{
                return details.appointmentid===parseInt(e.target.value)
              })

            //   console.log(id);
              
            
            if(id){
                setappointmentidErrorMsg("Appointment Id Already Existed")
            }
            else{
                setappointmentidErrorMsg("")
            }
       
        })
    }





  return (
     <div className='d-flex align-items-center justify-content-center vh-100'>
            <div className='bg-white p-5 rounded rounded-3'>
                <h3 className='fw-bold'>Edit Appointment</h3>
                <Formik initialValues={{appointmentid:appointmentidparam,title:titleparam,description:descriptionparam}}  
                validationSchema={yup.object({ 
                                appointmentid:yup.number().required("Apointment Id Required"),
                                title:yup.string().required("Title Required"),
                                description:yup.string().required("Description Required"),
                                time:yup.date().required("Time Required")})}
                onSubmit={details=>{
                    // console.log(details);
                    if(!appointmentidErrorMsg){
                        puttingappointmentdetails(details)
                    }
                    
                    
                }} >
                    <Form>
                        <dl>
                            <dt>Appointment Id</dt>
                            <dd><Field onKeyUp={appointmentIdChecking}  type='number' className="form-control" name='appointmentid' id="appointmentidinput"  /></dd>
                            <dd    className='text-danger'><ErrorMessage   name='appointmentid' /><div>{appointmentidErrorMsg}</div></dd>
                            <dt>Title</dt>
                            <dd><Field type='text' className="form-control" name='title' id="titleinput"  /></dd>
                            <dd   className='text-danger'><ErrorMessage   name='title' /></dd>
                            <dt>Description</dt>
                            <dd><Field className="form-control " name='description' id="descriptioninput" /></dd>
                            
                            <dt>Date & Time</dt>
                            <dd><Field type='datetime-local'  className="form-control" name='time' id="timeinput" /></dd>
                            <dd   className='text-danger'><ErrorMessage  name='time' /></dd>
                           
                        </dl>
                        <div className='d-flex gap-2'>
                            <button type='submit' className='btn btn-primary w-100'> Save</button>
                            <button type='button' onClick={editAppointmentCancelBtn} className='btn btn-danger w-100'> Cancel</button>
                        </div>
                    </Form>
                </Formik>
            </div>
        </div>
  )
}

export default EditAppointment