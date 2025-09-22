'use client';

export default function FAQSchema() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes Charles E. MacKay's aviation books unique?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Charles E. MacKay's aviation books are based on primary source research, archival materials, and original documentation. His work is referenced by major museums including the Imperial War Museum and used by academic institutions worldwide. Each book contains rare photographs, technical specifications, and previously unpublished historical details."
        }
      },
      {
        "@type": "Question",
        "name": "Do you ship aviation books internationally?",
        "acceptedAnswer": {
          "@type": "Answer", 
          "text": "Yes, we offer free worldwide shipping on all aviation history books. We ship to the UK, Europe, United States, and internationally. Books are carefully packaged and typically arrive within 2-5 business days for UK orders and 5-10 days internationally."
        }
      },
      {
        "@type": "Question",
        "name": "Are these aviation books suitable for academic research?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Absolutely. Charles E. MacKay's aviation books are extensively cited in academic research and used by universities, museums, and research institutions. Each book includes comprehensive bibliographies, primary source references, and detailed footnotes making them ideal for scholarly research."
        }
      },
      {
        "@type": "Question",
        "name": "What aviation topics does Charles E. MacKay cover?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Charles E. MacKay specializes in Scottish aviation history, WWI and WWII aircraft development, helicopter history, naval aviation, jet age developments, and aviation biographies. His books cover specific aircraft like the Supermarine Spitfire, Hawker Hurricane, and companies like Beardmore Aviation and Clydeside Aviation."
        }
      },
      {
        "@type": "Question",
        "name": "How can I purchase Charles MacKay's aviation books?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "You can purchase aviation books directly through our website at charlesmackaybooks.com with secure checkout via Stripe or PayPal. We also sell through eBay (chaza87) and accept bank transfers for UK customers. All purchases include free shipping and a 30-day money-back guarantee."
        }
      },
      {
        "@type": "Question",
        "name": "Are there discounts available for multiple aviation books?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! We offer bulk discounts: 5% off when you buy 2 books, and 10% off when you buy 3 or more aviation books. Academic researchers and institutions can contact us for additional educational discounts."
        }
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(faqSchema)
      }}
    />
  );
}
