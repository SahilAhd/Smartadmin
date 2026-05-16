import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ArrowLeft, Code2, Sparkles } from 'lucide-react';
import logo from '../assets/logoadmin.png';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    const techStack = [
        { category: "Frontend",  items: ["React 19", "Vite", "Tailwind CSS v4", "Framer Motion", "Recharts"] },
        { category: "Backend",   items: ["Node.js", "Express 5", "Sequelize ORM", "JWT Auth", "bcryptjs"] },
        { category: "Database",  items: ["MySQL", "MySQL Workbench"] },
        { category: "AI",        items: ["Google Gemini API", "Gemini 1.5 Flash"] },
    ];

    const features = [
        "Task Manager with full CRUD",
        "Notes & Memos saved to cloud",
        "Streak Tracker & Daily Planner",
        "Analytics with bar charts",
        "AI Smart Task Suggestions",
        "AI Productivity Coach (chat)",
        "JWT-based authentication",
        "Per-user private data",
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-16 max-w-5xl mx-auto">

            {/* Back */}
            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors"
            >
                <ArrowLeft size={18} /> Back to Home
            </button>

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <div className="flex items-center justify-center gap-3 mb-4">
                    <img src={logo} alt="SmartAdmin" className="w-12 h-12 object-contain" />
                    <h1 className="text-5xl font-black tracking-tight">SmartAdmin</h1>
                </div>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
                    An AI-powered task management platform built to help you stay organized,
                    track your productivity, and get smart insights — all in one place.
                </p>
            </motion.div>

            {/* About the Project */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-8"
            >
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Code2 size={22} className="text-cyan-400" /> About the Project
                </h2>
                <p className="text-slate-300 leading-relaxed mb-4">
                    SmartAdmin was built as a full-stack web application combining a modern React frontend
                    with a Node.js + Express backend and MySQL database. The goal was to create a
                    genuinely useful productivity tool — not just a demo — with real AI integration
                    using Google's Gemini API.
                </p>
                <p className="text-slate-300 leading-relaxed">
                    Every feature stores data per-user in MySQL, meaning your tasks, notes, and streaks
                    are private to you and accessible from any device after login.
                </p>
            </motion.div>

            {/* Features List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-8"
            >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Sparkles size={22} className="text-yellow-400" /> What's Inside
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {features.map((f, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-300">
                            <div className="w-2 h-2 bg-cyan-400 rounded-full shrink-0" />
                            {f}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Tech Stack */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-8"
            >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Code2 size={22} className="text-purple-400" /> Tech Stack
                </h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {techStack.map((t, i) => (
                        <div key={i}>
                            <p className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-3">
                                {t.category}
                            </p>
                            <ul className="flex flex-col gap-2">
                                {t.items.map((item, j) => (
                                    <li key={j} className="text-sm text-slate-300 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-cyan-400/60 rounded-full" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Developer */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-cyan-500/10 to-blue-500/5 border border-cyan-500/20 rounded-2xl p-8"
            >
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    Built by
                </h2>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-2xl font-black shrink-0">
                        S
                    </div>
                    <div className="flex flex-col gap-3">
                        <div>
                            <p className="text-xl font-bold text-white">Sahil Ahmad</p>
                            <p className="text-slate-400 text-sm">Frontend Developer</p>
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                <Mail size={14} className="text-cyan-400" />
                                justsahilforbusiness@gmail.com
                            </div>
                            <div className="flex items-center gap-2 text-slate-300 text-sm">
                                <MapPin size={14} className="text-cyan-400" />
                                Delhi, India
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    );
};

export default About;
