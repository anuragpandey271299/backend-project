const WeekList = require('../models/weekList');

const checkActiveWeekLists = async (req, res, next) => {
  try {
    const userId = req.user._id;
    
    //If expiry or end date is passed, then make isActive as false
    await WeekList.updateMany(
        { userId, endDate: { $lt: new Date() }, isActive: true },
        { $set: { isActive: false } }
      );

    const activeWeekListsCount = await WeekList.countDocuments({
      userId,
      isActive: true
    });



    if (activeWeekListsCount < 2) {
      next();
    } else {
      res.status(403).json({ message: 'You can only have two active week lists at a time.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = checkActiveWeekLists;
