const Video = require('./Video')
const { videoMaterialSchema } = require('./Video')
test('Should return video material', ()=>{
    expect(Video.model('Video Material', videoMaterialSchema)).not.toBeNull()
})