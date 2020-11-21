const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Topic must have a reference to userId']
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Topic must have a reference to courseId']
    },
    title: {
        type: String,
        required: [true, 'Topic must have a title']
    },
    body: {
        type: String,
        required: [true, 'Topic must have a body']
    }
});

const Topic = mongoose.model('Topic', topicSchema);

module.exports = Topic;