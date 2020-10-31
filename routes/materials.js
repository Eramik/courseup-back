const express = require('express');
const TextMaterial = require('../models/TextMaterial');
const controllerFactory = require('../controllers/controllersFactory');
const videosController = require('../controllers/videosController');

const router = express.Router();

// TEXT MATERIALS
router
    .route('/text')
    .get(controllerFactory.getAll(TextMaterial))
    .post(controllerFactory.createOne(TextMaterial));
router
    .route('/text/:id')
    .patch(controllerFactory.updateOne(TextMaterial))
    .delete(controllerFactory.deleteOne(TextMaterial));

// VIDEO MATERIALS
router
    .route('/video')
    .get(videosController.getAllVideos)
    .post(videosController.createVideo);
router
    .route('/video/:id')
    .get(videosController.getSingleVideo)
    .patch(videosController.updateVideo)
    .delete(videosController.deleteVideo);

router.get('/video/:id/stream', videosController.streamVideo);

module.exports = router;