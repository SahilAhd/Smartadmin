import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogIn, UserPlus, ShieldCheck } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const NavMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative">
      {/* Burger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-white/10 rounded-lg transition-all relative z-50"
      >
        {isOpen ? <X size={28} className="text-cyan-400" /> : <Menu size={28} />}
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 mt-3 w-52 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
          >
        <div className="flex flex-col p-2 gap-1">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/5 rounded-xl transition-colors"
  onClick={() => navigate("/signup")}
> <ShieldCheck size={18} className="text-cyan-400" />
  <span className="text-sm font-medium">Sign Up</span>
</button>
              
              <button className="flex items-center gap-3 px-4 py-3 text-slate-300 hover:bg-white/5 rounded-xl transition-colors"
              onClick = {()=> navigate("/login")}>
                <LogIn size={18} className="text-cyan-400" />
                <span className="text-sm font-medium">Login</span>
              </button>

              

             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMenu;