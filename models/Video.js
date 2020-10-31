const mongoose = require('mongoose');
const Course = require('./Course');
const { Schema } = mongoose;

const videoMaterialSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Video must reference a course']
    },
    path: {
        type: String,
        required: [true, 'Video must specify a path to video']
    }
});

videoMaterialSchema.post('save', async function(doc, next) {
    const referencedCouse = await Course.findById(doc.courseId);

    referencedCouse.materials.videos.push(doc._id);
    referencedCouse.markModified('materials');
    await referencedCouse.save();

    next();
});

const Video = mongoose.model('Video', videoMaterialSchema);

module.exports = Video;