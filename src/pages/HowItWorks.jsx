import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, ListTodo, Brain, ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const steps = [
    {
        step: "01",
        icon: <UserPlus size={32} className="text-cyan-400" />,
        title: "Create Your Account",
        desc: "Sign up in seconds. Your data is securely stored in a personal database — completely private to you.",
        color: "border-cyan-500/30",
        glow: "from-cyan-500/10",
    },
    {
        step: "02",
        icon: <ListTodo size={32} className="text-purple-400" />,
        title: "Add Your Tasks & Notes",
        desc: "Start adding tasks, write notes, and build your daily routine. Everything syncs to your account instantly.",
        color: "border-purple-500/30",
        glow: "from-purple-500/10",
    },
    {
        step: "03",
        icon: <Brain size={32} className="text-yellow-400" />,
        title: "Get AI-Powered Insights",
        desc: "Let Gemini AI analyze your tasks and give you smart suggestions, productivity coaching, and weekly insights.",
        color: "border-yellow-500/30",
        glow: "from-yellow-500/10",
    },
];

const HowItWorks = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-white px-6 py-16 max-w-5xl mx-auto">

            <button
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-slate-400 hover:text-white mb-10 transition-colors"
            >
                <ArrowLeft size={18} /> Back to Home
            </button>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-16"
            >
                <h1 className="text-5xl font-black tracking-tight mb-4">
                    How{' '}
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
                        SmartAdmin
                    </span>{' '}
                    Works
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                    Three simple steps to transform how you manage your day.
                </p>
            </motion.div>

            {/* Steps */}
            <div className="flex flex-col gap-6">
                {steps.map((s, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.2 }}
                        className={`flex gap-6 items-start bg-gradient-to-r ${s.glow} to-transparent border ${s.color} rounded-2xl p-8`}
                    >
                        <div className="text-5xl font-black text-white/10 shrink-0 w-16">{s.step}</div>
                        <div className="flex flex-col gap-3">
                            <div className="p-3 w-fit rounded-xl bg-slate-800/80 border border-white/5">
                                {s.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-white">{s.title}</h3>
                            <p className="text-slate-400 leading-relaxed">{s.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Arrow connectors */}
            <div className="flex flex-col items-center gap-0 my-2">
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="text-center mt-16 flex flex-col sm:flex-row gap-4 justify-center"
            >
                <button
                    onClick={() => navigate('/signup')}
                    className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl transition-all text-lg shadow-xl shadow-cyan-500/20 flex items-center gap-2 justify-center"
                >
                    Get Started Free <ArrowRight size={20} />
                </button>
                <button
                    onClick={() => navigate('/features')}
                    className="px-8 py-4 bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-white font-bold rounded-2xl transition-all text-lg"
                >
                    See All Features
                </button>
            </motion.div>
        </div>
    );
};

export default HowItWorks;
