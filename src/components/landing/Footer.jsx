import React from 'react';
import { Instagram, Youtube, Mail } from 'lucide-react';

const footerLinks = [
  { label: 'Start', href: '#home' },
  { label: 'Über mich', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Kontakt', href: '#contact' }
];

export default function Footer() {
  const handleClick = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className='border-t border-border bg-card/30'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        <div className='flex flex-col md:flex-row items-center justify-between gap-8'>
          <div className='flex flex-col items-center md:items-start gap-4'>
            <img src='/logo.png' alt='MikaCutterLab' className='h-14 w-auto' />
            <p className='text-sm text-muted-foreground text-center md:text-left max-w-xs'>
              Professionelle Videoproduktion und Content Creation für deine Marke.
            </p>
          </div>

          <nav className='flex flex-wrap justify-center gap-6'>
            {footerLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className='text-sm text-muted-foreground hover:text-foreground transition-colors'
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className='flex items-center gap-4'>
            <a href='#' className='w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors'>
              <Instagram className='w-4 h-4' />
            </a>
            <a href='#' className='w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors'>
              <Youtube className='w-4 h-4' />
            </a>
            <a href='mailto:mika@mika-stratmann.de' className='w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors'>
              <Mail className='w-4 h-4' />
            </a>
          </div>
        </div>

        <div className='mt-12 pt-8 border-t border-border text-center'>
          <p className='text-xs text-muted-foreground'>
            © {new Date().getFullYear()} MikaCutterLab. All rights reserved. Create. Cut. Inspire.
          </p>
        </div>
      </div>
    </footer>
  );
}
