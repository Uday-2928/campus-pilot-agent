"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminLogin() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (id === "uday" && password === "uday") {
      // In a real app, you would set a cookie or JWT. Here we just redirect for the demo.
      localStorage.setItem("adminAuth", "true");
      router.push("/admin");
    } else {
      setError("Invalid ID or Password. Hint: Try id:uday and pass:uday");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] to-[#e0f2fe] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#38BDF8]/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3"></div>

      <div className="w-full max-w-md z-10">
        <div className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg border border-gray-700">
              <span className="material-symbols-outlined text-white text-[32px]">shield_person</span>
            </div>
            <h1 className="font-display-lg text-3xl text-gray-900 tracking-tight">Admin Login</h1>
            <p className="text-gray-500 font-body-md mt-2">Sign in to manage Campus Pilot AI</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
              <span className="material-symbols-outlined text-[18px]">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Admin ID</label>
              <input
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-gray-900 placeholder-gray-400 transition-all shadow-inner"
                placeholder="Enter admin ID"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/50 border border-white/60 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/40 text-gray-900 placeholder-gray-400 transition-all shadow-inner"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-3.5 mt-4 bg-gray-900 hover:bg-black text-white rounded-xl font-bold tracking-wide shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              Secure Login <span className="material-symbols-outlined text-[18px]">login</span>
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/40 pt-6">
            <Link href="/student" className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors flex items-center justify-center gap-1">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Student Portal
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
