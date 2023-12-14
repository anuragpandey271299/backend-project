const express = require('express');
const router = express.Router();
const WeekList = require('../models/weekList');
const checkActiveWeekLists = require('../middlewares/checkWeekLists');
const isLoggedIn=require('../middlewares/authMiddleware')

router.post('/create',isLoggedIn, checkActiveWeekLists, async (req, res) => {
  try {
    const userId = req.user._id;
    const userName=req.user.fullname
    const { description } = req.body;
    const startDate=new Date()
    const endDate=new Date()
    endDate.setDate(endDate.getDate()+10) // weeklist will expire after 7 days of creation

    const newWeekList = await WeekList.create({userId,userName,startDate,endDate:endDate,description});


    res.status(201).json({ message: 'Week list added successfully', weekList: newWeekList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
