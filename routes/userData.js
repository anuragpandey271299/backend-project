const express = require('express');
const router = express.Router();
const User = require('../models/user')
const isLoggedIn=require('../middlewares/authMiddleware')

router.use(isLoggedIn)

router.get('/', async (req, res) => {
    try {
        const userData = await User.find()
        res.json(userData)
    }
    catch (error) {
        console.log(error)
    }
});

module.exports = router;
