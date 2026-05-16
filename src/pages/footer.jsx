import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Pages where footer should never appear
  const hiddenOnPages = ['/login', '/signup', '/user', '/tasks', '/analytics', '/notes', '/streak', '/suggestions', '/coach'];
  const isHidden = hiddenOnPages.includes(location.pathname);

  useEffect(() => {
    if (isHidden) return;

    let hoverTimer = null;
    let hideTimer = null;

    const handleMouseMove = (e) => {
      const windowHeight = window.innerHeight;

      if (e.clientY > windowHeight - 60) {
        // Cancel any pending hide
        if (hideTimer) {
          clearTimeout(hideTimer);
          hideTimer = null;
        }
        // Show after 400ms of staying in zone
        if (!hoverTimer) {
          hoverTimer = setTimeout(() => {
            setShow(true);
          }, 400);
        }
      } else {
        // Cancel pending show
        if (hoverTimer) {
          clearTimeout(hoverTimer);
          hoverTimer = null;
        }
        // Hide after 1.5 seconds — gives user time to click links
        if (!hideTimer) {
          hideTimer = setTimeout(() => {
            setShow(false);
          }, 1500);
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (hoverTimer) clearTimeout(hoverTimer);
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isHidden]);

  // Don't render at all on hidden pages
  if (isHidden) return null;

  return (
    <motion.footer
      initial={{ y: "100%" }}
      animate={{ y: show ? "0%" : "100%" }}
      transition={{ duration: 0.4 }}
      className={`fixed bottom-0 left-0 w-full z-50
        ${show ? "pointer-events-auto" : "pointer-events-none"}
        bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900
        text-slate-300 py-6 border-t border-white/10`}
    >
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 gap-10">
        <div>
          <h2 className="text-lg font-bold text-cyan-400">SmartAdmin</h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            SmartAdmin is an intelligent task management platform designed to help you
            stay organized and productive. It leverages AI to suggest tasks and guide
            your daily workflow so you can focus on what truly matters.
          </p>
        </div>
          <div className="flex gap-16 text-sm">
          <div className="flex flex-col gap-2">
            <span onClick={() => navigate('/')}        className="hover:text-cyan-400 cursor-pointer transition-colors">Home</span>
            <span onClick={() => navigate('/features')} className="hover:text-cyan-400 cursor-pointer transition-colors">Features</span>
            <span onClick={() => navigate('/about')}    className="hover:text-cyan-400 cursor-pointer transition-colors">About</span>
          </div>
          <div>
            <p className="text-white font-semibold">Sahil Ahmad</p>
            <p className="text-slate-400 text-sm mt-1">justsahilforbusiness@gmail.com</p>
          </div>
          <div>
            <p className="text-white font-semibold">Address</p>
            <p className="text-slate-400 text-sm mt-1">Delhi, India</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
