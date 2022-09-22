const { Schema, model } = require('mongoose')
const validator = require('validator')
// this model is for master

const MasterModel = new Schema({
    fullName: {
        type: String,
        required: true,
    },

    profilePic: {
        type: String,
        default: 'default.jpg'

    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 60,
        validate: [validator.isEmail, "Enter valid Email"]

    },
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },

    creationDate: {
        type: Date,
        default: Date.now
    },

})


module.exports = model('masters', MasterModel)





