import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Flame, Trophy, Calendar, CheckCircle2, Clock, ArrowLeft, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000/api/streak';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const StreakPlanner = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        fetchStreak();
    }, []);

    const fetchStreak = async () => {
        try {
            const res = await fetch(API, { headers: getHeaders() });
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error('Streak fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Generate last 7 days for streak calendar
    const getLast7Days = () => {
        const days = [];
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            days.push({
                label: date.toLocaleDateString('en-IN', { weekday: 'short' }),
                date: date.toISOString().split('T')[0],
                isToday: i === 0,
            });
        }
        return days;
    };

    const getStreakEmoji = (streak) => {
        if (streak >= 30) return '🏆';
        if (streak >= 14) return '🔥';
        if (streak >= 7)  return '⚡';
        if (streak >= 3)  return '✅';
        return '🌱';
    };

    const getMotivationMessage = (streak) => {
        if (streak === 0)  return "Complete a task today to start your streak!";
        if (streak === 1)  return "Great start! Come back tomorrow to keep it going.";
        if (streak < 7)    return `${streak} days strong! Keep the momentum going.`;
        if (streak < 14)   return `One week streak! You're building a great habit.`;
        if (streak < 30)   return `${streak} days! You're on fire 🔥`;
        return `${streak} days! You're a productivity legend 🏆`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono">
                Loading...
            </div>
        );
    }

    const last7Days = getLast7Days();
    const lastActiveDate = data?.lastActive;

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
                        <Flame className="text-orange-400" size={30} />
                        Streak & Daily Planner
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Track your consistency and plan your day</p>
                </div>
            </div>

            {/* ── STREAK SECTION ── */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">

                {/* Current Streak Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-orange-500/20 to-red-500/10 border border-orange-500/30 rounded-2xl p-6 text-center"
                >
                    <p className="text-6xl mb-2">{getStreakEmoji(data?.currentStreak)}</p>
                    <p className="text-5xl font-black text-orange-400">{data?.currentStreak ?? 0}</p>
                    <p className="text-slate-300 font-semibold mt-1">Current Streak</p>
                    <p className="text-xs text-slate-400 font-mono mt-1">DAYS IN A ROW</p>
                </motion.div>

                {/* Best Streak Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-yellow-500/20 to-amber-500/10 border border-yellow-500/30 rounded-2xl p-6 text-center"
                >
                    <Trophy size={40} className="text-yellow-400 mx-auto mb-2" />
                    <p className="text-5xl font-black text-yellow-400">{data?.bestStreak ?? 0}</p>
                    <p className="text-slate-300 font-semibold mt-1">Best Streak</p>
                    <p className="text-xs text-slate-400 font-mono mt-1">PERSONAL RECORD</p>
                </motion.div>

                {/* Today's Progress Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border border-cyan-500/30 rounded-2xl p-6 text-center"
                >
                    <CheckCircle2 size={40} className="text-cyan-400 mx-auto mb-2" />
                    <p className="text-5xl font-black text-cyan-400">{data?.completedToday ?? 0}</p>
                    <p className="text-slate-300 font-semibold mt-1">Completed Today</p>
                    <p className="text-xs text-slate-400 font-mono mt-1">TASKS DONE</p>
                </motion.div>
            </div>

            {/* Motivation Message */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mb-10 flex items-center gap-3 bg-orange-500/10 border border-orange-500/20 rounded-2xl px-6 py-4"
            >
                <Flame size={20} className="text-orange-400 shrink-0" />
                <p className="text-orange-300 font-semibold">
                    {getMotivationMessage(data?.currentStreak ?? 0)}
                </p>
            </motion.div>

            {/* Last 7 Days Calendar */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 mb-10"
            >
                <h2 className="text-lg font-bold mb-6 text-slate-200 flex items-center gap-2">
                    <Calendar size={20} className="text-cyan-400" />
                    Last 7 Days
                </h2>
                <div className="grid grid-cols-7 gap-3">
                    {last7Days.map((day, i) => {
                        const isActive = lastActiveDate && day.date <= lastActiveDate &&
                            day.date >= new Date(new Date(lastActiveDate).setDate(
                                new Date(lastActiveDate).getDate() - (data?.currentStreak - 1)
                            )).toISOString().split('T')[0];

                        return (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <span className="text-xs text-slate-400 font-mono">{day.label}</span>
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-all
                                    ${day.isToday
                                        ? 'border-2 border-cyan-400 bg-cyan-400/10'
                                        : isActive
                                            ? 'bg-orange-500/30 border border-orange-500/50'
                                            : 'bg-slate-800/50 border border-white/5'
                                    }`}
                                >
                                    {isActive ? '🔥' : day.isToday ? '📅' : '○'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </motion.div>

            {/* ── DAILY PLANNER SECTION ── */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6"
            >
                <h2 className="text-lg font-bold mb-6 text-slate-200 flex items-center gap-2">
                    <Target size={20} className="text-purple-400" />
                    Today's Pending Tasks
                </h2>

                {data?.pendingTasks?.length === 0 ? (
                    <div className="text-center py-10">
                        <CheckCircle2 size={40} className="text-emerald-400 mx-auto mb-3" />
                        <p className="text-emerald-400 font-semibold">All tasks completed!</p>
                        <p className="text-slate-500 text-sm mt-1">Nothing pending. Add new tasks to keep going.</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {data?.pendingTasks?.map((task, i) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-center justify-between p-4 bg-slate-800/50 border border-white/5 rounded-xl hover:border-purple-500/30 transition-all"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-purple-400 rounded-full shrink-0" />
                                    <span className="text-white font-medium">{task.text}</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                                    <Clock size={12} />
                                    {new Date(task.created_at).toLocaleDateString('en-IN', {
                                        day: '2-digit', month: 'short'
                                    })}
                                </div>
                            </motion.div>
                        ))}
                        <p className="text-xs text-slate-500 font-mono mt-2 text-center">
                            {data.pendingTasks.length} task{data.pendingTasks.length > 1 ? 's' : ''} remaining →
                            <button
                                onClick={() => navigate('/tasks')}
                                className="text-cyan-400 hover:underline ml-1"
                            >
                                Go to Task Manager
                            </button>
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default StreakPlanner;
