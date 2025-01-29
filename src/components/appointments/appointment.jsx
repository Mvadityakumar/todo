import React  from 'react'
import './appointment.css'




const Appointment = (props) => {
 


  

  
    
  return (
    <div>
        <div id='alert' className="alert  alert-dismissible fade show bg-white" role="alert" >
                <div className="d-flex justify-content-between">
                    <h5 className="fw-bold">{props.appointmentid}</h5>
                    <button id="closebtn" type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>  
                <h3>{props.title}</h3>
                <p style={{height:'70px',overflow:"auto"}}>{props.description}</p>
                <p>{props.time}</p>
                <div className='d-flex gap-2 justify-content-between  '>
                    <button onClick={props.appointmentEditBtn} className='btn btn-warning bi bi-pen-fill w-75'> Edit</button>
                    <button onClick={props.appointmentDeleteBtn} className='btn btn-danger bi bi-trash-fill w-75'> Delete</button>
                </div>
                </div>
    </div>
  )
}

export default Appointment