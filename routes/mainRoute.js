const route = require('express').Router()


// controllers
const loginUser = require('../controllers/loginUser')


route.get('/lado',loginUser)



module.exports = route;

