const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const { validateOptions } = require('../helpers/validateOptions')

const createUser = async (req, res) => {
      try {
       
        const valid = validateOptions(req.body.accountType, req.body.gender, req.body.password, req.body.location)

        if(!valid) return res.status(500).send({err:"Something is not right!"});


            // User object
            const user = await new UserModel({
                fullName: req.body.fullName,
                email: req.body.email,
                gender: req.body.gender,
                accountType: req.body.accountType,
                dob: req.body.dob,
                location: req.body.location,
                password: bcrypt.hashSync(req.body.password, 10)
            })


            // Uploading DP logic
            
            // Checking existing email
            const email = await UserModel.find({email:req.body.email})
            if(!email.length<1) return res.status(401).send({msg:"Email already exists"});


            if (req.files) {
                
                if (!req.files.dp.mimetype.startsWith('image/')) 
                return res.status(500).json({ message: 'Please choose an image' });
                if(req.files.dp.size>=1000000) 
                return res.status(500).json({ message: 'File sized exceed 1 MB' });

                const file = req.files.dp
                const { _id: _userId } = user;
                 

                file.mv(`Images/${_userId + file.name}`, async () => {

                    await user.save(async(err)=>{
                        if(err)
                        {
                            res.status(500).send({msg:"Something went wrong!"})}
                            else{
                             await   UserModel.findByIdAndUpdate(_userId, {
                                    profilePic: _userId + file.name
                                    
                                })
                                res.send("ok")
                            }
                    })
                 
                    
              
                                                       
                })


            };
            

            if(!req.files){
                await user.save((err)=>{
                    if(err)
                    {
                        res.status(500).send({msg:"Something went wrong!"})}
                        else{
                            res.send("ok")
                        }
                })
                
                
            }
    


        }catch (error) {
          
            res.status(500).send({msg:"Something went wrong!"})
        }

    
    }


module.exports = createUser





