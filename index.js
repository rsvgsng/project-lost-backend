require('dotenv').config()
const express = require('express');
const cors = require('cors');
const taskRoute = require('./routes/taskRoute')
const authRoute = require('./routes/authRoute')

const mongoose = require('mongoose');
const upload = require('express-fileupload')
//  initialization
const app = express();

// middlewares
app.use(upload())
app.use(express.json())
app.use(cors());
app.use("/api/v1/",taskRoute);
app.use("/api/v1/",authRoute);

// misc
app.all('*',(req,res)=>{res.status(500).send('Internal server error')})

// database connection
mongoose.connect(process.env.MONGODBURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DB CONNECTION SUCCESSFULL");
    })
    .catch(err => {
        console.log(err);
    } )



app.listen(process.env.PORT||8000,()=>{
    console.log("Server is running at port "+process.env.PORT)
})