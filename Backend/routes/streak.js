const express = require('express');
const Streak = require('../models/Streak');
const Task = require('../models/Task');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// GET /api/streak — get streak data + update it based on today's activity
router.get('/', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;
        const today  = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

        // Check if user completed any task today
        const completedToday = await Task.findOne({
            where: {
                user_id: userId,
                status: 'completed',
            },
        });

        // Find or create streak record for this user
        let [streak, created] = await Streak.findOrCreate({
            where: { user_id: userId },
            defaults: {
                user_id: userId,
                current_streak: 0,
                best_streak: 0,
                last_active: null,
            },
        });

        const lastActive = streak.last_active
            ? new Date(streak.last_active).toISOString().split('T')[0]
            : null;

        // Only update streak if user completed a task today
        if (completedToday) {
            if (lastActive === null) {
                // First time ever completing a task
                streak.current_streak = 1;
                streak.last_active    = today;
            } else {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split('T')[0];

                if (lastActive === today) {
                    // Already updated today — no change
                } else if (lastActive === yesterdayStr) {
                    // Continued streak from yesterday
                    streak.current_streak += 1;
                    streak.last_active = today;
                } else {
                    // Streak broken — reset to 1
                    streak.current_streak = 1;
                    streak.last_active = today;
                }
            }

            // Update best streak if current is higher
            if (streak.current_streak > streak.best_streak) {
                streak.best_streak = streak.current_streak;
            }

            await streak.save();
        }

        // Get tasks completed today count
        const todayTasksCount = await Task.count({
            where: {
                user_id: userId,
                status: 'completed',
            },
        });

        // Get today's pending tasks
        const pendingTasks = await Task.findAll({
            where: { user_id: userId, status: 'pending' },
            order: [['created_at', 'ASC']],
        });

        res.status(200).json({
            currentStreak:    streak.current_streak,
            bestStreak:       streak.best_streak,
            lastActive:       streak.last_active,
            completedToday:   todayTasksCount,
            pendingTasks,     // for daily planner section
        });

    } catch (error) {
        console.error('Streak Error:', error);
        res.status(500).json({ message: 'Failed to fetch streak data.' });
    }
});

module.exports = router;
