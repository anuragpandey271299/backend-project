const express = require('express');
const WeekList = require('../models/weekList');
const isLoggedIn = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', isLoggedIn, async (req, res) => {
    try {
        const userId = req.user._id;

        const weekLists = await WeekList.find({ userId });

        if (weekLists.length > 0) {
            const weekListsWithTimeDifference  = weekLists.map((weekList)=>{
                const publishedTime=new Date(weekList.startDate)
                const endDate=new Date(weekList.endDate)
                const timeDifference=Math.abs(publishedTime-endDate)/(1000*60*60)
                return{
                    _id:weekList._id,
                    userId:weekList.userId,
                    userName:weekList.userName,
                    isActive:weekList.isActive,
                    description:weekList.description,
                    timeLeft:timeDifference + ' '+'Hrs'
                }
            })
            res.status(200).json({ weekListsWithTimeDifference});
        } else {
            res.status(404).json({ message: 'No week lists found for the user.' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
