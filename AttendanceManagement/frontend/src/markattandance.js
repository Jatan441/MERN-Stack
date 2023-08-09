


import React, { useState } from 'react';
import axios from 'axios';
import {Row,Col} from 'react-bootstrap'
import { Link } from 'react-router-dom';
const MarkAttendance = () => {
  const [rollNumber, setRollNumber] = useState('');
  const [date, setDate] = useState('date1');
  const [attendanceStatus, setAttendanceStatus] = useState('Present');
  const [message, setMessage] = useState('');

  const handleAttendanceSubmit = async (event) => {
    event.preventDefault();

    const attendanceData = {
      rollNumber,
      date,
      attendanceStatus,
    };
        console.log(date);

    try {
      const response = await axios.post('http://localhost:8081/markattendance', attendanceData);
        console.log(response.error);
      if (response.data === "Fail") {
        setMessage('Error: Student attendance marked.');
      } 
      else {
        setMessage('Error: Attendance already marked for this roll number on this date.')
      }
    } catch (error) {
        setMessage('Error: Failed to mark attendance.');
    }
  };

  return (
    <>
    <div className='d-flex flex-column justify-content-center align-items-center bg-image vh-100 '>
        <div className='bg-white p-3 rounded w-25 m-3' >
      <h1>Mark Attendance</h1>


      <form onSubmit={handleAttendanceSubmit}>
        <div className='jbzd'>

        <Row>

        <Col xl={6}>
        <label htmlFor="rollNumber">Roll Number:</label>
        </Col>
        <Col xl={6}>
        <input className='form-control  m-1' type="text" id="rollNumber" name="rollNumber" placeholder='Enter Roll Number' value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} required />
          
          </Col>


        </Row>
        <Row>
        <Col xl={6}>
        <label htmlFor="date">Date:</label>
        </Col>
        <Col xl={6}>
        <select className='form-control  m-1' id="date" name="date" value='date'
        onChange={(e) => setDate(e.target.value)} required>
          <option value="date1" > 08-08-2023</option>
          <option value="date2" > 09-08-2023</option>
          <option value="date3" > 10-08-2023</option>
          <option value="date4" > 11-08-2023</option>
          <option value="date5" > 12-08-2023</option>
        </select>
        </Col>
        </Row>
    <Row>
      <Col xl={6}>
        <label htmlFor="attendanceStatus">Attendance Status:</label>
        </Col>
        <Col xl={6}>
        <select className='form-select m-1' id="attendanceStatus" name="attendanceStatus" 
         value={attendanceStatus} onChange={(e) => setAttendanceStatus(e.target.value)} required>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
      </Col>
    </Row>
        <Row>
        <Col xl={6}>
        <div className='text-center'>
        <input className='btn btn-primary align-items' type="submit" value="Submit"  />
        </div>
          </Col>
        </Row>
        </div>
      </form>
      <div>{message}</div>
      </div>
      <div className='bg-white p-3 rounded w-25'>
      <Link to="/home"   className='btn btn-info border w-100 color-white rounded-3 text-white'><b>Show Data</b></Link>
        </div>
    </div>
    </>
  );
};

export default MarkAttendance;

