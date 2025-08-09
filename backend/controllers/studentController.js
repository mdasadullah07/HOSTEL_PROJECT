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
    const { admissionNo, email } = req.body;

    // Check karein ki admission number pehle se hai ya nahi
    if (admissionNo) {
      const existingStudent = await Student.findOne({ admissionNo });
      if (existingStudent) {
        return res.status(400).json({ message: `A student with admission number '${admissionNo}' already exists.` });
      }
    }
    
    // Yahan aap email ke liye bhi duplicate check kar sakte hain
    if (email) {
        const existingEmail = await Student.findOne({ email });
        if(existingEmail) {
            return res.status(400).json({ message: `A student with this email '${email}' already exists.`});
        }
    }

    // Ab naya student banayein
    const student = new Student(req.body);
    await student.save();
    res.status(201).json(student);

  } catch (error) {
    // Mongoose ke validation errors ko aache se handle karein
    if (error.name === 'ValidationError') {
      let errors = {};
      Object.keys(error.errors).forEach((key) => {
        errors[key] = error.errors[key].message;
      });
      return res.status(400).json({ message: "Validation failed", errors });
    }
    // Baaki server errors ke liye
    res.status(500).json({ message: 'Server error while creating student.', error: error.message });
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
