const express = require('express');
const TextMaterial = require('../models/TextMaterial');

const router = express.Router();

router.route('/text')
    .get(async (req, res, next) => {
        const textMaterials = await TextMaterial.find();

        res.status(200).json({
            status: 'success',
            data: {
                textMaterials
            }
        });
    })
    .post(async (req, res, next) => {
        const result = await TextMaterial.create(req.body);

        res.status(200).json({
            status: 'success',
            message: 'text material created successfully',
            data: {
                result
            }
        });
    });

module.exports = router;