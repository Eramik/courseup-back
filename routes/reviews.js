const express = require('express');
const authController = require('../controllers/authController');
const reviewsController = require('../controllers/reviewsController');

const router = express.Router();

router
    .route('/')
    .get(reviewsController.getAllReviews)
    .post(reviewsController.addReview);
router
    .route('/:id')
    .get(reviewsController.getSingleReview)
    .patch(reviewsController.updateReview)
    .delete(reviewsController.deleteReview);
    
router.post('/leave-review', authController.verifyAccess, reviewsController.leaveReview);

module.exports = router;