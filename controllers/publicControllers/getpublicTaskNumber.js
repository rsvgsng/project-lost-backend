const Slave = require('../../models/SlaveModel');
const public = require('../../models/Public');
const jwt = require('jsonwebtoken');
const getpublicTaskNumber = async (req, res) => {
        try {
                
                const headerToken = req.headers['x-access-token'] || req.headers.authorization.split(' ')[1];
                const {id}=(jwt.decode(headerToken));
                const query = req.query.action;
                                switch (query) {
                        case 'docs':
                            
                                a = await public.find({ type: 1 }).select('subs educations -_id')
                                b = await Slave.find({_id:id}).select('documentSubmitted')
                                z= {...a[0]._doc,...b[0]._doc,code:200}
                                res.send(z)
                                break;
                        case 'views':
                                res.send({ views:321312})
                                break;
                        default:
                                res.send({ error: 'Invalid action' })
                }


        }   
        catch (error) {
                res.status(400).send({ msg: "Something went wrong",code:400 })
        }

}
module.exports = getpublicTaskNumber