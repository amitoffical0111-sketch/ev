'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiClock, FiCheck, FiUser, FiMessageSquare } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

interface FormData { name: string; email: string; phone: string; subject: string; message: string; }

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setSubmitted(true);
    setLoading(false);
  };

  const contactInfo = [
    { icon: FiMapPin, label: 'Address', value: '123, EV Tech Park, Noida, Uttar Pradesh - 201301' },
    { icon: FiPhone, label: 'Phone', value: '+91 99536 67830', href: 'tel:+919953667830' },
    { icon: FiMail, label: 'Email', value: 'info@realebikes.com', href: 'mailto:info@realebikes.com' },
    { icon: FiClock, label: 'Working Hours', value: 'Mon - Sat : 10AM - 7PM' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-2">
            Get in <span className="text-[#5FAF00]">Touch</span>
          </h1>
          <p className="text-gray-500">We'd love to hear from you. Send us a message!</p>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div className="space-y-5">
            {contactInfo.map((info) => (
              <div key={info.label} className="flex items-start gap-4 p-4 bg-[#f8fff0] rounded-2xl">
                <div className="w-10 h-10 bg-[#5FAF00] rounded-xl flex items-center justify-center flex-shrink-0">
                  <info.icon size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">{info.label}</div>
                  {info.href ? (
                    <a href={info.href} className="text-sm font-medium text-[#111] hover:text-[#5FAF00] transition-colors">{info.value}</a>
                  ) : (
                    <p className="text-sm font-medium text-[#111]">{info.value}</p>
                  )}
                </div>
              </div>
            ))}

            <a href="https://wa.me/919953667830" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-[#25D366] rounded-2xl text-white font-semibold hover:bg-[#128C7E] transition-colors">
              <FaWhatsapp size={24} />
              <div>
                <div className="text-sm font-bold">Chat on WhatsApp</div>
                <div className="text-xs opacity-80">Quick response guaranteed</div>
              </div>
            </a>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                className="text-center py-16">
                <div className="w-16 h-16 bg-[#5FAF00] rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCheck size={28} className="text-white" />
                </div>
                <h3 className="text-xl font-black text-[#111] mb-2">Message Sent!</h3>
                <p className="text-gray-500">We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Full Name *</label>
                    <div className="relative">
                      <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input {...register('name', { required: 'Required' })} placeholder="Your name"
                        className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1.5 block">Phone *</label>
                    <div className="relative">
                      <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                      <input {...register('phone', { required: 'Required' })} placeholder="Phone number"
                        className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Email *</label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    <input {...register('email', { required: 'Required' })} placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Subject</label>
                  <input {...register('subject')} placeholder="How can we help?"
                    className="w-full px-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1.5 block">Message *</label>
                  <div className="relative">
                    <FiMessageSquare className="absolute left-3 top-3 text-gray-400" size={16} />
                    <textarea {...register('message', { required: 'Required' })} rows={5} placeholder="Your message..."
                      className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm resize-none" />
                  </div>
                  {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
