import React from 'react';
import { ExternalLink } from 'lucide-react';

const projects = [
  { title: 'PizzaLand RP – TikTok 1', category: 'Social Media', url: 'https://www.tiktok.com/@pizzalandrp/video/7634802476188847392' },
  { title: 'PizzaLand RP – TikTok 2', category: 'Social Media', url: 'https://www.tiktok.com/@pizzalandrp/video/7626669937695739158' },
  { title: 'PizzaLand RP – TikTok 3', category: 'Social Media', url: 'https://www.tiktok.com/@pizzalandrp/video/7622225556448267542' },
  { title: 'PizzaLand RP – TikTok 4', category: 'Social Media', url: 'https://www.tiktok.com/@pizzalandrp/video/7601977657655348483' },
  { title: 'PizzaLand RP – TikTok 5', category: 'Social Media', url: 'https://www.tiktok.com/@pizzalandrp/video/7627404531659312406' },
  { title: 'PizzaLand RP – TikTok 6', category: 'Social Media', url: 'https://www.tiktok.com/@pizzalandrp/video/7624436726198488342' }
];

export default function PortfolioSection() {
  return (
    <section id='portfolio' className='relative py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
            Ausgewählte <span className='text-primary'>Projekte</span>
          </h2>
          <p className='text-muted-foreground max-w-xl mx-auto'>
            Ein Einblick in abgeschlossene Arbeiten – jedes Projekt ist einzigartig und maßgeschneidert.
          </p>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {projects.map((project, idx) => (
            <a
              key={idx}
              href={project.url}
              target='_blank'
              rel='noopener noreferrer'
              className='group relative aspect-[9/16] rounded-xl overflow-hidden border border-border bg-card hover:border-primary/50 transition-all duration-300'
            >
              <div className='w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-muted to-card p-6'>
                <div className='w-20 h-20 mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors'>
                  <svg className='w-10 h-10 text-primary' viewBox='0 0 24 24' fill='currentColor'>
                    <path d='M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.88-2.89 2.89 2.89 0 012.88-2.88c.24 0 .47.04.69.1V9.15a6.35 6.35 0 00-.69-.04A6.22 6.22 0 005.1 15.33a6.22 6.22 0 006.22 6.22 6.22 6.22 0 006.22-6.22V9.49a8.41 8.41 0 004.9 1.58V7.74c-.24 0-.47-.04-.69-.05z' />
                  </svg>
                </div>
                <p className='text-sm font-medium text-foreground mb-1'>{project.title}</p>
                <p className='text-xs text-muted-foreground mb-3'>{project.category}</p>
                <span className='inline-flex items-center gap-1 text-xs text-primary'>
                  Auf TikTok ansehen
                  <ExternalLink className='w-3 h-3' />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
