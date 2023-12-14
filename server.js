const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()
const healthRouter = require('./routes/health')
const authRouter = require('./routes/authentication')
const userData = require('./routes/userData')
const weekListRouter = require('./routes/createWeekList');
const updateWeekListRouter = require('./routes/updateWeekList');
const deleteWeekListRouter = require('./routes/deleteWeekList');
const activeWeekList = require('./routes/activeWeekList')
const descriptionWeekList=require('./routes/getDescription')
const notFound = require('./middlewares/notFound')


const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Welcome')
})

app.use('/health', healthRouter);
app.use('/', authRouter);
app.use('/userData', userData)
app.use('/', weekListRouter);
app.use('/updateWeekList', updateWeekListRouter);
app.use('/deleteWeekList', deleteWeekListRouter);
app.use('/activeweeklist', activeWeekList)
app.use('/description',descriptionWeekList)

app.use(notFound)


app.listen(process.env.PORT, () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => console.log('DB connected'))
        .catch((error) => console.log(error))
    console.log(`Server running on http://localhost:${process.env.PORT}`)
})
