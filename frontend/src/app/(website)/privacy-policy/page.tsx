import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-black text-[#111] mb-2">Privacy <span className="text-[#5FAF00]">Policy</span></h1>
          <p className="text-gray-500">Last updated: January 2025</p>
        </div>
      </div>
      <div className="container-custom py-10">
        <div className="max-w-3xl prose prose-sm">
          {[
            { title: '1. Information We Collect', content: 'We collect information you provide directly to us, such as when you create an account, make a booking, or contact us. This includes name, email address, phone number, and address. We also collect information automatically when you use our website, including IP address, browser type, and pages visited.' },
            { title: '2. How We Use Your Information', content: 'We use the information we collect to process bookings and test ride requests, send you updates about your orders, provide customer support, send promotional communications (with your consent), improve our website and services, and comply with legal obligations.' },
            { title: '3. Information Sharing', content: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with authorized dealers to fulfill your booking requests, finance partners when you apply for a loan, and service providers who assist in our operations.' },
            { title: '4. Data Security', content: 'We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. All data is encrypted in transit using SSL/TLS technology.' },
            { title: '5. Cookies', content: 'We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie settings through your browser preferences. Essential cookies are required for the website to function properly.' },
            { title: '6. Your Rights', content: 'You have the right to access, correct, or delete your personal information. You may also opt out of marketing communications at any time. To exercise these rights, please contact us at privacy@realebikes.com.' },
            { title: '7. Contact Us', content: 'If you have questions about this Privacy Policy, please contact us at: Real E Bikes, 123 EV Tech Park, Noida, UP 201301. Email: privacy@realebikes.com | Phone: +91 99536 67830' },
          ].map(section => (
            <div key={section.title} className="mb-8">
              <h2 className="text-xl font-black text-[#111] mb-3">{section.title}</h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
