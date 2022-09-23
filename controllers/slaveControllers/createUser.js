const SlaveModel = require('../../models/SlaveModel')
const bcrypt = require('bcrypt')
const { validateOptions } = require('../../helpers/validateOptions')

const createUser = async (req, res) => {
      try {
       
        const valid = validateOptions( req.body.gender, req.body.password, req.body.location)

        if(!valid) return res.status(500).send({err:"Something is not right!"});


            // User object
            const user = await new SlaveModel({
                fullName: req.body.fullName,
                email: req.body.email,
                userName:req.body.userName,
                gender: req.body.gender,
                studyLevel:req.body.studyLevel,
                dob: req.body.dob,
                location: req.body.location,
                canhelpWith:req.body.canhelpWith,
                password: bcrypt.hashSync(req.body.password, 10)
            })

            // Checking existing email
            const email = await SlaveModel.find({email:req.body.email})
            const userName = await SlaveModel.find({userName:req.body.userName})
            
            
            if(!email.length<1) return res.status(401).send({msg:"Email already exists"});
            if(!userName.length<1) return res.status(401).send({msg:"Username already exists"});
            

            if (!req.files) return res.status(500).send({msg:"Please provide a Profile Picture"})
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
                            console.log(err)
                            res.status(500).send({msg:"Something went wrong!"})}
                            else{
                             await   SlaveModel.findByIdAndUpdate(_userId, {
                                    profilePic: _userId + file.name
                                    
                                })
                                res.send("ok")
                            }
                    })
                 
                    
              
                                                       
                })


            };
            

        }catch (error) {
            console.log(error)
            res.status(500).send({msg:"Something went wrong!"})
        }

    
    }


module.exports = createUser





