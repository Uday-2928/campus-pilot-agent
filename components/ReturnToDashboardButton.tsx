'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function ReturnToDashboardButton() {
  const pathname = usePathname();

  // Only show the button if we are NOT on the main student dashboard
  if (pathname === '/student') {
    return null;
  }

  return (
    <div className="mb-6">
      <Link 
        href="/student"
        className="inline-flex items-center gap-2 px-4 py-2 bg-white/60 hover:bg-white/90 border border-white/60 rounded-full text-on-surface text-sm font-semibold shadow-sm transition-all backdrop-blur-md"
      >
        <span className="material-symbols-outlined text-[18px]">arrow_back</span>
        Return to Dashboard
      </Link>
    </div>
  );
}
