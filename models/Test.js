const mongoose = require('mongoose');
const Course = require('./Course');
const { Schema } = mongoose;

const testSchema = new Schema({
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course',
        required: [true, 'Test must reference a course']
    },
    questions: [
        {
            question: {
                type: String,
                required: [true, 'Question should provide info about itself']
            },
            answer: {
                type: Schema.Types.Mixed,
                required: [true, 'Question must have an answer']
            },
            type: {
                type: String,
                required: [true, 'Question must have a type'],
                enum: ['checkbox', 'radio', 'input']
            },
            variants: [String]
        }
    ]
});

testSchema.post('save', async function (doc, next) {
    const referencedCouse = await Course.findById(doc.courseId);

    referencedCouse.materials.tests.push(doc._id);
    referencedCouse.markModified('materials');
    await referencedCouse.save();

    next();
});

const Test = mongoose.model('Test', testSchema);

module.exports = Test;
