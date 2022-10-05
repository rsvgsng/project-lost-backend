require('dotenv').config()
const jwt = require('jsonwebtoken');
const SlaveModel = require('../models/SlaveModel')



const verify=async(req,res,next)=>{
    
    try {
        const headerToken = req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
        if(!headerToken)return res.send({msg:"No access token present on the header! "});
        
        const {id} = (jwt.verify(headerToken,process.env.JWTKEY))

        const userId = await SlaveModel.findById({_id:id});

        if(!userId.emailVerified)return res.status(500).send({msg:"Email not verified!",code:500})
        req.uid =  userId._id;
        req.email =  userId.email;
        
        if(userId) return next()
        
    } catch (error) {
        res.status(500).send({msg:"Something went wrong or Invalid JWT"})
  
    }   





}

const verifyStep =async(req,res,next)=>{
        
        try {

    SlaveModel.findById(req.uid).then(e=>{
        if(e.veryStep==='step1')return res.status(500).send({msg:"You are not allowed to access this route!",code:500})
        next()
    })
     
            
        } catch (error) {
            res.status(500).send({msg:"Something went wrong or Invalid JWT"})
    
        }


}

module.exports = {verify    ,verifyStep}