import React from 'react';

export default function AboutSection() {
  return (
    <section id='about' className='relative py-24 overflow-hidden'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
          <div className='relative flex items-center justify-center'>
            <div className='relative w-full max-w-md aspect-square rounded-2xl overflow-hidden border border-border bg-card shadow-2xl shadow-primary/5 flex items-center justify-center p-12'>
              <img src='/logo.png' alt='MikaCutterLab' className='w-full h-full object-contain' />
            </div>
            <div className='absolute -bottom-6 -right-6 w-40 h-40 bg-primary/10 rounded-full blur-3xl' />
            <div className='absolute -top-6 -left-6 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl' />
          </div>

          <div className='space-y-6'>
            <div className='text-sm font-medium text-primary'>
              Über mich
            </div>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground'>
              Kreativität trifft auf <span className='text-primary'>Präzision</span>
            </h2>
            <p className='text-muted-foreground leading-relaxed'>
              MikaCutterLab steht für hochwertige Videos und kreative Content Lösungen. 
              Mit jahrelanger Erfahrung im Schnitt und einer Leidenschaft fürs Rohmaterial 
              in fesselnde Videos.
            </p>
            <p className='text-muted-foreground leading-relaxed'>
              Von Social Media Clips bis hin zu professionellen edits mache ich jedes Projekt 
              mit Liebe zum Detail und einem modernen Ästhetik-Verständnis umgesetzt.
            </p>

            <div className='flex gap-8 pt-4'>
              <div className='space-y-1'>
                <div className='text-2xl font-bold text-foreground'>123+</div>
                <div className='text-sm text-muted-foreground'>Projekte</div>
              </div>
              <div className='space-y-1'>
                <div className='text-2xl font-bold text-foreground'>3+</div>
                <div className='text-sm text-muted-foreground'>Jahre Erfahrung</div>
              </div>
              <div className='space-y-1'>
                <div className='text-2xl font-bold text-foreground'>100%</div>
                <div className='text-sm text-muted-foreground'>und ich gebe immer</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
