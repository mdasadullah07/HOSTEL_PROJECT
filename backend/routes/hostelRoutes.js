const express = require('express');
const router = express.Router();
const hostelController = require('../controllers/hostelController');

router.get('/', hostelController.getAllHostels);
router.post('/', hostelController.createHostel);
router.put('/:id', hostelController.updateHostel);
router.delete('/:id', hostelController.deleteHostel);

module.exports = router;
