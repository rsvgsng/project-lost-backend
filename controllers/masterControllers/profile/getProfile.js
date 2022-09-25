const masterModel = require('../../../models/MasterModel')



const getProfile =async(req,res)=>{
    
const {userName,profilePic,email,gender,wantshelpIn} = await masterModel.findById(req.uid)
res.send({
    userName:userName,
    dp:profilePic,
    email:email,
    gender:gender,
    intrested:wantshelpIn
})


}

const getRecent = ()=>{

}

module.exports = {
    getProfile,getRecent
}
