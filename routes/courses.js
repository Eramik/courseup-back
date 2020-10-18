const express = require('express');
const coursesController = require('../controllers/coursesController');
const Course = require('../models/Course');

const router = express.Router();

router.route('/')
    .get(coursesController.getAllCourses)
    .post(coursesController.addCourse);

router.get('/categories', async (req, res, next) => {
    const categories = await Course.aggregate([{ $group: { _id: '$category' } }]);

    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    });
});

router.route('/:courseId')
    .get(coursesController.getSingleCourse)
    .patch(coursesController.updateCourse)
    .delete(coursesController.deleteCourse);

module.exports = router;