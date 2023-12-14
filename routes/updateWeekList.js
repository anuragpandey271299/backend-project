const express = require('express');
const router = express.Router();
const WeekList = require('../models/weekList');
const isLoggedIn = require('../middlewares/authMiddleware');

router.put('/:weekListId', isLoggedIn, async (req, res) => {
  try {
    const userId = req.user._id;
    const weekListId = req.params.weekListId;
    const { description } = req.body;

    const weekList = await WeekList.findOne({ _id: weekListId, userId });

    if (!weekList) {
      return res.status(404).json({ message: 'Week list not found or does not belong to the user.' });
    }

    const currentTime = new Date();
    const publishedTime = new Date(weekList.startDate);

    // Calculated the time difference in hours
    const timeDifference = Math.abs(currentTime - publishedTime)/(1000*60*60);

    if (timeDifference > 24) {
      return res.status(403).json({ message: 'You can only update a week list within 24 hours of publishing.' });
    }

    // Update the description of the week list
    weekList.description = description;
    await weekList.save();

    res.status(200).json({ message: 'Week list updated successfully', weekList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
