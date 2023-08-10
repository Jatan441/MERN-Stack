const express=require("express");
const mysql=require('mysql');
const cors=require('cors');
const bodyParser = require('body-parser')

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}))

const db=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"teacher"
})
app.post('/signup',(req,res)=>{
    const sql="INSERT INTO login(`name`,`email`,`password`)VALUES (?)";
    const values=[
        req.body.name,
        req.body.email,
        req.body.password
]
        db.query(sql,[values],(err,data)=>{
            if(err){
                return res.json("Error");
            }
            return res.json(data);
        })
    
})




app.post('/login',(req,res)=>{
    const sql="SELECT * FROM login where `email` = ? AND `password` = ? ";
    
        db.query(sql,[ req.body.email,req.body.password],(err,data)=>{
            if(err){
                return res.json("Error");
            }
           if(data.length>0){
            return res.json("Success");
           }
           else{
            return res.json("Failed");
           }
        })
    
})

app.get('/home', function (req, res, next) {
    db.query('SELECT * FROM student_attendance ', function (err, rows) {
      if (err) {
        res.json(err);
      }

        res.send(rows)
      
    })
  })

app.post('/home/date', function (req, res, next) {
        const date = req.body.date
    db.query('SELECT rollNumber, '+date+' FROM `student_attendance`', function (err, rows) {
      if (err) {
        res.json(err);
      }

        res.send(rows)
      
    })
  })

  app.post('/markattendance/mark', (req,res)=>{
    db.query('SELECT * FROM student_attendance Where rollNumber ="'+req.body.rollNumber+'"', function (err, data) {
        if (err) {
          res.json(err);
        }

        
        if(data.length>0){
            return res.json('FOUND')
           }
        
           res.json('FAIL')
        
      })
  })



app.post('/markattendance', (req,res)=>{
    
    const date= req.body.date
    const sql='INSERT INTO student_attendance(`rollNumber`, `'+date+'` ) VALUES ("'+req.body.rollNumber+'","'+req.body.attendanceStatus+'")';
        db.query(sql, (err, data) =>{
            if(err){
                res.json(err);
            }
            return res.json(data);
        })
    
})



app.patch('/markattendance/update', (req,res)=>{
    
    const date= req.body.date
    const rollNumber= req.body.rollNumber
    const attendanceStatus= req.body.attendanceStatus
    const sql='UPDATE `student_attendance` SET `'+date+'`="'+attendanceStatus+'" WHERE `rollNumber`="'+rollNumber+'"';
        db.query(sql, (err, data) =>{
            if(err){
                res.json(err);
            }
            return res.json(data);
        })
    
})



app.listen(8081,()=>{
    console.log("Server is running on 8081");
})