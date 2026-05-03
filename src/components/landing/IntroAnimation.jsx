import React, { useState, useEffect } from 'react';

export default function IntroAnimation({ onComplete }) {
  const [phase, setPhase] = useState(0);
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const sequence = [
      setTimeout(() => setPhase(1), 200),      // Matrix rain start
      setTimeout(() => setPhase(2), 1500),    // Glitch explosion
      setTimeout(() => setGlitchActive(true), 1500),
      setTimeout(() => setGlitchActive(false), 2000),
      setTimeout(() => setPhase(3), 2500),    // Logo 3D flip
      setTimeout(() => setPhase(4), 3500),    // Neon text reveal
      setTimeout(() => setPhase(5), 4500),    // Particles
      setTimeout(() => setPhase(6), 5500),    // Exit with shatter
      setTimeout(() => onComplete?.(), 6500)
    ];

    return () => sequence.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden perspective-1000 ${phase >= 6 ? 'animate-shatter-out' : ''}`}
    >
      {/* PHASE 1: Matrix Digital Rain - WHITE */}
      {phase >= 1 && phase < 2 && (
        <div className="absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute text-white font-mono text-sm animate-matrix-fall"
              style={{ 
                left: `${i * 5}%`, 
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              {[...Array(30)].map((_, j) => (
                <div key={j} style={{ opacity: 1 - j * 0.03 }}>
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* PHASE 2: Glitch Explosion - MONOCHROME */}
      {glitchActive && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-full h-2 bg-white animate-glitch-1" />
          <div className="absolute w-full h-2 bg-gray-400 animate-glitch-2" />
          <div className="absolute w-full h-2 bg-gray-600 animate-glitch-3" />
          <div className="absolute w-2 h-full bg-white animate-glitch-4" />
          <div className="absolute w-2 h-full bg-gray-500 animate-glitch-5" />
        </div>
      )}

      {/* PHASE 3-5: Main Content with 3D Effects */}
      <div 
        className={`relative text-center transition-all duration-1000 ${
          phase >= 3 
            ? 'opacity-100 scale-100 rotate-y-0' 
            : 'opacity-0 scale-50 rotate-y-90'
        }`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Logo Ring - MONOCHROME */}
        <div className={`relative w-40 h-40 mx-auto mb-8 transition-all duration-700 ${phase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          {/* Pulsing White Rings */}
          <div className="absolute inset-0 rounded-full border-4 border-white animate-neon-pulse-1" />
          <div className="absolute inset-2 rounded-full border-4 border-gray-400 animate-neon-pulse-2" />
          <div className="absolute inset-4 rounded-full border-4 border-gray-600 animate-neon-pulse-3" />
          
          {/* Glowing Core - Black & White */}
          <div className="absolute inset-6 rounded-full bg-gradient-to-br from-white via-gray-300 to-gray-500 animate-core-glow shadow-[0_0_60px_rgba(255,255,255,0.5)]">
            <img 
              src="/logo.png" 
              alt="MikaCutterLab" 
              className="w-full h-full object-contain p-4"
            />
          </div>

          {/* Orbiting Particles - WHITE */}
          {phase >= 5 && (
            <>
              <div className="absolute -inset-8 animate-orbit-1">
                <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,1)]" />
              </div>
              <div className="absolute -inset-8 animate-orbit-2">
                <div className="w-2 h-2 rounded-full bg-gray-300 shadow-[0_0_20px_rgba(200,200,200,1)]" />
              </div>
              <div className="absolute -inset-8 animate-orbit-3">
                <div className="w-4 h-4 rounded-full bg-gray-500 shadow-[0_0_20px_rgba(150,150,150,1)]" />
              </div>
            </>
          )}
        </div>

        {/* Text - MONOCHROME */}
        <div className={`relative transition-all duration-700 ${phase >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="relative text-5xl sm:text-7xl font-black">
            {/* Glitch layers - grayscale */}
            <span className="absolute -left-1 top-0 text-gray-400 opacity-70 animate-glitch-cyan">MikaCutterLab</span>
            <span className="absolute left-1 top-0 text-gray-600 opacity-70 animate-glitch-pink">MikaCutterLab</span>
            <span className="relative text-white animate-white-glow">
              MikaCutterLab
            </span>
          </h1>
        </div>

        {/* Slogan - CLEAN */}
        <div className={`mt-6 transition-all duration-500 ${phase >= 5 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-lg font-mono tracking-[0.3em] uppercase animate-text-flicker text-gray-300">
            [ Create. Cut. Inspire. ]
          </p>
        </div>
      </div>

      {/* Scanlines Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px]" />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]" />

      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-matrix-fall {
          animation: matrix-fall linear forwards;
        }
        @keyframes glitch-1 {
          0%, 100% { transform: translateY(20%) scaleY(1); }
          50% { transform: translateY(80%) scaleY(0.1); }
        }
        .animate-glitch-1 {
          animation: glitch-1 0.1s ease-in-out infinite;
        }
        @keyframes glitch-2 {
          0%, 100% { transform: translateY(60%) scaleY(1); }
          50% { transform: translateY(30%) scaleY(0.1); }
        }
        .animate-glitch-2 {
          animation: glitch-2 0.15s ease-in-out infinite;
        }
        @keyframes glitch-3 {
          0%, 100% { transform: translateY(40%) scaleY(1); }
          50% { transform: translateY(70%) scaleY(0.1); }
        }
        .animate-glitch-3 {
          animation: glitch-3 0.12s ease-in-out infinite;
        }
        @keyframes glitch-4 {
          0%, 100% { transform: translateX(20%) scaleX(1); }
          50% { transform: translateX(80%) scaleX(0.1); }
        }
        .animate-glitch-4 {
          animation: glitch-4 0.1s ease-in-out infinite;
        }
        @keyframes glitch-5 {
          0%, 100% { transform: translateX(70%) scaleX(1); }
          50% { transform: translateX(20%) scaleX(0.1); }
        }
        .animate-glitch-5 {
          animation: glitch-5 0.13s ease-in-out infinite;
        }
        @keyframes neon-pulse-1 {
          0%, 100% { opacity: 0.3; transform: scale(1); box-shadow: 0 0 20px rgba(255, 255, 255, 0.3); }
          50% { opacity: 1; transform: scale(1.05); box-shadow: 0 0 40px rgba(255, 255, 255, 0.6); }
        }
        .animate-neon-pulse-1 {
          animation: neon-pulse-1 2s ease-in-out infinite;
        }
        @keyframes neon-pulse-2 {
          0%, 100% { opacity: 0.3; transform: scale(1); box-shadow: 0 0 20px rgba(200, 200, 200, 0.3); }
          50% { opacity: 1; transform: scale(1.08); box-shadow: 0 0 40px rgba(200, 200, 200, 0.5); }
        }
        .animate-neon-pulse-2 {
          animation: neon-pulse-2 2s ease-in-out infinite 0.3s;
        }
        @keyframes neon-pulse-3 {
          0%, 100% { opacity: 0.3; transform: scale(1); box-shadow: 0 0 20px rgba(150, 150, 150, 0.3); }
          50% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 40px rgba(150, 150, 150, 0.5); }
        }
        .animate-neon-pulse-3 {
          animation: neon-pulse-3 2s ease-in-out infinite 0.6s;
        }
        @keyframes core-glow {
          0%, 100% { box-shadow: 0 0 40px rgba(255, 255, 255, 0.4), 0 0 80px rgba(200, 200, 200, 0.2); }
          50% { box-shadow: 0 0 60px rgba(255, 255, 255, 0.7), 0 0 100px rgba(255, 255, 255, 0.4); }
        }
        .animate-core-glow {
          animation: core-glow 1.5s ease-in-out infinite;
        }
        @keyframes orbit-1 {
          from { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        .animate-orbit-1 {
          animation: orbit-1 3s linear infinite;
        }
        @keyframes orbit-2 {
          from { transform: rotate(120deg) translateX(100px) rotate(-120deg); }
          to { transform: rotate(480deg) translateX(100px) rotate(-480deg); }
        }
        .animate-orbit-2 {
          animation: orbit-2 4s linear infinite;
        }
        @keyframes orbit-3 {
          from { transform: rotate(240deg) translateX(90px) rotate(-240deg); }
          to { transform: rotate(600deg) translateX(90px) rotate(-600deg); }
        }
        .animate-orbit-3 {
          animation: orbit-3 3.5s linear infinite;
        }
        @keyframes glitch-cyan {
          0%, 90%, 100% { transform: translate(0); }
          92% { transform: translate(-3px, 1px); }
          94% { transform: translate(2px, -1px); }
          96% { transform: translate(-2px, 2px); }
          98% { transform: translate(1px, -2px); }
        }
        .animate-glitch-cyan {
          animation: glitch-cyan 3s infinite;
        }
        @keyframes glitch-pink {
          0%, 90%, 100% { transform: translate(0); }
          91% { transform: translate(3px, -1px); }
          93% { transform: translate(-2px, 2px); }
          95% { transform: translate(2px, 1px); }
          97% { transform: translate(-1px, -2px); }
        }
        .animate-glitch-pink {
          animation: glitch-pink 3s infinite 0.1s;
        }
        @keyframes white-glow {
          0%, 100% { filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.6)); }
          50% { filter: drop-shadow(0 0 40px rgba(255, 255, 255, 0.9)); }
        }
        .animate-white-glow {
          animation: white-glow 2s ease-in-out infinite;
        }
        @keyframes text-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
          52% { opacity: 0.3; }
          54% { opacity: 1; }
          90% { opacity: 0.9; }
          92% { opacity: 0.2; }
          94% { opacity: 1; }
        }
        .animate-text-flicker {
          animation: text-flicker 4s ease-in-out infinite;
        }
        @keyframes shatter-out {
          0% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.1) rotate(2deg); }
          100% { opacity: 0; transform: scale(2) rotate(5deg); }
        }
        .animate-shatter-out {
          animation: shatter-out 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
