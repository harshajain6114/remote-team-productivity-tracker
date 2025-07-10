// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// module.exports = async (req, res, next) => {
//   const auth = req.headers.authorization;
//   if (!auth) return res.sendStatus(401);
//   try {
//     const decoded = jwt.verify(auth.split(' ')[1], process.env.ACCESS_SECRET);
//     req.user = await User.findById(decoded.id);
//     next();
//   } catch {
//     res.sendStatus(403);
//   }
// };

const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    req.user = user;
    next();
  } catch (err) {
    console.error('Token verification failed:', err);
    res.status(403).json({ message: 'Invalid token' });
  }
};
