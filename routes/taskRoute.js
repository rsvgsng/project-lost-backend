const route = require('express').Router()
const taskControllers = require('../controllers/masterControllers/tasks/taskControllers')
const verify = require('../middlewares/jtwVerifyMaster')



// task operations
route.post('/task/m/new',verify,taskControllers.newTask)





// master Task Routes

route.post('/task/m/edit/:id',verify,taskControllers.editTask)
route.get('/task/m/view/:id',verify,taskControllers.getTask)
route.delete('/task/m/delete/:id',verify,taskControllers.deleteTask)


module.exports = route;
