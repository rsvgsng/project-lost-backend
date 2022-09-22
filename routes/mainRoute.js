const route = require('express').Router()


// controllers
const loginUser = require('../controllers/slaveControllers/loginUser')


route.get('/lado',loginUser)



module.exports = route;

