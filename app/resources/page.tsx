import React from 'react';
import Navbar from '@/components/Navbar';
import { OpportunitiesList } from '@/components/OpportunitiesList';

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900 flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <OpportunitiesList 
          title="Learning Resources & Events" 
          description="Explore workshops, seminars, technical competitions, and other learning resources to enhance your skills." 
        />
      </main>
    </div>
  );
}
