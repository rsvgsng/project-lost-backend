const MasterModel = require('../../../models/MasterModel')

const codeVerify = async(req,res)=>{
    try {
        const {verifycode,id } =req.body;
   
        const {tempCode} = await MasterModel.findById(id);
        if(tempCode==verifycode){
   
            await MasterModel.findByIdAndUpdate(id,{
                emailVerified:true,
                verifyHash:null,
                tempCode:null
             })
    
            res.send({msg:"Account verified successfully!"})

        }else{
            res.status(400).send({msg:"Invalid code or account is verified already!"})
        }
       
    } catch (error) {
            res.status(500).send({msg:"Something went wrong!"})
    }



}

module.exports =codeVerify
