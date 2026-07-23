'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiPlay, FiX, FiPause, FiVolume2, FiVolumeX, FiMaximize } from 'react-icons/fi';

const rightCards = [
  { id: 1, label: 'Product Photos', img: '/gp1.png' },
  { id: 2, label: 'Test Ride',      img: '/gp2.png' },
  { id: 3, label: 'Battery Lab',    img: '/gp3.png' },
];

const bottomCards = [
  { id: 4, label: 'Factory',        img: '/gp4.png' },
  { id: 5, label: 'Dealership',     img: '/gp5.png' },
  { id: 6, label: 'Customers',      img: '/gp6.png' },
  { id: 7, label: 'Service Center', img: '/gp7.png' },
  { id: 8, label: 'Events',         img: '/gp8.png' },
  { id: 9, label: 'Delivery',       img: '/gp9.png' },
];

const fmt = (s: number) =>
  `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

export default function GallerySection() {
  const [open, setOpen]         = useState(false);
  const [playing, setPlaying]   = useState(false);
  const [muted, setMuted]       = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const modalVid = useRef<HTMLVideoElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setPlaying(false);
    if (modalVid.current) { modalVid.current.pause(); modalVid.current.currentTime = 0; }
  }, []);

  useEffect(() => {
    if (!open) return;
    modalVid.current?.play().catch(() => {});
    setPlaying(true);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, close]);

  useEffect(() => {
    const v = modalVid.current;
    if (!v) return;
    const onTime = () => setProgress(v.currentTime);
    const onMeta = () => setDuration(v.duration);
    v.addEventListener('timeupdate', onTime);
    v.addEventListener('loadedmetadata', onMeta);
    return () => { v.removeEventListener('timeupdate', onTime); v.removeEventListener('loadedmetadata', onMeta); };
  }, [open]);

  const togglePlay = () => {
    const v = modalVid.current; if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };
  const toggleMute = () => {
    const v = modalVid.current; if (!v) return;
    v.muted = !v.muted; setMuted(v.muted);
  };
  const seek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = modalVid.current; if (!v) return;
    v.currentTime = +e.target.value; setProgress(+e.target.value);
  };

  return (
    <section className="section bg-[#f8fff0]">
      <div className="container-custom">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Visual Stories</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#111]">
              Our <span className="text-[#5FAF00]">Gallery</span>
            </h2>
          </div>
          <Link href="/gallery" className="btn-outline text-sm self-start md:self-auto">
            View Full Gallery <FiArrowRight />
          </Link>
        </div>

        {/* ── Top Section: 68% / 32% two-column grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '68% 32%',
            gap: '16px',
            alignItems: 'stretch',
          }}
          className="gallery-top-grid"
        >
          {/* Left: Featured Video — 16:9 */}
          <div
            onClick={() => setOpen(true)}
            className="group cursor-pointer"
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 20px 60px rgba(0,0,0,0.35), 0 8px 24px rgba(95,175,0,0.2)',
            }}
          >
            <video
              src="/video/bikev1.mp4"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s ease',
              }}
              className="group-hover:scale-105"
            />
            {/* Dark gradient overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
              pointerEvents: 'none',
            }} />
            {/* Play button overlay */}
            <div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div
                className="group-hover:scale-110"
                style={{
                  width: 80, height: 80, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(12px)',
                  border: '2px solid rgba(255,255,255,0.45)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.3s ease',
                }}
              >
                <FiPlay color="white" size={32} style={{ marginLeft: 5 }} />
              </div>
            </div>
            {/* Brand Launch Video badge */}
            <span style={{
              position: 'absolute', top: 16, left: 16,
              background: 'rgba(95,175,0,0.92)', backdropFilter: 'blur(8px)',
              color: '#fff', fontSize: 13, fontWeight: 700,
              padding: '6px 16px', borderRadius: 999,
              letterSpacing: '0.02em',
            }}>
              Brand Launch Video
            </span>
            {/* Bottom title */}
            <div style={{ position: 'absolute', bottom: 20, left: 20 }}>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 4 }}>Featured</p>
              <p style={{ color: '#fff', fontSize: 20, fontWeight: 800 }}>Real E Bikes — Brand Launch</p>
            </div>
          </div>

          {/* Right: 3 stacked cards — stretch to match video height */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr 1fr', gap: '16px' }}>
            {rightCards.map((card) => (
              <div
                key={card.id}
                className="group cursor-pointer"
                style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.25)' }}
              >
                <Image
                  src={card.img}
                  alt={card.label}
                  fill
                  style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }}
                  className="group-hover:scale-105"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)', pointerEvents: 'none' }} />
                <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 999 }}>
                  Gallery
                </span>
                <p style={{ position: 'absolute', bottom: 14, left: 14, color: '#fff', fontSize: 16, fontWeight: 700, margin: 0 }}>
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Section: 3×2 equal grid ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '16px',
            marginTop: '16px',
          }}
          className="gallery-bottom-grid"
        >
          {bottomCards.map((card) => (
            <div
              key={card.id}
              className="group cursor-pointer"
              style={{ position: 'relative', height: 180, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            >
              <Image
                src={card.img}
                alt={card.label}
                fill
                style={{ objectFit: 'cover', transition: 'transform 0.5s ease' }}
                className="group-hover:scale-110"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%)', pointerEvents: 'none' }} />
              <span style={{ position: 'absolute', top: 12, left: 12, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', color: '#fff', fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999 }}>
                Gallery
              </span>
              <p style={{ position: 'absolute', bottom: 14, left: 14, color: '#fff', fontSize: 15, fontWeight: 700, margin: 0 }}>
                {card.label}
              </p>
            </div>
          ))}
        </div>

        {/* Responsive overrides */}
        <style>{`
          @media (max-width: 1023px) {
            .gallery-top-grid {
              grid-template-columns: 1fr 1fr !important;
            }
            .gallery-bottom-grid {
              grid-template-columns: repeat(2, 1fr) !important;
            }
          }
          @media (max-width: 639px) {
            .gallery-top-grid {
              grid-template-columns: 1fr !important;
            }
            .gallery-top-grid > div:last-child {
              grid-template-rows: unset !important;
              grid-template-columns: 1fr !important;
            }
            .gallery-top-grid > div:last-child > div {
              min-height: 140px !important;
            }
            .gallery-bottom-grid {
              grid-template-columns: 1fr !important;
            }
          }
        `}</style>
      </div>

      {/* ── Modal ── */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.92)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: 896, margin: '0 16px' }}>
            <button
              onClick={close}
              style={{ position: 'absolute', top: -44, right: 0, background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.8)' }}
            >
              <FiX size={28} />
            </button>
            <video
              ref={modalVid}
              src="/video/bikev1.mp4"
              muted={muted}
              playsInline
              preload="metadata"
              style={{ display: 'block', width: '100%', maxHeight: '70vh', objectFit: 'contain', background: '#000', borderRadius: 16 }}
            />
            {/* Controls */}
            <div style={{
              marginTop: 12, padding: '10px 16px', borderRadius: 12,
              background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <button onClick={togglePlay} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}>
                {playing ? <FiPause size={20} /> : <FiPlay size={20} />}
              </button>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                {fmt(progress)} / {fmt(duration)}
              </span>
              <input
                type="range" min={0} max={duration || 10} step={0.1} value={progress}
                onChange={seek}
                style={{ flex: 1, accentColor: '#5FAF00', cursor: 'pointer' }}
              />
              <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}>
                {muted ? <FiVolumeX size={20} /> : <FiVolume2 size={20} />}
              </button>
              <button
                onClick={() => modalVid.current?.requestFullscreen()}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}
              >
                <FiMaximize size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
