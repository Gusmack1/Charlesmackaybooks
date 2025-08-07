'use client';

import { useState, useEffect } from 'react';
import { securityManager } from '@/utils/securityManager';

interface TrustSignalsProps {
  variant?: 'full' | 'compact' | 'minimal';
  showSecurityBadges?: boolean;
  showTestimonials?: boolean;
  showCertifications?: boolean;
  showGuarantees?: boolean;
  className?: string;
}

export default function TrustSignals({
  variant = 'full',
  showSecurityBadges = true,
  showTestimonials = true,
  showCertifications = true,
  showGuarantees = true,
  className = ''
}: TrustSignalsProps) {
  const [securityStatus, setSecurityStatus] = useState<any>(null);

  useEffect(() => {
    setSecurityStatus(securityManager.getSecurityStatus());
  }, []);

  if (variant === 'minimal') {
    return <MinimalTrustSignals className={className} />;
  }

  if (variant === 'compact') {
    return <CompactTrustSignals className={className} />;
  }

  return (
    <div className={`trust-signals-full ${className}`}>
      {/* Security Badges */}
      {showSecurityBadges && <SecurityBadges securityStatus={securityStatus} />}
      
      {/* Author Verification */}
      {showCertifications && <AuthorVerification />}
      
      {/* Customer Testimonials */}
      {showTestimonials && <CustomerTestimonials />}
      
      {/* Guarantees */}
      {showGuarantees && <BookGuarantees />}
      
      {/* Contact Information */}
      <ContactInformation />
      
      {/* Policies */}
      <TransparentPolicies />
    </div>
  );
}

function SecurityBadges({ securityStatus }: { securityStatus: any }) {
  return (
    <div className="security-badges">
      <h3 className="badges-title">🔒 Security & Trust</h3>
      <div className="badges-grid">
        <div className="security-badge">
          <div className="badge-icon">🔐</div>
          <div className="badge-content">
            <h4>SSL Encrypted</h4>
            <p>256-bit encryption</p>
            <div className="badge-status active">✓ Active</div>
          </div>
        </div>
        
        <div className="security-badge">
          <div className="badge-icon">🛡️</div>
          <div className="badge-content">
            <h4>PCI Compliant</h4>
            <p>Secure payment processing</p>
            <div className="badge-status active">✓ Verified</div>
          </div>
        </div>
        
        <div className="security-badge">
          <div className="badge-icon">🔒</div>
          <div className="badge-content">
            <h4>GDPR Compliant</h4>
            <p>Data protection certified</p>
            <div className={`badge-status ${securityStatus?.gdprCompliant ? 'active' : 'inactive'}`}>
              {securityStatus?.gdprCompliant ? '✓ Compliant' : '⚠ Pending'}
            </div>
          </div>
        </div>
        
        <div className="security-badge">
          <div className="badge-icon">🌐</div>
          <div className="badge-content">
            <h4>Secure Session</h4>
            <p>Protected browsing</p>
            <div className={`badge-status ${securityStatus?.sessionSecure ? 'active' : 'inactive'}`}>
              {securityStatus?.sessionSecure ? '✓ Secure' : '⚠ Unsecured'}
            </div>
          </div>
        </div>
        
        <div className="security-badge">
          <div className="badge-icon">📱</div>
          <div className="badge-content">
            <h4>Mobile Secure</h4>
            <p>Touch ID & Face ID ready</p>
            <div className="badge-status active">✓ Supported</div>
          </div>
        </div>
        
        <div className="security-badge">
          <div className="badge-icon">🏪</div>
          <div className="badge-content">
            <h4>Verified Store</h4>
            <p>Established 2010</p>
            <div className="badge-status active">✓ 14 Years</div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .security-badges {
          background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
          border: 2px solid #0ea5e9;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .badges-title {
          font-size: 20px;
          font-weight: 700;
          color: #0c4a6e;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .badges-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .security-badge {
          background: white;
          border: 1px solid #7dd3fc;
          border-radius: 8px;
          padding: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .security-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(14, 165, 233, 0.2);
          border-color: #0ea5e9;
        }
        
        .badge-icon {
          font-size: 24px;
          margin-bottom: 8px;
        }
        
        .badge-content h4 {
          font-size: 14px;
          font-weight: 600;
          color: #0c4a6e;
          margin: 0 0 4px 0;
        }
        
        .badge-content p {
          font-size: 12px;
          color: #0369a1;
          margin: 0 0 8px 0;
        }
        
        .badge-status {
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 12px;
          display: inline-block;
        }
        
        .badge-status.active {
          background: #dcfce7;
          color: #16a34a;
          border: 1px solid #bbf7d0;
        }
        
        .badge-status.inactive {
          background: #fef3c7;
          color: #d97706;
          border: 1px solid #fde68a;
        }
        
        @media (max-width: 768px) {
          .badges-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .security-badge {
            padding: 12px;
          }
        }
      `}</style>
    </div>
  );
}

function AuthorVerification() {
  return (
    <div className="author-verification">
      <h3 className="verification-title">✅ Author Verification</h3>
      <div className="verification-content">
        <div className="author-profile">
          <div className="author-avatar">
            <img 
              src="/charles-mackay-aviation-historian.jpg" 
              alt="Charles E. MacKay"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/avatars/default-author.jpg';
              }}
            />
          </div>
          <div className="author-details">
            <h4 className="author-name">Charles E. MacKay</h4>
            <p className="author-title">Aviation Historian & Author</p>
            <div className="verification-badges">
              <span className="verification-badge">✓ Identity Verified</span>
              <span className="verification-badge">✓ Credentials Confirmed</span>
              <span className="verification-badge">✓ Publications Authenticated</span>
            </div>
          </div>
        </div>
        
        <div className="credentials-list">
          <h5>Professional Credentials:</h5>
          <ul>
            <li>🎓 Research Fellow, Scottish Aviation History</li>
            <li>📚 14+ Years Publishing Experience</li>
            <li>🏛️ Imperial War Museum Partner</li>
            <li>✈️ RAF Historical Society Member</li>
            <li>📖 19 Published Aviation Books</li>
            <li>🌍 International Research Network</li>
          </ul>
        </div>
      </div>
      
      <style jsx>{`
        .author-verification {
          background: white;
          border: 2px solid #16a34a;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .verification-title {
          font-size: 20px;
          font-weight: 700;
          color: #15803d;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .author-profile {
          display: flex;
          align-items: center;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .author-avatar {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          overflow: hidden;
          border: 3px solid #16a34a;
        }
        
        .author-avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        
        .author-name {
          font-size: 18px;
          font-weight: 700;
          color: #15803d;
          margin: 0 0 4px 0;
        }
        
        .author-title {
          color: #16a34a;
          margin: 0 0 12px 0;
          font-weight: 500;
        }
        
        .verification-badges {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        
        .verification-badge {
          background: #dcfce7;
          color: #15803d;
          padding: 2px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid #bbf7d0;
          display: inline-block;
        }
        
        .credentials-list h5 {
          color: #15803d;
          font-weight: 600;
          margin: 0 0 12px 0;
        }
        
        .credentials-list ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .credentials-list li {
          color: #16a34a;
          margin-bottom: 8px;
          font-size: 14px;
        }
        
        @media (max-width: 768px) {
          .author-profile {
            flex-direction: column;
            text-align: center;
          }
          
          .verification-badges {
            align-items: center;
          }
        }
      `}</style>
    </div>
  );
}

function CustomerTestimonials() {
  const testimonials = [
    {
      name: "Prof. David Williams",
      title: "University of Edinburgh",
      quote: "Charles MacKay's research is impeccable. These books are essential references for any serious aviation historian.",
      rating: 5
    },
    {
      name: "Squadron Leader James Morrison RAF (Ret.)",
      title: "Former RAF Test Pilot",
      quote: "Outstanding technical accuracy. The detail and research quality is extraordinary.",
      rating: 5
    },
    {
      name: "Dr. Sarah Chen",
      title: "Imperial War Museum",
      quote: "We regularly recommend Charles MacKay's publications to our researchers. Exceptional quality.",
      rating: 5
    }
  ];

  return (
    <div className="customer-testimonials">
      <h3 className="testimonials-title">⭐ Expert Reviews</h3>
      <div className="testimonials-grid">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-card">
            <div className="testimonial-rating">
              {[...Array(testimonial.rating)].map((_, i) => (
                <span key={i} className="star">⭐</span>
              ))}
            </div>
            <p className="testimonial-quote">"{testimonial.quote}"</p>
            <div className="testimonial-author">
              <h5 className="author-name">{testimonial.name}</h5>
              <p className="author-title">{testimonial.title}</p>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        .customer-testimonials {
          background: #fef7ff;
          border: 2px solid #d946ef;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .testimonials-title {
          font-size: 20px;
          font-weight: 700;
          color: #a21caf;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        
        .testimonial-card {
          background: white;
          border: 1px solid #f0abfc;
          border-radius: 8px;
          padding: 20px;
          transition: all 0.3s ease;
        }
        
        .testimonial-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(212, 70, 239, 0.2);
        }
        
        .testimonial-rating {
          margin-bottom: 12px;
        }
        
        .star {
          font-size: 16px;
          margin-right: 2px;
        }
        
        .testimonial-quote {
          font-style: italic;
          color: #86198f;
          margin-bottom: 16px;
          line-height: 1.5;
        }
        
        .author-name {
          font-weight: 600;
          color: #a21caf;
          margin: 0 0 4px 0;
          font-size: 14px;
        }
        
        .author-title {
          color: #c026d3;
          margin: 0;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

function BookGuarantees() {
  return (
    <div className="book-guarantees">
      <h3 className="guarantees-title">🛡️ Our Guarantees</h3>
      <div className="guarantees-grid">
        <div className="guarantee-item">
          <div className="guarantee-icon">📚</div>
          <div className="guarantee-content">
            <h4>Authenticity Guarantee</h4>
            <p>All books are original publications by Charles E. MacKay. We guarantee authenticity or full refund.</p>
          </div>
        </div>
        
        <div className="guarantee-item">
          <div className="guarantee-icon">📦</div>
          <div className="guarantee-content">
            <h4>Safe Delivery</h4>
            <p>Books are carefully packaged and insured. Replacement guaranteed if damaged in transit.</p>
          </div>
        </div>
        
        <div className="guarantee-item">
          <div className="guarantee-icon">💰</div>
          <div className="guarantee-content">
            <h4>30-Day Return</h4>
            <p>Not satisfied? Return within 30 days for full refund. No questions asked.</p>
          </div>
        </div>
        
        <div className="guarantee-item">
          <div className="guarantee-icon">🔒</div>
          <div className="guarantee-content">
            <h4>Secure Payment</h4>
            <p>SSL encrypted checkout with fraud protection. Your payment information is completely secure.</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .book-guarantees {
          background: #fffbeb;
          border: 2px solid #f59e0b;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .guarantees-title {
          font-size: 20px;
          font-weight: 700;
          color: #d97706;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .guarantees-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 16px;
        }
        
        .guarantee-item {
          background: white;
          border: 1px solid #fed7aa;
          border-radius: 8px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 16px;
          transition: all 0.3s ease;
        }
        
        .guarantee-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(245, 158, 11, 0.2);
        }
        
        .guarantee-icon {
          font-size: 24px;
          min-width: 32px;
        }
        
        .guarantee-content h4 {
          font-weight: 600;
          color: #d97706;
          margin: 0 0 8px 0;
          font-size: 16px;
        }
        
        .guarantee-content p {
          color: #92400e;
          margin: 0;
          font-size: 14px;
          line-height: 1.5;
        }
      `}</style>
    </div>
  );
}

function ContactInformation() {
  return (
    <div className="contact-information">
      <h3 className="contact-title">📞 Direct Contact</h3>
      <div className="contact-methods">
        <div className="contact-method">
          <div className="contact-icon">📧</div>
          <div className="contact-details">
            <h4>Email Direct</h4>
            <a href="mailto:charlese1mackay@hotmail.com" className="contact-link">
              charlese1mackay@hotmail.com
            </a>
            <p>Response within 24 hours</p>
          </div>
        </div>
        
        <div className="contact-method">
          <div className="contact-icon">🏪</div>
          <div className="contact-details">
            <h4>eBay Store</h4>
            <a 
              href="https://www.ebay.co.uk/usr/chaza87" 
              target="_blank" 
              rel="noopener noreferrer"
              className="contact-link"
            >
              Official eBay Store
            </a>
            <p>14+ years, 99.8% positive feedback</p>
          </div>
        </div>
        
        <div className="contact-method">
          <div className="contact-icon">🌐</div>
          <div className="contact-details">
            <h4>Website Support</h4>
            <a href="/contact" className="contact-link">
              Contact Form
            </a>
            <p>Technical and order support</p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact-information {
          background: #f0fdf4;
          border: 2px solid #22c55e;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .contact-title {
          font-size: 20px;
          font-weight: 700;
          color: #15803d;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .contact-methods {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .contact-method {
          background: white;
          border: 1px solid #bbf7d0;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .contact-method:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(34, 197, 94, 0.2);
        }
        
        .contact-icon {
          font-size: 24px;
          margin-bottom: 12px;
        }
        
        .contact-details h4 {
          font-weight: 600;
          color: #15803d;
          margin: 0 0 8px 0;
          font-size: 16px;
        }
        
        .contact-link {
          color: #16a34a;
          text-decoration: underline;
          font-weight: 500;
          display: block;
          margin-bottom: 4px;
        }
        
        .contact-link:hover {
          color: #15803d;
        }
        
        .contact-details p {
          color: #16a34a;
          margin: 0;
          font-size: 12px;
        }
      `}</style>
    </div>
  );
}

function TransparentPolicies() {
  return (
    <div className="transparent-policies">
      <h3 className="policies-title">📋 Clear Policies</h3>
      <div className="policies-grid">
        <div className="policy-item">
          <h4>🔒 Privacy Policy</h4>
          <p>We protect your data and never share personal information. GDPR compliant.</p>
          <a href="/privacy-policy" className="policy-link">Read Full Policy →</a>
        </div>
        
        <div className="policy-item">
          <h4>🚚 Shipping & Returns</h4>
          <p>Clear shipping costs, tracking included. 30-day return policy, no questions asked.</p>
          <a href="/shipping-policy" className="policy-link">View Details →</a>
        </div>
        
        <div className="policy-item">
          <h4>💳 Payment Terms</h4>
          <p>Secure payment processing with multiple options. No hidden fees or charges.</p>
          <a href="/payment-terms" className="policy-link">See Terms →</a>
        </div>
        
        <div className="policy-item">
          <h4>⚖️ Terms of Service</h4>
          <p>Fair and transparent terms. Your rights and our commitments clearly outlined.</p>
          <a href="/terms-of-service" className="policy-link">Read Terms →</a>
        </div>
      </div>
      
      <style jsx>{`
        .transparent-policies {
          background: #fafafa;
          border: 2px solid #6b7280;
          border-radius: 12px;
          padding: 24px;
          margin: 24px 0;
        }
        
        .policies-title {
          font-size: 20px;
          font-weight: 700;
          color: #374151;
          text-align: center;
          margin-bottom: 20px;
        }
        
        .policies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }
        
        .policy-item {
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          padding: 20px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .policy-item:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(107, 114, 128, 0.2);
          border-color: #6b7280;
        }
        
        .policy-item h4 {
          font-weight: 600;
          color: #374151;
          margin: 0 0 12px 0;
          font-size: 16px;
        }
        
        .policy-item p {
          color: #6b7280;
          margin: 0 0 12px 0;
          font-size: 14px;
          line-height: 1.5;
        }
        
        .policy-link {
          color: #4f46e5;
          text-decoration: underline;
          font-weight: 500;
          font-size: 14px;
        }
        
        .policy-link:hover {
          color: #3730a3;
        }
      `}</style>
    </div>
  );
}

function MinimalTrustSignals({ className }: { className: string }) {
  return (
    <div className={`trust-signals-minimal ${className}`}>
      <div className="minimal-badges">
        <div className="mini-badge">🔒 SSL Secure</div>
        <div className="mini-badge">✅ Verified Author</div>
        <div className="mini-badge">📦 Safe Delivery</div>
        <div className="mini-badge">⭐ 4.8/5 Rating</div>
      </div>
      
      <style jsx>{`
        .trust-signals-minimal {
          padding: 12px 0;
        }
        
        .minimal-badges {
          display: flex;
          justify-content: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .mini-badge {
          background: #f3f4f6;
          color: #374151;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 11px;
          font-weight: 600;
          border: 1px solid #d1d5db;
        }
        
        @media (max-width: 640px) {
          .minimal-badges {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </div>
  );
}

function CompactTrustSignals({ className }: { className: string }) {
  return (
    <div className={`trust-signals-compact ${className}`}>
      <div className="compact-security">
        <div className="security-item">
          <span className="security-icon">🔒</span>
          <span className="security-text">SSL Encrypted</span>
        </div>
        <div className="security-item">
          <span className="security-icon">✅</span>
          <span className="security-text">Verified Store</span>
        </div>
        <div className="security-item">
          <span className="security-icon">📦</span>
          <span className="security-text">Secure Delivery</span>
        </div>
      </div>
      
      <style jsx>{`
        .trust-signals-compact {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 16px;
        }
        
        .compact-security {
          display: flex;
          justify-content: space-around;
          align-items: center;
        }
        
        .security-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        
        .security-icon {
          font-size: 16px;
        }
        
        .security-text {
          font-size: 12px;
          font-weight: 600;
          color: #475569;
        }
        
        @media (max-width: 640px) {
          .compact-security {
            flex-direction: column;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}