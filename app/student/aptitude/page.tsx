import React from 'react';
import Link from 'next/link';
import fs from 'fs';
import path from 'path';

// Server Component
export default async function AptitudeDashboard() {
  const dataPath = path.join(process.cwd(), 'lib', 'aptitude_data.json');
  const rawData = fs.readFileSync(dataPath, 'utf-8');
  const { categories } = JSON.parse(rawData);

  return (
    <div className="w-full space-y-8 pb-20">
      {/* Header */}
      <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start">
          <div>
            <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">
              Aptitude Preparation
            </h1>
            <p className="text-on-surface-variant font-body-md max-w-2xl">
              Master quantitative, logical, verbal, and technical concepts to ace your campus placements and interviews.
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <div className="space-y-12">
        {categories.map((category: any) => (
          <section key={category.id} className="scroll-mt-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-white/80 rounded-2xl flex items-center justify-center shadow-sm border border-white/60">
                <span className="material-symbols-outlined text-indigo-600 text-[24px]">{category.icon}</span>
              </div>
              <div>
                <h2 className="font-display-md text-2xl text-on-surface">{category.name}</h2>
                <p className="text-sm text-on-surface-variant">{category.description} • {category.topics.length} topics</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {category.topics.map((topic: any) => (
                <Link 
                  href={`/student/aptitude/${category.id}/${topic.id}`} 
                  key={topic.id}
                  className="bg-white/40 border border-white/60 rounded-2xl p-5 hover:bg-white/80 hover:-translate-y-1 hover:shadow-md transition-all group backdrop-blur-md flex flex-col"
                >
                  <h3 className="font-semibold text-on-surface mb-2 group-hover:text-indigo-600 transition-colors">
                    {topic.name}
                  </h3>
                  <div className="mt-auto flex items-center justify-between text-xs font-semibold text-on-surface-variant">
                    <span className="bg-white/50 px-2 py-1 rounded-md border border-white/60">Practice</span>
                    <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
