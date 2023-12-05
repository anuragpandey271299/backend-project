const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app=express()

app.get('/',(req,res)=>{
    res.send('hello')
})

app.listen(3000,()=>{
    console.log('Server running on http://localhost:3000')
})
