"use client";

import React, { useState } from 'react';

export default function ResumeAnalyzerPortal() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [resumeText, setResumeText] = useState("");

  const handleAnalyze = () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setResultsReady(false);
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setResultsReady(true);
    }, 3000);
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 backdrop-blur-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-500/20 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
          <div>
            <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-bold text-emerald-700 tracking-wide uppercase mb-4">
              AI-Powered
            </div>
            <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">
              Resume Intelligence Portal
            </h1>
            <p className="text-on-surface-variant font-body-md max-w-2xl">
              Upload your resume or paste the text below to receive an instant, deep-dive ATS analysis. Discover missing keywords, formatting errors, and impact score improvements.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-3">
            <button className="bg-white/50 text-on-surface border border-white/60 px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-white/80 transition-all shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px]">upload_file</span>
              Upload PDF
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Area */}
        <div className="lg:col-span-5 space-y-4 flex flex-col">
          <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-6 backdrop-blur-xl flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold text-lg text-on-surface">Resume Content</h2>
              <span className="text-xs text-on-surface-variant bg-white/50 px-2 py-1 rounded-md border border-white/60">Plain Text</span>
            </div>
            <textarea
              className="w-full flex-1 min-h-[400px] bg-white/50 border border-white/60 rounded-2xl p-4 text-sm font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-emerald-500/50 resize-none transition-all placeholder:text-on-surface-variant/50"
              placeholder="Paste your resume text here to analyze..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
            ></textarea>
            <button 
              onClick={handleAnalyze}
              disabled={isAnalyzing || !resumeText.trim()}
              className="w-full mt-4 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-[20px]">sync</span>
                  Analyzing via OpenRouter...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">analytics</span>
                  Run Full ATS Scan
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results Dashboard Area */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {!resultsReady && !isAnalyzing && (
            <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-12 backdrop-blur-xl flex-1 flex flex-col items-center justify-center text-center">
              <span className="material-symbols-outlined text-6xl text-on-surface-variant/30 mb-4">query_stats</span>
              <h3 className="text-xl font-semibold text-on-surface mb-2">Awaiting Analysis</h3>
              <p className="text-on-surface-variant max-w-sm">Paste your resume text and hit "Run Full ATS Scan" to unlock personalized insights and scoring.</p>
            </div>
          )}

          {isAnalyzing && (
            <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-12 backdrop-blur-xl flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin mb-6"></div>
              <h3 className="text-xl font-semibold text-on-surface mb-2 animate-pulse">Running Semantic Analysis...</h3>
              <p className="text-on-surface-variant text-sm">Evaluating keywords, impact metrics, and formatting against top industry standards.</p>
            </div>
          )}

          {resultsReady && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {/* Top Score Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white/60 rounded-2xl border border-emerald-500/30 shadow-sm p-6 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                  <span className="text-sm font-medium text-on-surface-variant mb-1">Overall ATS Score</span>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-display-md text-emerald-700">78</span>
                    <span className="text-sm font-bold text-on-surface-variant mb-1">/ 100</span>
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 mt-2 bg-emerald-500/10 w-fit px-2 py-0.5 rounded">Good fit</span>
                </div>

                <div className="bg-white/60 rounded-2xl border border-amber-500/30 shadow-sm p-6 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                  <span className="text-sm font-medium text-on-surface-variant mb-1">Impact & Action Verbs</span>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-display-md text-amber-600">62</span>
                    <span className="text-sm font-bold text-on-surface-variant mb-1">/ 100</span>
                  </div>
                  <span className="text-xs font-semibold text-amber-600 mt-2 bg-amber-500/10 w-fit px-2 py-0.5 rounded">Needs Improvement</span>
                </div>

                <div className="bg-white/60 rounded-2xl border border-blue-500/30 shadow-sm p-6 flex flex-col relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                  <span className="text-sm font-medium text-on-surface-variant mb-1">Readability</span>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl font-display-md text-blue-600">92</span>
                    <span className="text-sm font-bold text-on-surface-variant mb-1">/ 100</span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 mt-2 bg-blue-500/10 w-fit px-2 py-0.5 rounded">Excellent</span>
                </div>
              </div>

              {/* Keyword & AI Analysis */}
              <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-6 backdrop-blur-xl">
                <h3 className="font-semibold text-lg text-on-surface mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-600">psychology</span>
                  AI Recommendations
                </h3>
                
                <div className="space-y-4">
                  <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-xl flex gap-4">
                    <span className="material-symbols-outlined text-amber-600 shrink-0 mt-0.5">warning</span>
                    <div>
                      <h4 className="font-semibold text-amber-900 text-sm mb-1">Weak Bullet Points Detected</h4>
                      <p className="text-sm text-amber-800/80">3 bullet points in your experience section lack measurable outcomes. Replace phrases like "Responsible for developing" with "Engineered a solution that increased efficiency by X%".</p>
                    </div>
                  </div>

                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl flex gap-4">
                    <span className="material-symbols-outlined text-emerald-600 shrink-0 mt-0.5">check_circle</span>
                    <div>
                      <h4 className="font-semibold text-emerald-900 text-sm mb-1">Strong Technical Keywords</h4>
                      <p className="text-sm text-emerald-800/80">Great usage of primary keywords! "React", "Node.js", and "PostgreSQL" are prominent. However, consider adding "TypeScript" or "Docker" if you have experience with them, as they are highly requested in matched roles.</p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-xl flex gap-4">
                    <span className="material-symbols-outlined text-blue-600 shrink-0 mt-0.5">tips_and_updates</span>
                    <div>
                      <h4 className="font-semibold text-blue-900 text-sm mb-1">Formatting Optimization</h4>
                      <p className="text-sm text-blue-800/80">Your contact information is perfectly parsed, but the ATS may struggle to parse your education dates due to non-standard dash characters. Ensure you use standard hyphens (-).</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/60">
                  <h4 className="font-semibold text-sm text-on-surface mb-3">Suggested Missing Keywords</h4>
                  <div className="flex flex-wrap gap-2">
                    {["CI/CD", "AWS", "Microservices", "REST APIs", "Agile", "TypeScript", "Jest"].map((kw) => (
                      <span key={kw} className="bg-white/60 border border-white/80 px-3 py-1 rounded-full text-xs font-medium text-on-surface-variant hover:bg-emerald-500/10 hover:text-emerald-700 hover:border-emerald-500/30 transition-colors cursor-pointer cursor-help" title={`Add this keyword to improve ATS match rate`}>
                        + {kw}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
