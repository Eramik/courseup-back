const TextMaterial = require('./TextMaterial');
const { textMaterialSchema } = require('./TextMaterial')
test('Should return text', ()=>{
    expect(TextMaterial.model('TextMaterial', textMaterialSchema)).not.toBeNull()
})