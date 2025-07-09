const Task = require('../models/Task');

exports.startTask = async (req, res) => {
  const task = await Task.create({ ...req.body, user: req.user._id, startTime: new Date() });
  res.status(201).json(task);
};

exports.stopTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.sendStatus(404);
  task.endTime = new Date();
  task.status = 'completed';
  await task.save();
  res.json(task);
};

exports.myTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
};

exports.allTasks = async (req, res) => {
  const tasks = await Task.find().populate('user', 'name');
  res.json(tasks);
};

exports.summary = async (req, res) => {
  const summary = await Task.aggregate([
    { $match: { user: req.user._id } },
    { $group: {
      _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
      count: { $sum: 1 },
    } },
    { $sort: { '_id': -1 } }
  ]);
  res.json(summary);
};