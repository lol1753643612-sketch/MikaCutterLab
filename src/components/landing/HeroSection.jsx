import React from 'react';
import { ArrowDown, Play, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id='home' className='relative min-h-screen flex items-center justify-center overflow-hidden bg-background'>
      {/* Animated gradient background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 left-1/4 w-[50%] h-[50%] rounded-full bg-white/10 blur-[150px] animate-pulse-slow' />
        <div className='absolute bottom-0 right-1/4 w-[40%] h-[40%] rounded-full bg-gray-500/10 blur-[120px] animate-pulse-slow delay-1000' />
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30%] h-[30%] rounded-full bg-gray-400/5 blur-[100px] animate-float' />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/50 rounded-full animate-float-1" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-gray-400/30 rounded-full animate-float-2" />
        <div className="absolute top-1/2 left-1/6 w-2 h-2 bg-gray-300/40 rounded-full animate-float-3" />
      </div>

      <div className='relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in-up">
          <Sparkles className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-primary">Video Editor & Content Creator</span>
        </div>

        {/* Main heading with glow effect */}
        <h1 className='text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-in-up delay-100'>
          <span className='text-white'>
            MikaCutterLab
          </span>
        </h1>

        {/* Slogan with animation */}
        <p className='text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4 animate-fade-in-up delay-200'>
          <span className="text-gray-300">Create. Cut. Inspire.</span>
        </p>

        {/* Description */}
        <p className='text-base sm:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-12 animate-fade-in-up delay-300'>
          Professionelle Videoschnitt, Social Media Content & kreative Konzepte – aus einer Hand für maximale Wirkung.
        </p>

        {/* CTA Buttons with enhanced hover effects */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-400'>
          <a
            href='#portfolio'
            onClick={(e) => handleScroll(e, '#portfolio')}
            className='group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold transition-all hover:scale-110 hover:shadow-2xl hover:shadow-white/40'
          >
            <Play className="w-5 h-5 group-hover:animate-bounce" />
            Projekte ansehen
          </a>
          <a
            href='#contact'
            onClick={(e) => handleScroll(e, '#contact')}
            className='group inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card border border-border text-foreground font-semibold hover:bg-card/80 transition-all hover:scale-110 hover:border-primary/50'
          >
            Projekt anfragen
            <span className="group-hover:translate-x-1 transition-transform">-</span>
          </a>
        </div>
      </div>

      {/* Bouncing scroll indicator */}
      <a
        href='#about'
        onClick={(e) => handleScroll(e, '#about')}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce-slow'
        aria-label='Nach unten scrollen'
      >
        <ArrowDown className='w-6 h-6' />
      </a>
    </section>
  );
}
