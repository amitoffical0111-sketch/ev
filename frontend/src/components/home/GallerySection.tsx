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
    <section className="section bg-[#f6fef0]">
      <div className="container-custom">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <p className="section-label">Visual Stories</p>
            <h2 className="text-3xl md:text-[2.4rem] font-black text-[#111] leading-tight">
              Our <span className="text-[#5FAF00]">Gallery</span>
            </h2>
          </div>
          <Link href="/gallery" className="btn-outline text-[13px] self-start md:self-auto">
            View Full Gallery <FiArrowRight size={14} />
          </Link>
        </div>

        {/* Top Section */}
        <div
          style={{ display: 'grid', gridTemplateColumns: '68% 32%', gap: '14px', alignItems: 'stretch' }}
          className="gallery-top-grid"
        >
          {/* Featured Video */}
          <div
            onClick={() => setOpen(true)}
            className="group cursor-pointer"
            style={{
              position: 'relative',
              aspectRatio: '16 / 9',
              borderRadius: 20,
              overflow: 'hidden',
              boxShadow: '0 16px 48px rgba(0,0,0,0.25), 0 4px 16px rgba(95,175,0,0.15)',
            }}
          >
            <video
              src="/video/bikev1.mp4"
              autoPlay muted loop playsInline preload="metadata"
              style={{
                position: 'absolute', inset: 0,
                width: '100%', height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.6s cubic-bezier(0.4,0,0.2,1)',
              }}
              className="group-hover:scale-[1.04]"
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.15) 45%, transparent 100%)',
              pointerEvents: 'none',
              transition: 'opacity 0.3s ease',
            }} />

            {/* Play button */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div
                className="group-hover:scale-110"
                style={{
                  width: 76, height: 76, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(16px)',
                  border: '1.5px solid rgba(255,255,255,0.5)',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                }}
              >
                <FiPlay color="white" size={28} style={{ marginLeft: 4 }} />
              </div>
            </div>

            {/* Badge */}
            <span style={{
              position: 'absolute', top: 14, left: 14,
              background: 'rgba(95,175,0,0.9)', backdropFilter: 'blur(8px)',
              color: '#fff', fontSize: 12, fontWeight: 700,
              padding: '5px 14px', borderRadius: 999,
              letterSpacing: '0.03em',
            }}>
              Brand Launch Video
            </span>

            {/* Bottom title */}
            <div style={{ position: 'absolute', bottom: 18, left: 18 }}>
              <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginBottom: 3 }}>Featured</p>
              <p style={{ color: '#fff', fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>Real E Bikes — Brand Launch</p>
            </div>
          </div>

          {/* Right stacked cards */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr 1fr', gap: '14px' }}>
            {rightCards.map((card) => (
              <div
                key={card.id}
                className="group cursor-pointer"
                style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.18)' }}
              >
                <Image
                  src={card.img} alt={card.label} fill
                  style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                  className="group-hover:scale-[1.07]"
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, transparent 55%)', pointerEvents: 'none' }} />
                <p style={{ position: 'absolute', bottom: 12, left: 12, color: '#fff', fontSize: 14, fontWeight: 700, margin: 0 }}>
                  {card.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', marginTop: '14px' }}
          className="gallery-bottom-grid"
        >
          {bottomCards.map((card) => (
            <div
              key={card.id}
              className="group cursor-pointer"
              style={{ position: 'relative', height: 176, borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.15)' }}
            >
              <Image
                src={card.img} alt={card.label} fill
                style={{ objectFit: 'cover', transition: 'transform 0.5s cubic-bezier(0.4,0,0.2,1)' }}
                className="group-hover:scale-[1.08]"
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.05) 55%, transparent 100%)', pointerEvents: 'none' }} />
              <p style={{ position: 'absolute', bottom: 12, left: 14, color: '#fff', fontSize: 14, fontWeight: 700, margin: 0 }}>
                {card.label}
              </p>
            </div>
          ))}
        </div>

        <style>{`
          @media (max-width: 1023px) {
            .gallery-top-grid { grid-template-columns: 1fr 1fr !important; }
            .gallery-bottom-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 639px) {
            .gallery-top-grid { grid-template-columns: 1fr !important; }
            .gallery-top-grid > div:last-child { grid-template-rows: unset !important; grid-template-columns: 1fr !important; }
            .gallery-top-grid > div:last-child > div { min-height: 140px !important; }
            .gallery-bottom-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>

      {/* Modal */}
      {open && (
        <div
          onClick={(e) => { if (e.target === e.currentTarget) close(); }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: 'rgba(0,0,0,0.94)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ position: 'relative', width: '100%', maxWidth: 900, margin: '0 20px' }}>
            <button
              onClick={close}
              style={{
                position: 'absolute', top: -48, right: 0,
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 10, cursor: 'pointer', color: 'rgba(255,255,255,0.9)',
                width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
              aria-label="Close video"
            >
              <FiX size={18} />
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
              marginTop: 10, padding: '10px 16px', borderRadius: 12,
              background: 'rgba(255,255,255,0.07)', backdropFilter: 'blur(12px)',
              border: '1px solid rgba(255,255,255,0.1)',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <button onClick={togglePlay} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                {playing ? <FiPause size={18} /> : <FiPlay size={18} />}
              </button>
              <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 11, fontFamily: 'monospace', whiteSpace: 'nowrap' }}>
                {fmt(progress)} / {fmt(duration)}
              </span>
              <input
                type="range" min={0} max={duration || 10} step={0.1} value={progress}
                onChange={seek}
                style={{ flex: 1, accentColor: '#5FAF00', cursor: 'pointer', height: 3 }}
              />
              <button onClick={toggleMute} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}>
                {muted ? <FiVolumeX size={18} /> : <FiVolume2 size={18} />}
              </button>
              <button
                onClick={() => modalVid.current?.requestFullscreen()}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex' }}
                aria-label="Fullscreen"
              >
                <FiMaximize size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
