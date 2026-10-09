'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { OpportunityCard } from './OpportunityCard';
import { campusPilotModules, OpportunityModule } from './opportunityModules';
import { VoiceBeam, useMicrophone } from 'voice-glow';
import { MetalFx } from 'metal-fx';
import './carousel.css';

interface OpportunityCarouselProps {
  autoRotate?: boolean;
  showControls?: boolean;
}

export function OpportunityCarousel({ autoRotate = true, showControls = true }: OpportunityCarouselProps) {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  const mic = useMicrophone();

  const numModules = campusPilotModules.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % numModules);
  }, [numModules]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + numModules) % numModules);
  }, [numModules]);

  const goToSlide = (index: number) => {
    setActiveIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return; // Prevent auto-repeat from spamming state updates
      if (e.key === 'ArrowRight') nextSlide();
      else if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Auto rotation
  useEffect(() => {
    if (autoRotate && !isHovered && !isAnimating) {
      autoRotateRef.current = setInterval(nextSlide, 6000);
    }
    return () => {
      if (autoRotateRef.current) clearInterval(autoRotateRef.current);
    };
  }, [autoRotate, isHovered, isAnimating, nextSlide]);

  const handleCardClick = (index: number, module: OpportunityModule) => {
    if (index === activeIndex) {
      // Navigate to route
      setIsAnimating(true);
      setTimeout(() => {
        router.push(module.route);
      }, 400); // Wait for click animation
    } else {
      // Bring clicked card to center
      goToSlide(index);
    }
  };

  // Calculate relative positions for all cards based on active index
  const getRelativePosition = (index: number) => {
    let diff = index - activeIndex;
    // Handle wrap around
    if (diff > numModules / 2) diff -= numModules;
    if (diff < -numModules / 2) diff += numModules;
    return diff;
  };

  return (
    <div 
      className="w-full flex flex-col items-center justify-center my-8"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="carousel-container">
        <div className="carousel">
          {campusPilotModules.map((module, index) => {
            const positionIndex = getRelativePosition(index);
            const isActive = positionIndex === 0;

            return (
              <OpportunityCard
                key={module.id}
                module={module}
                isActive={isActive}
                positionIndex={positionIndex}
                totalCards={numModules}
                onClick={() => handleCardClick(index, module)}
              />
            );
          })}
        </div>

        {/* Previous/Next Arrows */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/80 transition-colors z-50 border border-white/60 shadow-md text-on-surface"
          aria-label="Previous module"
        >
          <span className="material-symbols-outlined">chevron_left</span>
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/80 transition-colors z-50 border border-white/60 shadow-md text-on-surface"
          aria-label="Next module"
        >
          <span className="material-symbols-outlined">chevron_right</span>
        </button>
      </div>

      {/* Progress / Active Indicator */}
      {showControls && (
        <>
          <div className="flex items-center gap-4 mt-6">
            <span className="text-sm font-bold uppercase tracking-wider text-on-surface/60 w-32 text-right">
              {campusPilotModules[activeIndex].title}
            </span>
            <div className="flex items-center gap-2">
              {campusPilotModules.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex ? 'w-8 bg-[#0284c7]' : 'w-2 bg-on-surface/20 hover:bg-on-surface/40'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <span className="text-sm font-bold text-on-surface/60 w-32">
              {String(activeIndex + 1).padStart(2, '0')} / {String(numModules).padStart(2, '0')}
            </span>
          </div>

          {/* Quick Action Links */}
          <div className="flex flex-wrap justify-center gap-4 mt-8 max-w-4xl mx-auto items-center">
            <span className="text-sm font-bold text-on-surface-variant flex items-center mr-2">Quick actions:</span>
            {isMounted ? (
              <MetalFx preset="chromatic" strength={1}>
                <button onClick={() => router.push('/student/resume')} className="text-xs font-semibold px-4 py-2 bg-white/40 hover:bg-white/60 border border-white/60 rounded-full shadow-sm transition-colors text-on-surface cursor-pointer z-10">Upload Resume</button>
              </MetalFx>
            ) : (
              <button onClick={() => router.push('/student/resume')} className="text-xs font-semibold px-4 py-2 bg-white/40 hover:bg-white/60 border border-white/60 rounded-full shadow-sm transition-colors text-on-surface cursor-pointer z-10">Upload Resume</button>
            )}
            <button onClick={() => router.push('/student/internships')} className="text-xs font-semibold px-4 py-2 bg-white/40 hover:bg-white/60 border border-white/60 rounded-full shadow-sm transition-colors text-on-surface cursor-pointer z-10">Find Internships</button>
            <button onClick={() => router.push('/student/hackathons')} className="text-xs font-semibold px-4 py-2 bg-white/40 hover:bg-white/60 border border-white/60 rounded-full shadow-sm transition-colors text-on-surface cursor-pointer z-10">Hackathons</button>
            <button onClick={() => router.push('/student/applications')} className="text-xs font-semibold px-4 py-2 bg-white/40 hover:bg-white/60 border border-white/60 rounded-full shadow-sm transition-colors text-on-surface cursor-pointer z-10">Track Applications</button>
            <VoiceBeam stream={mic.stream} colorVariant="colorful" type="pill">
              <button 
                onClick={() => router.push('/student/ai-assistant')}
                className="text-xs font-semibold px-4 py-2 bg-[#111] text-white rounded-full shadow-sm hover:bg-black transition-colors flex items-center gap-1 cursor-pointer z-10"
              >
                <span className="material-symbols-outlined text-[14px]">
                  smart_toy
                </span> 
                Ask AI
              </button>
            </VoiceBeam>
          </div>
        </>
      )}
    </div>
  );
}
