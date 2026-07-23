export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gradient-to-r from-[#f8fff0] to-white border-b border-[#EAEAEA] py-12">
        <div className="container-custom">
          <h1 className="text-4xl font-black text-[#111] mb-2">Terms & <span className="text-[#5FAF00]">Conditions</span></h1>
          <p className="text-gray-500">Last updated: January 2025</p>
        </div>
      </div>
      <div className="container-custom py-10">
        <div className="max-w-3xl">
          {[
            { title: '1. Acceptance of Terms', content: 'By accessing and using the Real E Bikes website, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.' },
            { title: '2. Products and Pricing', content: 'All prices displayed on our website are ex-showroom prices and exclude road tax, insurance, and registration charges. Prices are subject to change without notice. We reserve the right to modify or discontinue any product at any time.' },
            { title: '3. Bookings and Orders', content: 'Booking a test ride or placing an order does not constitute a binding purchase agreement. All orders are subject to availability and confirmation. We reserve the right to cancel any order at our discretion.' },
            { title: '4. Warranty', content: 'Our products come with a manufacturer warranty as specified in the product documentation. The warranty covers manufacturing defects and does not cover damage due to misuse, accidents, or unauthorized modifications.' },
            { title: '5. Intellectual Property', content: 'All content on this website, including text, images, logos, and graphics, is the property of Real E Bikes and is protected by copyright laws. You may not reproduce or distribute any content without our written permission.' },
            { title: '6. Limitation of Liability', content: 'Real E Bikes shall not be liable for any indirect, incidental, or consequential damages arising from the use of our products or website. Our total liability shall not exceed the purchase price of the product.' },
            { title: '7. Governing Law', content: 'These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Noida, Uttar Pradesh.' },
            { title: '8. Contact', content: 'For questions about these Terms, contact us at: legal@realebikes.com or +91 99536 67830.' },
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
