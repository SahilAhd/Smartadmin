import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
    Tooltip, ResponsiveContainer
} from 'recharts';
import {
    CheckCircle2, Clock, Zap, Calendar,
    ArrowLeft, BarChart2, ListChecks
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:5000/api/tasks/analytics';

const getHeaders = () => ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
});

const Analytics = () => {
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) { navigate('/login'); return; }
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const res = await fetch(API, { headers: getHeaders() });
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error('Analytics fetch error:', err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return d.toLocaleDateString('en-IN', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    const getDaysToComplete = (created, completed) => {
        if (!completed) return '—';
        const diff = new Date(completed) - new Date(created);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return days === 0 ? 'Same day' : `${days} day${days > 1 ? 's' : ''}`;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400 font-mono">
                Loading analytics...
            </div>
        );
    }

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
                        <BarChart2 className="text-cyan-400" size={30} />
                        Analytics
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">Your productivity insights</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
                {[
                    {
                        label: 'Total Tasks',
                        value: data?.totalTasks ?? 0,
                        icon: <ListChecks size={20} className="text-blue-400" />,
                        color: 'text-blue-400',
                    },
                    {
                        label: 'Completed',
                        value: data?.totalCompleted ?? 0,
                        icon: <CheckCircle2 size={20} className="text-emerald-400" />,
                        color: 'text-emerald-400',
                    },
                    {
                        label: 'Avg Days to Complete',
                        value: data?.avgCompletionDays > 0 ? `${data.avgCompletionDays}d` : '—',
                        icon: <Clock size={20} className="text-yellow-400" />,
                        color: 'text-yellow-400',
                    },
                    {
                        label: 'Best Day',
                        value: data?.totalCompleted > 0 ? data.bestDay : '—',
                        icon: <Calendar size={20} className="text-purple-400" />,
                        color: 'text-purple-400',
                    },
                ].map((card, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-slate-900/60 border border-white/10 rounded-2xl p-5"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            {card.icon}
                            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">
                                {card.label}
                            </span>
                        </div>
                        <p className={`text-3xl font-black ${card.color}`}>{card.value}</p>
                    </motion.div>
                ))}
            </div>

            {/* Speed Label */}
            {data?.speedLabel && data.speedLabel !== 'No data yet' && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-10 flex items-center gap-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl px-6 py-4"
                >
                    <Zap size={20} className="text-cyan-400" />
                    <p className="text-cyan-300 font-semibold">{data.speedLabel}</p>
                    <span className="text-slate-400 text-sm">
                        — based on your average completion time of {data.avgCompletionDays} days
                    </span>
                </motion.div>
            )}

            {/* Bar Chart — Tasks completed per day (last 7 days) */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6 mb-10"
            >
                <h2 className="text-lg font-bold mb-6 text-slate-200">
                    Tasks Completed — Last 7 Days
                </h2>
                {data?.last7Days?.every(d => d.completed === 0) ? (
                    <p className="text-slate-500 font-mono text-sm text-center py-10">
                        No completed tasks in the last 7 days yet.
                    </p>
                ) : (
                    <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={data?.last7Days} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                allowDecimals={false}
                                tick={{ fill: '#94a3b8', fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#0f172a',
                                    border: '1px solid #1e293b',
                                    borderRadius: '12px',
                                    color: '#e2e8f0',
                                }}
                                cursor={{ fill: 'rgba(34,211,238,0.05)' }}
                            />
                            <Bar
                                dataKey="completed"
                                fill="#22d3ee"
                                radius={[6, 6, 0, 0]}
                                name="Completed"
                            />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </motion.div>

            {/* Completed Tasks List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-6"
            >
                <h2 className="text-lg font-bold mb-6 text-slate-200 flex items-center gap-2">
                    <CheckCircle2 size={20} className="text-emerald-400" />
                    Completed Tasks
                </h2>

                {data?.completedTasks?.length === 0 ? (
                    <p className="text-slate-500 font-mono text-sm text-center py-10">
                        No completed tasks yet. Start completing tasks to see your history.
                    </p>
                ) : (
                    <div className="flex flex-col gap-3">
                        {data?.completedTasks?.map((task, i) => (
                            <motion.div
                                key={task.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-emerald-900/10 border border-emerald-500/20 rounded-2xl gap-2"
                            >
                                <div className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                                    <span className="text-white font-medium">{task.text}</span>
                                </div>
                                <div className="flex gap-4 text-xs font-mono text-slate-400 pl-7 sm:pl-0">
                                    <span>Added: {formatDate(task.created_at)}</span>
                                    <span>Done: {formatDate(task.completed_at)}</span>
                                    <span className="text-cyan-400">
                                        {getDaysToComplete(task.created_at, task.completed_at)}
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </motion.div>
        </div>
    );
};

export default Analytics;
