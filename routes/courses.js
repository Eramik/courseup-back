const express = require('express');
const coursesController = require('../controllers/coursesController');
const authController = require('../controllers/authController');
const Course = require('../models/Course');

const router = express.Router();

router
    .route('/')
    .get(coursesController.getAllCourses)
    .post(authController.verifyAccess, coursesController.addCourse);

router.get('/categories', async (req, res, next) => {
    const categories = await Course.aggregate([{ $group: { _id: '$category' } }]);
    
    res.status(200).json({
        status: 'success',
        data: {
            categories
        }
    });
});

router
    .route('/:id')
    .get(coursesController.getSingleCourse)
    .patch(authController.verifyAccess, coursesController.updateCourse)
    .delete(authController.verifyAccess, coursesController.deleteCourse);

module.exports = router;