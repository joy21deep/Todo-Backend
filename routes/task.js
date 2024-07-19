const express = require('express');
const router = express.Router();
const taskController = require('../controller/task');
const authMiddleware = require('../helper/check-auth');

// Create a new task
router.post('/create', authMiddleware, taskController.createTask);

// Fetch tasks with date range
router.get('/fetch', authMiddleware, taskController.getTasksByDateRange);

// Update status for multiple tasks
router.put('/update/status', authMiddleware, taskController.updateTaskStatus);

// Update status for a single task
// router.put('/tasks/status/single', authMiddleware, taskController.updateSingleTaskStatus);

module.exports = router;
