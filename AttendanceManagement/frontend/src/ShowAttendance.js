import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link  } from 'react-router-dom'

    const  ShowAttendance =() => {
    const [student, setStudent] = useState([]);
    const [date, setDate] = useState('date1');
   
    const dataDate = {date}

    const dateValue ={
        date1: '08-08-2023',
        date2: '09-08-2023',
        date3: '10-08-2023',
        date4: '11-08-2023',
        date5: '12-08-2023'
    }


    useEffect( ()=>{
  
          async function getUser() {
            try {
              const response = await axios.post('http://localhost:8081/home/date', dataDate);
              setStudent(response.data)
           
            } catch (error) {
              console.error(error);
            }
          }
          getUser()
      },[dataDate])
      
     

  return (
    <div className='align-items-center bg-image vh-100 p-5 '>
        <div className='align-items '>
          <Row>
          <form>  
        <Col xl={4} className='align-items'>
        <select className='form-control m-1' id="date" name="date" 
         onChange={(e) => setDate(e.target.value)} required>
          <option value="date1" > 08-08-2023</option>
          <option value="date2" > 09-08-2023</option>
          <option value="date3" > 10-08-2023</option>
          <option value="date4" > 11-08-2023</option>
          <option value="date5" > 12-08-2023</option>
        </select>
        </Col>
          </form>
        </Row>
        </div>

      <div className=' p-5'>
       <table className="table text-center border border-primary align-items" style={{width:'70%'}} >
   
  <thead className="thead-dark table-primary">
      <tr>
      <th scope="col">Roll Number</th> 
      <th scope="col">{dateValue[date]}</th>
    </tr>

  </thead>
  <tbody>
  {student.map((stu,i )=>(
    <tr>  
    <td>{stu.rollNumber}</td>
      <td>{stu[date]}</td>
    </tr> 
    ))}
  </tbody>
   
</table>
    </div>
<div className='bg-white p-3 rounded w-25 align-items box '>
      <Link to="/markattendance" className='btn btn-info border w-100 color-white rounded-3 text-white align-content-center'><b>Mark Attendance</b></Link>
        </div>

    </div>
  )
}

export default ShowAttendance
