import React, { useState } from 'react';
import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import AboutSection from '../components/landing/AboutSection';
import VitaSection from '../components/landing/VitaSection';
import ServicesSection from '../components/landing/ServicesSection';
import PortfolioSection from '../components/landing/PortfolioSection';
import ContactSection from '../components/landing/ContactSection';
import SocialMediaSection from '../components/landing/SocialMediaSection';
import Footer from '../components/landing/Footer';
import IntroAnimation from '../components/landing/IntroAnimation';

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {showIntro && <IntroAnimation onComplete={() => setShowIntro(false)} />}
      <Navbar />
      <HeroSection />
      <AboutSection />
      <VitaSection />
      <ServicesSection />
      <PortfolioSection />
      <ContactSection />
      <SocialMediaSection />
      <Footer />
    </div>
  );
}
