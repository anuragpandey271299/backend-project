const jwt = require('jsonwebtoken');

const isLoggedIn = (req, res, next) => {
  try {
    const { jwttoken } = req.headers;
    const user = jwt.verify(jwttoken, process.env.JWT_SECRETKEY);
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: "Unauthorized - You've not logged in! Please login",
    });
  }
};

module.exports = isLoggedIn;
