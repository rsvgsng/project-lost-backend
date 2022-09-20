require('dotenv').config()
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel')



const verify=async(req,res,next)=>{
    
    try {
        const headerToken = req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
        if(!headerToken)return res.send({msg:"No access token present on the header!"});

        const {id} = (jwt.verify(headerToken,process.env.JWTKEY))
        const userId = await UserModel.findById({_id:id});
        if(userId) return next()
        


    } catch (error) {
        res.status(500).send(" ??? 😳 🕶 🤏 ??? ")
  
    }   





}

module.exports = verify