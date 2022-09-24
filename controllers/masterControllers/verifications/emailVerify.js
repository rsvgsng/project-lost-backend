const MasterModel = require('../../../models/MasterModel')

const emailVerify = async (req, res) => {
    const hash = req.params.hash.split("&");
    const hashToken = hash[0]
    const userID = hash[1]


    try {

        user = await MasterModel.find({ _id: userID.trim() })
        const validHash = user[0].verifyHash == hashToken
        if(!validHash)return res.status(500).send("Link is either expired or invalid");

         await MasterModel.findOneAndUpdate({ _id: userID.trim() },{
            emailVerified:true,
            verifyHash:null,
            tempCode:null
         })

         res.send("Account verified successfully")
    }
    catch (error) {
       
        res.send("Link is either expired or invalid");

    }


}



module.exports = emailVerify