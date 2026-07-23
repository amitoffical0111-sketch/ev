'use client';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { FAQ } from '@/types';

const defaultFAQs: FAQ[] = [
  { _id: '1', question: 'What is the range of Real E Bikes electric scooters?', answer: 'Our electric scooters offer a range of 50 to 120+ km on a single charge, depending on the model, rider weight, terrain, and riding conditions.', category: 'General', isActive: true, sortOrder: 1 },
  { _id: '2', question: 'How long does it take to charge the battery?', answer: 'Charging time varies by model. Most of our scooters charge from 0-100% in 6-8 hours with a standard charger. With our fast charger, you can get 80% charge in just 4 hours.', category: 'Battery', isActive: true, sortOrder: 2 },
  { _id: '3', question: 'Do I need a license to ride a Real E Bike?', answer: 'For RTO Approved (High Speed) models above 25 km/h, a valid driving license is required. For Non-RTO (Low Speed) models up to 25 km/h, no license or registration is needed.', category: 'Legal', isActive: true, sortOrder: 3 },
  { _id: '4', question: 'What warranty do you offer?', answer: 'We offer a comprehensive 5-year warranty on the battery and 2-year warranty on the motor and other electrical components. The frame comes with a lifetime warranty.', category: 'Warranty', isActive: true, sortOrder: 4 },
  { _id: '5', question: 'Can I get EMI financing for my purchase?', answer: 'Yes! We have partnered with leading banks and NBFCs including HDFC, SBI, Bajaj Finance, and ICICI Bank to offer easy EMI options starting from ₹2,999/month.', category: 'Finance', isActive: true, sortOrder: 5 },
  { _id: '6', question: 'How do I find the nearest service center?', answer: 'You can find the nearest service center using our Dealer Locator on the website. We have 200+ service centers across India. You can also call our helpline at +91 99536 67830.', category: 'Service', isActive: true, sortOrder: 6 },
];

interface Props { faqs?: FAQ[]; }

export default function FAQSection({ faqs = defaultFAQs }: Props) {
  const [openId, setOpenId] = useState<string | null>('1');
  const items = faqs.length > 0 ? faqs : defaultFAQs;

  return (
    <section className="section bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-3">Got Questions?</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#111] mb-4">
              Frequently Asked <span className="text-[#5FAF00]">Questions</span>
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              Find answers to the most common questions about our electric scooters, charging, warranty, and more.
            </p>
            <a href="/faq" className="btn-primary text-sm">View All FAQs</a>
          </div>

          <div className="lg:col-span-2 space-y-3">
            {items.slice(0, 6).map((faq) => (
              <div key={faq._id} className="border border-[#EAEAEA] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenId(openId === faq._id ? null : faq._id)}
                  className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[#f8fff0] transition-colors">
                  <span className="font-semibold text-sm text-[#111] pr-4">{faq.question}</span>
                  {openId === faq._id
                    ? <FiChevronUp className="text-[#5FAF00] flex-shrink-0" size={18} />
                    : <FiChevronDown className="text-gray-400 flex-shrink-0" size={18} />}
                </button>
                {openId === faq._id && (
                  <div className="px-5 pb-4">
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
