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
        type: String
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
    canhelpWith: [{
        type: String,
        required: true
    }],
    successRate: {
        type: Number,
        default: 0
    },
    gender: {
        type: String,
        required: true
    },
    veryStep:{
        type:String,
        default:"first"
    
    },
    dob: {
        type: Date

    },
    about:{
        type:String
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

        documents: [
            {
                docUri: String
            }
        ]



})


module.exports = model('workers', SlaveModel)





