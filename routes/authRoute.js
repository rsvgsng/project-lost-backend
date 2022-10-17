// This file contains all the routes related to authentication
const route = require('express').Router()
const { body } = require('express-validator');

// imports for slaves
const {stepTwoSignup,createUser} = require('../controllers/slaveControllers/createUser');
const loginUser = require('../controllers/slaveControllers/loginUser');
const emailVerify = require('../controllers/slaveControllers/verifications/emailVerify');
const dashboard = require('../controllers/slaveControllers/Profile/dashboard');
const {verifyJWT,verifyDocs,verifyEmail,hasDocumentsSubmitted} = require('../middlewares/SlaveMiddleware')



// imports for masters

const createUserMaster = require('../controllers/masterControllers/createUser');
const loginUserMaster = require('../controllers/masterControllers/loginUser');
const emailVerifyMaster = require('../controllers/masterControllers/verifications/emailVerify');


// imports for public views
const getNumbers = require('../controllers/publicControllers/getpublicTaskNumber');

route.get('/pubx', getNumbers)



// Worker auth routes

route.post('/login/w',body('email').notEmpty().withMessage("Enter email"), body('password').notEmpty().withMessage("Provide your password!"),verifyEmail,loginUser);
route.get('/verify/email/w/:hash',emailVerify)
route.post('/signup/w',createUser);
route.post('/signup/w/initial',verifyJWT,hasDocumentsSubmitted,stepTwoSignup)
route.get('/dashboard',verifyJWT,verifyDocs,dashboard)







// routes for masters

route.post('/signup/m',createUserMaster);

route.post('/login/m',body('email').notEmpty(),body('password').notEmpty(),loginUserMaster);

route.get('/verify/email/m/:hash',emailVerifyMaster)







module.exports = route;

