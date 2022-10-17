const SlaveModel = require('../../models/SlaveModel')
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const loginUser = async (req, res) => {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).sendStatus(400);
        }
        const { email, password } = req.body;

        d = await SlaveModel.find({ email: email })
        if (d.length < 1) return res.send({ msg: "Email or password wrong" })

        logincheck = d[0].email == email && bcrypt.compareSync(password, d[0].password)
        if (!logincheck) return res.send({ msg: "Email or password wrong" })


        res.send({
            code: 200,
            token: jwt.sign({ id: d[0]._id },process.env.JWTKEY),
            ds:d[0].documentSubmitted
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({ msg: "Something went wrong" })
    }
}

module.exports = loginUser
