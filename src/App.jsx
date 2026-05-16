import React from 'react';
import { motion } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation, Navigate, useNavigate } from "react-router-dom";
import { ArrowRight, Zap, Shield, BarChart2 } from 'lucide-react';
import logo from './assets/logoadmin.png';
import BackgroundParticles from './assets/BackgroundParticles';
import NavMenu from './assets/NavMenu';
import bot from "./assets/AI.webp";
import Signup from "./pages/signup";
import Login from "./pages/Login";
import Footer from "./pages/footer";
import UserDashboard from "./pages/UserDashboard";
import AddTaskManager from "./pages/AddtaskManager";
import Analytics from "./pages/Analytics";
import Notes from "./pages/Notes";
import StreakPlanner from "./pages/StreakPlanner";
import TaskSuggestions from "./pages/TaskSuggestions";
import ProductivityCoach from "./pages/ProductivityCoach";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import About from "./pages/About";

// Pages that hide the public navbar + footer
const HIDDEN_NAV_PAGES = ['/user', '/analytics', '/notes', '/streak', '/suggestions', '/coach', '/tasks'];

// ── Homepage ──────────────────────────────────────────────────────────────────
const HomePage = () => {
  const navigate = useNavigate();

  const highlights = [
    { icon: <Zap size={18} className="text-cyan-400" />,       label: "AI-Powered" },
    { icon: <Shield size={18} className="text-emerald-400" />,  label: "Secure & Private" },
    { icon: <BarChart2 size={18} className="text-purple-400" />, label: "Real Analytics" },
  ];

  const featureCards = [
    { emoji: "📋", title: "Task Manager",       desc: "Add, complete and track tasks saved to your personal database." },
    { emoji: "🗒️", title: "Notes & Memos",      desc: "Quick notes and memos — always saved, never lost." },
    { emoji: "🔥", title: "Streak Tracker",     desc: "Build daily habits with streak tracking and motivation." },
    { emoji: "📊", title: "Analytics",          desc: "Visual charts showing your productivity over time." },
    { emoji: "💡", title: "AI Suggestions",     desc: "Gemini AI tells you what to focus on based on your tasks." },
    { emoji: "🧠", title: "Productivity Coach", desc: "Chat with AI that knows your real data and gives personal advice." },
  ];

  return (
    <div className="relative z-10">

      {/* ── HERO SECTION ── */}
      <section className="min-h-[90vh] flex items-center px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-12 max-w-7xl mx-auto">

          {/* Left — Text */}
          <div className="flex-1 max-w-2xl">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm font-mono mb-6"
            >
              <Zap size={14} /> AI-Powered Task Management
            </motion.div>

            <motion.h1
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="text-5xl lg:text-6xl font-black leading-tight tracking-tight mb-4"
            >
              Stop Forgetting.{' '}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 text-transparent bg-clip-text">
                Start Achieving.
              </span>
            </motion.h1>

            <motion.p
              initial={{ x: -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl"
            >
              SmartAdmin combines task management, AI coaching, streak tracking,
              and real analytics — all in one clean dashboard built for people who want to get things done.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <button
                onClick={() => navigate('/signup')}
                className="flex items-center gap-2 px-7 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-2xl transition-all text-lg shadow-xl shadow-cyan-500/25"
              >
                Get Started Free <ArrowRight size={20} />
              </button>
              <button
                onClick={() => navigate('/how-it-works')}
                className="flex items-center gap-2 px-7 py-4 bg-slate-900/60 hover:bg-slate-800 border border-white/10 text-white font-semibold rounded-2xl transition-all text-lg"
              >
                How It Works
              </button>
            </motion.div>

            {/* Highlights row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {highlights.map((h, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  {h.icon}
                  <span>{h.label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Bot Image */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.9 }}
            className="flex-shrink-0"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-75" />
              <img
                src={bot}
                alt="SmartAdmin AI"
                className="relative w-[340px] lg:w-[420px] border-4 rounded-3xl border-cyan-500/50 shadow-2xl shadow-cyan-500/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="border-y border-white/5 bg-slate-900/30 py-6 px-8"
      >
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-10 text-center">
          {[
            { value: "6",      label: "AI Features" },
            { value: "100%",   label: "Private Data" },
            { value: "MySQL",  label: "Secure Storage" },
            { value: "Free",   label: "To Get Started" },
          ].map((s, i) => (
            <div key={i}>
              <p className="text-2xl font-black text-cyan-400">{s.value}</p>
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── FEATURES PREVIEW ── */}
      <section className="px-8 lg:px-16 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-black mb-3">
            Everything in{' '}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
              One Place
            </span>
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Six powerful features working together to keep you productive every day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featureCards.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ y: -6, borderColor: 'rgba(34,211,238,0.3)' }}
              className="bg-slate-900/50 border border-white/8 rounded-2xl p-6 transition-all cursor-default"
            >
              <span className="text-3xl mb-4 block">{f.emoji}</span>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <button
            onClick={() => navigate('/features')}
            className="px-6 py-3 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 rounded-xl transition-all text-sm font-semibold"
          >
            See Full Feature Details →
          </button>
        </div>
      </section>

      {/* ── HOW IT WORKS PREVIEW ── */}
      <section className="px-8 lg:px-16 py-16 bg-slate-900/20 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-black mb-10">
            Up and running in{' '}
            <span className="text-cyan-400">3 steps</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {[
              { n: "1", t: "Sign Up",          c: "text-cyan-400" },
              { n: "→", t: "",                 c: "text-slate-600" },
              { n: "2", t: "Add Your Tasks",   c: "text-purple-400" },
              { n: "→", t: "",                 c: "text-slate-600" },
              { n: "3", t: "Get AI Insights",  c: "text-yellow-400" },
            ].map((s, i) => (
              s.t ? (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div className={`w-12 h-12 rounded-xl bg-slate-900/80 border border-white/10 flex items-center justify-center text-xl font-black ${s.c}`}>
                    {s.n}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">{s.t}</span>
                </div>
              ) : (
                <span key={i} className="text-slate-600 text-2xl hidden sm:block">→</span>
              )
            ))}
          </div>
          <button
            onClick={() => navigate('/how-it-works')}
            className="mt-8 px-6 py-3 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-400 rounded-xl transition-all text-sm font-semibold"
          >
            Learn More →
          </button>
        </div>
      </section>

    </div>
  );
};

// ── App Content ───────────────────────────────────────────────────────────────
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHiddenNavPage = HIDDEN_NAV_PAGES.includes(location.pathname);

  return (
    <div className="relative min-h-screen bg-slate-950 text-white overflow-x-hidden">

      <BackgroundParticles />

      {/* NAVBAR */}
      {!isHiddenNavPage && (
        <nav className="flex items-center justify-between px-8 py-4 bg-slate-900/60 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">

          {/* Logo */}
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => navigate('/')}
          >
            <img src={logo} alt="SmartAdmin" className="w-8 h-8 object-contain" />
            <span className="font-black text-xl tracking-tighter">SmartAdmin</span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => navigate('/features')}
              className="px-5 py-2 text-slate-300 hover:text-cyan-400 font-medium text-sm rounded-xl hover:bg-white/5 transition-all"
            >
              Features
            </button>
            <button
              onClick={() => navigate('/how-it-works')}
              className="px-5 py-2 text-slate-300 hover:text-cyan-400 font-medium text-sm rounded-xl hover:bg-white/5 transition-all"
            >
              How It Works
            </button>
            <button
              onClick={() => navigate('/about')}
              className="px-5 py-2 text-slate-300 hover:text-cyan-400 font-medium text-sm rounded-xl hover:bg-white/5 transition-all"
            >
              About
            </button>
          </div>

          <NavMenu />
        </nav>
      )}

      <Routes>
        <Route path="/"            element={<HomePage />} />
        <Route path="/features"     element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/about"        element={<About />} />
        <Route path="/signup"      element={localStorage.getItem('token') ? <Navigate to="/user" /> : <Signup />} />
        <Route path="/login"       element={localStorage.getItem('token') ? <Navigate to="/user" /> : <Login />} />
        <Route path="/user"        element={<UserDashboard />} />
        <Route path="/tasks"       element={<AddTaskManager />} />
        <Route path="/analytics"   element={<Analytics />} />
        <Route path="/notes"       element={<Notes />} />
        <Route path="/streak"      element={<StreakPlanner />} />
        <Route path="/suggestions" element={<TaskSuggestions />} />
        <Route path="/coach"       element={<ProductivityCoach />} />
      </Routes>

      {!isHiddenNavPage && <Footer />}
    </div>
  );
};

// ── Root ──────────────────────────────────────────────────────────────────────
const App = () => (
  <BrowserRouter>
    <AppContent />
  </BrowserRouter>
);

export default App;
