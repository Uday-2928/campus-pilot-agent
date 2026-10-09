"use client";
import React, { useEffect, useId, useRef, useState } from "react";
import { Asterisk as Astroid } from "lucide-react";

const stillness = () =>
  typeof window !== "undefined" &&
  !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const FLOWER: string = "/mountain-bg.jpg";

const clamp = (v: number, a: number, b: number) => Math.min(b, Math.max(a, v));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, v: number) => {
  const u = clamp((v - a) / (b - a), 0, 1);
  return u * u * (3 - 2 * u);
};

const PAPER = 0.9;

type Knot = [number, number];
const r = (a: number, b: number) => a + Math.random() * (b - a);
const knots = (): Knot[] => [
  [0, 0],
  [r(0.1, 0.16), r(0.1, 0.16)],
  [r(0.32, 0.38), r(0.22, 0.3)],
  [r(0.44, 0.49), r(0.5, 0.6)],
  [r(0.56, 0.61), r(0.62, 0.68)],
  [r(0.68, 0.72), r(0.84, 0.88)],
  [1, 1],
];
const along = (ks: Knot[], t: number) => {
  for (let i = 1; i < ks.length; i++) {
    const [t0, v0] = ks[i - 1];
    const [t1, v1] = ks[i];
    if (t > t1) continue;
    const u = clamp((t - t0) / (t1 - t0), 0, 1);
    return mix(v0, v1, mix(u, u * u * (3 - 2 * u), 0.5));
  }
  return 1;
};

export function Generate({
  pace = 5,
  ripple = 50,
  corner = 18,
}: {
  pace?: number;
  ripple?: number;
  corner?: number;
} = {}) {
  const still = stillness();
  const id = `gen-${useId().replace(/:/g, "")}`;
  const [t, setT] = useState(1);
  const raf = useRef(0);
  const curve = useRef<Knot[]>(knots());
  const busy = t < 1;
  const [held, setHeld] = useState(false);
  const [made, setMade] = useState(false);
  const hold = useRef(0);
  const loading = busy || held;
  const pct = held ? 100 : Math.min(99, Math.floor(along(curve.current, t) * 100));

  useEffect(() => () => {
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    window.clearTimeout(hold.current);
  }, []);

  const generate = () => {
    if (loading) return;
    const total = still ? 400 : Math.max(2, pace) * 1000;
    let t0 = 0;
    const tick = (now: number) => {
      if (!t0) t0 = now;
      const v = Math.min(1, (now - t0) / total);
      setT(v);
      if (v < 1) raf.current = requestAnimationFrame(tick);
      else {
        raf.current = 0;
        setMade(true);
        setHeld(true);
        hold.current = window.setTimeout(() => setHeld(false), 650);
      }
    };
    curve.current = knots();
    setT(0);
    raf.current = requestAnimationFrame(tick);
  };

  const haze = smooth(0, 0.3, t);
  const form = smooth(0.1, 0.82, t);
  const grain = smooth(0.7, 1, t);
  const sd = mix(20, 1.6, 1 - Math.pow(1 - form, 2.2));
  const k = mix(2.4, 1, form);
  const warp = (clamp(ripple, 0, 100) / 100) * 32 * Math.pow(1 - smooth(0.05, 0.9, t), 1.5);
  const f = 0.006 + 0.0018 * Math.sin(t * 4.4);
  const cut = (PAPER - PAPER * k).toFixed(3);

  return (
    <div className="gen" data-busy={busy} data-loading={loading} data-made={made}>
      <div className="gen-card" style={{ borderRadius: clamp(corner, 0, 40) }}>
        {busy && !still && (
          <>
            <svg className="gen-defs" aria-hidden="true">
              <filter id={id} x="-10%" y="-10%" width="120%" height="120%" colorInterpolationFilters="sRGB">
                <feTurbulence type="fractalNoise" baseFrequency={`${f.toFixed(4)} ${(f * 1.3).toFixed(4)}`} numOctaves={2} seed={7} result="n" />
                <feDisplacementMap in="SourceGraphic" in2="n" scale={warp.toFixed(2)} xChannelSelector="R" yChannelSelector="G" result="d" />
                <feGaussianBlur in="d" stdDeviation={sd.toFixed(2)} />
                <feComponentTransfer>
                  <feFuncR type="linear" slope={k.toFixed(3)} intercept={cut} />
                  <feFuncG type="linear" slope={k.toFixed(3)} intercept={cut} />
                  <feFuncB type="linear" slope={k.toFixed(3)} intercept={cut} />
                </feComponentTransfer>
              </filter>
            </svg>
            <img
              className="gen-print"
              src={FLOWER}
              alt=""
              draggable={false}
              style={{
                filter: `url(#${id})`,
                opacity: haze * mix(0.7, 1, form),
                transform: `scale(${mix(1.04, 1, smooth(0, 0.9, t))})`,
              }}
            />
          </>
        )}
        {(made || busy) && <img
          className="gen-print"
          src={FLOWER}
          alt="Generated image"
          draggable={false}
          style={busy ? {
            opacity: still ? t : grain,
            filter: still ? undefined : `blur(${mix(1.6, 0, grain).toFixed(2)}px)`,
          } : undefined}
        />}

        <button
          className="gen-go"
          onClick={generate}
          disabled={loading}
          tabIndex={loading ? -1 : 0}
          aria-label="Generate"
        >
          <Astroid size={16} strokeWidth={2} aria-hidden="true" />
          <span>Generate</span>
        </button>

        <span className="gen-pct" role="status" aria-live="off">
          {pct}%
        </span>
      </div>
    </div>
  );
}
