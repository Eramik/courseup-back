const express = require('express');
const coursesRouter = require('./courses');
const materialsRouter = require('./materials');
const userRouter = require('./users');
const reviewsRouter = require('./reviews');

const router = express.Router();

router.use('/courses', coursesRouter);
router.use('/materials', materialsRouter);
router.use('/users', userRouter);
router.use('/reviews', reviewsRouter);

module.exports = router;
