import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Pencil, Check, X, Terminal, LayoutList, CheckCircle2 } from 'lucide-react';

const API = 'http://localhost:5000/api/tasks';

// Helper — get token from localStorage for every request
const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const AddTaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editText, setEditText] = useState('');
    const [loading, setLoading] = useState(true);

    // ── Fetch all tasks for this user on load ──
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const res = await fetch(API, { headers: getHeaders() });
            const data = await res.json();
            setTasks(data);
        } catch (err) {
            console.error('Failed to fetch tasks:', err);
        } finally {
            setLoading(false);
        }
    };

    // ── Add new task ──
    const addTask = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        try {
            const res = await fetch(API, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ text: input }),
            });
            const newTask = await res.json();
            setTasks([newTask, ...tasks]); // add to top of list
            setInput('');
        } catch (err) {
            console.error('Failed to add task:', err);
        }
    };

    // ── Delete task ──
    const deleteTask = async (id) => {
        try {
            await fetch(`${API}/${id}`, {
                method: 'DELETE',
                headers: getHeaders(),
            });
            setTasks(tasks.filter(t => t.id !== id));
        } catch (err) {
            console.error('Failed to delete task:', err);
        }
    };

    // ── Mark task as completed ──
    const completeTask = async (id) => {
        try {
            const res = await fetch(`${API}/${id}/complete`, {
                method: 'PUT',
                headers: getHeaders(),
            });
            const updated = await res.json();
            setTasks(tasks.map(t => t.id === id ? updated : t));
        } catch (err) {
            console.error('Failed to complete task:', err);
        }
    };

    // ── Edit task (local state only — no edit API needed for now) ──
    const startEdit = (task) => {
        setEditingId(task.id);
        setEditText(task.text);
    };

    const saveEdit = (id) => {
        // Update locally for now
        setTasks(tasks.map(t => t.id === id ? { ...t, text: editText } : t));
        setEditingId(null);
    };

    // ── Format timestamp ──
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
            + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="flex flex-col lg:flex-row min-h-[90vh] w-full bg-slate-950 text-white relative z-10 font-sans">

            {/* LEFT SIDE: INPUT CONSOLE */}
            <div className="w-full lg:w-5/12 flex flex-col justify-center p-8 lg:p-16 border-r border-white/5 bg-slate-900/10">
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="max-w-md w-full mx-auto lg:mx-0">
                    <div className="flex items-center gap-3 mb-2 text-cyan-400">
                        <Terminal size={24} />
                    </div>
                    <h1 className="text-4xl font-black mb-8 tracking-tighter">
                        Task <span className="text-cyan-400">Injector</span>
                    </h1>
                    <form onSubmit={addTask} className="space-y-4">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Enter manual objective..."
                            className="w-full bg-slate-900/50 border border-white/10 rounded-2xl py-5 px-6 text-lg focus:outline-none focus:border-cyan-500/50 transition-all font-mono"
                        />
                        <button
                            type="submit"
                            className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold py-5 rounded-2xl transition-all flex items-center justify-center gap-3 text-lg shadow-xl shadow-cyan-500/20"
                        >
                            <Plus size={24} strokeWidth={3} /> ADD_TO_REGISTRY
                        </button>
                    </form>

                    {/* Stats */}
                    <div className="mt-10 flex gap-6">
                        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex-1 text-center">
                            <p className="text-2xl font-bold text-white">{tasks.filter(t => t.status === 'pending').length}</p>
                            <p className="text-xs text-slate-400 font-mono mt-1">PENDING</p>
                        </div>
                        <div className="bg-slate-900/50 border border-white/5 rounded-2xl p-4 flex-1 text-center">
                            <p className="text-2xl font-bold text-cyan-400">{tasks.filter(t => t.status === 'completed').length}</p>
                            <p className="text-xs text-slate-400 font-mono mt-1">COMPLETED</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* RIGHT SIDE: TASK REGISTRY */}
            <div className="w-full lg:w-7/12 p-8 lg:p-16 overflow-y-auto bg-slate-950/40 backdrop-blur-sm">
                <div className="flex items-center gap-3 text-slate-400 font-mono mb-10">
                    <LayoutList size={24} />
                    <h2 className="text-xl font-bold tracking-widest uppercase">Live_Registry</h2>
                </div>

                {loading ? (
                    <p className="text-slate-500 font-mono text-sm">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p className="text-slate-500 font-mono text-sm">No tasks yet. Add your first objective.</p>
                ) : (
                    <div className="flex flex-col gap-4">
                        <AnimatePresence mode="popLayout">
                            {tasks.map((task) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    className={`flex items-center justify-between p-6 backdrop-blur-md border rounded-3xl transition-all group
                                        ${task.status === 'completed'
                                            ? 'bg-emerald-900/10 border-emerald-500/20'
                                            : 'bg-slate-900/60 border-white/10 hover:border-cyan-500/40'
                                        }`}
                                >
                                    <div className="flex flex-col flex-1 mr-4">
                                        {editingId === task.id ? (
                                            <div className="flex items-center gap-2">
                                                <input
                                                    className="bg-slate-800 border border-cyan-500/50 rounded-lg px-3 py-1 text-white w-full focus:outline-none font-mono"
                                                    value={editText}
                                                    onChange={(e) => setEditText(e.target.value)}
                                                    autoFocus
                                                />
                                                <button onClick={() => saveEdit(task.id)} className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg">
                                                    <Check size={20} />
                                                </button>
                                                <button onClick={() => setEditingId(null)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg">
                                                    <X size={20} />
                                                </button>
                                            </div>
                                        ) : (
                                            <>
                                                <span className={`text-lg font-medium transition-colors
                                                    ${task.status === 'completed'
                                                        ? 'line-through text-slate-500'
                                                        : 'text-white group-hover:text-cyan-400'
                                                    }`}>
                                                    {task.text}
                                                </span>
                                                <span className="text-[10px] font-mono text-slate-500 mt-1 uppercase tracking-tighter">
                                                    Added: {formatDate(task.created_at)}
                                                </span>
                                                {task.completed_at && (
                                                    <span className="text-[10px] font-mono text-emerald-500/70 mt-0.5 uppercase tracking-tighter">
                                                        Completed: {formatDate(task.completed_at)}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </div>

                                    <div className="flex gap-2">
                                        {/* Complete button — only show if pending */}
                                        {task.status === 'pending' && (
                                            <button
                                                onClick={() => completeTask(task.id)}
                                                className="p-3 text-emerald-400 hover:bg-emerald-400/10 rounded-2xl transition-all border border-white/5"
                                                title="Mark complete"
                                            >
                                                <CheckCircle2 size={20} />
                                            </button>
                                        )}

                                        {/* Edit button — only show if pending */}
                                        {task.status === 'pending' && (
                                            <button
                                                onClick={() => startEdit(task)}
                                                className="p-3 text-cyan-400 hover:bg-cyan-400/10 rounded-2xl transition-all border border-white/5"
                                                title="Edit task"
                                            >
                                                <Pencil size={20} />
                                            </button>
                                        )}

                                        {/* Delete button — always show */}
                                        <button
                                            onClick={() => deleteTask(task.id)}
                                            className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-2xl transition-all"
                                            title="Delete task"
                                        >
                                            <Trash2 size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddTaskManager;
