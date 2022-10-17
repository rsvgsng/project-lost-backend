const Slave = require('../../models/SlaveModel');
const public = require('../../models/Public');
const getpublicTaskNumber = async (req, res) => {

        try {

                const query = req.query.action;
                                switch (query) {
                        case 'subs':
                                a = await public.find({ type: 1 }).select('subs -_id')
                                        res.send(a[0])

                                break;
                        case 'views':
                                res.send({ views:321312})
                                break;
                        default:
                                res.send({ error: 'invalid action' })
                }
      

            


        }   
        catch (error) {
                res.send({ msg: "Something went wrong" })
        }

}
module.exports = getpublicTaskNumber