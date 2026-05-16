const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Task = require('../models/Task');
const verifyToken = require('../middleware/auth');

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// ─────────────────────────────────────────
// POST /api/ai/suggestions
// Reads user's pending tasks → Gemini suggests what to focus on
// ─────────────────────────────────────────
router.post('/suggestions', verifyToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user's pending tasks
        const pendingTasks = await Task.findAll({
            where: { user_id: userId, status: 'pending' },
            order: [['created_at', 'ASC']],
        });

        if (pendingTasks.length === 0) {
            return res.status(200).json({
                suggestions: "You have no pending tasks right now. Add some tasks and I'll help you prioritize them!"
            });
        }

        const taskList = pendingTasks.map((t, i) =>
            `${i + 1}. ${t.text} (added: ${new Date(t.created_at).toDateString()})`
        ).join('\n');

        const prompt = `
You are a productivity assistant for a task management app called SmartAdmin.

The user has these pending tasks:
${taskList}

Based on these tasks, provide exactly 3 smart, actionable suggestions on:
- Which task to focus on first and why
- How to approach the tasks efficiently
- Any time management tip relevant to these specific tasks

Keep each suggestion concise (2-3 sentences max). 
Format as 3 numbered points. Be direct and practical.
Do not use markdown bold or special formatting.
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        res.status(200).json({ suggestions: text });

    } catch (error) {
        console.error('AI Suggestions Error:', error);
        res.status(500).json({ message: 'AI service failed. Please try again.' });
    }
});

// ─────────────────────────────────────────
// POST /api/ai/coach
// User asks a question → Gemini answers based on their real task data
// ─────────────────────────────────────────
router.post('/coach', verifyToken, async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || !question.trim()) {
            return res.status(400).json({ message: 'Please ask a question.' });
        }

        const userId = req.user.id;

        // Get user's full task data for context
        const allTasks = await Task.findAll({ where: { user_id: userId } });

        const completedTasks = allTasks.filter(t => t.status === 'completed');
        const pendingTasks   = allTasks.filter(t => t.status === 'pending');

        // Calculate avg completion time
        let avgDays = 0;
        if (completedTasks.length > 0) {
            const totalMs = completedTasks.reduce((sum, t) => {
                return sum + (new Date(t.completed_at) - new Date(t.created_at));
            }, 0);
            avgDays = (totalMs / completedTasks.length / (1000 * 60 * 60 * 24)).toFixed(1);
        }

        const pendingList   = pendingTasks.map(t => `- ${t.text}`).join('\n') || 'None';
        const completedList = completedTasks.slice(0, 5).map(t => `- ${t.text}`).join('\n') || 'None';

        const prompt = `
You are a personal productivity coach inside a task management app called SmartAdmin.

Here is the user's real data:
- Total tasks: ${allTasks.length}
- Completed tasks: ${completedTasks.length}
- Pending tasks: ${pendingTasks.length}
- Average days to complete a task: ${avgDays} days
- Recent completed tasks: 
${completedList}
- Current pending tasks:
${pendingList}

The user asks: "${question.trim()}"

Give a helpful, personalized response based on their actual data above.
Be conversational, supportive, and practical.
Keep the response under 150 words.
Do not use markdown bold or special formatting.
`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();

        res.status(200).json({ answer: text });

    } catch (error) {
        console.error('AI Coach Error:', error);
        res.status(500).json({ message: 'AI service failed. Please try again.' });
    }
});

module.exports = router;
