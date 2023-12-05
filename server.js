const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv=require('dotenv').config()


const app=express()

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(3000,()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log('DB connected'))
    .catch((error)=>console.log(error))
    console.log('Server running on http://localhost:3000')
})
