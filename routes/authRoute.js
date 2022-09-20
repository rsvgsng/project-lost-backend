// This file contains all the routes related to authentication
const route = require('express').Router()
const { body, validationResult } = require('express-validator');
const createUser = require('../controllers/createUser');
const loginUser = require('../controllers/loginUser');
const verify = require('../middlewares/jwtVerify')
//middlewares



route.post('/login',body('email').notEmpty().withMessage("Enter email"), body('password').notEmpty().withMessage("Provide your password!"),loginUser);
route.post('/signup',createUser);
route.get('/profile',verify,(req,res)=>{res.send("hello")})

module.exports = route;

