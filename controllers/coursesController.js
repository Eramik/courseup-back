const Course = require('../models/Course');

exports.getAllCourses = async (req, res, next) => {
    const courses = await Course.find();

    res.status(200).json({
        status: 'success',
        data: {
            courses
        }
    });
};

exports.getSingleCourse = async (req, res, next) => {
    const { courseId } = req.params;
    const { readPopulate } = req.query;

    const courseQuery = Course.findById(courseId);

    if (readPopulate === 'true') {
        courseQuery.populate('materials.texts');
    }

    const course = await courseQuery;

    res.status(200).json({
        status: 'success',
        data: {
            course
        }
    });
};

exports.addCourse = async (req, res, next) => {
    const result = await Course.create(req.body);

    res.status(200).json({
        status: 'success',
        message: 'course created successfully',
        data: {
            result
        }
    });
};

exports.updateCourse = async (req, res, next) => {
    const { courseId } = req.params;

    const result = await Course.findByIdAndUpdate(courseId, req.body);

    res.status(200).json({
        status: 'success',
        message: 'course updated successfully',
        data: {
            result
        }
    });
};

exports.deleteCourse = async (req, res, next) => {
    const { courseId } = req.params;
    
    const result = await Course.findByIdAndDelete(courseId);

    res.status(200).json({
        status: 'success'
    });
};