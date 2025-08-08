const Student = require('../models/student');

// Get all students
exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
};

// Create a new student
exports.createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update student by ID
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).json({ error: 'Student not found' });
    res.json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete student by ID
exports.deleteStudent = async (req, res) => {
  try {
    const result = await Student.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).json({ error: 'Student not found' });
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete student' });
  }
};
