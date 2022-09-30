const taskModel = require("../models/taskModel")


const validateTaskOwner = async(taskID,userID)=>{
    try {
        a =   await taskModel.findById(taskID)

        if(userID!=a.createdBy) return []
        
        if(a) return [a];

    } catch (error) {   
   
        return []
    }


}


module.exports = validateTaskOwner