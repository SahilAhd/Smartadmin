import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { StickyNote, Plus, Trash2, Pencil, Check, X, ArrowLeft, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000/api/notes';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const Notes = () => {
    const navigate = useNavigate();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    // New note form
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    // Edit state
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editContent, setEditContent] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const res = await fetch(API, { headers: getHeaders() });
            const data = await res.json();
            setNotes(data);
        } catch (err) {
            console.error('Fetch notes error:', err);
        } finally {
            setLoading(false);
        }
    };

    const addNote = async (e) => {
        e.preventDefault();
        if (!title.trim() || !content.trim()) return;

        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ title, content }),
            });
            const newNote = await res.json();
            setNotes([newNote, ...notes]);
            setTitle('');
            setContent('');
        } catch (err) {
            console.error('Add note error:', err);
        }
    };

    const deleteNote = async (id) => {
        try {
            await fetch(`${API}/${id}`, { method: 'DELETE', headers: getHeaders() });
            setNotes(notes.filter(n => n.id !== id));
        } catch (err) {
            console.error('Delete note error:', err);
        }
    };

    const startEdit = (note) => {
        setEditingId(note.id);
        setEditTitle(note.title);
        setEditContent(note.content);
    };

    const saveEdit = async (id) => {
        try {
            const res = await fetch(`${API}/${id}`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ title: editTitle, content: editContent }),
            });
            const updated = await res.json();
            setNotes(notes.map(n => n.id === id ? updated : n));
            setEditingId(null);
        } catch (err) {
            console.error('Update note error:', err);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric',
            hour: '2-digit', minute: '2-digit',
        });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-10 max-w-7xl mx-auto">

            {/* Header */}
            <div className="flex items-center gap-4 mb-10">
                <button
                    onClick={() => navigate('/user')}
                    className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={22} />
                </button>
                <div>
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <StickyNote className="text-yellow-400" size={30} />
                        Notes & Memos
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Your personal quick notes</p>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* LEFT — Add Note Form */}
                <div className="w-full lg:w-5/12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 sticky top-10"
                    >
                        <h2 className="text-lg font-bold mb-5 text-yellow-400 flex items-center gap-2">
                            <Plus size={20} /> New Note
                        </h2>
                        <form onSubmit={addNote} className="flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Note title..."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 transition-all"
                            />
                            <textarea
                                placeholder="Write your note here..."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                required
                                rows={6}
                                className="w-full bg-slate-800/50 border border-white/10 rounded-xl py-3 px-4 text-white placeholder-slate-500 focus:outline-none focus:border-yellow-500/50 transition-all resize-none"
                            />
                            <button
                                type="submit"
                                className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                            >
                                <Save size={18} /> Save Note
                            </button>
                        </form>

                        {/* Count */}
                        <div className="mt-6 text-center">
                            <p className="text-2xl font-black text-yellow-400">{notes.length}</p>
                            <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Total Notes</p>
                        </div>
                    </motion.div>
                </div>

                {/* RIGHT — Notes List */}
                <div className="w-full lg:w-7/12">
                    {loading ? (
                        <p className="text-slate-500 font-mono text-sm">Loading notes...</p>
                    ) : notes.length === 0 ? (
                        <p className="text-slate-500 font-mono text-sm">No notes yet. Write your first memo.</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <AnimatePresence mode="popLayout">
                                {notes.map((note, i) => (
                                    <motion.div
                                        key={note.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        className="bg-slate-900/60 border border-white/10 hover:border-yellow-500/30 rounded-2xl p-5 transition-all"
                                    >
                                        {editingId === note.id ? (
                                            // Edit mode
                                            <div className="flex flex-col gap-3">
                                                <input
                                                    className="bg-slate-800 border border-yellow-500/50 rounded-lg px-3 py-2 text-white focus:outline-none font-semibold"
                                                    value={editTitle}
                                                    onChange={(e) => setEditTitle(e.target.value)}
                                                />
                                                <textarea
                                                    className="bg-slate-800 border border-yellow-500/50 rounded-lg px-3 py-2 text-white focus:outline-none resize-none"
                                                    value={editContent}
                                                    onChange={(e) => setEditContent(e.target.value)}
                                                    rows={4}
                                                />
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => saveEdit(note.id)}
                                                        className="flex items-center gap-1 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 rounded-lg text-sm font-semibold"
                                                    >
                                                        <Check size={16} /> Save
                                                    </button>
                                                    <button
                                                        onClick={() => setEditingId(null)}
                                                        className="flex items-center gap-1 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-400 rounded-lg text-sm font-semibold"
                                                    >
                                                        <X size={16} /> Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        ) : (
                                            // View mode
                                            <>
                                                <div className="flex items-start justify-between gap-4 mb-3">
                                                    <h3 className="text-white font-bold text-lg leading-tight">
                                                        {note.title}
                                                    </h3>
                                                    <div className="flex gap-2 shrink-0">
                                                        <button
                                                            onClick={() => startEdit(note)}
                                                            className="p-2 text-yellow-400 hover:bg-yellow-400/10 rounded-lg transition-all"
                                                        >
                                                            <Pencil size={16} />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteNote(note.id)}
                                                            className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                                                        >
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </div>
                                                </div>
                                                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                                                    {note.content}
                                                </p>
                                                <p className="text-[10px] font-mono text-slate-500 mt-3 uppercase tracking-tighter">
                                                    {formatDate(note.updated_at)}
                                                </p>
                                            </>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notes;
