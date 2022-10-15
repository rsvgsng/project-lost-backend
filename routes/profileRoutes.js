const route = require('express').Router()
const getProfile = require('../controllers/masterControllers/profile/getProfile')

const verifyMaster = require('../middlewares/jtwVerifyMaster')

const verifySlave = require('../middlewares/jwtVerify')




// Master Pofile Routes

route.get('/profile/m',verifyMaster,getProfile.getProfile,verifyMaster);





// Slaves Profile Routes

route.get('/profile/w',verifySlave.verifySlaveByAdmin,getProfile.getProfile,verifyMaster);

route
module.exports = route