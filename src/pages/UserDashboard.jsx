import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  PlusCircle, 
  Lightbulb, 
  CheckCircle2, 
  User, 
  LogOut,
  Sparkles,
  Brain
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({ fullName: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('user');

    // If no token or user data → force to login
    if (!token || !stored) {
      navigate('/login');
      return;
    }

    // Load real user from localStorage
    setCurrentUser(JSON.parse(stored));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const cards = [
    { 
      title: "Notes & Memos", 
      icon: <FileText className="text-yellow-400" />, 
      desc: "Write quick notes and memos. Your personal memo pad saved to the cloud." 
    },
    { 
      title: "Add/Delete Task", 
      icon: <PlusCircle className="text-purple-400" />, 
      desc: "Create new objectives or remove outdated entries from your list." 
    },
    { 
      title: "Streak & Planner", 
      icon: <Lightbulb className="text-orange-400" />, 
      desc: "Track your daily streak and see all pending tasks for today." 
    },
    { 
      title: "Analytics", 
      icon: <CheckCircle2 className="text-emerald-400" />, 
      desc: "View your task completion stats, progress graphs and productivity insights." 
    },
    { 
      title: "Smart Suggestions", 
      icon: <Sparkles className="text-yellow-300" />, 
      desc: "AI reads your pending tasks and suggests what to focus on today." 
    },
    { 
      title: "Productivity Coach", 
      icon: <Brain className="text-purple-300" />, 
      desc: "Chat with your AI coach. Get personalized advice based on your real data." 
    },
  ];

  // Don't render until user is loaded
  if (!currentUser.fullName) return null;

  return (
    <div className="relative z-10 max-w-7xl mx-auto mt-10 px-6 pb-20">
      
      {/* Profile Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
        
        {/* Left: Welcome message with real name */}
        <div>
          <h2 className="text-4xl font-bold tracking-tight">
            Hey, <span className="text-cyan-400">{currentUser.fullName.split(' ')[0]}</span> 👋
          </h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
            <p className="text-slate-400 text-xs uppercase tracking-widest font-mono">Operations Active</p>
          </div>
        </div>

        {/* Right: User card with real name, no "Verified User" */}
        <div className="flex items-center gap-4 bg-slate-900/60 backdrop-blur-xl p-2 pl-4 pr-6 rounded-2xl border border-white/10 shadow-xl">
          <div className="relative">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <User size={24} className="text-white" />
            </div>
            {/* Green online dot */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-slate-900 rounded-full"></div>
          </div>

          <div>
            {/* Real user name from database */}
            <p className="text-sm font-bold text-white">{currentUser.fullName}</p>
            {/* Show email instead of "Verified User" */}
            <p className="text-[11px] text-slate-400">{currentUser.email}</p>
          </div>

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="ml-4 flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/60 text-red-400 rounded-xl transition-all font-semibold text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* THE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => (
          <motion.div
            key={i}
            onClick={() => {
              if (card.title === "Add/Delete Task")    navigate('/tasks');
              if (card.title === "Analytics")          navigate('/analytics');
              if (card.title === "Notes & Memos")      navigate('/notes');
              if (card.title === "Streak & Planner")   navigate('/streak');
              if (card.title === "Smart Suggestions")  navigate('/suggestions');
              if (card.title === "Productivity Coach") navigate('/coach');
            }}  
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ 
              y: -8, 
              backgroundColor: "rgba(30, 41, 59, 0.6)",
              borderColor: "rgba(34, 211, 238, 0.4)" 
            }}
            className="group relative bg-slate-900/40 backdrop-blur-md border border-white/10 p-8 rounded-[2rem] transition-all duration-300 cursor-pointer overflow-hidden"
          >
            <div className="absolute -inset-24 bg-cyan-500/5 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div className="relative z-10">
              <div className="mb-6 p-4 w-fit rounded-2xl bg-slate-800/80 border border-white/5 group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-white/90 group-hover:text-cyan-400 transition-colors">
                {card.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                {card.desc}
              </p>
              <div className="mt-6 flex items-center text-[10px] text-cyan-500/50 font-mono uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                Click to open manager →
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
