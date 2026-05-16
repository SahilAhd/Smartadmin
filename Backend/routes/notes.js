const express = require('express');
const Note = require('../models/Note');
const verifyToken = require('../middleware/auth');

const router = express.Router();

// GET /api/notes — fetch all notes for logged in user
router.get('/', verifyToken, async (req, res) => {
    try {
        const notes = await Note.findAll({
            where: { user_id: req.user.id },
            order: [['updated_at', 'DESC']],
        });
        res.status(200).json(notes);
    } catch (error) {
        console.error('Fetch Notes Error:', error);
        res.status(500).json({ message: 'Failed to fetch notes.' });
    }
});

// POST /api/notes — create a new note
router.post('/', verifyToken, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        const note = await Note.create({
            user_id: req.user.id,
            title: title.trim(),
            content: content.trim(),
        });

        res.status(201).json(note);
    } catch (error) {
        console.error('Create Note Error:', error);
        res.status(500).json({ message: 'Failed to create note.' });
    }
});

// PUT /api/notes/:id — update a note
router.put('/:id', verifyToken, async (req, res) => {
    try {
        const note = await Note.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });

        if (!note) return res.status(404).json({ message: 'Note not found.' });

        const { title, content } = req.body;
        note.title   = title?.trim()   || note.title;
        note.content = content?.trim() || note.content;
        note.updated_at = new Date();
        await note.save();

        res.status(200).json(note);
    } catch (error) {
        console.error('Update Note Error:', error);
        res.status(500).json({ message: 'Failed to update note.' });
    }
});

// DELETE /api/notes/:id — delete a note
router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const note = await Note.findOne({
            where: { id: req.params.id, user_id: req.user.id }
        });

        if (!note) return res.status(404).json({ message: 'Note not found.' });

        await note.destroy();
        res.status(200).json({ message: 'Note deleted.' });
    } catch (error) {
        console.error('Delete Note Error:', error);
        res.status(500).json({ message: 'Failed to delete note.' });
    }
});

module.exports = router;
