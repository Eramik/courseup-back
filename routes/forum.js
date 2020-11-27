const express = require('express');
const forumController = require('../controllers/forumController');
const authController = require('../controllers/authController');

const router = express.Router();

router
    .route('/topic')
    .get(forumController.getAllTopics)
    .post(authController.verifyAccess, forumController.addTopic);
router
    .route('/topic/:id')
    .get(forumController.getSingleTopic)
    .patch(forumController.updateTopic)
    .delete(forumController.deleteTopic);

router
    .route('/reply')
    .get(forumController.getAllReplies)
    .post(authController.verifyAccess, forumController.addReply);
router
    .route('/reply/:id')
    .get(forumController.getSingleReply)
    .patch(forumController.updateReply)
    .delete(forumController.deleteReply);

module.exports = router;