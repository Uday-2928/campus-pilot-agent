"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OpportunityCarousel } from '@/components/OpportunityCarousel/OpportunityCarousel';
import { Generate } from '@/components/Generate';

const dashboardStats = [
  { label: 'Profile completion', value: '92%', detail: '+8% this month' },
  { label: 'Opportunities matched', value: '0', detail: 'Top recommendations' },
  { label: 'Training streak', value: '14 days', detail: 'Aptitude + technical' },
  { label: 'Resume score', value: '78/100', detail: 'Strong AI fit' },
];

const training = [
  { title: 'Python for Data & ML', level: 'Intermediate', duration: '4 weeks', badge: 'bg-teal-500/20 text-teal-700' },
  { title: 'SQL & Data Analysis', level: 'Beginner', duration: '2 weeks', badge: 'bg-blue-500/20 text-blue-700' },
  { title: 'Interview Preparation', level: 'Advanced', duration: '3 weeks', badge: 'bg-purple-500/20 text-purple-700' },
];

export default function StudentDashboard() {
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/opportunities');
        const data = await res.json();
        setOpportunities(data);
        dashboardStats[1].value = data.length.toString();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getBadgeColor = (type: string) => {
    switch(type) {
      case 'hackathon': return 'bg-purple-500/20 text-purple-700 border-purple-500/30';
      case 'workshop': return 'bg-amber-500/20 text-amber-700 border-amber-500/30';
      case 'internship': return 'bg-[#38BDF8]/20 text-[#0284c7] border-[#38BDF8]/30';
      default: return 'bg-blue-500/20 text-blue-700 border-blue-500/30';
    }
  };

  return (
    <>
      <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#38BDF8]/20 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-white/50 border border-white/60 text-xs font-semibold text-on-surface-variant mb-4">
              Good morning, Aarav 👋
            </div>
            <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">
              Your Career Intelligence
            </h1>
            <p className="text-on-surface-variant font-body-md">
              We've found new opportunities based on your recent skill updates.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <Link href="/admin/login" className="bg-white/50 border border-white/60 text-on-surface px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white/80 transition-all shadow-sm active:scale-95 flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
              Admin Portal
            </Link>
            <Link href="/profile" className="bg-on-surface text-surface px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-on-surface/90 transition-all shadow-md active:scale-95">
              Update Profile
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-white/40">
          <div className="flex justify-between items-center mb-3">
            <span className="font-semibold text-on-surface">Profile Completion</span>
            <span className="font-bold text-[#0284c7]">92%</span>
          </div>
          <div className="h-3 w-full bg-white/50 rounded-full overflow-hidden border border-white/60 shadow-inner">
            <div className="h-full bg-gradient-to-r from-[#38BDF8] to-[#0284c7] rounded-full" style={{ width: '92%' }}></div>
          </div>
        </div>
      </section>

      {/* Premium 3D Opportunity Carousel */}
      <section className="mb-12 w-full mt-4">
        <div className="flex flex-col items-center justify-center mb-6">
          <h2 className="font-display-md text-3xl text-on-surface text-center tracking-tight">Your Career Command Center</h2>
          <p className="text-on-surface-variant mt-2 text-center max-w-xl">
            Explore AI-matched opportunities, training, and resources customized for your career goals.
          </p>
        </div>
        <OpportunityCarousel autoRotate={true} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dashboardStats.map((stat, i) => (
          <div key={i} className="bg-white/40 rounded-2xl border border-white/60 shadow-sm p-6 backdrop-blur-md flex flex-col justify-between hover:bg-white/50 transition-colors">
            <div className="text-on-surface-variant text-sm font-medium mb-2">{stat.label}</div>
            <div className="font-display-md text-3xl text-on-surface mb-1">{stat.value}</div>
            <div className="text-[#0284c7] text-xs font-semibold">{stat.detail}</div>
          </div>
        ))}
      </section>

      {/* AI Generator Demo Section */}
      <section className="mb-10">
        <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-8 backdrop-blur-xl">
          <h2 className="font-display-md text-2xl text-on-surface mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-purple-500">auto_awesome</span>
            AI Identity Generator
          </h2>
          <div className="flex justify-center">
            <Generate pace={3} />
          </div>
        </div>
      </section>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display-md text-2xl text-on-surface">Recommended for you</h2>
          <button className="text-sm font-semibold text-[#0284c7] hover:underline">View all matches</button>
        </div>
        
        {loading ? (
          <div className="flex justify-center p-8 text-on-surface-variant">Loading intelligent recommendations...</div>
        ) : opportunities.length === 0 ? (
          <div className="flex justify-center p-8 text-on-surface-variant">No opportunities found. Keep building your skills!</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {opportunities.map((card, i) => {
              // Simulate AI semantic matching score for demo
              const mockScore = Math.floor(Math.random() * (98 - 75 + 1) + 75);
              return (
              <article 
                key={card.id || i} 
                onClick={() => window.open(card.url || '#', '_blank', 'noopener,noreferrer')}
                className="cursor-pointer bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-6 backdrop-blur-xl flex flex-col hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className={`px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase ${getBadgeColor(card.event_type)}`}>
                    {card.event_type.replace('_', ' ')}
                  </div>
                  <div className="flex items-center gap-1 bg-[#38BDF8]/10 border border-[#38BDF8]/30 px-2.5 py-1 rounded-full text-[#0284c7] text-xs font-bold shadow-sm">
                    <span className="material-symbols-outlined text-[14px]">auto_awesome</span>
                    Match {mockScore}%
                  </div>
                </div>

                <h3 className="font-display-sm text-xl text-on-surface mb-1">{card.title}</h3>
                <p className="text-on-surface-variant font-medium text-sm mb-6">{card.organizer}</p>

                <div className="flex flex-col gap-3 mb-6 flex-1">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-on-surface-variant text-[18px]">calendar_today</span>
                    <span className="text-on-surface">
                      <strong className="font-semibold">
                        {card.registration_deadline ? new Date(card.registration_deadline).toLocaleDateString() : 'Rolling basis'}
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

                <div className="bg-white/50 border border-white/60 p-4 rounded-2xl mb-6 text-sm text-on-surface-variant">
                  <strong className="text-on-surface block mb-1">Why recommended:</strong>
                  {card.description?.substring(0, 100)}... Based on your skills in {card.skills?.slice(0,2).join(', ')}, this is a strong semantic fit for your profile!
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <a href={card.url || '#'} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="flex-1 bg-on-surface text-surface py-2.5 rounded-full font-semibold text-sm hover:bg-on-surface/90 transition-all shadow-md active:scale-95 text-center inline-block">
                    Apply Now
                  </a>
                  <button onClick={(e) => e.stopPropagation()} className="w-12 h-12 shrink-0 bg-white/50 border border-white/60 rounded-full flex items-center justify-center text-on-surface hover:bg-white/70 transition-all shadow-sm active:scale-95">
                    <span className="material-symbols-outlined text-[20px]">bookmark_border</span>
                  </button>
                </div>
              </article>
              );
            })}
          </div>
        )}
      </section>

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display-md text-2xl text-on-surface">Training for you</h2>
          <button className="text-sm font-semibold text-[#0284c7] hover:underline">Open complete roadmap</button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {training.map((item, i) => (
            <article key={i} className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-6 backdrop-blur-xl hover:bg-white/50 transition-colors cursor-pointer group">
              <div className={`inline-block px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase mb-4 ${item.badge} border-current opacity-70`}>
                {item.level}
              </div>
              <h3 className="font-semibold text-lg text-on-surface mb-2 group-hover:text-[#0284c7] transition-colors">{item.title}</h3>
              <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                {item.duration}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
