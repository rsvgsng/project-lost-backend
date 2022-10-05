const masterModel = require('../../../models/MasterModel')
const Tasks = require('../../../models/taskModel')


const getProfile = async (req, res) => {



    const { userName, profilePic,fullName, email, gender,creationDate ,wantshelpIn } = await masterModel.findById(req.uid)



    await Tasks.find({ email: req.email }).then(async(e) => {
       
        tasksList = await Tasks.find({ email: req.email }).select('title assignedTo taskID taskExpired maxPrice category taskViews createdOn -_id deadLine')
        res.send({
            userName: userName,
            fullName:fullName,
            creationDate:creationDate,
            profilePic: profilePic,
            email: email,
            gender: gender,
            wantshelpIn: wantshelpIn,
            allTasks: tasksList.length > 0 ? tasksList : null
        })

    })




}

const getRecent = () => {

}

module.exports = {
    getProfile, getRecent
}
