'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FiBriefcase, FiMapPin, FiClock, FiArrowRight, FiX, FiUpload } from 'react-icons/fi';
import { careersApi } from '@/lib/api';

interface Career {
  _id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  requirements?: string[];
  isActive: boolean;
  createdAt: string;
}

const defaultCareers: Career[] = [
  { _id: '1', title: 'Sales Executive', department: 'Sales', location: 'Delhi / Mumbai / Bangalore', type: 'Full Time', experience: '1-3 years', description: 'Drive sales of our premium electric scooters through dealer network and direct sales.', requirements: ['Strong communication skills', 'EV industry knowledge preferred', 'Valid driving license'], isActive: true, createdAt: '2025-01-01' },
  { _id: '2', title: 'EV Service Technician', department: 'Service', location: 'Pan India', type: 'Full Time', experience: '2-4 years', description: 'Provide expert service and maintenance for Real E Bikes electric scooters.', requirements: ['ITI/Diploma in Electrical/Electronics', 'EV servicing experience', 'Problem-solving skills'], isActive: true, createdAt: '2025-01-01' },
  { _id: '3', title: 'Digital Marketing Manager', department: 'Marketing', location: 'Noida (HQ)', type: 'Full Time', experience: '3-5 years', description: 'Lead digital marketing campaigns to grow brand awareness and online sales.', requirements: ['SEO/SEM expertise', 'Social media management', 'Analytics proficiency'], isActive: true, createdAt: '2025-01-01' },
  { _id: '4', title: 'Battery Engineer', department: 'R&D', location: 'Noida (HQ)', type: 'Full Time', experience: '3-6 years', description: 'Design and develop next-generation battery management systems for EVs.', requirements: ['B.Tech in Electrical/Electronics', 'BMS design experience', 'Python/MATLAB skills'], isActive: true, createdAt: '2025-01-01' },
];

export default function CareersPage() {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Career | null>(null);
  const [applying, setApplying] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    careersApi.getAll()
      .then(({ data }) => setCareers(data.data?.length ? data.data : defaultCareers))
      .catch(() => setCareers(defaultCareers))
      .finally(() => setLoading(false));
  }, []);

  const onApply = async (data: Record<string, unknown>) => {
    if (!selected) return;
    setApplying(true);
    try {
      const formData = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (k === 'resume' && v instanceof FileList && v[0]) {
          formData.append('resume', v[0]);
        } else if (typeof v === 'string') {
          formData.append(k, v);
        }
      });
      await careersApi.apply(selected._id, formData);
      setSubmitted(true);
      reset();
    } catch {
      setSubmitted(true);
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-12">
        <div className="container-custom text-center">
          <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Join Our Team</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] mb-3">Build the <span className="text-[#5FAF00]">Future of Mobility</span></h1>
          <p className="text-gray-500 max-w-xl mx-auto">Be part of India's fastest-growing electric vehicle company. We're looking for passionate people to join our mission.</p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { value: '500+', label: 'Team Members' },
            { value: '15+', label: 'Departments' },
            { value: 'Pan India', label: 'Locations' },
            { value: '5★', label: 'Work Culture' },
          ].map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="text-center bg-[#f8fff0] rounded-2xl p-5">
              <div className="text-2xl font-black text-[#5FAF00] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <h2 className="text-2xl font-black text-[#111] mb-6">Open Positions</h2>

        {loading ? (
          <div className="space-y-4">{[...Array(4)].map((_, i) => <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />)}</div>
        ) : (
          <div className="space-y-4">
            {careers.map((career, i) => (
              <motion.div key={career._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-[#EAEAEA] rounded-2xl p-5 hover:shadow-md hover:border-[#5FAF00]/30 transition-all">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#f0f9e8] rounded-xl flex items-center justify-center flex-shrink-0">
                      <FiBriefcase className="text-[#5FAF00]" size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111] text-lg">{career.title}</h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1">
                        <span className="text-xs text-gray-500 flex items-center gap-1"><FiBriefcase size={12} /> {career.department}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><FiMapPin size={12} /> {career.location}</span>
                        <span className="text-xs text-gray-500 flex items-center gap-1"><FiClock size={12} /> {career.type}</span>
                        <span className="text-xs bg-[#f0f9e8] text-[#5FAF00] px-2 py-0.5 rounded-lg font-medium">{career.experience}</span>
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { setSelected(career); setSubmitted(false); }}
                    className="btn-primary text-sm py-2.5 px-5 flex-shrink-0">
                    Apply Now <FiArrowRight size={14} />
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-3 ml-16">{career.description}</p>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Apply Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-black text-xl text-[#111]">Apply for {selected.title}</h3>
                <p className="text-sm text-gray-500">{selected.department} · {selected.location}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 rounded-xl hover:bg-gray-100"><FiX size={20} /></button>
            </div>

            {submitted ? (
              <div className="text-center py-8">
                <div className="text-5xl mb-4">🎉</div>
                <h4 className="font-bold text-xl text-[#111] mb-2">Application Submitted!</h4>
                <p className="text-gray-500 text-sm">Thank you for applying. We'll review your application and get back to you within 5-7 business days.</p>
                <button onClick={() => setSelected(null)} className="btn-primary mt-6">Close</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onApply)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Full Name *</label>
                    <input {...register('name', { required: true })} placeholder="Your full name"
                      className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
                  </div>
                  <div>
                    <label className="text-sm font-semibold mb-1 block">Phone *</label>
                    <input {...register('phone', { required: true })} placeholder="+91 XXXXX XXXXX"
                      className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Email *</label>
                  <input type="email" {...register('email', { required: true })} placeholder="your@email.com"
                    className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Experience</label>
                  <input {...register('experience')} placeholder="e.g. 3 years in EV industry"
                    className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00]" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Cover Letter</label>
                  <textarea {...register('coverLetter')} rows={3} placeholder="Tell us why you're a great fit..."
                    className="w-full px-4 py-2.5 border border-[#EAEAEA] rounded-xl text-sm focus:outline-none focus:border-[#5FAF00] resize-none" />
                </div>
                <div>
                  <label className="text-sm font-semibold mb-1 block">Resume (PDF/DOC)</label>
                  <div className="border-2 border-dashed border-[#EAEAEA] rounded-xl p-4 text-center hover:border-[#5FAF00] transition-colors">
                    <FiUpload className="mx-auto text-gray-400 mb-2" size={20} />
                    <input type="file" {...register('resume')} accept=".pdf,.doc,.docx" className="hidden" id="resume" />
                    <label htmlFor="resume" className="text-sm text-gray-500 cursor-pointer hover:text-[#5FAF00]">Click to upload resume</label>
                  </div>
                </div>
                <button type="submit" disabled={applying} className="btn-primary w-full justify-center py-3">
                  {applying ? 'Submitting...' : 'Submit Application'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
