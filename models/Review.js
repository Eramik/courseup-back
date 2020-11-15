const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Review must have a reference to userId']
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Review must have a reference to courseId']
    },
    review: {
        type: String,
        required: [true, 'Review must contain some text']
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        required: [true, 'Review must have a rating']
    }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;