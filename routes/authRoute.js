// This file contains all the routes related to authentication
const route = require('express').Router()
const { body, validationResult } = require('express-validator');
const createUser = require('../controllers/slaveControllers/createUser');
const loginUser = require('../controllers/slaveControllers/loginUser');
const codeVerify = require('../controllers/slaveControllers/verifications/codeVerify');
const emailVerify = require('../controllers/slaveControllers/verifications/emailVerify');
const verify = require('../middlewares/jwtVerify')
//middlewares



// routes for workers
route.post('/login/w',body('email').notEmpty().withMessage("Enter email"), body('password').notEmpty().withMessage("Provide your password!"),loginUser);

route.get('/verify/email/w/:hash',emailVerify)

route.post('/verify/email/w/',codeVerify)

route.post('/signup/w',createUser);




module.exports = route;

