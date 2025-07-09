const User = require('../models/User');
const Task = require('../models/Task');

exports.dashboardSummary = async (req, res) => {
  const topUsers = await Task.aggregate([
    { $match: { status: 'completed' } },
    { $group: { _id: '$user', count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
    { $lookup: { from: 'users', localField: '_id', foreignField: '_id', as: 'user' } },
    { $unwind: '$user' },
    { $project: { name: '$user.name', count: 1 } },
  ]);

  const dailyCounts = await Task.aggregate([
    { $match: { status: 'completed' } },
    { $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      count: { $sum: 1 },
    } },
    { $sort: { '_id': 1 } }
  ]);

  res.json({ topUsers, dailyCounts });
};
