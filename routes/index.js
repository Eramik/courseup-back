const express = require('express');
const coursesRouter = require('./courses');
const materialsRouter = require('./materials');

const router = express.Router();

router.use('/courses', coursesRouter);
router.use('/materials', materialsRouter);

module.exports = router;
