const {testSchema} = require('./Test')
const Test = require('./Test')

test('Should return test', ()=>{
expect(Test.model('Test', testSchema)).not.toBeNull();
})