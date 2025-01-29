import React from 'react'
import './App.css'
import Routers from './router/routers'

const App = () => {
  return (
   <div className='outside'>
     <div className='inside' >
      <Routers/>
     </div>
   </div>
      
    
  )
}

export default App