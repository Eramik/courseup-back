const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Course must have a name']
    },
    summary: {
        type: String,
        required: [true, 'Course must have a summary']
    },
    description: {
        type: String,
        required: [true, 'Course must have a description']
    },
    category: {
        type: String,
        required: [true, 'Course must have a category']
    },
    difficulty: {
        type: String,
        enum: ['beginner', 'middle', 'advanced'],
        required: [true, 'Course must have a difficulty']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    materials: {
        texts: [Schema.Types.ObjectId],
        videos: [Schema.Types.ObjectId],
        tests: [Schema.Types.ObjectId]
    },
    amountEnrolled: {
        type: Number,
        min: 0,
        default: 0
    },
    amountRated: {
        type: Number,
        min: 0,
        default: 0
    },
    picture: {
        type: String,
        default: 'no-picture'
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
