const { Schema, model } = require('mongoose')
const validator = require('validator')
// this model is for slave

const SlaveModel = new Schema({
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
    canhelpWith: [{
        type:String,
        required: true
    }],
    password: {
        type: String,
        required: true,
    },
    successRate: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        required: true
    },

    dob: {
        type: Number,
        required: true
    },

    creationDate: {
        type: Date,
        default: Date.now
    },

    workCount: {
        default: 0
    },
    taskdoneSofar: {
        type: Number,
        default: 0
    },
    taskfailedSofar: {
        type: Number,
        default: 0
    },
    totalLikes: {
        default: 0
    },
    totalDislikes: {
        default: 0
    },
    overallGrade: {
        default: 0
    },
    location: {
        required: true,
        type: String
    },
    studyLevel: {
        required: true,
        type: String
    },
    documents: [
        {
            docname: String,
            docuri: String
        }]

})


module.exports = model('workers', SlaveModel)





