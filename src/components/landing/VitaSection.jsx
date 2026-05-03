import React, { useEffect, useRef, useState } from 'react';
import { Camera, Sparkles, Zap, Crown } from 'lucide-react';

const timeline = [
  {
    year: '2023',
    title: 'Die ersten Schritte',
    description: 'Live on RP – meine Anfänge in der Videoproduktion. Jeder Fehler war eine Lektion, jedes Video ein Schritt nach vorne.',
    icon: Camera,
    color: 'from-gray-400 to-gray-200'
  },
  {
    year: '2024',
    title: 'Skills aufgebaut',
    description: 'Vertieft in Editing, Color Grading & Motion Design. Die Grundlagen wurden zur Passion.',
    icon: Sparkles,
    color: 'from-gray-500 to-gray-300'
  },
  {
    year: '2025',
    title: 'PizzaLand RP – Der Durchbruch',
    description: 'Fievm Team, Zusammenarbeit mit Filside, viel gelernt. Am 5.5.2025 Start bei PizzaLand RP Minecraft – direkt rein mit daily uploads. Social Media Team aufgebaut, Creator & Leitung geworden.',
    icon: Zap,
    color: 'from-gray-600 to-gray-400'
  },
  {
    year: 'Heute',
    title: 'MikaCutterLab',
    description: 'Neue Aufgaben gesucht, MikaCutterLab geboren. Bereit für dein Projekt – egal welches Format, egal welche Plattform.',
    icon: Crown,
    color: 'from-white to-gray-400'
  }
];

// Animation Hook
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { threshold: 0.2, ...options });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, isInView];
};

export default function VitaSection() {
  const [sectionRef, sectionInView] = useInView();

  return (
    <section 
      id='vita' 
      ref={sectionRef}
      className='relative py-24 overflow-hidden'
    >
      {/* Animated Background */}
      <div className='absolute inset-0'>
        <div className='absolute top-1/4 left-0 w-[60%] h-[60%] rounded-full bg-white/5 blur-[150px] animate-pulse' />
        <div className='absolute bottom-1/4 right-0 w-[50%] h-[50%] rounded-full bg-gray-500/5 blur-[120px] animate-pulse delay-1000' />
      </div>

      <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Animated Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6'>
            <span className='text-sm font-medium text-primary'>Meine Reise</span>
          </div>
          <h2 className='text-4xl sm:text-5xl font-bold text-foreground mb-4'>
            Werdegang & <span className='text-white'>Erfahrung</span>
          </h2>
          <p className='text-muted-foreground max-w-xl mx-auto text-lg'>
            Von den ersten schüchternen Versuchen bis zur eigenen Marke – jeder Schritt zählt.
          </p>
        </div>

        {/* Timeline */}
        <div className='relative'>
          {/* Center Line with Animation */}
          <div className='absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-gray-500 via-gray-300 to-white md:-translate-x-1/2 rounded-full'>
            <div className='absolute inset-0 bg-gradient-to-b from-gray-500 via-gray-300 to-white animate-shimmer rounded-full' />
          </div>

          <div className='space-y-16'>
            {timeline.map((item, index) => {
              const [itemRef, itemInView] = useInView();
              const Icon = item.icon;
              const isEven = index % 2 === 0;

              return (
                <div 
                  key={item.year + item.title} 
                  ref={itemRef}
                  className={`relative flex items-start gap-8 md:gap-0 transition-all duration-700 delay-${index * 100} ${itemInView ? 'opacity-100 translate-x-0' : isEven ? 'opacity-0 -translate-x-10' : 'opacity-0 translate-x-10'}`}
                >
                  <div className={`hidden md:block md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                    {isEven && (
                      <div className='text-right'>
                        <div className='inline-flex items-center gap-3 mb-3'>
                          <span className='text-3xl font-bold text-white'>
                            {item.year}
                          </span>
                        </div>
                        <h3 className='text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors'>
                          {item.title}
                        </h3>
                        <p className='text-muted-foreground leading-relaxed'>
                          {item.description}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Center Icon */}
                  <div className='absolute left-8 md:left-1/2 -translate-x-1/2 z-20'>
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color} p-0.5 transform hover:scale-110 transition-transform duration-300 cursor-pointer group`}>
                      <div className='w-full h-full rounded-2xl bg-background flex items-center justify-center group-hover:bg-transparent transition-colors'>
                        <Icon className='w-6 h-6 text-white group-hover:text-white transition-colors' />
                      </div>
                    </div>
                  </div>

                  <div className={`pl-20 md:pl-0 md:w-1/2 ${!isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                    {!isEven && (
                      <div>
                        <div className='inline-flex items-center gap-3 mb-3'>
                          <span className='text-3xl font-bold text-white'>
                            {item.year}
                          </span>
                        </div>
                        <h3 className='text-2xl font-bold text-foreground mb-3'>
                          {item.title}
                        </h3>
                        <p className='text-muted-foreground leading-relaxed'>
                          {item.description}
                        </p>
                      </div>
                    )}
                    
                    {/* Mobile Layout */}
                    {isEven && (
                      <div className='md:hidden'>
                        <span className='text-2xl font-bold text-white'>{item.year}</span>
                        <h3 className='text-xl font-bold text-foreground mb-2 mt-1'>{item.title}</h3>
                        <p className='text-muted-foreground'>{item.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
