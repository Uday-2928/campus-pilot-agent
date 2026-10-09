'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Menu, X, Compass } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg">
              <Compass className="w-6 h-6" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              CampusPilot
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8 text-sm font-medium text-slate-600">
            <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <Link href="/aptitude" className="hover:text-slate-900 transition-colors">Aptitude Prep</Link>
            <Link href="/hackathons" className="hover:text-slate-900 transition-colors">Hackathons</Link>
            <Link href="/internships" className="hover:text-slate-900 transition-colors">Internships</Link>
            <Link href="/campus-drives" className="hover:text-slate-900 transition-colors">Campus Drives</Link>
            <Link href="/scholarships" className="hover:text-slate-900 transition-colors">Scholarships</Link>
            <Link href="/resources" className="hover:text-slate-900 transition-colors">Resources</Link>
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-slate-500 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-slate-500 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Link 
              href="/login" 
              className="text-sm font-medium text-slate-700 hover:text-slate-900 px-3 py-2"
            >
              Log in
            </Link>
            <Link 
              href="/login?tab=register" 
              className="text-sm font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-sm"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-500 hover:text-slate-700 p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 shadow-lg absolute w-full left-0 top-16">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <Link href="/" className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md">Home</Link>
            <Link href="/aptitude" className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md">Aptitude Prep</Link>
            <Link href="/hackathons" className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md">Hackathons</Link>
            <Link href="/internships" className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md">Internships</Link>
            <Link href="/campus-drives" className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md">Campus Drives</Link>
            <Link href="/scholarships" className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md">Scholarships</Link>
            <Link href="/resources" className="block px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-md">Resources</Link>
            <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col gap-3">
              <Link href="/login" className="block text-center px-4 py-2 text-base font-medium text-slate-700 border border-slate-300 rounded-md">
                Log in
              </Link>
              <Link href="/login?tab=register" className="block text-center px-4 py-2 text-base font-medium text-white bg-blue-600 rounded-md">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
