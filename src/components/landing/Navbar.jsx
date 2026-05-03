import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Logo = () => (
  <Link to='/' className='flex items-center gap-3 group'>
    <img src='/logo.png' alt='MikaCutterLab' className='h-14 w-auto transition-transform duration-300 group-hover:scale-105' />
  </Link>
);

const navLinks = [
  { label: 'Start', href: '#home' },
  { label: 'Über mich', href: '#about' },
  { label: 'Vita', href: '#vita' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Kontakt', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border' : 'bg-transparent'
      )}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-20'>
          <Logo />

          <nav className='hidden md:flex items-center gap-8'>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className='text-sm font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                {link.label}
              </a>
            ))}
          </nav>

          <button
            className='md:hidden p-2 text-foreground'
            onClick={() => setIsOpen(!isOpen)}
            aria-label='Menü öffnen'
          >
            {isOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className='md:hidden bg-background/95 backdrop-blur-md border-b border-border'>
          <nav className='flex flex-col p-4 gap-4'>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className='text-base font-medium text-muted-foreground hover:text-foreground transition-colors'
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
