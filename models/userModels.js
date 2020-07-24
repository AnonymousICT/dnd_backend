const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    _id: {type: mongoose.Schema.Types.ObjectId},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minlength: 5},
    displayName: {type: String},

})

module.exports = User = mongoose.model('User', userSchema);