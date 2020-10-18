const mongoose = require('mongoose');
const Course = require('./Course');
const { Schema } = mongoose;

const textMaterialSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Text material must reference a course']
    },
    text: {
        type: String,
        required: [true, 'Text material must contain some reading text']
    }
});

textMaterialSchema.post('save', async function(doc, next) {
    const referencedCourse = await Course.findById(doc.courseId);

    referencedCourse.materials.texts.push(doc._id);
    referencedCourse.markModified('materials');
    await referencedCourse.save();

    next();
});

const TextMaterial = mongoose.model('TextMaterial', textMaterialSchema);

module.exports = TextMaterial;