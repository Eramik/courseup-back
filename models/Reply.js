const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Reply must have a reference to userId']
    },
    topicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Topic',
        required: [true, 'Reply must have a reference to topicId']
    },
    body: {
        type: String,
        required: [true, 'Reply must have a body']
    }
});

const Reply = mongoose.model('Reply', replySchema);

module.exports = Reply;