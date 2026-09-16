import React, { useState, useRef } from 'react';

export default function InteractiveHeroVisual() {
  const containerRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Smooth mouse move tracking for dynamic 3D banking and parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // 3D Angles: gentle banking, pitching, and yawing
  const tiltX = -mousePos.y * 18;
  const tiltY = mousePos.x * 18;
  const rollZ = mousePos.x * 6;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-2xl mx-auto flex items-center justify-center cursor-pointer perspective-1000 select-none py-6 sm:py-12"
    >
      {/* 3D Transform Stage - completely unclipped and borderless */}
      <div
        className="relative w-full transform-style-3d transition-transform duration-500 ease-out flex items-center justify-center"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(${isHovered ? 1.05 : 1})`,
        }}
      >
        
        {/* Layer 0: Expansive Ambient Golden & Celestial Mist Glow (No hard boundaries) */}
        <div 
          className="absolute -inset-16 bg-gradient-radial from-gold-500/20 via-sky-500/10 to-transparent blur-3xl transition-all duration-700 pointer-events-none rounded-full"
          style={{
            opacity: isHovered ? 0.85 : 0.5,
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 20}px, -40px) scale(${isHovered ? 1.2 : 1})`,
          }}
        />

        {/* Layer 1: Wide Organic Background Cloud Mist - Deeply Feathered & Borderless */}
        <div
          className="absolute -inset-x-12 -top-12 z-10 animate-float-cloud-1 pointer-events-none transition-transform duration-700 ease-out mask-radial-mist filter drop-shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
          style={{
            transform: `translate3d(${mousePos.x * 20}px, ${mousePos.y * 14}px, 10px) scale(1.15)`,
          }}
        >
          <img
            src="/hero-cloud-new.png"
            alt="سحاب طبيعي فاخر"
            className="w-full h-auto object-contain opacity-75 blur-[0.5px]"
          />
        </div>

        {/* Layer 2: Main Wahbeen Aircraft Soaring Freely */}
        <div
          className="relative z-20 w-[105%] sm:w-[110%] h-auto animate-float-plane pointer-events-none transition-all duration-300 ease-out"
          style={{
            transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 28}px, 60px) rotate(${rollZ}deg) scale(${isHovered ? 1.06 : 1})`,
            filter: `drop-shadow(0 25px 50px rgba(4,13,26,0.9)) drop-shadow(0 0 ${isHovered ? '40px' : '20px'} rgba(212,175,55,${isHovered ? '0.4' : '0.2'}))`,
          }}
        >
          <img
            src="/hero-plane-new.png"
            alt="طائرة وكالة وهبين للسفريات والسياحة"
            className="w-full h-auto object-contain transition-transform duration-500"
          />
        </div>

        {/* Layer 3: Organic Foreground Soft Mist Embracing the Fuselage & Engines */}
        <div
          className="absolute -inset-x-8 -bottom-10 z-30 animate-float-cloud-2 pointer-events-none transition-transform duration-700 ease-out mask-radial-mist"
          style={{
            transform: `translate3d(${mousePos.x * 30}px, ${mousePos.y * 20}px, 85px) scale(1.08)`,
          }}
        >
          <img
            src="/hero-cloud-new.png"
            alt="ضباب حجمي ناعم"
            className="w-full h-auto object-contain opacity-80"
          />
        </div>

        {/* Extra Atmospheric Volumetric Whisps for Complete Organic Immersion */}
        <div 
          className="absolute -bottom-8 -left-6 z-35 w-[65%] pointer-events-none mask-radial-mist opacity-60 filter blur-sm"
          style={{
            transform: `translate3d(${mousePos.x * 15}px, ${mousePos.y * 10}px, 95px)`,
          }}
        >
          <img
            src="/hero-cloud-new.png"
            alt="رذاذ سحابي"
            className="w-full h-auto object-contain"
          />
        </div>

      </div>
    </div>
  );
}
