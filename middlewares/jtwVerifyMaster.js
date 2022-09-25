require('dotenv').config()
const jwt = require('jsonwebtoken');
const MasterModel = require('../models/MasterModel')



const verify=async(req,res,next)=>{
    
    try {
        const headerToken = req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
        if(!headerToken)return res.send({msg:"No access token present on the header! "});
        
        const {id} = (jwt.verify(headerToken,process.env.JWTKEY))
        
        const userId = await MasterModel.findById({_id:id});
        
        if(!userId.emailVerified)return res.status(500).send({msg:"Email not verified!",code:500})
        
        req.uid =  userId._id;
        req.email =  userId.email;
        next()
        
    } catch (error) {
        res.status(500).send({msg:"Something went wrong or Invalid JWT"})

    }   





}

module.exports = verify