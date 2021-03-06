const express = require('express');
const userController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const router = express.Router();

// Authentication
router.post('/signup', authController.signup);
router.post('/login', authController.login);

// Enroll course
router.post('/enroll-course',authController.verifyAccess, userController.enrollCourse);

router.patch('/:id', userController.updateUser);


module.exports = router;