const jwt = require('jsonwebtoken');
const User = require('../models/User');

// 🔐 Token generator
const generateTokens = (user) => {
  const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

// ✅ REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const user = new User({ name, email, password, role });
    await user.save();

    const tokens = generateTokens(user);
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: tokens.accessToken, // ✅ important
      },
    });
  } catch (err) {
    console.error('Register Error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const tokens = generateTokens(user);
    res.cookie('refreshToken', tokens.refreshToken, { httpOnly: true });

    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        accessToken: tokens.accessToken, // ✅ important
      },
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// ✅ REFRESH
exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.sendStatus(401);

  try {
    const payload = jwt.verify(token, process.env.REFRESH_SECRET);
    const newAccessToken = jwt.sign({ id: payload.id }, process.env.ACCESS_SECRET, { expiresIn: '15m' });
    res.json({ accessToken: newAccessToken });
  } catch (err) {
    console.error('Refresh Token Error:', err.message);
    res.sendStatus(403);
  }
};

// ✅ LOGOUT
exports.logout = (req, res) => {
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out' });
};
