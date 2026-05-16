import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lightbulb, ArrowLeft, Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TaskSuggestions = () => {
    const navigate = useNavigate();
    const [suggestions, setSuggestions] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetched, setFetched] = useState(false);

    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const fetchSuggestions = async () => {
        setLoading(true);
        setSuggestions('');
        try {
            const res = await fetch('http://localhost:5000/api/ai/suggestions', {
                method: 'POST',
                headers: getHeaders(),
            });
            const data = await res.json();
            setSuggestions(data.suggestions);
            setFetched(true);
        } catch (err) {
            setSuggestions('Failed to connect to AI. Make sure the backend is running.');
        } finally {
            setLoading(false);
        }
    };

    // Parse numbered suggestions into array
    const parseSuggestions = (text) => {
        if (!text) return [];
        const lines = text.split('\n').filter(l => l.trim());
        const items = [];
        let current = '';
        lines.forEach(line => {
            if (/^\d+\./.test(line.trim())) {
                if (current) items.push(current.trim());
                current = line.replace(/^\d+\.\s*/, '');
            } else {
                current += ' ' + line;
            }
        });
        if (current) items.push(current.trim());
        return items.length > 0 ? items : [text];
    };

    const suggestionItems = parseSuggestions(suggestions);

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-10 max-w-4xl mx-auto">

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
                        <Lightbulb className="text-yellow-400" size={30} />
                        Smart Task Suggestions
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        AI reads your pending tasks and tells you what to focus on
                    </p>
                </div>
            </div>

            {/* Get Suggestions Button */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/60 border border-white/10 rounded-2xl p-8 mb-8 text-center"
            >
                <Sparkles size={48} className="text-yellow-400 mx-auto mb-4" />
                <h2 className="text-xl font-bold mb-2">
                    {fetched ? 'Want fresh suggestions?' : 'Ready to get AI suggestions?'}
                </h2>
                <p className="text-slate-400 text-sm mb-6">
                    Gemini AI will analyze your pending tasks and suggest the best approach for today.
                </p>
                <button
                    onClick={fetchSuggestions}
                    disabled={loading}
                    className="flex items-center gap-3 mx-auto px-8 py-4 bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-bold rounded-2xl transition-all text-lg shadow-xl shadow-yellow-500/20"
                >
                    {loading ? (
                        <>
                            <RefreshCw size={20} className="animate-spin" />
                            Analyzing your tasks...
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            {fetched ? 'Refresh Suggestions' : 'Get AI Suggestions'}
                        </>
                    )}
                </button>
            </motion.div>

            {/* Suggestions Output */}
            {suggestions && !loading && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col gap-4"
                >
                    {suggestionItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.15 }}
                            className="flex gap-4 p-6 bg-slate-900/60 border border-yellow-500/20 rounded-2xl"
                        >
                            <div className="w-8 h-8 rounded-xl bg-yellow-500/20 border border-yellow-500/30 flex items-center justify-center shrink-0 font-black text-yellow-400">
                                {i + 1}
                            </div>
                            <p className="text-slate-200 leading-relaxed">{item}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Loading skeleton */}
            {loading && (
                <div className="flex flex-col gap-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-slate-900/40 border border-white/5 rounded-2xl animate-pulse" />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TaskSuggestions;
