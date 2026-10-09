'use client';

import React from 'react';
import Link from 'next/link';

export default function TrainingPlacementDashboard() {
  const companies = [
    { name: 'TCS', icon: 'business' },
    { name: 'Infosys', icon: 'domain' },
    { name: 'Wipro', icon: 'apartment' },
    { name: 'Accenture', icon: 'corporate_fare' },
    { name: 'Cognizant', icon: 'business_center' },
    { name: 'Capgemini', icon: 'store' },
    { name: 'HCLTech', icon: 'source' },
    { name: 'Tech Mahindra', icon: 'computer' }
  ];

  const modules = [
    {
      title: "Placement Roadmap",
      desc: "Step-by-step guidance from day one to offer letter.",
      icon: "route",
      link: "#"
    },
    {
      title: "Aptitude Tests",
      desc: "3,150+ quantitative, logical, and verbal questions.",
      icon: "calculate",
      link: "/student/aptitude"
    },
    {
      title: "Coding Tests",
      desc: "Practice algorithmic questions based on actual exams.",
      icon: "terminal",
      link: "/student/aptitude" // Points to Technical Skills
    },
    {
      title: "Company-Pattern Mock Tests",
      desc: "Timed mocks replicating exact company exam patterns.",
      icon: "timer",
      link: "#"
    },
    {
      title: "Previous-Year Papers",
      desc: "Actual questions asked in recent placement drives.",
      icon: "history_edu",
      link: "#"
    },
    {
      title: "Technical Interview Prep",
      desc: "Core CS fundamentals, OS, DBMS, Networks.",
      icon: "developer_board",
      link: "/student/aptitude"
    },
    {
      title: "HR Interview Prep",
      desc: "Behavioral questions, resume tips, and mock interviews.",
      icon: "diversity_3",
      link: "#"
    },
    {
      title: "Timed Full-Length Tests",
      desc: "Simulate real testing environments with strict timers.",
      icon: "alarm",
      link: "#"
    }
  ];

  const analytics = [
    { title: "Performance Analytics", icon: "monitoring", val: "85%" },
    { title: "Weak-Topic Analysis", icon: "troubleshoot", val: "3 Topics" },
    { title: "Bookmarked Questions", icon: "bookmarks", val: "142" },
    { title: "Test History", icon: "history", val: "24 Tests" }
  ];

  return (
    <div className="w-full space-y-8 pb-20">
      <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-green-500/20 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start">
          <div>
            <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">
              Training & Placement Prep
            </h1>
            <p className="text-on-surface-variant font-body-md max-w-2xl">
              Your centralized dashboard for mastering technical skills, clearing aptitude rounds, and cracking the toughest interviews. Features 3,150+ generated questions.
            </p>
          </div>
        </div>
      </section>

      {/* Analytics Row */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analytics.map((item, i) => (
          <div key={i} className="bg-white/50 border border-white/60 rounded-2xl p-5 flex items-center justify-between backdrop-blur-md hover:bg-white/70 transition">
            <div>
              <p className="text-sm text-on-surface-variant font-semibold mb-1">{item.title}</p>
              <h3 className="text-2xl font-bold text-on-surface">{item.val}</h3>
            </div>
            <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-600">{item.icon}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Preparation Modules */}
      <section>
        <h2 className="font-display-md text-2xl text-on-surface mb-6">Preparation Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map((mod, i) => (
            <Link href={mod.link} key={i} className="bg-white/40 border border-white/60 rounded-2xl p-6 hover:bg-white/80 hover:-translate-y-1 hover:shadow-md transition-all group backdrop-blur-md flex flex-col h-full">
              <div className="w-12 h-12 bg-white/80 rounded-xl flex items-center justify-center shadow-sm border border-white/60 mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-green-600 text-[24px]">{mod.icon}</span>
              </div>
              <h3 className="font-semibold text-on-surface mb-2 text-lg group-hover:text-green-600 transition-colors">
                {mod.title}
              </h3>
              <p className="text-sm text-on-surface-variant flex-1">{mod.desc}</p>
              <div className="mt-4 flex items-center text-xs font-bold text-green-600">
                <span>Explore Module</span>
                <span className="material-symbols-outlined text-[16px] ml-1 group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Company Wise Prep */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display-md text-2xl text-on-surface">Company-Wise Preparation</h2>
          <button className="text-sm font-semibold text-green-600 hover:bg-green-50 px-4 py-2 rounded-full transition">View All Companies</button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {companies.map((company, i) => (
            <button key={i} className="bg-white/40 border border-white/60 rounded-xl p-4 flex flex-col items-center justify-center gap-3 hover:bg-white/80 transition shadow-sm backdrop-blur-sm group">
              <span className="material-symbols-outlined text-3xl text-on-surface-variant group-hover:text-green-600 transition-colors">{company.icon}</span>
              <span className="text-sm font-bold text-on-surface text-center leading-tight">{company.name}</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
