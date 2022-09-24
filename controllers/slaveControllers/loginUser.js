const SlaveModel = require('../../models/SlaveModel')
const {validationResult } = require('express-validator');
const bcrypt  = require('bcrypt')
const jwt =require('jsonwebtoken')

const loginUser =async(req,res)=>{

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).sendStatus(400);
        }

        const email = req.body.email;
        const password = req.body.password;
        const login = await SlaveModel.find({email:email})
        console.log(login)
       if(!login[0].emailVerified)return res.status(404).send({err:"Please verify your email to continue!",success:false})
        if(!login.length<1){
            const hashedPass = login[0].password;

            if(bcrypt.compareSync(password,hashedPass)){
                const ID = login;
                const jwttoken = jwt.sign({id:ID[0]._id},process.env.JWTKEY)
       
                res.send({msg:"Login Successful!",success:true,token:jwttoken})

            }else{
                res.status(404).send({msg:"Incorrect password",success:false})
            } 
            
        }else{
            res.status(404).send({err:"No user found with that email!",success:false})
        }

    } catch (error) {
        res.status(400).send({msg:"Something went wrong the database is empty!"})
    }
}

module.exports = loginUser
