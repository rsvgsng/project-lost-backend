const MasterModel = require('../../models/MasterModel')
const SlaveModel = require('../../models/SlaveModel')
const bcrypt = require('bcrypt')
var crypto = require("crypto");

const sendVerification = require('../../misc/mails/sendVerification')

const { validCountry,gendertypeOptions,categories } =require( '../../misc/customOptions');
const publics = require('../../models/Public');

const createUser = async (req, res) => {
    try {

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

        
        
        //  // Basic validations
        
        
        if(req.body.fullName.length < 3) return res.status(500).send({ msg: "Full name is too short!" });
        if(req.body.userName.length < 3) return res.status(500).send({ msg: "Username is too short!" });
        if(!gendertypeOptions().includes(req.body.gender.toUpperCase())) return res.status(500).send({ msg: "Gender is invalid!" });
        
        if( await validCountry(req.body.location) === false) return res.status(500).send({ msg: "Invalid Country!" });
        if (await categories(req.body.wantshelpIn)===false) return res.status(400).json({msg:'Invalid category'})

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
                    var hash = crypto.randomBytes(30).toString('hex');
                    await MasterModel.findByIdAndUpdate(_userId, {  
                        verifyHash: hash,
                        wantshelpIn: req.body.wantshelpIn
                    })
                  sendVerification(req.body.email, hash, _userId, 'm')
                   return res.status(200).send({ code: 200 })
                }
            }
            catch (error) {
                console.log(error)
                res.status(500).send({ msg: "Something went wrong!", code: 500 })

            }
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Something went wrong!", code: 500 })
    }


}


module.exports = createUser


