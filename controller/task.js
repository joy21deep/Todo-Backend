const Task = require('../model/task');

// Create a new task
exports.createTask = async (req, res) => {
  console.log("hiiii,hello");

    try {
      const { name, description, dueDate } = req.body;

      const task = new Task({
        name,
        description,
        dueDate,
        userId: req.id,
      });
      await task.save();
      res.status(201).json(task);
    } catch (error) {
    console.log(error,"error");

      res.status(500).json({ message: 'Server error' });
    }
  };
  
  // Fetch tasks with date range
  exports.getTasksByDateRange = async (req, res) => {
    try {
      const { startDate, endDate } = req.query;
      const tasks = await Task.find({
        userId: req.user.id,
        dueDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
      });
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  };

// Update status for multiple tasks
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskIds, status } = req.body;
    await Task.updateMany(
      { _id: { $in: taskIds } },
      { $set: { status } },
    );
    res.status(200).json({ message: 'Tasks updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update status for a single task
exports.updateSingleTaskStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    await Task.findByIdAndUpdate(taskId, { status });
    res.status(200).json({ message: 'Task updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
