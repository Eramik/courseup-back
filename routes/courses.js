const express = require('express');
const coursesController = require('../controllers/coursesController');

const router = express.Router();

router.route('/')
    .get(coursesController.getAllCourses)
    .post(coursesController.addCourse);

router.route('/:courseId')
    .get(coursesController.getSingleCourse)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse);

module.exports = router;