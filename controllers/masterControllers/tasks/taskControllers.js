const taskModel = require('../../../models/taskModel')
const asynchandler = require('express-async-handler')
const {randomString} = require('../../../misc/genRandomIDs')


const newTask =asynchandler(async (req,res)=>{
    try {

        const {deadLine,title,des}= req.body;

        const newTask =await new taskModel({
            createdBy:req.uid,
            creatorEmail:req.email,
            deadLine:deadLine,
            title:title,
            des:des,
            taskID:randomString(13),
        })
        const {_id:id} = newTask;

// For handling the files

        if(req.files){
      
           
            let errors =[];
            let filenames = []; 
             
            let lenghtImages = req.files.images.length==undefined?1:req.files.images.length

            if(lenghtImages==1){
                if(req.files.images.size >= 1000000)  errors.push(`${req.files.images.name}'s exceeds 1MB! `)
                if(!req.files.images.mimetype.startsWith('image/') && !req.files.images.mimetype.startsWith('application/pdf')) errors.push(`${req.files.images.name} is not a supported file! `)
                let rs = randomString(15)
                const fileExtension = req.files.images.mimetype.split("/")[1];
                if(errors.length > 0) return res.status(500).send(errors)
                filenames.push({fileName:rs,extension:fileExtension})  
                req.files.images.mv('files/'+rs+'.'+fileExtension)

                await newTask.save(async()=>{
                    a = await taskModel.findByIdAndUpdate(id,{
                        $push:{
                            taskFiles:filenames
                        }
                     })
                     console.log(filenames)
                     res.sendStatus(200)
                })
            }

            else{

                for(i = 0 ; i <lenghtImages ; i++){
                    if(req.files.images[i].size >= 1000000)  errors.push(`${req.files.images[i].name}'s exceeds 1MB! `)
                    if(!req.files.images[i].mimetype.startsWith('image/')&& !req.files.images[i].mimetype.startsWith('application/pdf')) errors.push(`${req.files.images[i].name} is not a supported file! `)
                }
                if(errors.length > 0) return res.status(500).send(errors)

                for(i = 0 ; i <lenghtImages ; i++){
                     let rs = randomString(20)
                    const fileExtension = req.files.images[i].mimetype.split("/")[1];
                    if (!req.files.images[i].mimetype.startsWith('image/')&& !req.files.images[i].mimetype.startsWith('application/pdf')) return
                    filenames.push({fileName:rs,extension:fileExtension})
                    req.files.images[i].mv('files/'+rs+'.'+fileExtension)
                }
                
                await newTask.save(async()=>{
                    a = await taskModel.findByIdAndUpdate(id,{
                        $push:{
                            taskFiles:filenames
                        }
                     })
                     res.sendStatus(200)

          
                })
        
       
            }

        }
          
 
    } 
    catch (error) {
        res.sendStatus(400)
    }

})



module.exports = {
    newTask
}














// const dick  =  [{fileName:"ladobook",url:"geda.com"},{fileName:"ladobook",url:"dsadasdas.com"}]
        
// let a = dick.map((e)=>{
//      return ({fileName:e.fileName,url:e.url})
//  })

 

