const {Schema, model} = require('mongoose')
const validator = require('validator')


const UserModel = new Schema({
        fullName:{
            type:String,
            required:true,
         
        },
        profilePic:{
            type:String,
            default:'default.jpg'
            
        },
        email:{
            type:String,
            required:true,
            unique:true,
            maxlength:60,
            validate:[validator.isEmail,"Enter valid Email"]

        },
        password:{
            type:String,
            required:true,
        },
        gender:{
            type:String,
            required:true
        }
        ,
        accountType:{
            type:String,
            required:true
        },
        dob:{
            type:Number,
            required:true
        },
        creationDate:{
            type: Date, 
            default:Date.now
        },
        workCount:{
            default:0
        },
        totalLikes:{
            default:0
        },
        totalDislikes:{
            default:0
        },
        overallScore:{
            default:0
        },
        location:{
            required:true,
            type:String
        },

})


module.exports = model('users', UserModel)





