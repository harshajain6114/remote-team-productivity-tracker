const Task = require('../models/Task');
const User = require('../models/User');
const cron = require('node-cron');

const sendWeeklyEmail = async () => {
  const lastWeek = new Date();
  lastWeek.setDate(lastWeek.getDate() - 7);
  const users = await User.find();

  for (const user of users) {
    const count = await Task.countDocuments({
      user: user._id,
      status: 'completed',
      createdAt: { $gte: lastWeek },
    });
    console.log(`Hey ${user.name}, last week you completed ${count} tasks.`);
  }
};

module.exports = () => {
  cron.schedule('0 0 * * 0', sendWeeklyEmail); // Every Sunday midnight
};
