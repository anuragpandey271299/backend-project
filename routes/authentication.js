const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();


router.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password, age, gender, mobile } = req.body;

        const encryptedPassword = await bcrypt.hash(password, 10)

        if (!fullname || !email || !password || !age || !gender || !mobile) {
            return res.status(400).send('Please provide all required information.');
        }
        await User.create({ fullname, email, password: encryptedPassword, age, gender, mobile });
        res.status(201).send('User registered successfully');
    } catch (error) {
        console.log(error)
        res.status(500).send('Not able to register. Please try again');
    }
});

//Authentication
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password)
            if (checkPassword) {
                const jwtoken = jwt.sign(user.toJSON(), process.env.JWT_SECRETKEY, { expiresIn: 20 * 60 })
                res.json({ message: 'You have logged in successfully', jwtoken })
            } else {
                res.status(401).send('Invalid credentials')
            }
        } else {
            res.status(404).send('User does not exist')
        }
    }
    catch (error) {
        console.log(error)
        res.send('Something went wrong')
    }
})

module.exports = router