const { Schema, model } = require('mongoose')
const validator = require('validator')
// this model is for master

const MasterModel = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    userName:{
        type:String,
        unique:true,
        required:true
    }    ,
    email: {
        type: String,
        required: true,
        unique: true,
        maxlength: 60,
        validate: [validator.isEmail, "Enter valid Email"]
    },
    wantshelpIn:[{
        type:String,
        required:true
    }],
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    balance:{
        type:Number,
        default:0
    },
    taskgivenSofar:{
        type:Number,

    },
    location:{
        required:true,
        type:String
    },
    creationDate: {
        type: Date,
        default: Date.now
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


})


module.exports = model('masters', MasterModel)





