const express = require('express');
const coursesRouter = require('./courses');

const router = express.Router();

router.use('/courses', coursesRouter);

module.exports = router;
