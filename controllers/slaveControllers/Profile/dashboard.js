const dashboard =(req,res)=>{
    res.send({msg:"Welcome to dashboard " + req.uid,code:200})
}

module.exports = dashboard