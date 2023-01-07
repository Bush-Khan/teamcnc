const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require('./route/route')
const multer = require('multer')

const app = express()
app.use(multer().any());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

mongoose.set('strictQuery', false)
mongoose.connect("mongodb+srv://bushra:euVDEv190AGHYJDI@cluster0.nwfddcm.mongodb.net/teamcnc?retryWrites=true&w=majority",{useNewUrlParser:true})
.then(()=> console.log("MongoDB is connected"))
.catch((error)=> console.log(error))

app.use('/',route)

app.listen(process.env.PORT||3000, function(){
    console.log('Express port is running on '+ (process.env.PORT||3000))
})