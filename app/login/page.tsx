'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BorderBeam } from "@/components/magicui/border-beam";

export default function LoginPage() {
  const router = useRouter();
  
  // Auth Modal State
  const [authRole, setAuthRole] = useState<'student' | 'admin'>('student');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authRole === 'admin') {
      router.push('/admin');
    } else {
      router.push('/student');
    }
  };

  return (
    <main className="min-h-screen bg-surface-container-lowest flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#38BDF8]/5 via-[#C084FC]/5 to-transparent pointer-events-none"></div>

      <div className="bg-white/80 backdrop-blur-2xl border border-white/60 shadow-[0_16px_64px_rgba(0,0,0,0.15)] w-full max-w-md rounded-[28px] p-8 relative z-10 flex flex-col animate-in fade-in zoom-in-95 duration-300 overflow-hidden">
        <BorderBeam
          duration={6}
          size={400}
          className="from-transparent via-red-500 to-transparent"
        />
        <BorderBeam
          duration={6}
          delay={3}
          size={400}
          borderWidth={2}
          className="from-transparent via-blue-500 to-transparent"
        />
        
        <button onClick={() => router.push('/')} className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 text-on-surface-variant transition-colors z-20">
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>
        
        <div className="flex gap-4 mb-8 items-center">
          <div className="flex gap-2">
            <button
              onClick={() => setAuthRole('student')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${authRole === 'student' ? 'bg-[#38BDF8] text-white shadow-md' : 'bg-white/50 text-on-surface-variant hover:bg-white/80 border border-white/60'}`}
            >
              Student
            </button>
            <button
              onClick={() => setAuthRole('admin')}
              className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-all ${authRole === 'admin' ? 'bg-purple-500 text-white shadow-md' : 'bg-white/50 text-on-surface-variant hover:bg-white/80 border border-white/60'}`}
            >
              Admin
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg ${authRole === 'admin' ? 'bg-gradient-to-br from-purple-500 to-indigo-600' : 'bg-gradient-to-br from-[#38BDF8] to-[#0284c7]'}`}>
            {authRole === 'admin' ? 'A' : 'S'}
          </div>
          <div>
            <h2 className="font-display-md text-2xl text-on-surface leading-tight tracking-tight">
              {authRole === 'admin' ? 'Admin Portal' : 'Student Portal'}
            </h2>
            <p className="text-on-surface-variant text-sm font-medium">
              {authMode === 'signin' ? 'Sign in to continue' : 'Create a new account'}
            </p>
          </div>
        </div>

        <div className="flex gap-2 mb-6 p-1 bg-white/50 border border-white/60 rounded-xl">
          <button 
            onClick={() => setAuthMode('signin')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${authMode === 'signin' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40'}`}
          >
            Sign In
          </button>
          <button 
            onClick={() => setAuthMode('signup')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${authMode === 'signup' ? 'bg-white shadow-sm text-on-surface' : 'text-on-surface-variant hover:text-on-surface hover:bg-white/40'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">
          {authMode === 'signup' && (
            <div className="flex flex-col gap-1.5">
              <label htmlFor="fullname" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Full Name</label>
              <input id="fullname" type="text" required placeholder="John Doe" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 transition-all shadow-sm" />
            </div>
          )}
          
          <div className="flex flex-col gap-1.5">
            <label htmlFor="email" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider ml-1">Email Address</label>
            <input id="email" type="email" required placeholder="you@university.edu" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 transition-all shadow-sm" />
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between ml-1">
              <label htmlFor="password" className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Password</label>
              {authMode === 'signin' && (
                <a href="#" className="text-xs font-semibold text-[#0284c7] hover:underline">Forgot?</a>
              )}
            </div>
            <input id="password" type="password" required placeholder="••••••••" className="w-full bg-white/50 border border-white/60 rounded-xl px-4 py-3 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-[#38BDF8]/50 transition-all shadow-sm" />
          </div>

          <button type="submit" className={`mt-4 w-full py-3.5 rounded-xl text-white font-bold text-sm shadow-md transition-all active:scale-[0.98] ${authRole === 'admin' ? 'bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700' : 'bg-gradient-to-r from-[#38BDF8] to-[#0284c7] hover:from-[#0ea5e9] hover:to-[#0369a1]'}`}>
            {authMode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>
        
        <div className="mt-8 relative flex items-center justify-center">
          <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
          <span className="relative bg-white/50 px-4 text-xs font-semibold text-on-surface-variant">OR CONTINUE WITH</span>
        </div>

        <div className="mt-6 flex gap-3">
          <button type="button" className="flex-1 bg-white/50 border border-white/60 hover:bg-white/80 transition-colors py-2.5 rounded-xl flex justify-center shadow-sm">
            <svg className="h-5 w-5" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </button>
          <button type="button" className="flex-1 bg-white/50 border border-white/60 hover:bg-white/80 transition-colors py-2.5 rounded-xl flex justify-center shadow-sm">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </button>
        </div>
      </div>
    </main>
  );
}
