const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    Name: {
        type: String,
        required: [true, 'Course must have a name']
    },
    Summary: {
        type: String,
        required: [true, 'Course must have a summary']
    },
    Description: {
        type: String,
        required: [true, 'Course must have a description']
    },
    Category: {
        type: String,
        required: [true, 'Course must have a category']
    },
    Difficulty: {
        type: String,
        enum: ['Beginner', 'Middle', 'Advanced'],
        required: [true, 'Course must have a difficulty']
    },
    Rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    AmountEnrolled: {
        type: Number,
        min: 0,
        default: 0
    },
    AmountRated: {
        type: Number,
        min: 0,
        default: 0
    },
    Picture: {
        type: String,
        default: 'no-picture'
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
