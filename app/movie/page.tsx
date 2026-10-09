'use client';

import React, { useState, useEffect } from 'react';
import { Search, User, Menu, X, Star, Clock, Calendar, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import Head from 'next/head';

export default function MovieHero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);

  const navLinks = ['Movies', 'TV Series', "Editor's Pick", 'Interviews', 'User Reviews'];

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

        .movie-hero-root {
          font-family: 'Inter', sans-serif;
          background-color: black;
          color: white;
        }

        .liquid-glass {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,0.45) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        @keyframes blurFadeUp {
          from {
            opacity: 0;
            filter: blur(20px);
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            filter: blur(0);
            transform: translateY(0);
          }
        }

        .animate-blur-fade-up {
          opacity: 0;
          animation: blurFadeUp 1s ease-out forwards;
        }

        .blur-overlay {
          mask-image: linear-gradient(to top, black 0%, transparent 45%);
          -webkit-mask-image: linear-gradient(to top, black 0%, transparent 45%);
        }
      `}} />

      <main className="movie-hero-root relative w-full h-screen h-[100dvh] overflow-hidden flex flex-col">
        
        {/* Background Video (z-0) */}
        <video 
          className="absolute inset-0 w-full h-full object-cover z-0"
          autoPlay 
          muted 
          loop 
          playsInline
        >
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4" type="video/mp4" />
        </video>

        {/* Bottom Blur Overlay (z-1) */}
        <div className="absolute inset-0 z-[1] pointer-events-none blur-overlay backdrop-blur-xl"></div>

        {/* Navbar (z-50) */}
        <nav className="relative z-50 flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">
          {/* Logo */}
          <div 
            className="flex items-center h-8 md:h-10 text-xl font-bold tracking-widest animate-blur-fade-up"
            style={{ animationDelay: '0ms' }}
          >
            CINEMATIC
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link, idx) => (
              <a 
                key={link} 
                href="#" 
                className="text-sm font-medium hover:text-gray-300 transition-colors animate-blur-fade-up"
                style={{ animationDelay: `${100 + (idx * 50)}ms` }}
              >
                {link}
              </a>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
            {/* Search (sm+) */}
            <button 
              className="hidden sm:flex items-center gap-2 rounded-full liquid-glass px-4 md:px-6 py-2 animate-blur-fade-up text-sm font-medium hover:bg-white/10 transition-colors"
              style={{ animationDelay: '350ms' }}
            >
              <Search size={18} />
              <span>Search</span>
            </button>

            {/* Profile (sm+) */}
            <button 
              className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full liquid-glass animate-blur-fade-up hover:bg-white/10 transition-colors"
              style={{ animationDelay: '400ms' }}
            >
              <User size={18} />
            </button>

            {/* Hamburger (below lg) */}
            <button 
              className="lg:hidden relative flex items-center justify-center w-10 h-10 rounded-full liquid-glass animate-blur-fade-up"
              style={{ animationDelay: '350ms' }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu 
                size={20} 
                className={`absolute transition-all duration-500 ease-out ${isMobileMenuOpen ? 'opacity-0 scale-50 rotate-180' : 'opacity-100 scale-100 rotate-0'}`} 
              />
              <X 
                size={20} 
                className={`absolute transition-all duration-500 ease-out ${isMobileMenuOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-180'}`} 
              />
            </button>
          </div>
        </nav>

        {/* Mobile Menu Overlay (z-40) */}
        <div 
          className={`absolute lg:hidden top-[72px] inset-x-0 mx-4 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl rounded-2xl overflow-hidden z-40 transition-all duration-500 ease-out flex flex-col ${isMobileMenuOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-4 opacity-0 pointer-events-none'}`}
        >
          <div className="flex flex-col p-4">
            {navLinks.map((link, idx) => (
              <a 
                key={link} 
                href="#"
                className={`py-3 px-3 rounded-lg hover:bg-gray-800/50 text-sm font-medium transition-all duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`}
                style={{ transitionDelay: `${50 + (idx * 50)}ms` }}
              >
                {link}
              </a>
            ))}
            
            {/* Search and User for mobile (< sm) */}
            <div className="sm:hidden mt-4 pt-4 border-t border-gray-800 flex flex-col gap-3">
              <button className={`flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800/50 text-sm font-medium transition-all duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} style={{ transitionDelay: '300ms' }}>
                <Search size={18} /> Search
              </button>
              <button className={`flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-800/50 text-sm font-medium transition-all duration-500 ease-out ${isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'}`} style={{ transitionDelay: '350ms' }}>
                <User size={18} /> Profile
              </button>
            </div>
          </div>
        </div>

        {/* Hero Content (z-10) */}
        <div className="relative z-10 flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16 pointer-events-none">
          <div className="flex flex-col md:flex-row md:items-end gap-8 pointer-events-auto">
            
            {/* Left Side */}
            <div className="flex-1">
              
              {/* Metadata */}
              <div 
                className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm animate-blur-fade-up"
                style={{ animationDelay: '300ms' }}
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 fill-white" />
                  <span className="font-medium">8.7/10 IMDB</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>132 min</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>April, 2025</span>
                </div>
              </div>

              {/* Title */}
              <h1 
                className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6 animate-blur-fade-up"
                style={{ letterSpacing: '-0.04em', animationDelay: '400ms' }}
              >
                Step Through. Work Smarter.
              </h1>

              {/* Description */}
              <p 
                className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl animate-blur-fade-up"
                style={{ animationDelay: '500ms' }}
              >
                A voyage through forgotten realms, where past and future intertwine.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <button 
                  className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors animate-blur-fade-up"
                  style={{ animationDelay: '600ms' }}
                >
                  <Play size={18} className="fill-black" />
                  <span>Watch Now</span>
                </button>
                
                <button 
                  className="rounded-full font-medium liquid-glass px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-white/10 transition-colors animate-blur-fade-up"
                  style={{ animationDelay: '700ms' }}
                >
                  Learn More
                </button>
              </div>

            </div>

            {/* Right Side / Navigation */}
            <div className="flex items-center justify-start md:justify-end gap-3 sm:gap-4 w-full md:w-auto">
              <button 
                className="flex items-center justify-center rounded-full liquid-glass px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-white/10 transition-colors animate-blur-fade-up"
                style={{ animationDelay: '800ms' }}
                aria-label="Previous"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button 
                className="flex items-center justify-center rounded-full liquid-glass px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-white/10 transition-colors animate-blur-fade-up"
                style={{ animationDelay: '900ms' }}
                aria-label="Next"
              >
                <ChevronRight size={24} />
              </button>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
