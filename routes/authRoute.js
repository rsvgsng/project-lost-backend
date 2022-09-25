// This file contains all the routes related to authentication
const route = require('express').Router()
const { body, validationResult } = require('express-validator');

// imports for slaves
const createUser = require('../controllers/slaveControllers/createUser');
const loginUser = require('../controllers/slaveControllers/loginUser');
const codeVerify = require('../controllers/slaveControllers/verifications/codeVerify');
const emailVerify = require('../controllers/slaveControllers/verifications/emailVerify');
const verifySlave = require('../middlewares/jwtVerify')

// imports for masters

const verifyMaster = require('../middlewares/jtwVerifyMaster')
const createUserMaster = require('../controllers/masterControllers/createUser');
const loginUserMaster = require('../controllers/masterControllers/loginUser');
const codeVerifyMaster = require('../controllers/masterControllers/verifications/codeVerify');
const emailVerifyMaster = require('../controllers/masterControllers/verifications/emailVerify');
const getProfile = require('../controllers/masterControllers/profile/getProfile')

// routes for workers
route.post('/login/w',body('email').notEmpty().withMessage("Enter email"), body('password').notEmpty().withMessage("Provide your password!"),loginUser);

route.get('/verify/email/w/:hash',emailVerify)

route.post('/verify/email/w/',codeVerify)

route.post('/signup/w',createUser);

route.get('/profile/w',verifySlave,(req,res)=>{res.send("hey authorized user")})





// routes for masters

route.get('/profile/m',verifyMaster,getProfile.getProfile)
route.post('/signup/m',createUserMaster);

route.post('/login/m',body('email').notEmpty().withMessage("Enter email"), body('password').notEmpty().withMessage("Provide your password!"),loginUserMaster);

route.get('/verify/email/m/:hash',emailVerifyMaster)

route.post('/verify/email/m/',codeVerifyMaster)




module.exports = route;

