require('dotenv').config()
const jwt = require('jsonwebtoken');
const SlaveModel = require('../models/SlaveModel')




const verifyEmail =async(req,res,next)=>{
    try{
        await SlaveModel.find({email:req.body.email}).then(e=>{
            if(!e[0].emailVerified)return res.status(500).send({msg:"Email not verified!",code:500})
            next()
             })
    }
    catch{
     return   res.status(500).send({msg:"Error on the serevr side"})

    }   
}

const verifyJWT=async(req,res,next)=>{
    
    try {
        const headerToken = req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
        if(!headerToken)return res.send({msg:"No access token present on the header! "});
        const {id} = (jwt.verify(headerToken,process.env.JWTKEY))
        const userId = await SlaveModel.findById({_id:id});
        req.uid =  userId._id;
        req.email =  userId.email;
        
        if(userId) return next()
        
    } catch (error) {
        res.status(401).send({msg:"Opps you are unauthorized.",code:401})
    }   

}


const hasDocumentsSubmitted =async(req,res,next)=>{
    try {
        SlaveModel.findById(req.uid).then(e=>{
            if(e.documentSubmitted===true)return res.status(403).send({msg:"Documents already submitted!"})
            next()
        })
            } catch (error) {
                res.status(500).send({msg:"Something went wrong or Invalid JWT"})
            }
}

const verifyDocs =async(req,res,next)=>{
        try {
    SlaveModel.findById(req.uid).then(e=>{
        if(e.documentSubmitted===false)return res.status(403).send({msg:"Please submit documents to continue further!",code:403})
        if(e.adminVerified===false)return res.status(403).send({msg:"Your documents are under review!",code:403})
        next()
    })
        } catch (error) {
            res.status(500).send({msg:"Something went wrong or Invalid JWT"})
        }
}

module.exports = {verifyJWT ,verifyDocs,verifyEmail,hasDocumentsSubmitted}