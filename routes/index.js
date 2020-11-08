const express = require('express');
const coursesRouter = require('./courses');
const materialsRouter = require('./materials');
const userRouter = require('./users');

const router = express.Router();

router.use('/courses', coursesRouter);
router.use('/materials', materialsRouter);
router.use('/users', userRouter);

module.exports = router;
