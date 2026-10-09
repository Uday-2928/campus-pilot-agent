"use client";

import React, { useState, useRef } from 'react';
import { templatesArray, ResumeData } from '../../../components/ResumeTemplates';

export default function ResumePortal() {
  const [activeTab, setActiveTab] = useState<'analyzer' | 'builder'>('analyzer');

  // --- Analyzer State ---
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [resultsReady, setResultsReady] = useState(false);
  const [resumeText, setResumeText] = useState("");
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Builder State ---
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "JOHN DOE",
    title: "Software Engineer",
    location: "New York, USA",
    phone: "+1 234 567 890",
    email: "john@example.com",
    summary: "Motivated and adaptable learner with strong fundamentals in software engineering. Eager to contribute and tackle challenging technical initiatives.",
    skills: "JavaScript, React, Node.js, Next.js, TypeScript",
    education: "B.S. in Computer Science\nUniversity of Technology (2020 - 2024)",
    experience: "Software Engineer Intern\nTechCorp Inc. (Summer 2023)\n- Developed scalable web applications\n- Increased efficiency by 20%",
    projects: "College Quiz Website\n- Developed a web-based quiz platform\n- Used HTML, CSS, React, Node"
  });
  
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('01');

  // Find the active template component
  const ActiveTemplateComponent = templatesArray.find(t => t.id === selectedTemplateId)?.component || templatesArray[0].component;

  // --- Analyzer Handlers ---
  const handleAnalyze = async () => {
    if (!resumeText.trim()) return;
    setIsAnalyzing(true);
    setResultsReady(false);
    
    try {
      const response = await fetch('/api/analyze-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: resumeText })
      });
      
      if (!response.ok) throw new Error("Analysis failed");
      
      const data = await response.json();
      setAnalysisResults(data);
      
      // Auto-populate the builder
      if (data.profile) {
        setResumeData(prev => ({
          ...prev,
          name: data.profile.name || prev.name,
          title: data.profile.title || prev.title,
          email: data.profile.email || prev.email,
          phone: data.profile.phone || prev.phone,
          location: data.profile.location || prev.location,
          summary: data.profile.summary || prev.summary,
          skills: data.profile.skills || prev.skills,
          education: data.profile.education || prev.education,
          experience: data.profile.experience || prev.experience,
          projects: data.profile.projects || prev.projects,
        }));
      }
      
      setResultsReady(true);
    } catch (err) {
      console.error(err);
      alert("Failed to analyze resume. Check your API key.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzing(true);
      setResultsReady(false);
      setResumeText("Extracting text from PDF, please wait...");
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await fetch('/api/parse-pdf', { method: 'POST', body: formData });
        if (!response.ok) throw new Error('Failed to parse PDF');
        const data = await response.json();
        setResumeText(data.text || "No readable text found in this PDF.");
      } catch (err) {
        console.error(err);
        setResumeText("Error extracting text from PDF. Please try pasting plain text instead.");
      } finally {
        setIsAnalyzing(false);
      }
    }
  };

  const triggerFileInput = () => fileInputRef.current?.click();

  // --- Builder Handlers ---
  const handleDataChange = (field: keyof ResumeData, value: string) => {
    setResumeData(prev => ({ ...prev, [field]: value }));
  };

  const printResume = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-6 pb-20">
      {/* Header & Tabs */}
      <section className="w-full bg-white/40 rounded-3xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.04)] p-8 backdrop-blur-xl relative overflow-hidden print:hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-indigo-500/20 to-transparent rounded-bl-full pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between gap-6 items-start">
          <div>
            <h1 className="font-display-lg text-4xl text-on-surface tracking-tight mb-2">
              Career Toolkit
            </h1>
            <p className="text-on-surface-variant font-body-md max-w-2xl mb-6">
              Analyze your existing resume against ATS standards or build a beautiful new one using our premium templates.
            </p>
            <div className="flex bg-white/50 p-1 rounded-xl w-fit border border-white/60 shadow-sm">
              <button 
                onClick={() => setActiveTab('analyzer')}
                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'analyzer' ? 'bg-white shadow-sm text-indigo-700' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                ATS Analyzer
              </button>
              <button 
                onClick={() => setActiveTab('builder')}
                className={`px-6 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === 'builder' ? 'bg-white shadow-sm text-indigo-700' : 'text-on-surface-variant hover:text-on-surface'}`}
              >
                Resume Builder
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- TAB: ANALYZER --- */}
      {activeTab === 'analyzer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 print:hidden">
          <div className="lg:col-span-5 space-y-4 flex flex-col">
            <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-6 backdrop-blur-xl flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-on-surface">Resume Content</h2>
                <div className="flex gap-2">
                  <input type="file" accept=".pdf" className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
                  <button onClick={triggerFileInput} className="text-xs bg-white/80 border border-white/60 px-3 py-1.5 rounded-lg shadow-sm hover:bg-white flex items-center gap-1 font-semibold">
                    <span className="material-symbols-outlined text-[16px]">upload_file</span> PDF
                  </button>
                </div>
              </div>
              <textarea
                className="w-full flex-1 min-h-[400px] bg-white/50 border border-white/60 rounded-2xl p-4 text-sm font-mono text-on-surface focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none transition-all placeholder:text-on-surface-variant/50"
                placeholder="Paste your resume text here to analyze..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
              ></textarea>
              <button 
                onClick={handleAnalyze} disabled={isAnalyzing || !resumeText.trim()}
                className="w-full mt-4 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isAnalyzing ? <span className="material-symbols-outlined animate-spin text-[20px]">sync</span> : <span className="material-symbols-outlined text-[20px]">analytics</span>}
                {isAnalyzing ? "Analyzing via OpenRouter..." : "Run Full ATS Scan"}
              </button>
            </div>
          </div>

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
                <div className="w-16 h-16 border-4 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin mb-6"></div>
                <h3 className="text-xl font-semibold text-on-surface mb-2 animate-pulse">Running Semantic Analysis...</h3>
              </div>
            )}
            {resultsReady && analysisResults && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white/60 rounded-2xl border border-emerald-500/30 shadow-sm p-6 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-emerald-500"></div>
                    <span className="text-sm font-medium text-on-surface-variant mb-1">Overall ATS Score</span>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-display-md text-emerald-700">{analysisResults.scores?.overall || 0}</span><span className="text-sm font-bold text-on-surface-variant mb-1">/ 100</span>
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-2xl border border-amber-500/30 shadow-sm p-6 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-amber-500"></div>
                    <span className="text-sm font-medium text-on-surface-variant mb-1">Impact Verbs</span>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-display-md text-amber-600">{analysisResults.scores?.impactVerbs || 0}</span><span className="text-sm font-bold text-on-surface-variant mb-1">/ 100</span>
                    </div>
                  </div>
                  <div className="bg-white/60 rounded-2xl border border-blue-500/30 shadow-sm p-6 flex flex-col relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
                    <span className="text-sm font-medium text-on-surface-variant mb-1">Readability</span>
                    <div className="flex items-end gap-2">
                      <span className="text-4xl font-display-md text-blue-600">{analysisResults.scores?.readability || 0}</span><span className="text-sm font-bold text-on-surface-variant mb-1">/ 100</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/40 rounded-3xl border border-white/60 shadow-sm p-6 backdrop-blur-xl">
                  <h3 className="font-semibold text-lg text-on-surface mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-indigo-600">psychology</span> AI Recommendations
                  </h3>
                  <div className="space-y-4">
                    {analysisResults.recommendations?.map((rec: any, idx: number) => (
                      <div key={idx} className={`border p-4 rounded-xl flex gap-4 ${
                        rec.type === 'warning' ? 'bg-amber-500/10 border-amber-500/30' : 
                        rec.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/30' : 
                        'bg-blue-500/10 border-blue-500/30'
                      }`}>
                        <span className={`material-symbols-outlined mt-0.5 ${
                          rec.type === 'warning' ? 'text-amber-600' : 
                          rec.type === 'success' ? 'text-emerald-600' : 
                          'text-blue-600'
                        }`}>
                          {rec.type === 'warning' ? 'warning' : rec.type === 'success' ? 'check_circle' : 'info'}
                        </span>
                        <div>
                          <h4 className={`font-semibold text-sm mb-1 ${
                            rec.type === 'warning' ? 'text-amber-900' : 
                            rec.type === 'success' ? 'text-emerald-900' : 
                            'text-blue-900'
                          }`}>{rec.title}</h4>
                          <p className={`text-sm ${
                            rec.type === 'warning' ? 'text-amber-800/80' : 
                            rec.type === 'success' ? 'text-emerald-800/80' : 
                            'text-blue-800/80'
                          }`}>{rec.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- TAB: BUILDER --- */}
      {activeTab === 'builder' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto min-h-[800px] print:h-auto print:block">
          
          {/* Templates Grid - Left Sidebar */}
          <div className="lg:col-span-3 bg-[#1e1e24] rounded-3xl shadow-sm p-4 flex flex-col overflow-y-auto max-h-[800px] print:hidden">
            <h2 className="font-semibold text-sm text-gray-400 mb-4 uppercase tracking-widest pl-2">Templates • 15</h2>
            
            <div className="grid grid-cols-2 gap-3 pb-8 pr-2" style={{ scrollbarWidth: 'thin', scrollbarColor: '#4b5563 transparent' }}>
              {templatesArray.map(t => (
                <button 
                  key={t.id} 
                  onClick={() => setSelectedTemplateId(t.id)} 
                  className="flex flex-col items-center group focus:outline-none"
                >
                  <div className={`w-full aspect-[3/4] bg-white rounded-xl mb-2 transition-all flex justify-center items-center overflow-hidden
                    ${selectedTemplateId === t.id ? 'ring-2 ring-indigo-500 scale-[1.02]' : 'ring-1 ring-white/10 hover:ring-white/30 group-hover:scale-[1.02]'}`}
                  >
                    {/* Tiny CSS preview silhouette of a resume */}
                    <div className="w-full h-full scale-[0.25] origin-top opacity-50 select-none pointer-events-none">
                       <t.component data={resumeData} />
                    </div>
                  </div>
                  <span className={`text-xs font-semibold ${selectedTemplateId === t.id ? 'text-white' : 'text-gray-400 group-hover:text-gray-200'}`}>
                    {t.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Editor Form - Hidden when printing */}
          <div className="lg:col-span-3 bg-white/40 rounded-3xl border border-white/60 shadow-sm p-6 backdrop-blur-xl flex flex-col overflow-y-auto max-h-[800px] print:hidden">
            <h2 className="font-semibold text-xl text-on-surface mb-6">Resume Details</h2>
            
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Full Name</label>
                <input value={resumeData.name} onChange={(e) => handleDataChange('name', e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Professional Title</label>
                <input value={resumeData.title} onChange={(e) => handleDataChange('title', e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Email</label>
                  <input value={resumeData.email} onChange={(e) => handleDataChange('email', e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Phone</label>
                  <input value={resumeData.phone} onChange={(e) => handleDataChange('phone', e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Location</label>
                <input value={resumeData.location} onChange={(e) => handleDataChange('location', e.target.value)} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Summary</label>
                <textarea value={resumeData.summary} onChange={(e) => handleDataChange('summary', e.target.value)} rows={3} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Skills (comma separated)</label>
                <textarea value={resumeData.skills} onChange={(e) => handleDataChange('skills', e.target.value)} rows={2} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Education</label>
                <textarea value={resumeData.education} onChange={(e) => handleDataChange('education', e.target.value)} rows={4} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Experience</label>
                <textarea value={resumeData.experience} onChange={(e) => handleDataChange('experience', e.target.value)} rows={4} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface-variant mb-1 uppercase tracking-wide">Projects</label>
                <textarea value={resumeData.projects} onChange={(e) => handleDataChange('projects', e.target.value)} rows={4} className="w-full bg-white/60 border border-white/80 rounded-xl px-3 py-2 text-sm focus:outline-indigo-500" />
              </div>
            </div>

            <button onClick={printResume} className="mt-6 w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-md flex justify-center items-center gap-2">
              <span className="material-symbols-outlined">print</span> Export to PDF
            </button>
          </div>

          {/* Live Preview / Render Area */}
          <div className="lg:col-span-6 bg-gray-200 rounded-3xl p-4 md:p-8 overflow-y-auto max-h-[800px] flex justify-center print:p-0 print:bg-white print:overflow-visible">
            <ActiveTemplateComponent data={resumeData} />
          </div>
        </div>
      )}
    </div>
  );
}
