'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function AptitudePage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/aptitude').then(res => res.json()).then(data => {
      setCategories(data.categories || []);
      setLoading(false);
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <h1 className="text-4xl font-bold mb-4">Aptitude Preparation</h1>
        <p className="text-slate-600 mb-8 max-w-3xl">Practice quantitative aptitude, logical reasoning, verbal ability, and technical topics for your upcoming campus placements and competitive exams.</p>
        
        {loading ? (
          <div>Loading categories...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-xl font-bold mb-2">{cat.name}</h2>
                <p className="text-sm text-slate-500 mb-4">{cat.description}</p>
                <div className="flex flex-col gap-2">
                  {cat.topics.map((t, j) => (
                    <Link key={j} href={`/aptitude/${cat.id}/${t.id}`} className="text-blue-600 hover:underline text-sm flex items-center justify-between">
                      {t.name}
                      <span className="text-slate-400">&rarr;</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
