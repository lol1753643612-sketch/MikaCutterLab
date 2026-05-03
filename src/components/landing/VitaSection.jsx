import React from 'react';

const timeline = [
  {
    year: '2023',
    title: 'Start in die Videoproduktion',
    description: 'Anfang bei Live on RP – erst schlechte Videos, aber mir viel beigebracht.'
  },
  {
    year: '2024',
    title: 'Vertiefung',
    description: 'Angefangen mich mit der Thematik mehr zu beschäftigen und Fähigkeiten aufzubauen.'
  },
  {
    year: '2025',
    title: 'PizzaLand RP',
    description: 'Fünf Videos zu schneiden und zu uploaden. Am 5.5.2025 Start bei PizzaLand RP Minecraft, direkt bekommen mit daily uploads bis heute. Mein eigenes Social Media Team aufgebaut und Creator sowie Social Media Leitung geworden.'
  },
  {
    year: 'Heute',
    title: 'MikaCutterLab',
    description: 'Suche nach neuen Aufgaben und dadurch die Gründung von MikaCutterLab. Offen für Video-Projekte aller Art.'
  }
];

export default function VitaSection() {
  return (
    <section id='vita' className='relative py-24'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
            Werdegang & <span className='text-primary'>Erfahrung</span>
          </h2>
          <p className='text-muted-foreground max-w-xl mx-auto'>
            Mein Weg in die Welt der Videoproduktion – von ersten Experimenten bis zur eigenen Marke.
          </p>
        </div>

        <div className='relative'>
          <div className='absolute left-8 top-0 bottom-0 w-px bg-border md:left-1/2 md:-translate-x-px' />

          <div className='space-y-12'>
            {timeline.map((item, index) => (
              <div key={item.year + item.title} className={'relative flex items-start gap-8 md:gap-0 ' + (index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse')}>
                <div className='hidden md:block md:w-1/2' />

                <div className='absolute left-8 md:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background -translate-x-1/2 mt-1.5 z-10' />

                <div className={'pl-20 md:pl-0 md:w-1/2 ' + (index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12')}>
                  <div className={index % 2 === 0 ? 'md:text-right' : ''}>
                    <span className='text-sm font-bold text-primary'>{item.year}</span>
                  </div>
                  <h3 className='text-lg font-semibold text-foreground mb-1'>{item.title}</h3>
                  <p className='text-sm text-muted-foreground'>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
