const { Schema, model } = require('mongoose')
// Here we store all subjects that are available for the user to choose from

const publicInfo = new Schema({
    id:{
        type:Number,
        default:1
    },
    subs:{
        type:Array,
        default:[]   
    },
    countries:{
        type:Array,
        default:[]

    },
    educations:{
        type:Array,
        default:[]
        
    }



})


module.exports = model('publicInfo', publicInfo)





