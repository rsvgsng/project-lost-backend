const { Schema, model } = require('mongoose')

const validator = require('validator')
// this model is for slave

const SlaveModel = new Schema({
    fullName: {
        type: String,
        required: true,

    },
    userName: {
        type: String,
        unique: true,
        required: true,
        minlength: 5
    },
    profilePic: {
        type: String,
        default: 'default.jpg',
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 60,
        validate: [validator.isEmail, "Enter valid Email"]

    },
    canhelpWith: [{
        type: String,
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
    veryStep:{
        type:Number,
        default:0,
        max:3
    },
    dob: {
        type: Date

    },
    balance:{
        type:Number,
        default:0
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
     
        type: String
    },
    emailVerified:{
        type:Boolean,
        default:false
    }
    ,
    verifyHash:{
        type:String,
        default:null
    },
    tempCode:{
        code :Number
    },
    documents: {

        submitted: {
            type:Boolean,
            default:false
        },
        documents: [
            {
                docname: String,
                docuri: String
            }
        ]
    }


})


module.exports = model('workers', SlaveModel)





