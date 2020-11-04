const mongoose = require('mongoose');
const { Schema } = mongoose;
const userSchema = new Schema({
    username:{
        type: String,
        required: [true, 'User must have username']
}, 
    email:{
        type: String,
        required: [true, 'User must have email']
},
    password:{
        type: String,
        required: [true, 'User must have password']
}
})
const User = mongoose.model('User', userSchema);

module.exports = User;