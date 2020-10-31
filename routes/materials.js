const express = require('express');
const materialsController = require('../controllers/materialsController');

const router = express.Router();

// TEXT MATERIALS
router
    .route('/text')
    .get(materialsController.getAllTextMaterials)
    .post(materialsController.createTextMaterial);
router
    .route('/text/:id')
    .get(materialsController.getSingleTextMaterial)
    .patch(materialsController.updateTextMaterial)
    .delete(materialsController.deleteTextMaterial);

// VIDEO MATERIALS
router
    .route('/video')
    .get(materialsController.getAllVideos)
    .post(materialsController.createVideo);
router
    .route('/video/:id')
    .get(materialsController.getSingleVideo)
    .patch(materialsController.updateVideo)
    .delete(materialsController.deleteVideo);

router.get('/video/:id/stream', materialsController.streamVideo);

// TEST MATERIALS
router
    .route('/tests')
    .get(materialsController.getAllTests)
    .post(materialsController.createTest);
router
    .route('/tests/:id')
    .get(materialsController.getSingleTest)
    .patch(materialsController.updateTest)
    .delete(materialsController.deleteTest);

module.exports = router;