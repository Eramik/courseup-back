const Video = require('../models/Video');
const path = require('./videosController')
test('Should return head', ()=>{
    expect (Video.path).toBeDefined()
})