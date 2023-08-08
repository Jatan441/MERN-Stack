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
    <div className='   align-items-center bg-image vh-100 p-5'>
      <div className=' p-5'>
       <table className="table text-center border border-primary align-items" style={{width:'70%'}} >
  <thead className="thead-dark table-primary">
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Roll Number</th>
      <th scope="col">Attendance Status</th>
    </tr>
  </thead>
  <tbody>
  {student.map((stu,i )=>(
    <tr key={i}>  
      <td>{stu.date}</td>
      <td>{stu.rollNumber}</td>
      <td>{stu.attendanceStatus}</td>
    </tr>
    ))}
  </tbody>
</table>
    </div>
<div className='bg-white p-3 rounded w-25 align-items box '>
      <Link to="/markattendance"   className='btn btn-info border w-100 color-white rounded-3 text-white align-content-center'><b>Mark Attendance</b></Link>
        </div>

        </div>
    </>
  )
}

export default Home
