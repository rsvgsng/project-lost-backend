const taskModel = require('../../../models/taskModel')
const asynchandler = require('express-async-handler')
const {randomString} = require('../../../misc/genRandomIDs')
const {categories} = require('../../../misc/customOptions')



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



module.exports = {
    newTask
}














// const dick  =  [{fileName:"ladobook",url:"geda.com"},{fileName:"ladobook",url:"dsadasdas.com"}]
        
// let a = dick.map((e)=>{
//      return ({fileName:e.fileName,url:e.url})
//  })

 

