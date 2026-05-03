import React from 'react';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const handleScroll = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id='home' className='relative min-h-screen flex items-center justify-center overflow-hidden bg-background'>
      {/* Subtle gradient background */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute top-0 left-1/4 w-[50%] h-[50%] rounded-full bg-primary/10 blur-[150px]' />
        <div className='absolute bottom-0 right-1/4 w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]' />
      </div>

      <div className='relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6'>
          <span className='bg-gradient-to-r from-foreground via-primary to-purple-500 bg-clip-text text-transparent'>
            MikaCutterLab
          </span>
        </h1>

        <p className='text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto mb-4'>
          Create. Cut. Inspire.
        </p>

        <p className='text-base sm:text-lg text-muted-foreground/80 max-w-xl mx-auto mb-12'>
          Professionelle Videoschnitt, Social Media Content & kreative Konzepte – aus einer Hand für maximale Wirkung.
        </p>

        <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
          <a
            href='#portfolio'
            onClick={(e) => handleScroll(e, '#portfolio')}
            className='inline-flex items-center gap-2 px-8 py-4 rounded-full bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-all hover:scale-105 shadow-lg shadow-primary/25'
          >
            Projekte ansehen
          </a>
          <a
            href='#contact'
            onClick={(e) => handleScroll(e, '#contact')}
            className='inline-flex items-center gap-2 px-8 py-4 rounded-full bg-card border border-border text-foreground font-semibold hover:bg-card/80 transition-all hover:scale-105'
          >
            Projekt anfragen
          </a>
        </div>
      </div>

      <a
        href='#about'
        onClick={(e) => handleScroll(e, '#about')}
        className='absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors'
        aria-label='Nach unten scrollen'
      >
        <ArrowDown className='w-6 h-6' />
      </a>
    </section>
  );
}
