'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// ─── Cloud cluster definition ────────────────────────────────────
type CloudCluster = {
  x: number;       // current x position
  y: number;       // fixed y band (horizon level)
  speed: number;   // px per frame
  scale: number;   // overall size multiplier
  opacity: number; // base opacity
  puffs: { dx: number; dy: number; r: number }[]; // sub-puffs relative to anchor
};

function makePuffs(scale: number) {
  // A cluster = 5–9 overlapping circles arranged in a rough horizontal mass
  const n = 5 + Math.floor(Math.random() * 5);
  const puffs: { dx: number; dy: number; r: number }[] = [];
  for (let i = 0; i < n; i++) {
    puffs.push({
      dx: (Math.random() - 0.3) * 160 * scale,
      dy: (Math.random() - 0.7) * 60 * scale,
      r: (40 + Math.random() * 70) * scale,
    });
  }
  return puffs;
}

function spawnCluster(width: number, height: number, layer: number, randomX: boolean): CloudCluster {
  // Layer 0 = far/top (small, slow)  Layer 1 = mid  Layer 2 = near/bottom (large, faster)
  const layerCfg = [
    { yMin: 0.28, yMax: 0.42, scaleMin: 0.5, scaleMax: 0.85, speedMin: 0.12, speedMax: 0.22, opMin: 0.55, opMax: 0.75 },
    { yMin: 0.38, yMax: 0.56, scaleMin: 0.8, scaleMax: 1.30, speedMin: 0.22, speedMax: 0.38, opMin: 0.65, opMax: 0.85 },
    { yMin: 0.50, yMax: 0.68, scaleMin: 1.2, scaleMax: 1.80, speedMin: 0.35, speedMax: 0.60, opMin: 0.70, opMax: 0.92 },
  ];
  const cfg = layerCfg[layer];
  const scale = cfg.scaleMin + Math.random() * (cfg.scaleMax - cfg.scaleMin);
  const speed = (cfg.speedMin + Math.random() * (cfg.speedMax - cfg.speedMin)) * (Math.random() < 0.5 ? 1 : -1);
  const opacity = cfg.opMin + Math.random() * (cfg.opMax - cfg.opMin);
  const y = height * (cfg.yMin + Math.random() * (cfg.yMax - cfg.yMin));
  const halfW = 200 * scale;
  const x = randomX
    ? Math.random() * (width + halfW * 2) - halfW
    : speed > 0 ? -halfW - 50 : width + halfW + 50;
  return { x, y, speed, scale, opacity, puffs: makePuffs(scale) };
}

function drawCluster(ctx: CanvasRenderingContext2D, c: CloudCluster) {
  ctx.save();
  ctx.globalAlpha = c.opacity;
  for (const p of c.puffs) {
    const cx = c.x + p.dx;
    const cy = c.y + p.dy;
    const grad = ctx.createRadialGradient(cx, cy - p.r * 0.15, p.r * 0.05, cx, cy, p.r);
    grad.addColorStop(0,   'rgba(255,255,255,1)');
    grad.addColorStop(0.45,'rgba(250,251,252,0.9)');
    grad.addColorStop(0.75,'rgba(235,240,245,0.5)');
    grad.addColorStop(1,   'rgba(220,228,236,0)');
    ctx.beginPath();
    ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
  ctx.restore();
}

export default function LandingPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animId: number;
    let width = 0, height = 0;

    function resize() {
      if (!canvas) return;
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width;
      canvas.height = height;
    }
    resize();
    window.addEventListener('resize', () => { resize(); init(); });

    // Spawn clusters: more clusters per layer for a dense sky
    const COUNTS = [14, 10, 7]; // far, mid, near
    let clusters: CloudCluster[] = [];

    function init() {
      clusters = [];
      for (let layer = 0; layer < 3; layer++) {
        for (let i = 0; i < COUNTS[layer]; i++) {
          clusters.push(spawnCluster(width, height, layer, true));
        }
      }
    }
    init();

    function tick() {
      const ctx = canvas!.getContext('2d');
      if (!ctx) return;

      // Sky gradient background
      const sky = ctx.createLinearGradient(0, 0, 0, height);
      sky.addColorStop(0,   '#c0ccda');
      sky.addColorStop(0.35,'#d8e2ea');
      sky.addColorStop(0.65,'#edf0f3');
      sky.addColorStop(1,   '#f6f6f5');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, width, height);

      // Sort far→near so near clouds render on top
      clusters.sort((a, b) => a.y - b.y);

      for (const c of clusters) {
        c.x += c.speed;

        // Respawn when fully off-screen
        const halfW = 220 * c.scale;
        if (c.speed > 0 && c.x > width + halfW) {
          const layer = clusters.indexOf(c) < COUNTS[0] ? 0 : clusters.indexOf(c) < COUNTS[0] + COUNTS[1] ? 1 : 2;
          Object.assign(c, spawnCluster(width, height, layer, false));
        } else if (c.speed < 0 && c.x < -halfW) {
          const layer = clusters.indexOf(c) < COUNTS[0] ? 0 : clusters.indexOf(c) < COUNTS[0] + COUNTS[1] ? 1 : 2;
          Object.assign(c, spawnCluster(width, height, layer, false));
        }

        drawCluster(ctx, c);
      }

      // Bottom ground-fog — fades clouds into the page background
      const fog = ctx.createLinearGradient(0, height * 0.72, 0, height);
      fog.addColorStop(0, 'rgba(246,246,245,0)');
      fog.addColorStop(1, 'rgba(246,246,245,1)');
      ctx.fillStyle = fog;
      ctx.fillRect(0, 0, width, height);

      animId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div
      className={`min-h-screen flex flex-col relative overflow-hidden ${inter.className}`}
      style={{ background: '#f6f6f5' }}
    >
      {/* Cloud Canvas — full viewport */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      />

      {/* ─── HEADER ───────────────────────────────────────────────── */}
      <header
        className="relative z-20 flex items-stretch h-[72px]"
        style={{
          borderBottom: '1px solid rgba(0,0,0,0.07)',
          background: 'rgba(200,212,224,0.45)',
          backdropFilter: 'blur(18px)',
        }}
      >
        {/* Logo */}
        <div className="flex items-center pl-10 pr-8">
          <span style={{ fontWeight: 700, letterSpacing: '0.28em', fontSize: 12, textTransform: 'uppercase', color: '#111' }}>
            C A M P U S P I L O T
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex items-center justify-center gap-10" style={{ fontSize: 14, color: '#1a1a1a', fontWeight: 500 }}>
          <Link href="#" className="hover:opacity-60 transition-opacity">About</Link>
          <Link href="#" className="hover:opacity-60 transition-opacity flex items-center gap-1">
            Features
            <svg style={{ width: 11, height: 11 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </Link>
          <Link href="#" className="hover:opacity-60 transition-opacity">Students</Link>
          <Link href="#" className="hover:opacity-60 transition-opacity">Universities</Link>
          <Link href="#" className="hover:opacity-60 transition-opacity">Contact</Link>
          <Link href="#" className="hover:opacity-60 transition-opacity font-semibold">About Us</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-stretch" style={{ borderLeft: '1px solid rgba(0,0,0,0.07)' }}>
          <div
            className="flex items-center px-8 cursor-pointer hover:opacity-60 transition-opacity"
            style={{ fontSize: 14, fontWeight: 500, color: '#1a1a1a' }}
          >
            EN
          </div>
          <Link
            href="/login"
            className="flex items-center px-10 transition-opacity hover:opacity-80"
            style={{ background: '#111', color: '#fff', fontSize: 14, fontWeight: 500 }}
          >
            Student Portal
          </Link>
        </div>
      </header>

      {/* ─── MAIN CONTENT ─────────────────────────────────────────── */}
      <main
        className="relative z-10 flex-1"
        style={{ minHeight: 'calc(100vh - 72px)', position: 'relative' }}
      >
        {/* Big Headline — bottom-left */}
        <div className="absolute" style={{ bottom: '13%', left: '7%' }}>
          <h1
            className="leading-[0.88] tracking-tighter font-medium select-none"
            style={{ fontSize: 'clamp(72px, 11.5vw, 175px)', color: '#111' }}
          >
            Campus<br />Pilot
          </h1>
        </div>

        {/* Secondary info — bottom-right */}
        <div className="absolute text-right" style={{ bottom: '14%', right: '8%', maxWidth: 300 }}>
          <p style={{ fontSize: 21, lineHeight: 1.35, color: '#1a1a1a', marginBottom: 24 }}>
            Tailored AI opportunities<br />for high-growth students<br />and top-tier universities.
          </p>
          <Link
            href="/login"
            className="hover:opacity-60 transition-opacity"
            style={{ fontSize: 13, fontWeight: 500, color: '#111', borderBottom: '1px solid #111', paddingBottom: 3, display: 'inline-block' }}
          >
            Explore Opportunities
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute"
          style={{ bottom: 24, left: '7%', fontSize: 12, color: '#888', fontWeight: 500, letterSpacing: '0.08em' }}
        >
          Scroll
        </div>
      </main>
    </div>
  );
}
