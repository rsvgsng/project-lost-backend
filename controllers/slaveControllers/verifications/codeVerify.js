const SlaveModel = require('../../../models/SlaveModel')



const codeVerify = async(req,res)=>{
    try {
        const {verifycode,id } =req.body;
   
        const {tempCode} = await SlaveModel.findById(id);
        if(tempCode==verifycode){
   
            await SlaveModel.findByIdAndUpdate(id,{
                emailVerified:true,
                verifyHash:null,
                tempCode:null,
                veryStep:"second"
             })
    
            res.send({msg:"Account verified successfully!",step:"second"})

        }else{
            
            res.status(400).send({msg:"Invalid code or account is verified already!",token:jwt.sign({id:id},process.env.JWTKEY)})
        }
       
    } catch (error) {
 
            res.status(500).send({msg:"Something went wrong!"})
    }



}

module.exports =codeVerify
