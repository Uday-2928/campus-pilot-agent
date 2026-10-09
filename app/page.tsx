'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CampusPilotLanding() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Intro states
  const [hasEntered, setHasEntered] = useState(false); // To bypass browser autoplay policies
  const [introActive, setIntroActive] = useState(true);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    router.prefetch('/login');
  }, [router]);

  // Handle the initial enter click
  const handleEnterExperience = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setAudioPlaying(true);
      }).catch(e => {
        // If it still fails, we'll just continue silently
        console.warn("Audio playback failed", e);
      });
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
      
      // INTRO INTERRUPT LOGIC
      // Operate only while intro is active, login is closed, and user has entered
      if (hasEntered && introActive && !loginOpen) {
        // Prevent scrolling if space/enter
        if ([' ', 'Enter'].includes(e.key)) {
          e.preventDefault();
        }

        // 1. Stop media instantly
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
        }
        if (videoRef.current) {
          videoRef.current.pause();
        }

        // 2. Set states
        setIntroActive(false);
        setAudioPlaying(false);
        setLoginOpen(true);
        
        // 3. Open login window (navigate to existing route)
        router.push('/login');
      }
    };

    const handleResize = () => {
      if (window.innerWidth / window.innerHeight > 1.1 && isOpen) {
        setIsOpen(false);
      }
    };

    // Attach listeners
    if (hasEntered && introActive && !loginOpen) {
      document.addEventListener('keydown', handleKeyDown);
    } else if (isOpen) {
      // Fallback for menu Escape key if intro is off
      document.addEventListener('keydown', handleKeyDown);
    }

    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen, introActive, loginOpen, router]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleSkipIntro = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setIntroActive(false);
    setAudioPlaying(false);
    setLoginOpen(true);
    router.push('/login');
  };

  // Immediate visual hide during the route transition
  if (loginOpen) {
    return <div style={{ backgroundColor: '#050505', width: '100vw', height: '100vh' }}></div>;
  }

  return (
    <>
      {/* ENTER EXPERIENCE OVERLAY - BYPASSES BROWSER AUTOPLAY BLOCK */}
      {!hasEntered && !loginOpen && (
        <div className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center">
          <button 
            onClick={handleEnterExperience}
            className="group relative px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out"></div>
            <span className="relative flex items-center gap-3 text-white font-medium tracking-wide">
              Start Experience
              <span className="material-symbols-outlined text-white/70 group-hover:text-white transition-colors">east</span>
            </span>
          </button>
          <p className="mt-6 text-white/40 text-sm tracking-wide font-light">
            Turn on your sound
          </p>
        </div>
      )}

      <audio ref={audioRef} src="/audio/campuspilot-intro.mp3" preload="auto" />
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');

        :root {
          --ink: #fafafa;
          --muted: #a7a6a6;
          --nav: #b6b5b5;
          --strip: #8b8a8a;
          --pill: #ffffff;
          --pill-ink: #050505;
          --bg: #050505;
          
          --u: calc(100vh / 1058);
          --uw: calc(100vw / 1487);
          --h: clamp(var(--u), calc(var(--u) * .65 + var(--uw) * .35), calc(var(--u) * 1.16));
        }
        @supports (height: 100dvh) {
          :root { --u: calc(100dvh / 1058); }
        }

        .landing-root {
          width: 100%;
          height: 100vh;
          height: 100dvh;
          background-color: var(--bg);
          color: var(--ink);
          font-family: 'Manrope', system-ui, -apple-system, 'Segoe UI', sans-serif;
          text-rendering: geometricPrecision;
          overflow: hidden;
        }

        .landing-root a { text-decoration: none; color: inherit; }
        .landing-root button { background: none; border: none; cursor: pointer; font-family: inherit; color: inherit; }

        .stage { position: relative; width: 100%; height: 100%; }

        .plate { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
        .plate-video {
          position: absolute; left: 50%; top: calc(1 * var(--u));
          width: calc(1492 * var(--u)); height: calc(1054 * var(--u));
          transform: translateX(calc(-50% - calc(0.5 * var(--u))));
          object-fit: cover; pointer-events: none;
        }
        .plate::after {
          content: ''; position: absolute; inset: 0; pointer-events: none;
          background: 
            linear-gradient(to bottom, rgba(5,5,5,0) 78.8%, rgba(5,5,5,.23) 79.6%, rgba(5,5,5,.45) 81.4%, rgba(5,5,5,.75) 83.3%, rgba(5,5,5,.84) 85.2%, rgba(5,5,5,.888) 88%, rgba(5,5,5,.905) 91%, rgba(5,5,5,.96) 95%, #050505 100%),
            linear-gradient(to right, #050505 calc(50% - calc(746 * var(--u))), transparent calc(50% - calc(676 * var(--u))), transparent calc(50% + calc(676 * var(--u))), #050505 calc(50% + calc(746 * var(--u))));
        }

        .topbar { position: absolute; inset: 0; z-index: 10; pointer-events: none; }
        .topbar > * { pointer-events: auto; }

        .brand {
          position: absolute; left: calc(75 * var(--u)); top: calc(27 * var(--u));
        }

        .links {
          position: absolute; left: 50%; top: calc(51 * var(--u)); transform: translate(-50%, -50%);
          display: flex; font-size: calc(19.0 * var(--u)); font-weight: 400; color: var(--nav); white-space: nowrap;
        }
        .links a:nth-child(1) { margin-right: calc(24.5 * var(--u)); }
        .links a:nth-child(2) { margin-right: calc(23.5 * var(--u)); }
        .links a:nth-child(3) { margin-right: calc(26.0 * var(--u)); }
        .links a:hover { color: var(--ink); }

        .pill {
          background-color: var(--pill); color: var(--pill-ink); border-radius: 999px;
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s cubic-bezier(.22, 1, .36, 1);
        }
        .pill:hover { transform: scale(1.02); }
        .pill:active { transform: scale(0.98); }

        .pill-nav {
          position: absolute; right: calc(75.4 * var(--u)); top: calc(27 * var(--u));
          width: calc(175 * var(--u)); height: calc(49 * var(--u));
          font-size: calc(20.6 * var(--u)); font-weight: 500;
        }
        .pill-nav > span { transform: translateY(calc(1 * var(--u))); }
        
        .burger { display: none; }

        .hero { position: absolute; inset: 0; z-index: 5; pointer-events: none; }
        .hero > * { pointer-events: auto; }

        .headline {
          position: absolute; left: calc(75.5 * var(--u)); top: calc(230.5 * var(--u));
          font-size: calc(71.6 * var(--h)); line-height: calc(80.5 * var(--h));
          font-weight: 400; letter-spacing: calc(0.3 * var(--h)); color: var(--ink);
          white-space: nowrap; margin: 0;
        }
        .headline span { display: block; }

        .sub {
          position: absolute; left: calc(75.5 * var(--u)); top: calc(230.5 * var(--u) + calc(189.0 * var(--h)));
          font-size: calc(20.7 * var(--h)); line-height: calc(23.5 * var(--h));
          font-weight: 400; word-spacing: calc(1.8 * var(--h)); color: var(--muted);
          white-space: nowrap;
        }
        .sub span { display: block; }

        .actions {
          position: absolute; left: calc(74.9 * var(--u)); top: calc(230.5 * var(--u) + calc(264.5 * var(--h)));
          display: flex; align-items: center;
        }

        .pill-cta {
          width: calc(175.6 * var(--h)); height: calc(50 * var(--h));
          font-size: calc(20.6 * var(--h)); font-weight: 500;
        }
        .pill-cta > span { transform: translateY(calc(1 * var(--h))); }

        .ghost {
          position: absolute; left: calc(220.6 * var(--h)); top: calc(15 * var(--h));
          font-size: calc(20.6 * var(--h)); font-weight: 500; letter-spacing: calc(0.12 * var(--h));
          color: #fff; white-space: nowrap; transition: opacity 0.2s;
        }
        .ghost:hover { opacity: 0.8; }

        @media (prefers-reduced-motion: no-preference) {
          @keyframes rise {
            from { opacity: 0; transform: translateY(calc(14 * var(--u))); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes riseNav {
            from { opacity: 0; transform: translate(calc(-50% + 0px), calc(-50% + calc(14 * var(--u)))); }
            to { opacity: 1; transform: translate(calc(-50% + 0px), -50%); }
          }
          .brand { animation: rise 0.8s cubic-bezier(.22, 1, .36, 1) both; }
          .links { animation: riseNav 0.8s cubic-bezier(.22, 1, .36, 1) both; }
          .pill-nav { animation: rise 0.8s cubic-bezier(.22, 1, .36, 1) both; }
          .headline { animation: rise 0.9s cubic-bezier(.22, 1, .36, 1) 0.06s both; }
          .sub { animation: rise 0.9s cubic-bezier(.22, 1, .36, 1) 0.14s both; }
          .pill-cta { animation: rise 0.9s cubic-bezier(.22, 1, .36, 1) 0.22s both; }
          .ghost { animation: rise 0.9s cubic-bezier(.22, 1, .36, 1) 0.22s both; }
        }

        .menu {
          position: fixed; inset: 0; z-index: 20;
          background: linear-gradient(to bottom, rgba(5,5,5,0.8), #050505);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          opacity: 0; visibility: hidden; transition: opacity 0.42s ease, visibility 0.42s ease;
          display: flex; flex-direction: column; justify-content: center; padding-left: calc(30 * var(--m, 1px));
        }
        .stage.is-open .menu { opacity: 1; visibility: visible; }
        .menu-inner { display: flex; flex-direction: column; }
        .menu-eyebrow {
          font-size: calc(14 * var(--m, 1px)); color: var(--muted); text-transform: uppercase; letter-spacing: 0.1em;
          margin-bottom: calc(30 * var(--m, 1px)); opacity: 0; transform: translateY(calc(10 * var(--m, 1px))); transition: all 0.4s ease;
        }
        .menu-list { list-style: none; display: flex; flex-direction: column; gap: calc(20 * var(--m, 1px)); margin-bottom: calc(50 * var(--m, 1px)); }
        .menu-list li { opacity: 0; transform: translateY(calc(14 * var(--m, 1px))); transition: all 0.4s ease; }
        .menu-list a { font-size: max(25px, calc(31 * var(--m, 1px))); font-weight: 500; color: var(--ink); display: flex; align-items: center; }
        .menu-list a::after {
          content: ''; display: inline-block; width: calc(8 * var(--m, 1px)); height: calc(8 * var(--m, 1px));
          border-right: 2px solid var(--muted); border-bottom: 2px solid var(--muted); transform: rotate(-45deg); margin-left: calc(15 * var(--m, 1px));
        }
        .menu-foot { display: flex; flex-direction: column; align-items: flex-start; gap: calc(24 * var(--m, 1px)); opacity: 0; transform: translateY(calc(14 * var(--m, 1px))); transition: all 0.4s ease; }
        .stage.is-open .menu-eyebrow { opacity: 1; transform: translateY(0); transition-delay: 0.06s; }
        .stage.is-open .menu-list li:nth-child(1) { opacity: 1; transform: translateY(0); transition-delay: 0.10s; }
        .stage.is-open .menu-list li:nth-child(2) { opacity: 1; transform: translateY(0); transition-delay: 0.16s; }
        .stage.is-open .menu-list li:nth-child(3) { opacity: 1; transform: translateY(0); transition-delay: 0.22s; }
        .stage.is-open .menu-foot { opacity: 1; transform: translateY(0); transition-delay: 0.34s; }

        @media (max-aspect-ratio: 11/10) {
          :root { --m: min(calc(100vw / 430), 1.34px); --u: var(--m); }
          .links, .pill-nav { display: none !important; }
          .burger {
            display: flex; flex-direction: column; justify-content: center; align-items: center; gap: calc(4.3 * var(--m));
            position: absolute; right: calc(24 * var(--m)); top: calc(24 * var(--m)); width: calc(44 * var(--m)); height: calc(44 * var(--m));
            background: rgba(255, 255, 255, 0.06); border: 1px solid rgba(255, 255, 255, 0.14); border-radius: 999px;
            backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); z-index: 30; pointer-events: auto;
          }
          .burger i { display: block; width: calc(16 * var(--m)); height: 1px; background-color: var(--ink); transition: transform 0.3s ease; }
          .stage.is-open .burger i:nth-child(1) { transform: translateY(calc(2.15 * var(--m))) rotate(45deg); }
          .stage.is-open .burger i:nth-child(2) { transform: translateY(calc(-2.15 * var(--m))) rotate(-45deg); }
          .plate-video { width: 100%; height: 100%; left: 0; top: 0; transform: none; object-position: 43% center; }
          .plate::after {
            background: 
              linear-gradient(to right, rgba(5,5,5,.86) 0%, rgba(5,5,5,.66) 42%, rgba(5,5,5,.20) 78%, rgba(5,5,5,.10) 100%),
              linear-gradient(to bottom, rgba(5,5,5,.72) 0%, rgba(5,5,5,.34) 24%, rgba(5,5,5,.34) 56%, rgba(5,5,5,.80) 82%, rgba(5,5,5,.97) 94%, #050505 100%);
          }
          .brand { left: calc(24 * var(--m)); top: calc(24 * var(--m)); width: calc(26 * var(--m)); height: calc(40 * var(--m)); }
          .headline { left: calc(24 * var(--m)); top: calc(180 * var(--m)); font-size: calc(44 * var(--m)); line-height: calc(52 * var(--m)); white-space: normal; padding-right: calc(24 * var(--m)); }
          .headline span { display: inline; }
          .sub { left: calc(24 * var(--m)); top: calc(300 * var(--m)); font-size: calc(16 * var(--m)); line-height: calc(22 * var(--m)); white-space: normal; padding-right: calc(40 * var(--m)); }
          .sub span { display: inline; }
          .actions { left: calc(24 * var(--m)); top: calc(400 * var(--m)); flex-direction: column; align-items: flex-start; gap: calc(20 * var(--m)); }
          .ghost { position: static; }
        }
        @media (min-width: 600px) and (max-aspect-ratio: 11/10) {
          :root { --m: min(calc(100vw / 860), calc(100vh / 760), 1.25px); }
          .plate-video { object-position: 44% center; }
          .plate::after {
            background: 
              linear-gradient(to right, rgba(5,5,5,.84) 0%, rgba(5,5,5,.60) 42%, rgba(5,5,5,.16) 78%, rgba(5,5,5,.06) 100%),
              linear-gradient(to bottom, rgba(5,5,5,.66) 0%, rgba(5,5,5,.28) 24%, rgba(5,5,5,.30) 56%, rgba(5,5,5,.78) 82%, rgba(5,5,5,.96) 94%, #050505 100%);
          }
          .headline span { display: block; }
          .sub span { display: block; }
        }
      `}} />

      <div className="landing-root">
        <div className={`stage ${isOpen ? 'is-open' : ''}`} id="stage">
          
          <div className="plate">
            <video ref={videoRef} className="plate-video" autoPlay muted loop playsInline preload="auto" aria-hidden="true">
              <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4" type="video/mp4" />
            </video>
          </div>

          <header className="topbar">
            <Link href="/" className="brand" aria-label="Home" style={{ fontSize: 'calc(26 * var(--u))', fontWeight: 800, letterSpacing: '-0.02em', whiteSpace: 'nowrap', color: 'var(--ink)', display: 'flex', alignItems: 'center' }}>
              CampusPilot
            </Link>
            
            <nav className="links" aria-label="Primary">
              <Link href="/">Home</Link>
              <Link href="#about">About Us</Link>
              <Link href="#contact">Contact</Link>
            </nav>
            
            <Link href="/login" className="pill pill-nav">
              <span>Get Started</span>
            </Link>
            
            <button className="burger" aria-label="Toggle Menu" aria-expanded={isOpen} onClick={toggleMenu}>
              <i></i><i></i>
            </button>
          </header>

          <nav className="menu" aria-hidden={!isOpen}>
            <div className="menu-inner">
              <p className="menu-eyebrow">Menu</p>
              <ul className="menu-list">
                <li><Link href="/" onClick={() => setIsOpen(false)}>Home</Link></li>
                <li><Link href="#about" onClick={() => setIsOpen(false)}>About Us</Link></li>
                <li><Link href="#contact" onClick={() => setIsOpen(false)}>Contact</Link></li>
              </ul>
              <div className="menu-foot">
                <Link href="/login" className="pill" style={{ width: '180px', height: '50px', fontSize: '20px', fontWeight: 500 }}>
                  <span style={{ transform: 'translateY(1px)' }}>Get Started</span>
                </Link>
                <Link href="#about" className="ghost" style={{ position: 'static', marginTop: '8px' }}>Learn More</Link>
              </div>
            </div>
          </nav>

          <main className="hero">
            <h1 className="headline">
              <span>CampusPilot</span> 
              <span>Your Future</span>
            </h1>
            <p className="sub">
              <span>Everything you need to get campus-ready, practice aptitude,</span>
              <span>and discover internships and hackathons in one place.</span>
            </p>
            
            <div className="actions">
              <Link href="/login" className="pill pill-cta">
                <span>Get Started</span>
              </Link>
              <Link href="#about" className="ghost">Learn More</Link>
            </div>
          </main>
          
          {/* Optional skip controls */}
          {hasEntered && introActive && !loginOpen && (
            <div className="fixed bottom-8 right-8 z-50 flex gap-4 animate-in fade-in duration-1000 delay-500">
              <button 
                onClick={handleSkipIntro}
                className="bg-white/10 hover:bg-white/20 border border-white/20 text-white px-6 py-3 rounded-full backdrop-blur-md transition-all font-semibold shadow-lg flex items-center gap-2"
              >
                Skip Intro <span className="material-symbols-outlined text-[18px]">skip_next</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
