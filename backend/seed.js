const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();
(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await User.deleteMany();
  await User.create([
    { name: 'Admin', email: 'admin@example.com', password: 'admin123', role: 'admin' },
    { name: 'Emp', email: 'emp@example.com', password: 'emp123', role: 'employee' },
  ]);
  console.log('Seeded!');
  process.exit();
})();
