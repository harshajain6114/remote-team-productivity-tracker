const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth) return res.sendStatus(401);
  try {
    const decoded = jwt.verify(auth.split(' ')[1], process.env.ACCESS_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.sendStatus(403);
  }
};
