
import React, { useEffect, useState }  from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Appointment from '../appointments/appointment'
import './user.css'
import EditAppointment from '../editAppointment/editAppointment'


import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';




const User = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);



  const [appointment,setappointment]=useState( [ {appointmentid:0,title:"",description:"",date:"",time:"",userid:""}])
  const[cookie,removecookie]=useCookies(['usernamecookie','useridcookie'])
  
  let navigate=useNavigate()
  


    const gettingAppointments=()=>{
        axios.get(`http://127.0.0.1:4000/get-appointments/${cookie['useridcookie']}`).then(appointments=>{
          setappointment(appointments.data)
          // console.log(appointments.data);
       })
      }
    
      useEffect(()=>{
        gettingAppointments()
        appointmentDeleteBtn()
       
      },[])

  const dashboardSignoutBtn=()=>{  
    removecookie("useridcookie")
    navigate("/")

  }

  const dashboardaddBtn=()=>{
    navigate("/addappointment")
  }


  const appointmentDeleteBtn=(e,appointmentid,userid)=>{
   axios.delete(`http://127.0.0.1:4000/delete-appointment/${appointmentid}/${userid}`)
    
    
      gettingAppointments()
  }

  const appointmentEditBtn=(e,appointmentidparam,titleparam,descriptionparam,dateparam)=>{
    navigate('/editappointment',{state:{appointmentidparam,titleparam,descriptionparam,dateparam}})
  }


  const deleteAllAppointmentsBtn=()=>{
    axios.delete(`http://127.0.0.1:4000/delete-all-appointments/${cookie['useridcookie']}`).then(()=>{
      console.log('deleted all appointmments');
      
    })
  } 

  const deleteAccountBtn=()=>{
    axios.delete(`http://127.0.0.1:4000/delete-user/${cookie['useridcookie']}`).then(()=>{
      console.log("user account deleted");
      removecookie('useridcookie')
      navigate('/')
      
    })
  }

 

  return (
    <div id='outside'>
      <div id='bg' className='rounded rounded-2'>
        <nav id='nav' className='rounded rounded-3'>
          <button        variant="primary" onClick={handleShow}          className='btn btn-primary bi bi-person-fill badge rounded rounded-pill'>Profile</button>



              <Offcanvas show={show} onHide={handleClose}>
                 <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Welcome {cookie['usernamecookie']}</Offcanvas.Title>
                 </Offcanvas.Header>
                 <Offcanvas.Body>
                  <div className='d-flex gap-3'>
                    <button onClick={deleteAllAppointmentsBtn} className='btn btn-danger'>Delete All Appointments</button>
                    <button onClick={deleteAccountBtn} className='btn btn-danger'>Delete Account</button>
                  </div>

             
                 </Offcanvas.Body>
              </Offcanvas>




          <h3 className='fw-bold'>{cookie['usernamecookie'].toUpperCase()} Dashboard</h3>
          <div className='d-flex gap-1 justify-content-between flex-wrap'>
            <button  style={{width:100}} type='button' onClick={dashboardaddBtn} className='btn btn-primary bi bi-calendar-date  '> <span>Add</span></button>
            <button type='button' onClick={dashboardSignoutBtn} className='btn btn-danger bi bi-calendar-date  '> <span>Signout</span></button>
          </div>
        </nav>
        <div id='appointment'>
          {
            appointment.map(details=><div key={details.appointmentid}><Appointment appointmentDeleteBtn={(e)=>appointmentDeleteBtn(e,details.appointmentid,details.userid)} userid={details.userid}  appointmentid={details.appointmentid} title={details.title} description={details.description} time={details.date} appointmentEditBtn={(e)=>appointmentEditBtn(e,details.appointmentid,details.title,details.description,details.date)}  /></div>)
          }
        </div>
        
      </div>
    </div>
  )
}

export default User