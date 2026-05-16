import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, ArrowLeft, Send, Bot, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductivityCoach = () => {
    const navigate = useNavigate();
    const [question, setQuestion] = useState('');
    const [messages, setMessages] = useState([
        {
            role: 'bot',
            text: "Hi! I'm your AI Productivity Coach. Ask me anything about your tasks, habits, or productivity. I'll answer based on your real task data.",
        }
    ]);
    const [loading, setLoading] = useState(false);

    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    const askCoach = async (e) => {
        e.preventDefault();
        if (!question.trim() || loading) return;

        const userMsg = question.trim();
        setQuestion('');

        // Add user message to chat
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setLoading(true);

        try {
            const res = await fetch('http://localhost:5000/api/ai/coach', {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ question: userMsg }),
            });
            const data = await res.json();
            setMessages(prev => [...prev, {
                role: 'bot',
                text: data.answer || data.message || 'Something went wrong.',
            }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                role: 'bot',
                text: 'Failed to connect to AI. Make sure the backend is running.',
            }]);
        } finally {
            setLoading(false);
        }
    };

    // Quick question suggestions
    const quickQuestions = [
        "Why am I not completing tasks?",
        "What should I focus on today?",
        "How can I improve my productivity?",
        "Am I making progress?",
    ];

    return (
        <div className="min-h-screen bg-slate-950 text-white flex flex-col max-w-4xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => navigate('/user')}
                    className="p-2 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white"
                >
                    <ArrowLeft size={22} />
                </button>
                <div>
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                        <Brain className="text-purple-400" size={30} />
                        Productivity Coach
                    </h1>
                    <p className="text-slate-400 text-sm mt-1">
                        AI coach powered by Gemini — answers based on your real task data
                    </p>
                </div>
            </div>

            {/* Quick Questions */}
            <div className="flex flex-wrap gap-2 mb-6">
                {quickQuestions.map((q, i) => (
                    <button
                        key={i}
                        onClick={() => setQuestion(q)}
                        className="px-4 py-2 bg-slate-900/60 border border-white/10 hover:border-purple-500/40 text-slate-300 hover:text-purple-300 rounded-xl text-sm transition-all"
                    >
                        {q}
                    </button>
                ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 flex flex-col gap-4 mb-6 overflow-y-auto max-h-[50vh] pr-1">
                <AnimatePresence>
                    {messages.map((msg, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                        >
                            {/* Avatar */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0
                                ${msg.role === 'bot'
                                    ? 'bg-purple-500/20 border border-purple-500/30'
                                    : 'bg-cyan-500/20 border border-cyan-500/30'
                                }`}
                            >
                                {msg.role === 'bot'
                                    ? <Bot size={18} className="text-purple-400" />
                                    : <User size={18} className="text-cyan-400" />
                                }
                            </div>

                            {/* Bubble */}
                            <div className={`max-w-[80%] px-5 py-4 rounded-2xl text-sm leading-relaxed
                                ${msg.role === 'bot'
                                    ? 'bg-slate-900/80 border border-white/10 text-slate-200'
                                    : 'bg-cyan-500/10 border border-cyan-500/20 text-white'
                                }`}
                            >
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {/* Typing indicator */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex gap-3"
                    >
                        <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center shrink-0">
                            <Bot size={18} className="text-purple-400" />
                        </div>
                        <div className="px-5 py-4 bg-slate-900/80 border border-white/10 rounded-2xl">
                            <div className="flex gap-1 items-center h-4">
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input */}
            <form onSubmit={askCoach} className="flex gap-3">
                <input
                    type="text"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Ask your coach anything..."
                    disabled={loading}
                    className="flex-1 bg-slate-900/60 border border-white/10 focus:border-purple-500/50 rounded-2xl px-5 py-4 text-white placeholder-slate-500 focus:outline-none transition-all disabled:opacity-50"
                />
                <button
                    type="submit"
                    disabled={loading || !question.trim()}
                    className="px-6 py-4 bg-purple-500 hover:bg-purple-400 disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-2xl transition-all font-bold flex items-center gap-2"
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ProductivityCoach;
