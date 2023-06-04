const express = require("express");
const router = express.Router();
const studentModel = require('../models/students');

//getAllStudents
router.get('/',async(request, response) => {
    try{
    const students = await studentModel.find();
    response.status(201).json(students);
    }
    catch(error){
        //console.log(error);
        response.status(500).json({message:error.message});
    }
})

//addStudent
router.post('/',async(request,response) => {
    const newStudent = new studentModel ({
        name: request.body.name,
        enrolledDept: request.body.enrolledDept,
        enrollmentDate: request.body.enrollmentDate
    })
    try{
        const student = await newStudent.save();
        response.status(201).json(student);
    }
    catch(error){
        response.status(500).json({message:error.message});
    }
})

router.patch('/:id',getStudent,async(request,response)=>{
  //res.send(`Updating Student details With Id ${req.params.id}`)
  if(request.body.name != null){
    response.student.name = request.body.name;
  }
  if(request.body.enrolledDept != null){
    response.student.enrolledDept = request.body.enrolledDept
  }
  try{
    const updatedStudent = await response.student.save();
    response.status(201).json(updatedStudent);
  }
  catch(error){
    response.status(400).json({message:error.message});
  }
})

router.delete('/:id',async(request,response)=>{
  //res.send(`Deleting Student details With Id ${req.params.id}`)
  try{
    await response.student.deleteOne();
    response.json({message: 'Deleted user ${response.student.name}'})
  }
  catch(error){
    response.json({message:error.message})
  }
})

router.get('/:id',getStudent, (request,response)=>{
  response.status(200).json(response.student);
})

async function getStudent(request, response, next){
    let student
    try{
        student = await studentModel.findById(request.params.id)
        if(student == null){
            return response.status(404).json({message:"Cannot find user with id ${request.params.id}"})
        }
        response.student = student;
        next()
    }
    catch(error){
        return response.status(500).json({message:error.message})
    }
}

module.exports=router;