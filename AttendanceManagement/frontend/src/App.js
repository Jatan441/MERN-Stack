import React from 'react'
import Login from './Login'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Signup from './Signup'
import Home from './Home';
import MarkAttendance from './markattandance'
function App() {
  return (
   <BrowserRouter>
    <Routes>
      <Route path='/' element={<Login/>}></Route>
      <Route path='/signup' element={<Signup/>}></Route>
      <Route path='/markattendance' element ={<MarkAttendance/>}></Route>
      <Route path='/home' element ={<Home/>}></Route>
    </Routes>
   </BrowserRouter>
  )
}

export default App
