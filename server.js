const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv=require('dotenv').config()
const User=require('./models/user')
const healthRouter=require('./routes/health')
const authRouter=require('./routes/authentication')
const userData=require('./routes/userData')


const app=express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/',(req,res)=>{
    res.send('Welcome')
})

app.use('/health', healthRouter);
app.use('/', authRouter);
app.use('/userData',userData)


app.listen(process.env.PORT,()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log('DB connected'))
    .catch((error)=>console.log(error))
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})
