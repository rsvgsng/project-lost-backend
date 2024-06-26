const SlaveModel = require('../../models/SlaveModel')
const fs = require('fs');
const MasterModel = require('../../models/MasterModel')
const bcrypt = require('bcrypt')
var crypto = require("crypto");
const sendVerification = require('../../misc/mails/sendVerification')
const { validCountry,gendertypeOptions,categories } =require( '../../misc/customOptions');
const AsyncHandler = require('express-async-handler');

const { randomString } = require('../../misc/genRandomIDs');
const createUser = AsyncHandler(async (req, res) => {
    try {






        
 
        // User object

        const user = await new SlaveModel({
            fullName: req.body.fullName,
            email: req.body.email,
            userName: req.body.userName,
            gender: req.body.gender,
            location: req.body.location,
            password: bcrypt.hashSync(req.body.password, 10),

        })

        // Basic validations
        if(await validCountry(req.body.location)===false)return res.status(400).send({msg:"Invalid Country!",code:400})
        if(!gendertypeOptions().includes(req.body.gender.toUpperCase())) return res.status(500).send({ msg: "Gender is invalid!" });
       

        if(req.body.fullName.length < 3) return res.status(500).send({ msg: "Full name is too short!" });
        if(req.body.userName.length < 3) return res.status(500).send({ msg: "Username is too short!" });

        const email = await SlaveModel.find({ email: req.body.email })
        const userMasterEmail = await MasterModel.find({ email: req.body.email })

        const masterUsername = await MasterModel.find({ userName: req.body.userName })
        const userName = await SlaveModel.find({ userName: req.body.userName })
       
        if (userMasterEmail.length > 0) return res.status(500).send({ msg: "Email already exists", code: 500 })
        if (masterUsername.length > 0) return res.status(500).send({ msg: "Username is already taken", code: 500 });


        if (!email.length < 1) return res.status(500).send({ msg: "Email already exists", code:500 });
        if (!userName.length < 1) return res.status(500).send({ msg: "Username already exists", code: 500 });



        await user.save(async (err) => {
            
            if (err) {
                console.log(err )

                res.status(500).send({ msg: "Something went wrong!", code: 500 })
            }
            else {
                const { userName: userName, _id: _userId } = user;
                const veriCode = Math.floor(100000 + Math.random() * 900000);
                var hash = crypto.randomBytes(30).toString('hex');
                await SlaveModel.findByIdAndUpdate(_userId, {
                    tempCode: veriCode,
                    verifyHash: hash
                })

             await   sendVerification('ghisingrishav@gmail.com', veriCode, hash, _userId, 's')
                console.log(`http://localhost:8000/api/v1/verify/email/${'w'}/${hash}&${_userId}`)
                SlaveModel.findOneAndDelete({ _id: _userId })
                res.status(200).send({code:200  })
            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Something went wrong!", code: 500 })
    }


})




const stepTwoSignup = AsyncHandler(async (req, res) => {
    try {
        // Basic validations
        if(!req.body.about) return res.status(400).send({ msg: "Please fill all the necessary fields." })
        if(!req.body.studyLevel) return res.status(400).send({ msg: "Please fill all the necessary fields." })
        if(!req.body.canHelpWith) return res.status(400).send({ msg: "Please fill all the necessary fieldsss." })
        if(!req.body.howHelp) return res.status(400).send({ msg: "Please fill all the necessary fields." })

        // Profile Picture
        if(!req.files.profile) return res.status(400).send({msg: "Profile picture is needed."})
        if(req.files.profile.length>1) return res.status(400).send({msg: "Please upload a single Image as profile picture."})
        if(!req.files.profile.mimetype.startsWith('image/')) return res.status(400).send({ msg: "Please provide a valid image as profile picture." }) 
        if(req.files.profile.size >= process.env.MAX_UPLOAD) return res.status(400).send({ msg: `Max file size is ${process.env.MAX_UPLOAD/1000000} MB` })
        if(!req.files.documents) return res.status(400).send({msg: "Please upload your documents."})




    if (await categories( req.body.canHelpWith.split(','))===false) return res.status(400).json({msg:'Invalid category'})


        await SlaveModel.findById(req.uid).then(async e => {

        //Documents upload validation 
        var fileErrors = [];
        var documentsArray = [];

        fileLength = (req.files.documents.length == undefined ? 1 : req.files.documents.length)
        if(fileLength<process.env.MIN_FILE_UPLOAD ) return res.status(400).send({ msg: `Please provide atlest ${process.env.MIN_FILE_UPLOAD} valid documents.` })
        if(fileLength>process.env.MAX_FILE_UPLOAD ) return res.status(400).send({ msg: `Max is ${process.env.MAX_FILE_UPLOAD} document allowed!` })

        // creating folder for user uploads 
 

        // creating array of files and errors  
        if (fileLength > 1 ) {
            
            for (i = 0; i < fileLength; i++) {
                if(!req.files.documents[i].mimetype.startsWith('image/')) fileErrors.push({msg: `${req.files.documents[i].name} is not an image` }) 
                if(req.files.documents[i].size >= process.env.MAX_UPLOAD) fileErrors.push({msg: `${req.files.documents[i].name} size exceeded ${Math.round(process.env.MAX_UPLOAD/1024/1000)} MB.` })

            }

            if(fileErrors.length>0) return res.status(400).send({ errors: fileErrors ,code:403});
            fs.mkdirSync(`files/userProfiles/${req.email}/documents`, { recursive: true });

            

            for (i = 0; i < fileLength; i++) {
                const extension = req.files.documents[i].mimetype.split("/")[1];
                const randomName =  randomString(7)
                req.files.documents[i].mv(`files/userProfiles/${req.email}/documents/${randomName+'.'+extension}`)
                documentsArray.push( { docName:randomName, docExtension: extension,docSize:req.files.documents[i].size})

                }
                
        }
        
        // Moving Profile Picture to folder

        req.files.profile.mv(`files/userProfiles/${req.email}/${'profile.' + req.files.profile.mimetype.split("/")[1]}`)



        // Updating user profile in data base finally 

        await SlaveModel.findByIdAndUpdate(req.uid, {
            $set: {
                about: req.body.about,
                canhelpWith: helpWith,
                studyLevel: req.body.studyLevel,
                documents: documentsArray,
                documentSubmitted:true,
                howHelp: req.body.howHelp,
                profilePic:`${'profile.' + req.files.profile.mimetype.split("/")[1]}`

            }
        }).then(e => res.status(200).send({ msg: "Account Updated successfully ! Please wait until we check your details" ,code:200}))



    })





    } 
    
    
    catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Something went wrong!", code: 500 })
    }









})




    
module.exports = { createUser, stepTwoSignup }





