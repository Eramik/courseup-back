const Course = require('../models/Course');
const controllersFactory = require('./controllersFactory');

exports.getAllCourses = controllersFactory.getAll(Course);
exports.getSingleCourse = controllersFactory.getOne(Course);
exports.addCourse = controllersFactory.createOne(Course);
exports.updateCourse = controllersFactory.updateOne(Course);
exports.deleteCourse = controllersFactory.deleteOne(Course);