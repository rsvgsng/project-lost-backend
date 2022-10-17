const route = require('express').Router()


// 
const master = require('../middlewares/MasterMiddleWare')
const slave = require('../middlewares/SlaveMiddleware')


// controllers
const getProfile = require('../controllers/masterControllers/profile/getProfile')


// Master Pofile Routes

route.get('/profile/m',master,getProfile.getProfile);


// Slaves Profile Routes

route.get('/profile/w');


module.exports = route