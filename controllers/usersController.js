const User = require('../models/User');
const sendError = require('../utils/sendError');

exports.enrollCourse = async (req, res) => {
    const { user: currentUser } = req;
    const { courseId } = req.body;

    if (!currentUser) {
        return sendError(401, 'You are not authorized to perform this action', res);
    }

    if (!courseId) {
        return sendError(401, 'You haven\'t provided a course id', res);
    }

    let userDBRecord;

    try {
        userDBRecord = await User.findById(currentUser._id);
        userDBRecord.enrolledCourses.push(courseId);

        userDBRecord.markModified('enrolledCourses');
        await userDBRecord.save();
    } catch (e) {
        return sendError(400, e.message, res);
    }

    return res.status(200).json({
        status: 'success',
        message: 'Succesfully enrolled course',
    });
};