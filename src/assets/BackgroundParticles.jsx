import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BackgroundParticles = () => {
  // We generate the data once. We use "vw" and "vh" (Viewport Width/Height)
  // to ensure they use the full screen regardless of monitor size.
  const [particles] = useState(() => 
    Array.from({ length: 40 }).map(() => ({
      size: Math.random() * 8 + 4,
      // Random positions across the full width (vw) and height (vh)
      xPoints: [
        Math.random() * 100 + "vw", 
        Math.random() * 100 + "vw", 
        Math.random() * 100 + "vw"
      ],
      yPoints: [
        Math.random() * 100 + "vh", 
        Math.random() * 100 + "vh", 
        Math.random() * 100 + "vh"
      ],
      duration: Math.random() * 20 + 15,
      delay: Math.random() * -20, // Negative delay starts them mid-animation
    }))
  );
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 bg-transparent">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size + 'px',
            height: p.size + 'px',
            background: 'radial-gradient(circle at 30% 30%, #ffffff, #475569)',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.5)',
            top: 0,
            left: 0,
          }}
          animate={{
            x: p.xPoints,
            y: p.yPoints,
            opacity: [0.1, 0.7, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "linear",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
};

export default BackgroundParticles;