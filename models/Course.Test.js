const Course = require('./Course');
const { courseSchema } = require('./Course');

test('Should return Course', () => {
    expect(Course.model('Course', courseSchema)).not.toBeNull()
})