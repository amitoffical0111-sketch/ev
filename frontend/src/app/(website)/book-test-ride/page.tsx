'use client';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiPhone, FiMail, FiMapPin, FiCheck } from 'react-icons/fi';
import { bookingsApi, productsApi } from '@/lib/api';
import { Product } from '@/types';

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  product: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export default function BookTestRidePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  useEffect(() => {
    productsApi.getAll({ limit: '50' }).then(({ data }) => setProducts(data.products || []));
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { data: res } = await bookingsApi.create({ ...data, type: 'test_ride' });
      setBookingId(res.booking.bookingId);
      setSubmitted(true);
    } catch (err) {
      alert('Failed to submit. Please try again.');
    } finally { setLoading(false); }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-[#5FAF00] rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={36} className="text-white" />
          </div>
          <h2 className="text-2xl font-black text-[#111] mb-2">Booking Confirmed!</h2>
          <p className="text-gray-500 mb-4">Your test ride has been booked successfully.</p>
          <div className="bg-[#f8fff0] rounded-2xl p-4 mb-6">
            <p className="text-sm text-gray-500">Booking ID</p>
            <p className="text-xl font-black text-[#5FAF00]">{bookingId}</p>
          </div>
          <p className="text-sm text-gray-400">Our team will contact you shortly to confirm the details.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-10">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-black text-[#111] mb-2">
            Book a <span className="text-[#5FAF00]">Test Ride</span>
          </h1>
          <p className="text-gray-500">Experience the thrill of electric riding. Book your free test ride today!</p>
        </div>
      </div>

      <div className="container-custom py-10">
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-[#111] mb-1.5 block">Full Name *</label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input {...register('name', { required: 'Name is required' })}
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                </div>
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#111] mb-1.5 block">Phone Number *</label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input {...register('phone', { required: 'Phone is required', pattern: { value: /^[6-9]\d{9}$/, message: 'Invalid phone number' } })}
                    placeholder="10-digit mobile number"
                    className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                </div>
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#111] mb-1.5 block">Email Address *</label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input {...register('email', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })}
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                </div>
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
              </div>

              <div>
                <label className="text-sm font-semibold text-[#111] mb-1.5 block">City *</label>
                <div className="relative">
                  <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input {...register('city', { required: 'City is required' })}
                    placeholder="Your city"
                    className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                </div>
                {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city.message}</p>}
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#111] mb-1.5 block">Select Scooter *</label>
              <select {...register('product', { required: 'Please select a product' })}
                className="w-full px-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm bg-white">
                <option value="">Choose a scooter model</option>
                {products.map(p => <option key={p._id} value={p._id}>{p.name} - {p.badge}</option>)}
              </select>
              {errors.product && <p className="text-red-500 text-xs mt-1">{errors.product.message}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-[#111] mb-1.5 block">Preferred Date</label>
                <div className="relative">
                  <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                  <input type="date" {...register('preferredDate')}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full pl-10 pr-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm" />
                </div>
              </div>
              <div>
                <label className="text-sm font-semibold text-[#111] mb-1.5 block">Preferred Time</label>
                <select {...register('preferredTime')}
                  className="w-full px-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm bg-white">
                  <option value="">Select time slot</option>
                  <option>10:00 AM - 11:00 AM</option>
                  <option>11:00 AM - 12:00 PM</option>
                  <option>12:00 PM - 1:00 PM</option>
                  <option>2:00 PM - 3:00 PM</option>
                  <option>3:00 PM - 4:00 PM</option>
                  <option>4:00 PM - 5:00 PM</option>
                  <option>5:00 PM - 6:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-[#111] mb-1.5 block">Additional Notes</label>
              <textarea {...register('notes')} rows={3} placeholder="Any specific requirements or questions..."
                className="w-full px-4 py-3 border border-[#EAEAEA] rounded-xl focus:outline-none focus:border-[#5FAF00] text-sm resize-none" />
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-4 text-base">
              {loading ? 'Submitting...' : 'Book Test Ride'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
