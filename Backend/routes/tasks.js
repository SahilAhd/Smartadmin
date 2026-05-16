const express = require('express');
const Task = require('../models/Task');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// ─────────────────────────────────────────
// GET /api/tasks  — fetch all tasks for logged in user
// ─────────────────────────────────────────
router.get('/', verifyToken, async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { user_id: req.user.id },
            order: [['created_at', 'DESC']],
        });
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Fetch Tasks Error:', error);
        res.status(500).json({ message: 'Failed to fetch tasks.' });
    }
});

// ─────────────────────────────────────────
// GET /api/tasks/analytics  — analytics data for logged in user
// ─────────────────────────────────────────
router.get('/analytics', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const allTasks = await Task.findAll({ where: { user_id: userId } });

        const completedTasks = allTasks.filter(t => t.status === 'completed');
        const pendingTasks   = allTasks.filter(t => t.status === 'pending');

        // Average completion time in days
        let avgCompletionDays = 0;
        if (completedTasks.length > 0) {
            const totalMs = completedTasks.reduce((sum, t) => {
                return sum + (new Date(t.completed_at) - new Date(t.created_at));
            }, 0);
            avgCompletionDays = (totalMs / completedTasks.length / (1000 * 60 * 60 * 24)).toFixed(1);
        }

        // Tasks completed per day — last 7 days
        const last7Days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            const count = completedTasks.filter(t => {
                return new Date(t.completed_at).toISOString().split('T')[0] === dateStr;
            }).length;

            last7Days.push({
                date: date.toLocaleDateString('en-IN', { weekday: 'short', day: '2-digit', month: 'short' }),
                completed: count,
            });
        }

        // Best day of week
        const dayCounts = { Sun: 0, Mon: 0, Tue: 0, Wed: 0, Thu: 0, Fri: 0, Sat: 0 };
        const dayNames  = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        completedTasks.forEach(t => {
            const day = dayNames[new Date(t.completed_at).getDay()];
            dayCounts[day]++;
        });
        const bestDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0][0];

        // Speed label
        let speedLabel = 'No data yet';
        if (avgCompletionDays > 0) {
            if (avgCompletionDays < 1)       speedLabel = '⚡ Fast Completer';
            else if (avgCompletionDays <= 3)  speedLabel = '✅ On Track';
            else                              speedLabel = '⚠️ Needs Focus';
        }

        res.status(200).json({
            totalTasks:       allTasks.length,
            totalCompleted:   completedTasks.length,
            totalPending:     pendingTasks.length,
            avgCompletionDays,
            bestDay,
            speedLabel,
            last7Days,
            completedTasks,
        });

    } catch (error) {
        console.error('Analytics Error:', error);
        res.status(500).json({ message: 'Failed to fetch analytics.' });
    }
});

// ─────────────────────────────────────────
// POST /api/tasks  — add a new task
// ─────────────────────────────────────────
router.post('/', verifyToken, async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || !text.trim()) {
            return res.status(400).json({ message: 'Task text is required.' });
        }

        const newTask = await Task.create({
            user_id: req.user.id,
            text: text.trim(),
            status: 'pending',
        });

        res.status(201).json(newTask);
    } catch (error) {
        console.error('Add Task Error:', error);
        res.status(500).json({ message: 'Failed to add task.' });
    }
});

// ─────────────────────────────────────────
// PUT /api/tasks/:id/complete  — mark task as completed
// ─────────────────────────────────────────
router.put('/:id/complete', verifyToken, async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        task.status = 'completed';
        task.completed_at = new Date();
        await task.save();

        res.status(200).json(task);
    } catch (error) {
        console.error('Complete Task Error:', error);
        res.status(500).json({ message: 'Failed to complete task.' });
    }
});

// ─────────────────────────────────────────
// DELETE /api/tasks/:id  — delete a task
// ─────────────────────────────────────────
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const task = await Task.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found.' });
        }

        await task.destroy();
        res.status(200).json({ message: 'Task deleted.' });
    } catch (error) {
        console.error('Delete Task Error:', error);
        res.status(500).json({ message: 'Failed to delete task.' });
    }
});

module.exports = router;
