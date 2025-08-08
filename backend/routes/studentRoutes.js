const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

// Route: Get all students
router.get('/', studentController.getAllStudents);

// Route: Create a new student
router.post('/', studentController.createStudent);

// Route: Update a student
router.put('/:id', studentController.updateStudent);

// Route: Delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
