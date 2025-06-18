const jwt = require('jsonwebtoken');
const jwt_secret = "yourkey"; // Same key as used in signup/login

const authMiddleware = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/login'); // Or send unauthorized
  }

  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.redirect('/login'); // Invalid token
  }
};

module.exports = authMiddleware;
