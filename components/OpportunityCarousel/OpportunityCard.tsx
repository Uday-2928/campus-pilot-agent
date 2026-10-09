import React from 'react';
import { OpportunityModule } from './opportunityModules';
import { BorderBeam } from "@/components/magicui/border-beam";
import './carousel.css';

interface OpportunityCardProps {
  module: OpportunityModule;
  isActive: boolean;
  positionIndex: number;
  totalCards: number;
  onClick: () => void;
}

export function OpportunityCard({ module, isActive, positionIndex, totalCards, onClick }: OpportunityCardProps) {
  // Calculate 3D collage transforms based on position index
  // positionIndex: 0 is center/active, 1 is right, -1 is left, etc.
  
  // Calculate 360-degree cylinder transforms based on position index
  // positionIndex: 0 is center/active, 1 is right, -1 is left, etc.
  
  const angle = positionIndex * (360 / totalCards);

  // Cards at the back should fade out slightly
  let opacity = 1;
  const absPos = Math.abs(positionIndex);
  
  if (absPos > totalCards / 4) {
    opacity = Math.max(1 - (absPos - totalCards / 4) * 0.5, 0.1);
  }
  
  const zIndex = totalCards - absPos;

  const transformStyle = {
    '--card-angle': `${angle}deg`,
    zIndex,
    opacity,
    pointerEvents: opacity > 0.1 ? 'auto' : 'none',
  } as React.CSSProperties;

  const isClickable = absPos <= 2;
  
  // Add floating animation class based on ID or index to avoid them moving in unison
  const floatAnimClass = `float-anim-${Math.abs(module.title.length % 3)}`;

  return (
    <div 
      className={`carousel-card card-${module.size} ${isActive ? 'active' : ''}`}
      style={transformStyle}
      onClick={isClickable ? onClick : undefined}
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-label={`Open ${module.title}`}
    >
      <div 
        className={`card-content ${floatAnimClass} relative w-full h-full rounded-2xl overflow-hidden cursor-pointer group`}
      >
        {/* Background Image or Gradient */}
        {module.image ? (
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${module.image})` }}
          />
        ) : (
          <div className={`absolute inset-0 ${module.color.split(' ')[0]} opacity-30`} />
        )}
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />

        {/* Animated border on hover (active card only) */}
        {isActive && (
          <div className="absolute inset-0 rounded-2xl border border-white/40 group-hover:border-white/80 transition-all duration-300 pointer-events-none" />
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white pointer-events-none">
          {/* Top category label for large cards */}
          {module.size === 'large' && (
            <div className="text-[10px] font-bold uppercase tracking-wider mb-auto opacity-70">
              {module.category}
            </div>
          )}

          {/* Title */}
          <h3 className={`font-display font-bold tracking-tight leading-tight ${module.size === 'large' ? 'text-2xl mb-1' : 'text-base mb-0'}`}>
            {module.title}
          </h3>
          
          {/* Subtitle */}
          {module.size === 'large' && (
            <p className="text-sm font-medium opacity-80 mb-2 line-clamp-2">
              {module.subtitle}
            </p>
          )}

          {/* Stats / Open action (only on large) */}
          {module.size === 'large' && (
            <div className="flex items-center justify-between mt-2">
              {module.stats ? (
                <span className="text-[10px] font-bold bg-white/20 backdrop-blur-md px-2 py-1 rounded-md">
                  {module.stats}
                </span>
              ) : (
                <span />
              )}
            </div>
          )}
        </div>
        
        {isActive && (
          <>
            <BorderBeam
              duration={6}
              size={400}
              className="from-transparent via-red-500 to-transparent"
            />
            <BorderBeam
              duration={6}
              delay={3}
              size={400}
              borderWidth={2}
              className="from-transparent via-blue-500 to-transparent"
            />
          </>
        )}
      </div>
    </div>
  );
}
