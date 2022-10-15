const MasterModel = require('../../models/MasterModel')
const SlaveModel = require('../../models/SlaveModel')
const bcrypt = require('bcrypt')
var crypto = require("crypto");
const sendVerification = require('../../misc/mails/sendVerification')

const { validateOptions } = require('../../helpers/validateOptions');
const { categories } = require('../../misc/customOptions');

const createUser = async (req, res) => {
    try {
        const valid = validateOptions(req.body.gender, req.body.password, req.body.location)
        if (!valid) return res.status(500).send({ msg:"Something went wrong!" });
        // User object
        const user = await new MasterModel({
            fullName: req.body.fullName,
            email: req.body.email,
            userName: req.body.userName,
            gender: req.body.gender,
            studyLevel: req.body.studyLevel,
            location: req.body.location,
            password: bcrypt.hashSync(req.body.password, 10),

        })
            
        
        const helpWith = [];
        var error = false;

        const helpCat = req.body.wantshelpIn;
            console.log(helpCat)
        helpCat?.map(e => {
            if (!categories().includes(e.toUpperCase())) error = true
            console.log(e)
            helpWith.push(e)
        })

        if (error) return res.status(500).send({ msg: "Invalid Subject Category!" })
        // Checking Length of Names
        if (user.fullName.length < 3) return res.status(500).send({ msg: "Full Name is too short!" })

        // Checking existing email
        const email = await MasterModel.find({ email: req.body.email })
        const userSlaveEmail = await SlaveModel.find({ email: req.body.email })

        const userUserName = await SlaveModel.find({ userName: req.body.userName })
        const userNames = await MasterModel.find({ userName: req.body.userName })

        if (userSlaveEmail.length > 0) return res.status(500).send({ msg: "Email already taken", code: 500 })
        if (userUserName.length > 0) return res.status(500).send({ msg: "Username is already taken", code: 500 });


        if (!email.length < 1) return res.status(401).send({ msg: "Email already taken", code: 401 });

        if (!userNames.length < 1) return res.status(500).send({ msg: "Username already exists", code: 500 });
        const { _id: _userId } = user;

        await user.save(async (err) => {

            try {
                if (err) {
                    console.log(err)
                    res.status(500).send({ msg: "Something went wrong!", code: 500 })
                }
                else {
                    const veriCode = Math.floor(100000 + Math.random() * 900000);
                    var hash = crypto.randomBytes(30).toString('hex');
                    await MasterModel.findByIdAndUpdate(_userId, {
                        tempCode: veriCode,
                        verifyHash: hash,
                        wantshelpIn: req.body.wantshelpIn
                    })
                  sendVerification(req.body.email, veriCode, hash, _userId, 'm')
                   return res.status(200).send({ msg: "A link with verification has been sent to your email addderss.", code: 200 })
                }
            }
            catch (error) {
                res.status(500).send({ msg: "Something went wrong!", code: 500 })

            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Something went wrong!", code: 500 })
    }


}


module.exports = createUser


