'use client';

import { useState } from 'react';

export default function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [institution, setInstitution] = useState('');
  const [inquiryType, setInquiryType] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailBody = `
New Academic Inquiry from ${name}

Institution: ${institution}
Email: ${email}
Inquiry Type: ${inquiryType}

Message:
${message}

---
Sent from Charles MacKay Aviation Books website
    `.trim();

    const subject = `Academic Inquiry: ${inquiryType} - ${institution}`;
    const mailto = `mailto:charlese1mackay@hotmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    window.open(mailto, '_self');

    // Reset form
    setName('');
    setEmail('');
    setInstitution('');
    setMessage('');
    setInquiryType('general');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 bg-[#2a384a] text-white p-3 sm:p-4 rounded-full shadow-lg hover:bg-gray-800 transition-colors z-40"
        aria-label="Academic Inquiry Chat"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Chat Modal */}
          <div className="fixed bottom-4 right-4 left-4 sm:bottom-6 sm:right-6 sm:left-auto sm:w-96 bg-white rounded-lg shadow-xl z-50 overflow-hidden max-w-md sm:max-w-none mx-auto sm:mx-0">
            {/* Header */}
            <div className="bg-[#2a384a] text-white p-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold">Academic Inquiry</h3>
                <p className="text-xs text-gray-300">Get in touch with Charles directly</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-4 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-full box-border"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-full box-border"
                  placeholder="your.email@institution.edu"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Institution</label>
                <input
                  type="text"
                  value={institution}
                  onChange={(e) => setInstitution(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-full box-border"
                  placeholder="University, Museum, Library"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Inquiry Type</label>
                <select
                  value={inquiryType}
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-full box-border"
                >
                  <option value="general">General Inquiry</option>
                  <option value="bulk-order">Bulk Order (5+ books)</option>
                  <option value="research-collaboration">Research Collaboration</option>
                  <option value="guest-lecture">Guest Lecture Request</option>
                  <option value="citation-permission">Citation Permission</option>
                  <option value="custom-research">Custom Research Request</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={4}
                  className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 max-w-full box-border"
                  placeholder="Please describe your inquiry, research needs, or how we can help your institution..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#2a384a] text-white py-2 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
              >
                Send Inquiry to Charles
              </button>

              <p className="text-xs text-gray-500 text-center">
                Your inquiry will open in your email client. Charles typically responds within 24 hours.
              </p>
            </form>
          </div>
        </>
      )}
    </>
  );
}
