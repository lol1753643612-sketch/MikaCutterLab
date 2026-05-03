import React from 'react';
import { ExternalLink } from 'lucide-react';

// TikTok Video IDs
const shortVideos = [
  { id: '7634802476188847392', username: 'pizzalandrp' },
  { id: '7626669937695739158', username: 'pizzalandrp' },
  { id: '7622225556448267542', username: 'pizzalandrp' },
  { id: '7601977657655348483', username: 'pizzalandrp' },
  { id: '7627404531659312406', username: 'pizzalandrp' },
  { id: '7624436726198488342', username: 'pizzalandrp' }
];

export default function PortfolioSection() {
  return (
    <section id='portfolio' className='relative py-24 overflow-hidden'>
      {/* Animated background */}
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-1/4 w-[50%] h-[50%] rounded-full bg-white/5 blur-[120px] animate-pulse' />
        <div className='absolute bottom-0 right-1/4 w-[40%] h-[40%] rounded-full bg-gray-500/5 blur-[100px] animate-pulse delay-1000' />
      </div>

      <div className='relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4 animate-fade-in-up'>
            Meine <span className='text-white'>Videos</span>
          </h2>
          <p className='text-muted-foreground max-w-xl mx-auto animate-fade-in-up delay-100'>
            Short Beispiele – direkt hier abspielbar
          </p>
        </div>

        {/* Long YouTube Video */}
        <div className='mb-12 animate-fade-in-up'>
          <div className='aspect-video rounded-xl overflow-hidden border border-border bg-card'>
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/CAa-oCDTd_0"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          <div className='mt-4 flex items-center gap-2 text-muted-foreground'>
            <svg className='w-5 h-5 text-white' viewBox='0 0 24 24' fill='currentColor'>
              <path d='M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z'/>
            </svg>
            <span className='text-sm'>Langes Video – Full Project</span>
          </div>
        </div>

        {/* Short TikTok Videos Grid */}
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {shortVideos.map((video, idx) => (
            <div
              key={idx}
              className='relative aspect-[9/16] rounded-xl overflow-hidden border border-border bg-card hover:border-white/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/10 animate-fade-in-up'
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <iframe
                src={`https://www.tiktok.com/embed/${video.id}`}
                className='w-full h-full'
                allowFullScreen
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                scrolling='no'
              />
            </div>
          ))}
        </div>

        {/* TikTok Link */}
        <div className='mt-12 text-center'>
          <a
            href='https://www.tiktok.com/@pizzalandrp'
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-2 text-white hover:text-white/80 transition-colors'
          >
            <span>Alle Videos auf TikTok</span>
            <ExternalLink className='w-4 h-4' />
          </a>
        </div>
      </div>
    </section>
  );
}
