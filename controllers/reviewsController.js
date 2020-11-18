const Review = require('../models/Review');
const controllersFactory = require('./controllersFactory');

exports.leaveReview = async (req, res, next) => {
    const { userId, courseId, review, rating } = req.body;
    const reviewDoc = await Review.create({
        userId,
        courseId,
        review,
        rating
    });

    res.status(200).json({
        status: 'success',
        data: { review: reviewDoc }
    });
};

exports.getAllReviews = async (req, res, next) => {
    const query = {};
    if (req.query.courseId) {
        query.courseId = req.query.courseId;
    }
    const docs = await Review.find(query);

    res.status(200).json({
        status: 'success',
        results: docs.length,
        data: { docs }
    });
};

exports.getSingleReview = controllersFactory.getOne(Review);
exports.addReview = controllersFactory.createOne(Review);
exports.updateReview = controllersFactory.updateOne(Review);
exports.deleteReview = controllersFactory.deleteOne(Review);