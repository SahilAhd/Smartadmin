import React from 'react';
import { motion } from 'framer-motion';
import {
    StickyNote, ListTodo, Flame, BarChart2,
    Lightbulb, Brain, ArrowLeft, CheckCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const features = [
    {
        icon: <ListTodo size={28} className="text-purple-400" />,
        title: "Task Manager",
        desc: "Add, edit, delete and complete tasks. Every task is saved to your personal database — accessible from any device.",
        points: ["Add unlimited tasks", "Mark as complete", "Edit anytime", "Stored in MySQL"],
        color: "border-purple-500/30 hover:border-purple-500/60",
        glow: "bg-purple-500/5",
    },
    {
        icon: <StickyNote size={28} className="text-yellow-400" />,
        title: "Notes & Memos",
        desc: "Write quick notes, ideas, or reminders. Your personal memo pad — always saved, never lost.",
        points: ["Rich text notes", "Edit & update", "Instant save", "Per-user private"],
        color: "border-yellow-500/30 hover:border-yellow-500/60",
        glow: "bg-yellow-500/5",
    },
    {
        icon: <Flame size={28} className="text-orange-400" />,
        title: "Streak & Daily Planner",
        desc: "Track how many days in a row you complete tasks. See your best streak and today's pending tasks at a glance.",
        points: ["Daily streak counter", "Best streak record", "Today's task list", "Motivation messages"],
        color: "border-orange-500/30 hover:border-orange-500/60",
        glow: "bg-orange-500/5",
    },
    {
        icon: <BarChart2 size={28} className="text-emerald-400" />,
        title: "Analytics",
        desc: "Visual insights into your productivity. See completion rates, average time per task, and progress charts.",
        points: ["Bar chart — last 7 days", "Avg completion time", "Best productive day", "Full completed history"],
        color: "border-emerald-500/30 hover:border-emerald-500/60",
        glow: "bg-emerald-500/5",
    },
    {
        icon: <Lightbulb size={28} className="text-yellow-300" />,
        title: "Smart AI Suggestions",
        desc: "Gemini AI reads your pending tasks and tells you exactly what to focus on today — with reasoning.",
        points: ["Powered by Gemini AI", "Based on your real tasks", "3 actionable suggestions", "Refresh anytime"],
        color: "border-yellow-300/30 hover:border-yellow-300/60",
        glow: "bg-yellow-300/5",
    },
    {
        icon: <Brain size={28} className="text-purple-300" />,
        title: "Productivity Coach",
        desc: "Chat with your personal AI coach. Ask anything — it answers based on your actual task data, not generic advice.",
        points: ["Chat interface", "Personalized answers", "Based on your data", "Powered by Gemini AI"],
        color: "border-purple-300/30 hover:border-purple-300/60",
        glow: "bg-purple-300/5",
    },
];

const Features = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-16 max-w-7xl mx-auto">

            {/* Back button */}
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
                <h1 className="text-5xl font-black tracking-tight mb-4">
                    Everything You Need to{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                        Stay Productive
                    </span>
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                    SmartAdmin combines task management, AI insights, and productivity tracking
                    in one clean dashboard.
                </p>
            </motion.div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative bg-slate-900/60 border ${f.color} rounded-2xl p-6 transition-all overflow-hidden group`}
                    >
                        <div className={`absolute inset-0 ${f.glow} opacity-0 group-hover:opacity-100 transition-opacity`} />
                        <div className="relative z-10">
                            <div className="mb-4 p-3 w-fit rounded-xl bg-slate-800/80 border border-white/5">
                                {f.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">{f.title}</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                            <ul className="flex flex-col gap-1">
                                {f.points.map((p, j) => (
                                    <li key={j} className="flex items-center gap-2 text-xs text-slate-300">
                                        <CheckCircle size={12} className="text-cyan-400 shrink-0" />
                                        {p}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-16"
            >
                <p className="text-slate-400 mb-4">Ready to get started?</p>
                <button
                    onClick={() => navigate('/signup')}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl transition-all text-lg shadow-xl shadow-cyan-500/20"
                >
                    Create Free Account
                </button>
            </motion.div>
        </div>
    );
};

export default Features;
