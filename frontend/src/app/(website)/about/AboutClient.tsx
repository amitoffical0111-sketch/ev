'use client';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { FiTarget, FiEye, FiAward, FiUsers, FiMapPin, FiZap } from 'react-icons/fi';
import { FaBolt } from 'react-icons/fa';

const values = [
  { icon: FiZap, title: 'Innovation', desc: 'Constantly pushing boundaries in electric vehicle technology.' },
  { icon: FiTarget, title: 'Quality', desc: 'Uncompromising standards in every scooter we manufacture.' },
  { icon: FiEye, title: 'Sustainability', desc: 'Committed to a greener, cleaner future for all.' },
  { icon: FiUsers, title: 'Customer First', desc: 'Your satisfaction drives everything we do.' },
];

const milestones = [
  { year: '2018', title: 'Founded', desc: 'Real E Bikes was established with a vision to revolutionize urban mobility.' },
  { year: '2019', title: 'First Product', desc: 'Launched our first electric scooter to overwhelming response.' },
  { year: '2021', title: '100+ Dealers', desc: 'Expanded our dealer network across 15 states in India.' },
  { year: '2023', title: '10,000+ Customers', desc: 'Crossed the milestone of 10,000 happy customers.' },
  { year: '2024', title: '200+ Dealers', desc: 'Pan-India presence with 200+ authorized dealers.' },
];

export default function AboutClient() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white py-20">
        <div className="container-custom text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-[#5FAF00] rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FaBolt size={28} className="text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">About <span className="text-[#5FAF00]">Real E Bikes</span></h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              We are on a mission to make electric mobility accessible, affordable and exciting for every Indian.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-[#f8fff0] rounded-3xl p-8">
              <FiTarget className="text-[#5FAF00] mb-4" size={32} />
              <h2 className="text-2xl font-black text-[#111] mb-3">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed">
                To provide high-performance, eco-friendly and affordable electric scooters that empower every Indian to ride clean and save more. We believe sustainable transportation should be accessible to all.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="bg-[#f8fff0] rounded-3xl p-8">
              <FiEye className="text-[#5FAF00] mb-4" size={32} />
              <h2 className="text-2xl font-black text-[#111] mb-3">Our Vision</h2>
              <p className="text-gray-600 leading-relaxed">
                To become India's most trusted electric vehicle brand by 2030, with a presence in every city and town, contributing to a zero-emission future for the next generation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-sm bg-[#5FAF00]">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-white text-center">
            {[
              { value: '6+', label: 'Years Experience' },
              { value: '200+', label: 'Dealers Nationwide' },
              { value: '10,000+', label: 'Happy Customers' },
              { value: '15+', label: 'States Covered' },
            ].map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="text-4xl font-black mb-1">{stat.value}</div>
                <div className="text-white/80 text-sm font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container-custom">
          <div className="text-center mb-12">
            <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#111]">Our Core <span className="text-[#5FAF00]">Values</span></h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="card-premium p-6 text-center">
                <div className="w-14 h-14 bg-[#f0f9e8] rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={24} className="text-[#5FAF00]" />
                </div>
                <h3 className="font-bold text-[#111] text-lg mb-2">{v.title}</h3>
                <p className="text-gray-500 text-sm">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section bg-[#f8fff0]" id="timeline">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-[#111]">Our <span className="text-[#5FAF00]">Journey</span></h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 -translate-x-px top-0 bottom-0 w-0.5 bg-[#EAEAEA] hidden md:block" />
            {milestones.map((m, i) => (
              <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className={`flex items-center gap-6 mb-8 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                <div className={`flex-1 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className="bg-white rounded-2xl p-5 border border-[#EAEAEA] shadow-sm">
                    <div className="text-[#5FAF00] font-black text-lg mb-1">{m.year}</div>
                    <div className="font-bold text-[#111] mb-1">{m.title}</div>
                    <div className="text-gray-500 text-sm">{m.desc}</div>
                  </div>
                </div>
                <div className="w-4 h-4 bg-[#5FAF00] rounded-full flex-shrink-0 hidden md:block ring-4 ring-[#f0f9e8]" />
                <div className="flex-1 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-black text-[#111] mb-4">Ready to <span className="text-[#5FAF00]">Go Electric?</span></h2>
          <p className="text-gray-500 mb-8">Join thousands of happy riders who have made the switch to clean, green mobility.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="btn-primary px-8 py-4 text-base">Explore Products</Link>
            <Link href="/book-test-ride" className="btn-outline px-8 py-4 text-base">Book Test Ride</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
