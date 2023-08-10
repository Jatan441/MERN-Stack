import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


function Home() {
  const [student, setStudent] = useState([]);
  useEffect( ()=>{

        async function getUser() {
          try {
            const response = await axios.get('http://localhost:8081/home');
            setStudent(response.data)
          } catch (error) {
            console.error(error);
          }
        }
        getUser()
    },[])


   
   
  return (
    <>
    <div className='align-items-center bg-image vh-100 p-5'>
  
      <div className=' p-5'>
       <table className="table text-center border border-primary align-items" style={{width:'70%'}} >
    <>
  <thead className="thead-dark table-primary">
    <tr>
      <th scope="col">Roll Number</th> 
      <th scope="col">08-08-2023</th>
      <th scope="col">09-08-2023</th>
      <th scope="col">10-08-2023</th>
      <th scope="col">11-08-2023</th> 
      <th scope="col">12-08-2023</th>
    </tr>
  </thead>
  <tbody>
  {student.map((stu,i )=>(
      <>
    <tr>  
      <td>{stu.rollNumber}</td>
     <td>{stu.date1}</td>
     <td>{stu.date2}</td>
     <td>{stu.date3}</td>
     <td>{stu.date4}</td>
     <td>{stu.date5}</td>
    </tr>
     </> 
     ))}
  </tbody>
    </>
</table>
    </div>
<div className='bg-white p-3 rounded w-50 align-items box d-flex gap-5'>
      <Link to="/markattendance"   className='btn btn-info border w-100 color-white rounded-3 text-white align-content-center'><b>Mark Attendance</b></Link>
      <Link to="/home/date"   className='btn btn-info border w-100 color-white rounded-3 text-white align-content-center'><b>Show By Date</b></Link>
        </div>

        </div>
        
    </>
  )


  }

export default Home
