const SlaveModel = require('../../models/SlaveModel')
const MasterModel = require('../../models/MasterModel')
const bcrypt = require('bcrypt')
var crypto = require("crypto");
const sendVerification = require('../../misc/mails/sendVerification')
const { validateOptions } = require('../../helpers/validateOptions')

const createUser = async (req, res) => {
    try {

        const valid = validateOptions(req.body.gender, req.body.password, req.body.location)

        if (!valid) return res.status(500).send({ err: "Something is not right!" });


        // User object
        const user = await new SlaveModel({
            fullName: req.body.fullName,
            email: req.body.email,
            userName: req.body.userName,
            gender: req.body.gender,
            studyLevel: req.body.studyLevel,
            dob: req.body.dob,
            location: req.body.location,
            canhelpWith: req.body.canhelpWith,
            password: bcrypt.hashSync(req.body.password, 10),

        })

        // Basic validations
        const email = await SlaveModel.find({ email: req.body.email })
        const userMasterEmail = await MasterModel.find({ email: req.body.email })

        const masterUsername  = await MasterModel.find({userName:req.body.userName})
        const userName = await SlaveModel.find({ userName: req.body.userName })
        console.log(userMasterEmail)
        if(userMasterEmail.length>0) return  res.status(401).send({ msg: "Email already exists", code: 401 })
        if (masterUsername.length > 0) return res.status(500).send({ msg: "Username is already taken", code: 500 });



        if (!email.length < 1) return res.status(401).send({ msg: "Email already exists", code: 401 });
        if (!userName.length < 1) return res.status(500).send({ msg: "Username already exists", code: 500 });


        if (!req.files) return res.status(500).send({ msg: "Please provide a Profile Picture", code: 500 })



        if (req.files) {
            const fileExtension = req.files.dp.mimetype.split("/")[1];


            if (!req.files.dp.mimetype.startsWith('image/'))
                return res.status(500).json({ message: 'Please choose an image', code: 500 });
            if (req.files.dp.size >= 1000000)
                return res.status(500).json({ message: 'File sized exceed 1 MB', code: 500 });

            const file = req.files.dp
            const { userName: userName, _id: _userId } = user;


            file.mv(`Images/${userName + '_dp_.' + fileExtension}`, async () => {
                await user.save(async (err) => {
                    if (err) {

                        res.status(500).send({ msg: "Something went wrong!", code: 500 })
                    }
                    else {
                        const veriCode = Math.floor(100000 + Math.random() * 900000);
                        var hash = crypto.randomBytes(30).toString('hex');
                        await SlaveModel.findByIdAndUpdate(_userId, {
                            profilePic: userName + '_dp_.' + fileExtension ,
                            tempCode: veriCode,
                            verifyHash:hash
                        })
                        
                        sendVerification('ghisingrishav@gmail.com', veriCode,hash,_userId,'s')
                        res.status(200).send({ msg: "Verification code send. Please check your mail ! It might take couple of minutes to reach to you!" })
                    }
                })


            })


        };


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Something went wrong!", code: 500 })
    }


}


module.exports = createUser





