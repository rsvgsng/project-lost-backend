const SlaveModel = require('../../models/SlaveModel')
const MasterModel = require('../../models/MasterModel')
const bcrypt = require('bcrypt')
var crypto = require("crypto");
const sendVerification = require('../../misc/mails/sendVerification')
const { validateOptions } = require('../../helpers/validateOptions');
const AsyncHandler = require('express-async-handler');
const axios = require('axios').default;
var FormData = require('form-data');

const createUser = AsyncHandler(async (req, res) => {
    try {

        const valid = validateOptions(req.body.gender, req.body.password, req.body.location)
        if (!valid) return res.status(500).send({ err: "Something is not right!" });

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
        const email = await SlaveModel.find({ email: req.body.email })
        const userMasterEmail = await MasterModel.find({ email: req.body.email })

        const masterUsername = await MasterModel.find({ userName: req.body.userName })
        const userName = await SlaveModel.find({ userName: req.body.userName })
        console.log(userMasterEmail)
        if (userMasterEmail.length > 0) return res.status(401).send({ msg: "Email already exists", code: 401 })
        if (masterUsername.length > 0) return res.status(500).send({ msg: "Username is already taken", code: 500 });


        if (!email.length < 1) return res.status(401).send({ msg: "Email already exists", code: 401 });
        if (!userName.length < 1) return res.status(500).send({ msg: "Username already exists", code: 500 });


        // if (!req.files) return res.status(500).send({ msg: "Please provide a Profile Picture", code: 500 })



        await user.save(async (err) => {
            if (err) {
                res.send(err)
                // res.status(500).send({ msg: "Something went wrong!", code: 500 })
            }
            else {
                const { userName: userName, _id: _userId } = user;
                const veriCode = Math.floor(100000 + Math.random() * 900000);
                var hash = crypto.randomBytes(30).toString('hex');
                await SlaveModel.findByIdAndUpdate(_userId, {
                    // profilePic: userName + '_dp_.' + fileExtension ,
                    tempCode: veriCode,
                    verifyHash: hash
                })

                sendVerification('ghisingrishav@gmail.com', veriCode, hash, _userId, 's')
                console.log(`http://localhost:8000/api/v1/verify/email/${'w'}/${hash}&${_userId}`)
                res.status(200).send({ msg: "Verification code send. Please check your mail ! It might take couple of minutes to reach to you!" })
            }
        })


        // if (req.files) {
        //     const fileExtension = req.files.dp.mimetype.split("/")[1];


        //     if (!req.files.dp.mimetype.startsWith('image/'))
        //         return res.status(500).json({ message: 'Please choose an image', code: 500 });
        //     if (req.files.dp.size >= 1000000)
        //         return res.status(500).json({ message: 'File sized exceed 1 MB', code: 500 });

        //     const file = req.files.dp
        //     const { userName: userName, _id: _userId } = user;


        // file.mv(`Images/${userName + '_dp_.' + fileExtension}`, async () => {

        // })


        // };

    } catch (error) {

        res.status(500).send({ msg: "Something went wrong!", code: 500 })
    }


})




const stepTwoSignup = AsyncHandler(async (req, res) => {
    const { about, canhelpWith, studyLevel, documents } = req.body;
    if (!about, !studyLevel) return res.status(400).send({ msg: "Please fill all the necessary fields." })
    await SlaveModel.findById(req.uid).then(async e => {
        if (e.veryStep == 'none') return res.status(400).send({ msg: "You have already completed this step.", code: 400 });
        // changing the documents into arrasys


        if(!req.files) return res.status(400).send({ msg: "Please provide all the necessary documents.", code: 400 });

        if (req.files) {
            var fileStore = []; 
            console.log(req.files.file) 
                

            // var form = new FormData();

            // form.append("file",req.files.documents.data)

            


            // fileLength = (req.files.documents.length == undefined ? 1 : req.files.documents.length)

            // if (fileLength > 1) {

            //     for (i = 0; i < fileLength; i++) {
                    
            //         console.log(req.files.documents[i].name)

            //     }

            // }
            // else {
            //     console.log(req.files.documents.name)
            // }


        }

        // console.log(documents.split(","))



        // await SlaveModel.findByIdAndUpdate(req.uid, {
        //     $set: {
        //         about: about,
        //         canhelpWith: ['maths', 'Science', "Physics"],
        //         studyLevel: studyLevel,
        //         documents: [{
        //             docUri: "pornhub.com/geda.zip"
        //         }]

        //     }
        // }).then(e => res.status(200).send({ msg: "Profile updated successfully!" }))

    })




})
module.exports = { createUser, stepTwoSignup }





