const SlaveModel = require('../../../models/SlaveModel')
const jwt =require('jsonwebtoken')

const emailVerify = async (req, res) => {
    const hash = req.params.hash.split("&");
    const hashToken = hash[0]
    const userID = hash[1]


    try {

        user = await SlaveModel.find({ _id: userID.trim() })

        const validHash = user[0].verifyHash == hashToken
        //    Check if the hash matches

        if(!validHash)return res.status(500).send("Link is either expired or invalid");

         await SlaveModel.findOneAndUpdate({ _id: userID.trim() },{
            emailVerified:true,
            verifyHash:null,
            tempCode:null,
            veryStep:"second"
         })

         res.redirect('http://localhost:3000/login/expert?success=true')

    }
    catch (error) {
        console.log(error)
        res.send("Link is either expired or invalid");

    }


}



module.exports = emailVerify