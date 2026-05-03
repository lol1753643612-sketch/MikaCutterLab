import React from 'react';

const servicesData = [
  {
    title: 'Video Editing',
    description: 'Ich schneide deine Videos so, dass sie nicht nur gut aussehen, sondern auch hängen bleiben. Egal ob Social Media oder Werbung – es soll einfach wirken und nicht nach Standard aussehen.',
    features: ['Schnitt & saubere Übergänge', 'Farblook, der passt', 'Einfache Motion Graphics', 'Sound, der nicht nervt']
  },
  {
    title: 'Social Media',
    description: 'Ich helfe dir dabei, deine Socials sinnvoll aufzubauen. Fokus auf TikTok & Instagram, Community im Blick behalten und schauen, was funktioniert.',
    features: ['Content planen, der wirklich passt', 'Fokus auf TikTok & Instagram', 'Kommentare & Community', 'Daily Uploads']
  },
  {
    title: 'Content Creation',
    description: 'Ideen bringen nichts, wenn sie keiner sehen will. Ich entwickle Content, der auffällt und nicht direkt weggescrollt wird.',
    features: ['Konzepte, die nicht 08/15 sind', 'Videoproduktion von Anfang bis Ende', 'Storytelling, das hängen bleibt', 'Trends checken (ohne jedem hinterherzurennen)']
  },
  {
    title: 'Sonstiges',
    description: 'Individuelle Projekte, Livestream-Schnitt, Event-Aftermovies oder spezielle Anforderungen – alles ist möglich.',
    features: ['Event Aftermovies', 'Livestreams', 'Spezialprojekte']
  }
];

export default function ServicesSection() {
  return (
    <section id='services' className='relative py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-foreground mb-4'>
            Meine <span className='text-primary'>Services</span>
          </h2>
          <p className='text-muted-foreground max-w-xl mx-auto'>
            Von der ersten Idee bis zum finalen Cut – alles aus einer Hand fuer maximale Qualitaet.
          </p>
        </div>

        <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {servicesData.map((service) => (
            <div
              key={service.title}
              className='group relative p-6 rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/50 transition-all duration-300 hover:-translate-y-1'
            >
              <h3 className='text-lg font-semibold text-foreground mb-2'>{service.title}</h3>
              <p className='text-sm text-muted-foreground mb-4 leading-relaxed'>{service.description}</p>
              <ul className='space-y-1.5'>
                {service.features.map((feature) => (
                  <li key={feature} className='text-xs text-muted-foreground flex items-center gap-2'>
                    <span className='w-1 h-1 rounded-full bg-primary' />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
