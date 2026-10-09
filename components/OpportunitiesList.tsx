"use client";

import React, { useState, useEffect } from 'react';

interface OpportunitiesListProps {
  type?: string;
  title: string;
  description: string;
  gradientColor?: string;
}

export function OpportunitiesList({ type, title, description, gradientColor = 'from-blue-500/20' }: OpportunitiesListProps) {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOpportunities() {
      try {
        const url = type ? `/api/opportunities?type=${type}` : '/api/opportunities';
        const res = await fetch(url);
        const data = await res.json();
        setOpportunities(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOpportunities();
  }, [type]);

  const getBadgeColor = (eventType: string) => {
    switch(eventType) {
      case 'hackathon': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
      case 'workshop': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      case 'internship': return 'bg-[#38BDF8]/20 text-[#0284c7] border-[#38BDF8]/30';
      case 'competition': return 'bg-pink-500/20 text-pink-700 border-pink-500/30';
      default: return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    }
  };

  return (
    <div className="w-full space-y-8">
      <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 backdrop-blur-xl relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl ${gradientColor} to-transparent rounded-bl-full pointer-events-none`}></div>
        <div className="relative z-10">
          <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">
            {title}
          </h1>
          <p className="text-on-surface-variant font-body-md max-w-2xl">
            {description}
          </p>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display-md text-2xl text-on-surface">Available {title}</h2>
          <div className="flex gap-2">
            <button className="text-sm font-semibold bg-white/50 border border-white/60 px-4 py-2 rounded-full shadow-sm text-on-surface hover:bg-white/70">Filters</button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-8 text-on-surface-variant">Loading {title.toLowerCase()}...</div>
        ) : opportunities.length === 0 ? (
          <div className="flex justify-center p-8 text-on-surface-variant bg-white/30 rounded-2xl border border-white/40 py-12">
            <div className="text-center">
              <span className="material-symbols-outlined text-4xl text-on-surface/40 mb-3">event_busy</span>
              <h3 className="text-lg font-semibold text-on-surface mb-1">No {title} Found</h3>
              <p className="text-sm">We couldn't find any items at the moment. Please check back later.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {opportunities.map((card, i) => {
              return (
                <article key={card.id || i} className="bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 backdrop-blur-xl flex flex-col hover:-translate-y-1 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${getBadgeColor(card.event_type)}`}>
                      {card.event_type}
                    </div>
                  </div>

                  <h3 className="font-display-sm text-xl text-on-surface mb-1">{card.title}</h3>
                  <p className="text-on-surface-variant font-medium text-sm mb-6">{card.organizer}</p>

                  <div className="flex flex-col gap-3 mb-6 flex-1">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">calendar_today</span>
                      <span className="text-on-surface">
                        Deadline: <strong className="font-semibold">
                          {card.registration_deadline ? new Date(card.registration_deadline).toLocaleDateString() : 'Not announced'}
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px]">location_on</span>
                      <span className="text-on-surface">{card.location} ({card.mode})</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <span className="material-symbols-outlined text-on-surface-variant text-[18px] mt-0.5">code</span>
                      <span className="text-on-surface">{card.skills?.join(', ') || 'Various'}</span>
                    </div>
                  </div>

                  <p className="text-sm text-on-surface-variant mb-6 line-clamp-3">
                    {card.description}
                  </p>

                  <div className="flex items-center gap-3 mt-auto">
                    <a href={card.url || '#'} target="_blank" rel="noopener noreferrer" className="flex-1 bg-on-surface text-surface py-2.5 rounded-full font-semibold text-sm hover:bg-on-surface/90 transition-all shadow-md active:scale-95 text-center inline-block">
                      View Details
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
