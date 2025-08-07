'use client'

import React from 'react'

interface BookFAQProps {
  title?: string
}

export default function BookFAQ({ title = 'Frequently Asked Questions' }: BookFAQProps) {
  const faqs = [
    { q: 'Is shipping really free?', a: 'Yes. We offer FREE worldwide shipping with tracking on all orders.' },
    { q: 'How long does delivery take?', a: 'UK 2–5 business days; EU 5–10; USA/International 7–14, depending on customs.' },
    { q: 'What is your returns policy?', a: '30-day returns. If your book arrives damaged or not as described, we replace or refund.' },
    { q: 'Can I order signed copies or bulk for universities?', a: 'Yes. Contact us for signed copies, purchase orders, and bulk pricing for institutions.' },
  ]
  return (
    <div className="card">
      <h3 className="content h3 mb-3">{title}</h3>
      <div className="space-y-3">
        {faqs.map(({ q, a }) => (
          <div key={q}>
            <div className="font-semibold text-primary">{q}</div>
            <div className="text-secondary text-sm">{a}</div>
          </div>
        ))}
      </div>
    </div>
  )
}


