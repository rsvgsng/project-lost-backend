const taskModel = require('../../../models/taskModel')
const asynchandler = require('express-async-handler')
const {randomString} = require('../../../misc/genRandomIDs')
const {categories} = require('../../../misc/customOptions')
const validateTaskOwner = require('../../../helpers/validateTaskOwner')




// Creating Task

const newTask =asynchandler(async (req,res)=>{

    try {

        const {deadLine,title,des,category,maxPrice}= req.body;
        const uploadSize = process.env.MAX_UPLOAD
        const newTask =await new taskModel({
            createdBy:req.uid,
            creatorEmail:req.email,
            deadLine:deadLine,
            title:title,
            des:des,
            maxPrice:maxPrice,
            taskID:randomString(13),
        })
        const {_id:id} = newTask;

// For handling the files

        if(req.files){
      

            let errors =[];
            let filenames = []; 
           
            let lenghtImages = req.files.images.length==undefined?1:req.files.images.length
            if(lenghtImages>15) return res.send({msg:"max 15 are files allowed!"})
      

            if(lenghtImages==1){
                categoriesArray = category.split(",")

                for(i = 0 ; i <categoriesArray.length ; i++){
                    if(!categories().includes(categoriesArray[i].toUpperCase())) return res.status(400).send({msg:`Invalid category '${categoriesArray[i]}'`});
                }
                finalCategory = category.split(",").map(e=>{return e.toUpperCase()})
            
                if(req.files.images.size >= uploadSize)  errors.push(`${req.files.images.name} is more than ${Math.round(uploadSize/1024/1024)} MB! `)
                if(!req.files.images.mimetype.startsWith('image/') && !req.files.images.mimetype.startsWith('application/pdf')) errors.push(`${req.files.images.name} is not a supported file! `)
                let rs = randomString(15)
                const fileExtension = req.files.images.mimetype.split("/")[1];
                if(errors.length > 0) return res.status(500).send(errors)
                filenames.push({fileName:rs,extension:fileExtension})  
                req.files.images.mv('files/'+rs+'.'+fileExtension)
       


               
                await newTask.save(async err=>{
                    if(err) return res.sendStatus (400)
                 
                    await taskModel.findByIdAndUpdate(id,{
                        $push:{
                            taskFiles:filenames,
                            category:finalCategory
                        }
                     })

                  res.sendStatus(200)
                })



            }

            else{

                categoriesArray = category.split(",")
                for(i = 0 ; i <categoriesArray.length ; i++){
                    if(!categories().includes(categoriesArray[i].toUpperCase())) return res.status(400).send({msg:`Invalid category '${categoriesArray[i]}'`});
                }
                finalCategory = category.split(",").map(e=>{return e.toUpperCase()})
            
                for(i = 0 ; i <lenghtImages ; i++){
                    if(req.files.images[i].size >= uploadSize)  errors.push(`${req.files.images[i].name} is more than ${Math.round(uploadSize/1024/1024)} MB! `)
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
                




                await newTask.save(async err=>{
          
                    if(err) return res.sendStatus (400)
                 
                    await taskModel.findByIdAndUpdate(id,{
                        $push:{
                            taskFiles:filenames,
                            category:finalCategory
                        }
                     })

                  res.sendStatus(200)
                })

        
       
            }
            
        }
        // Run this block if no image is uploaded

        

        
 
    } 
    catch (error) {
        console.log(error)
        res.sendStatus(400)
    }

})






// Edit Task 

const editTask = asynchandler(async(req,res)=>{
try {
    
    const {title,deadLine,maxPrice} = req.body;
    
    
    await validateTaskOwner(req.params.id,req.uid).then(async e=>{ 

        if(Object.keys(req.body).length<1) return res.send({msg:"Noting to update !"})
        if(e.length<1) return res.status(404).send({msg:"No task found with that id!"})
        e= e[0];
        if(e.assignedTo) return res.send({msg:"This task is already assigned to someone and can't be edited!"}) 
         await taskModel.findByIdAndUpdate(req.params.id,{
            $set:{
                title:title,
                deadLine:deadLine,
                maxPrice:maxPrice
            }
        }).then(e=>res.send({msg:"Task Updated Successfully!"})).catch(e=>res.send("Something went wrong"))


 })


} catch (error) {

    return res.status(400).send({msg:"something went wrong!"})
}



})




// Get a task detail


const getTask = asynchandler(async (req,res)=>{

    
await  taskModel.findById(req.params.id).select("-taskExpired -__v -taskFiles -assignedTo -creatorEmail").then(async e=>{


        if(e.assignedTo) return res.status(500).send({msg:"This task is already assigned to somebody!"});
        if(e.taskExpired) return res.status(500).send({msg:"This task is expired! "});

        res.send(e)


}).catch(rr=>res.send({msg:"Task not found or something went wrong!"}))


})

module.exports = {
    newTask,
    editTask,
    getTask
}














// const dick  =  [{fileName:"ladobook",url:"geda.com"},{fileName:"ladobook",url:"dsadasdas.com"}]
        
// let a = dick.map((e)=>{
//      return ({fileName:e.fileName,url:e.url})
//  })

 

