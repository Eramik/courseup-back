const express = require('express');
const reviewsController = require('../controllers/reviewsController');

const router = express.Router();

router
    .route('/')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.leaveReview);
router
    .route('/:id')
    .get(reviewsController.getSingleReview)
    .patch(reviewsController.updateReview)
    .delete(reviewsController.deleteReview);

module.exports = router;