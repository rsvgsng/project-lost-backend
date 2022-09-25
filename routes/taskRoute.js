const route = require('express').Router()
const taskControllers = require('../controllers/masterControllers/tasks/taskControllers')
const verify = require('../middlewares/jtwVerifyMaster')




// task operations
route.post('/task/new',verify,taskControllers.newTask)



module.exports = route;
