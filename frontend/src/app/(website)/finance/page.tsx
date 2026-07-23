'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiPercent, FiCalendar, FiDollarSign } from 'react-icons/fi';
import { financeApi } from '@/lib/api';
import { FinancePartner } from '@/types';
import { formatPrice, calculateEMI } from '@/lib/utils';

const defaultPartners: FinancePartner[] = [
  { _id: '1', name: 'HDFC Bank', description: 'India\'s leading private bank offering competitive EV loan rates with quick approval.', interestRate: '9.5%', tenure: '12-60 months', minAmount: 30000, maxAmount: 200000, isActive: true },
  { _id: '2', name: 'SBI Bank', description: 'State Bank of India\'s special EV loan scheme with lowest interest rates.', interestRate: '8.9%', tenure: '12-84 months', minAmount: 25000, maxAmount: 300000, isActive: true },
  { _id: '3', name: 'Bajaj Finance', description: 'No cost EMI and instant approval with minimal documentation.', interestRate: '0%', tenure: '3-24 months', minAmount: 20000, maxAmount: 150000, isActive: true },
  { _id: '4', name: 'ICICI Bank', description: 'Digital-first EV loans with instant online approval and flexible repayment.', interestRate: '10.5%', tenure: '12-60 months', minAmount: 30000, maxAmount: 200000, isActive: true },
];

export default function FinancePage() {
  const [partners, setPartners] = useState<FinancePartner[]>([]);
  const [loading, setLoading] = useState(true);
  const [loanAmount, setLoanAmount] = useState(80000);
  const [tenure, setTenure] = useState(24);
  const [rate, setRate] = useState(9.5);

  useEffect(() => {
    financeApi.getAll()
      .then(({ data }) => setPartners(data.data?.length ? data.data : defaultPartners))
      .catch(() => setPartners(defaultPartners))
      .finally(() => setLoading(false));
  }, []);

  const emi = calculateEMI(loanAmount, rate, tenure);
  const totalPayable = emi * tenure;
  const totalInterest = totalPayable - loanAmount;

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-12">
        <div className="container-custom text-center">
          <p className="text-[#5FAF00] font-bold text-sm uppercase tracking-wider mb-2">Easy Finance</p>
          <h1 className="text-4xl md:text-5xl font-black text-[#111] mb-3">Finance <span className="text-[#5FAF00]">Partners</span></h1>
          <p className="text-gray-500">Get your dream EV with easy EMI options from our trusted finance partners</p>
        </div>
      </div>

      <div className="container-custom py-10">
        {/* EMI Calculator */}
        <div className="bg-gradient-to-br from-[#f0f9e8] to-white rounded-3xl p-6 md:p-8 border border-[#EAEAEA] mb-12">
          <h2 className="text-2xl font-black text-[#111] mb-6 flex items-center gap-2">
            <FiDollarSign className="text-[#5FAF00]" /> EMI Calculator
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold">Loan Amount</label>
                  <span className="text-[#5FAF00] font-bold">{formatPrice(loanAmount)}</span>
                </div>
                <input type="range" min="20000" max="300000" step="5000" value={loanAmount}
                  onChange={e => setLoanAmount(Number(e.target.value))}
                  className="w-full accent-[#5FAF00]" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>₹20,000</span><span>₹3,00,000</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold">Tenure</label>
                  <span className="text-[#5FAF00] font-bold">{tenure} months</span>
                </div>
                <input type="range" min="6" max="84" step="6" value={tenure}
                  onChange={e => setTenure(Number(e.target.value))}
                  className="w-full accent-[#5FAF00]" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>6 months</span><span>84 months</span>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold">Interest Rate (p.a.)</label>
                  <span className="text-[#5FAF00] font-bold">{rate}%</span>
                </div>
                <input type="range" min="0" max="20" step="0.5" value={rate}
                  onChange={e => setRate(Number(e.target.value))}
                  className="w-full accent-[#5FAF00]" />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0%</span><span>20%</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 border border-[#EAEAEA] flex flex-col justify-center">
              <div className="text-center mb-6">
                <p className="text-gray-500 text-sm mb-1">Monthly EMI</p>
                <p className="text-4xl font-black text-[#5FAF00]">₹{emi.toLocaleString('en-IN')}</p>
                <p className="text-xs text-gray-400 mt-1">per month</p>
              </div>
              <div className="space-y-3">
                {[
                  { label: 'Principal Amount', value: formatPrice(loanAmount) },
                  { label: 'Total Interest', value: formatPrice(totalInterest) },
                  { label: 'Total Payable', value: formatPrice(totalPayable) },
                ].map(item => (
                  <div key={item.label} className="flex justify-between text-sm">
                    <span className="text-gray-500">{item.label}</span>
                    <span className="font-bold text-[#111]">{item.value}</span>
                  </div>
                ))}
              </div>
              <Link href="/book-test-ride" className="btn-primary mt-6 justify-center">
                Apply for Loan <FiArrowRight />
              </Link>
            </div>
          </div>
        </div>

        {/* Partners */}
        <h2 className="text-2xl font-black text-[#111] mb-6">Our Finance Partners</h2>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[...Array(4)].map((_, i) => <div key={i} className="h-40 bg-gray-100 rounded-2xl animate-pulse" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {partners.map((partner, i) => (
              <motion.div key={partner._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-[#EAEAEA] rounded-2xl p-6 hover:shadow-md hover:border-[#5FAF00]/30 transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {partner.logo ? (
                      <div className="relative w-16 h-10"><Image src={partner.logo} alt={partner.name} fill className="object-contain" /></div>
                    ) : (
                      <div className="w-12 h-12 bg-[#f0f9e8] rounded-xl flex items-center justify-center">
                        <span className="text-[#5FAF00] font-black text-sm">{partner.name.slice(0, 2)}</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-[#111]">{partner.name}</h3>
                      {partner.interestRate && (
                        <span className="text-xs bg-[#f0f9e8] text-[#5FAF00] font-bold px-2 py-0.5 rounded-lg">
                          From {partner.interestRate} p.a.
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                {partner.description && <p className="text-sm text-gray-500 mb-4">{partner.description}</p>}
                <div className="flex flex-wrap gap-3 text-xs text-gray-500">
                  {partner.tenure && <span className="flex items-center gap-1"><FiCalendar size={12} /> {partner.tenure}</span>}
                  {partner.minAmount && <span className="flex items-center gap-1"><FiPercent size={12} /> Min: {formatPrice(partner.minAmount)}</span>}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
