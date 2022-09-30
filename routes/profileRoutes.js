const route = require('express').Router()
const getProfile = require('../controllers/masterControllers/profile/getProfile')

const verifyMaster = require('../middlewares/jtwVerifyMaster')






// Master Pofile Routes

route.get('/profile/m',verifyMaster,getProfile.getProfile);




module.exports = route