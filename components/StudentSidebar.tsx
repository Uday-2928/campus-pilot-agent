"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function StudentSidebar() {
  const pathname = usePathname();

  const navItems = [
    { icon: 'home', label: 'Dashboard', href: '/student' },
    { icon: 'stars', label: 'My Opportunities', href: '/student/opportunities' },
    { icon: 'business', label: 'Campus Drives', href: '/student/campus-drives' },
    { icon: 'work', label: 'Internships', href: '/student/internships' },
    { icon: 'emoji_events', label: 'Hackathons', href: '/student/hackathons' },
    { icon: 'calculate', label: 'Aptitude Prep', href: '/student/aptitude' },
    { icon: 'school', label: 'Training & Prep', href: '/student/training' },
    { icon: 'psychology', label: 'Skill Gap', href: '/student/skill-gap' },
    { icon: 'description', label: 'Resume Builder', href: '/student/resume' },
    { icon: 'assignment', label: 'Applications', href: '/student/applications' },
    { icon: 'alarm', label: 'Deadlines', href: '/student/deadlines' },
    { icon: 'notifications', label: 'Notifications', href: '/student/notifications' },
    { icon: 'settings', label: 'Settings', href: '/student/settings' },
  ];

  return (
    <aside className="w-[280px] shrink-0 h-screen sticky top-0 border-r border-white/40 p-6 flex flex-col gap-8 bg-white/20 backdrop-blur-md z-10 overflow-y-auto">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-[#38BDF8] to-[#0284c7] rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
          S
        </div>
        <span className="font-display-md text-on-surface text-xl">Student Portal</span>
      </div>

      <nav className="flex flex-col gap-2">
        <div className="text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Explore</div>
        {navItems.map((item) => {
          // Check if active: exact match for dashboard, or startsWith for others
          const isActive = item.href === '/student' 
            ? pathname === '/student'
            : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-white/60 shadow-sm border border-white/60 text-on-surface font-semibold'
                  : 'text-on-surface-variant hover:bg-white/40 hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
              <span className="font-body-md text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
