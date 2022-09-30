const route = require('express').Router()
const taskControllers = require('../controllers/masterControllers/tasks/taskControllers')
const verify = require('../middlewares/jtwVerifyMaster')




// task operations
route.post('/task/new',verify,taskControllers.newTask)





// master Task Routes

route.get('/task/edit/:id',verify,taskControllers.editTask)
route.get('/task/view/:id',verify,taskControllers.getTask)


module.exports = route;
