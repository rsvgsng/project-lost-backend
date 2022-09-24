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
    wantshelpIn:[{
        type:String
    }],
    password: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true
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
    }, emailVerified:{
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

})


module.exports = model('masters', MasterModel)





