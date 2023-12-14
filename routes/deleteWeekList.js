const express = require('express');
const router = express.Router();
const WeekList = require('../models/weekList');
const checkActiveWeekLists = require('../middlewares/checkWeekLists');
const isLoggedIn = require('../middlewares/authMiddleware');

router.delete('/:weekListId', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const weekListId = req.params.weekListId;

    const weekList = await WeekList.findOne({ _id: weekListId, userId });
    console.log(weekList)

    if (!weekList) {
      return res.status(404).json({ message: 'Week list not found or does not belong to the user.' });
    }


    const currentTime = new Date();
    const publishedTime = new Date(weekList.startDate);

    // Calculate the time difference in hours
    const timeDifference = Math.abs(currentTime - publishedTime)/(1000*60*60);
    console.log(timeDifference)

    if (timeDifference > 24) {
      return res.status(403).json({ message: 'You can only delete a week list within 24 hours of publishing.' });
    }

    await WeekList.deleteOne({ _id: weekListId });

    res.status(200).json({ message: 'Week list deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
