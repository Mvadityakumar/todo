import axios from 'axios'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import {useNavigate} from 'react-router-dom'
import * as yup from 'yup'

const AddAppointmentPage = () => {
    const[appointmentidErrorMsg,setappointmentidErrorMsg]=useState("")
   
     const[cookie]=useCookies(['usernamecookie','useridcookie'])
    let navigate=useNavigate()

    const addAppointmentCancelBtn=()=>{
        navigate(`/login/${cookie['useridcookie']}`) 
      
        
    }
    
    var addAppointmentAddBtn=(e)=>{
              
    }



    const addNewApponitment=(details)=>{

        var extradata={
            userid:cookie['useridcookie'],
            date:document.getElementById("timeinput").value
        }

        var finaldata= {
           ...details,...extradata

        }
        // console.log(data);

        if(!appointmentidErrorMsg){
            axios.post('https://todoserver-gahb.onrender.com/add-appointment',finaldata).then(()=>{
                console.log('new appointment added');
                
            })
            alert('Appointment Added Successfully')
    
            navigate(`/login/${cookie['useridcookie']}`) 
        }
    }


    const appointmentIdChecking=(e)=>{
        axios.get(`https://todoserver-gahb.onrender.com/get-appointments/${cookie['useridcookie']}`).then(details=>{
            var id=details.data.find(details=>{
                return details.appointmentid===parseInt(e.target.value)
              })

            //   console.log(id);
              
            
            if(id){
                setappointmentidErrorMsg("Appointment Id Already Existed")
                addAppointmentAddBtn=(e)=>{
                    
                }

                

            }
            else{
                setappointmentidErrorMsg("")
            }
        })
    }



  return (
    <div className='d-flex align-items-center justify-content-center vh-100'>
        <div className='bg-white p-5 rounded rounded-3'>
            <h3 className='fw-bold'>New Appointment</h3>
            <Formik initialValues={{appointmentid:"",title:"",description:"",time:""}} validationSchema={yup.object({
                appointmentid:yup.number().required("Apointment Id Required"),
                title:yup.string().required("Title Required"),
                description:yup.string().required("description Required"),
                time:yup.date().required("time Required")

               
            })} onSubmit={(details)=>{
                addNewApponitment(details)
                
            }}  >
                <Form>
                    <dl>
                        <dt>Appointment Id</dt>
                        <dd><Field onKeyUp={appointmentIdChecking} type='number' className="form-control" name='appointmentid' id="appointmentidinput"  /></dd>
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
                        <button type='submit' onClick={addAppointmentAddBtn} className='btn btn-primary w-100'> Add</button>
                        <button type='button' onClick={addAppointmentCancelBtn} className='btn btn-danger w-100'> Cancel</button>
                    </div>
                </Form>
            </Formik>
        </div>
    </div>
  )
}

export default AddAppointmentPage