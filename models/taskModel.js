const {Schema, model, Mongoose} = require('mongoose')

const taskModel = new Schema({
    createdBy:{
        type:String,
        required:true
    },
    deadLine:{
        type:Date,
        required:true
    },
    title:{
        type:String,
        required:true,

    },
    category:[
            {
                type:String,
           
            }
    ],
    des:{
        type:String,
        required:true
    },
    taskViews:{
        type:Number,
        default:0
    },
    taskID:{
        type:String,
        required:true,
        unique:true
    },
    creatorEmail:{
        type:String,
        default:"null@null.com"
    },
    createdOn:{
        type:Date,
        default:Date.now
    },
    taskFiles:[{fileName:String,extension:String}]

})



module.exports = model('Tasks', taskModel)





