# 🤖 AI PROMPT TEMPLATES FOR CHARLES MACKAY BOOKS OPTIMIZATION

## 🎯 MULTI-AGENT TASK BREAKDOWN

### AGENT 1: BOOK SALES PAGE OPTIMIZER
**Task**: Create high-converting book sales pages with sticky cart and mobile optimization

```
**CONTEXT**: You are optimizing book sales pages for Charles E. MacKay's aviation history books. The site sells specialized aviation books to collectors, historians, and academics worldwide.

**REQUIREMENTS**:
1. **Sticky Cart**: "Add to Cart" and "Buy on eBay" buttons must follow user scroll
2. **Mobile-First**: Perfect mobile experience with finger-friendly buttons
3. **Social Sharing**: Top and bottom social media sharing (Facebook, Twitter, LinkedIn, Pinterest)
4. **Cross-Linking**: Link to relevant blog posts and related books
5. **Trust Signals**: Customer reviews, academic citations, institutional usage
6. **SEO Optimization**: Rich snippets, structured data, meta tags

**BOOK DATA STRUCTURE**:
```json
{
  "id": "book-slug",
  "title": "Full Book Title",
  "price": 24.99,
  "pageCount": 280,
  "isbn": "9780957344309",
  "publicationYear": 2020,
  "description": "Book description",
  "category": "Scottish Aviation History",
  "tags": ["tag1", "tag2"],
  "imageUrl": "/book-covers/book-slug.jpg"
}
```

**TEMPLATE STRUCTURE**:
1. Hero section with book cover and instant purchase
2. Book details with expandable table of contents
3. Author credentials and academic recognition
4. Related books carousel
5. Customer reviews and testimonials
6. Sticky purchase bar for mobile
7. Social sharing widgets

**OUTPUT**: React TypeScript component using Next.js 15, Tailwind CSS, and responsive design principles.
```

---

### AGENT 2: BLOG CONTENT CREATOR (2000+ WORDS)
**Task**: Create comprehensive 2000+ word aviation blog posts with expert analysis

```
**CONTEXT**: You are creating authoritative aviation history blog posts for Charles E. MacKay's website. Content must establish E-A-T (Expertise, Authoritativeness, Trustworthiness) for Google ranking.

**CONTENT REQUIREMENTS**:
1. **Word Count**: Minimum 2000 words per post
2. **Structure**: Introduction, 5-6 main sections, conclusion
3. **Expertise**: Technical details, historical context, expert analysis
4. **Sources**: Reference historical documents, official records, technical manuals
5. **Images**: High-quality historical photos (no watermarks)
6. **Readability**: Subheadings, bullet points, engaging narrative

**BLOG POST TOPICS**:
- Aircraft development history
- Battle analysis and tactical evolution
- Pilot biographies and test flights
- Technical innovations and engineering
- Industrial aviation history
- Squadron histories and operations

**CONTENT STRUCTURE**:
1. **Hook**: Compelling opening fact or story
2. **Introduction**: Context and significance (300 words)
3. **Historical Background**: Origins and development (400 words)
4. **Technical Analysis**: Specifications and innovations (400 words)
5. **Operational History**: Service record and combat (400 words)
6. **Key Figures**: Important people and decisions (300 words)
7. **Legacy and Impact**: Modern relevance (300 words)
8. **Conclusion**: Summary and further reading

**SEO INTEGRATION**:
- Primary keyword in title and first paragraph
- Related keywords naturally distributed
- Meta description optimized for click-through
- Internal links to relevant books and articles

**OUTPUT**: Complete blog post content with HTML formatting, meta tags, and structured data.
```

---

### AGENT 3: IMAGE CURATOR & COPYRIGHT SPECIALIST
**Task**: Source high-quality aviation images without copyright violations

```
**CONTEXT**: You are curating images for Charles E. MacKay's aviation website. All images must be copyright-free or properly licensed.

**IMAGE REQUIREMENTS**:
1. **Quality**: High-resolution (minimum 1200x800px)
2. **Copyright**: Public domain, Creative Commons, or licensed
3. **No Watermarks**: Absolutely no Alamy, Getty Images, or stock photo watermarks
4. **Relevance**: Must directly relate to the specific aircraft/topic
5. **Historical Accuracy**: Period-appropriate photographs and illustrations

**FORBIDDEN SOURCES**:
- Alamy watermarked images
- Getty Images watermarked content
- Shutterstock watermarked photos
- Any image with visible copyright text overlays

**APPROVED SOURCES**:
1. **Wikimedia Commons**: Public domain aviation photos
2. **Library of Congress**: Historical aviation collection
3. **National Archives**: Government aviation records
4. **Imperial War Museum**: Licensed historical photos
5. **NASA Image Gallery**: Space and aviation content
6. **RAF Museum**: Licensed aircraft photos
7. **Fleet Air Arm Museum**: Naval aviation content

**IMAGE CATEGORIES NEEDED**:
- Aircraft in flight or on ground
- Historical personalities (pilots, designers)
- Technical diagrams and cutaways
- Factory and production scenes
- Military formations and squadrons
- Cockpit and interior details

**NAMING CONVENTION**:
`aircraft-name-action-description.jpg`
Examples:
- `hawker-hurricane-battle-britain-flight.jpg`
- `sopwith-camel-wwi-dogfight.jpg`
- `me262-luftwaffe-formation.jpg`

**OUTPUT**: List of approved image URLs with captions, alt text, and copyright status.
```

---

### AGENT 4: SOCIAL MEDIA & SHARING INTEGRATION
**Task**: Implement comprehensive social sharing and engagement features

```
**CONTEXT**: You are adding social media integration to Charles E. MacKay's aviation website to increase engagement and book sales.

**SOCIAL SHARING REQUIREMENTS**:
1. **Placement**: Top and bottom of every blog post and book page
2. **Platforms**: Facebook, Twitter, LinkedIn, Pinterest, Reddit, Email
3. **Mobile Optimization**: Touch-friendly buttons with proper spacing
4. **Share Counts**: Display share numbers when available
5. **Custom Messages**: Tailored sharing text for each platform

**SHARING BUTTON SPECIFICATIONS**:
- **Size**: 44px minimum for mobile touch targets
- **Spacing**: 12px between buttons
- **Style**: Consistent with site design (aviation theme)
- **Loading**: Lazy load social widgets for performance
- **Accessibility**: Proper ARIA labels and keyboard navigation

**PLATFORM-SPECIFIC CONTENT**:

**Facebook Sharing**:
```
"Fascinating aviation history: [TITLE] by Charles E. MacKay - [EXCERPT] 
#AviationHistory #WWI #WWII #BookLovers"
```

**Twitter Sharing**:
```
"✈️ [TITLE] by @CharlesMacKay - Expert analysis of [TOPIC] 
#AviationHistory #Military #Books
[URL]"
```

**LinkedIn Sharing**:
```
"Professional aviation history resource: [TITLE] - Essential reading for aerospace professionals and military historians.
[URL]"
```

**Pinterest Sharing**:
```
"[TITLE] - Comprehensive aviation history with rare photographs and expert analysis by Charles E. MacKay"
```

**INTEGRATION COMPONENTS**:
1. Social sharing buttons component
2. Open Graph meta tags
3. Twitter Card implementation
4. Pinterest Rich Pins setup
5. Social media analytics tracking

**OUTPUT**: React components with platform APIs, tracking, and responsive design.
```

---

### AGENT 5: MOBILE-FIRST RESPONSIVE DESIGNER
**Task**: Ensure perfect mobile experience across all pages

```
**CONTEXT**: You are optimizing Charles E. MacKay's aviation website for mobile devices, ensuring excellent user experience on phones and tablets.

**MOBILE OPTIMIZATION REQUIREMENTS**:
1. **Touch Targets**: Minimum 44px for all interactive elements
2. **Reading Experience**: Optimal text size and line spacing
3. **Navigation**: Easy thumb navigation and scrolling
4. **Performance**: Fast loading on mobile networks
5. **Sticky Elements**: Cart, sharing, and navigation persistence

**RESPONSIVE BREAKPOINTS**:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px  
- **Desktop**: 1024px+

**MOBILE-SPECIFIC FEATURES**:

**Sticky Purchase Bar** (Books):
```css
.sticky-purchase-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 50;
}
```

**Mobile Reading Optimization** (Blog):
```css
.mobile-content {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 24px;
  padding: 0 16px;
}

.mobile-headings {
  font-size: 24px;
  font-weight: 700;
  margin: 32px 0 16px 0;
  line-height: 1.3;
}
```

**Touch-Friendly Navigation**:
- Hamburger menu with slide-out drawer
- Large tap targets for categories
- Swipe gestures for image galleries
- Pull-to-refresh functionality

**PERFORMANCE OPTIMIZATION**:
1. **Image Lazy Loading**: Load images as user scrolls
2. **Critical CSS**: Inline above-the-fold styles
3. **Font Loading**: Optimize web font delivery
4. **JavaScript Splitting**: Load features on demand
5. **Service Worker**: Cache strategy for offline access

**TESTING CHECKLIST**:
- [ ] All buttons easily tappable with thumb
- [ ] Text readable without zooming
- [ ] Images properly sized and optimized
- [ ] Forms easy to complete on mobile
- [ ] Purchase flow works seamlessly
- [ ] Social sharing buttons functional
- [ ] Page loads under 3 seconds on 3G

**OUTPUT**: CSS classes, React components, and implementation guide for mobile optimization.
```

---

### AGENT 6: CROSS-LINKING & SEO SPECIALIST
**Task**: Create intelligent internal linking and SEO optimization

```
**CONTEXT**: You are optimizing Charles E. MacKay's aviation website for search engines and user navigation through strategic internal linking.

**SEO REQUIREMENTS**:
1. **Keyword Research**: Target aviation history long-tail keywords
2. **Internal Linking**: Connect related books and blog posts
3. **Structured Data**: Rich snippets for books and articles
4. **Site Architecture**: Logical navigation and URL structure
5. **Page Speed**: Core Web Vitals optimization

**KEYWORD STRATEGY**:
**Primary Keywords** (High Competition):
- "aviation history books"
- "WWI aircraft"
- "WWII fighters"
- "military aviation"

**Long-Tail Keywords** (Target These):
- "hawker hurricane battle of britain history"
- "sopwith camel wwi fighter development"
- "scottish aviation industrial heritage"
- "charles mackay aviation historian books"
- "beardmore aviation scottish manufacturing"

**INTERNAL LINKING RULES**:
1. **Book to Blog**: Every book page links to 3-5 relevant blog posts
2. **Blog to Book**: Every blog post promotes 2-3 related books
3. **Topic Clustering**: Group related content by aircraft type/era
4. **Anchor Text Variation**: Use natural, descriptive link text
5. **Link Equity Distribution**: Spread authority to all important pages

**LINKING EXAMPLES**:
```html
<!-- From Hawker Hurricane book page -->
<a href="/blog/hawker-hurricane-fighter-development" 
   title="Read our detailed analysis of Hurricane development">
   Discover the complete Hurricane development story →
</a>

<!-- From Hurricane blog post -->
<a href="/books/british-aircraft-great-war" 
   title="British Aircraft of the Great War by Charles E. MacKay">
   Learn more in our comprehensive book on British WWI aircraft
</a>
```

**STRUCTURED DATA TEMPLATES**:

**Book Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "Book Title",
  "author": {
    "@type": "Person",
    "name": "Charles E. MacKay"
  },
  "offers": {
    "@type": "Offer",
    "price": "24.99",
    "priceCurrency": "GBP"
  }
}
```

**Article Schema**:
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "author": {
    "@type": "Person",
    "name": "Charles E. MacKay"
  },
  "datePublished": "2025-01-30"
}
```

**CONTENT CLUSTERS**:
1. **WWI Aviation**: Sopwith Camel, Bristol Fighter, Beardmore Aviation
2. **WWII Fighters**: Hurricane, Spitfire, Me 262, F-86 Sabre
3. **Scottish Aviation**: Beardmore, Clydeside, Industrial Heritage
4. **Jet Age**: Lightning, F-86, Korean War, Cold War Aviation
5. **Naval Aviation**: HMS Argus, Carrier Operations, Fleet Air Arm

**OUTPUT**: Internal linking strategy, keyword mapping, and SEO implementation guide.
```

---

## 🚀 IMPLEMENTATION ORDER

### Phase 1: Foundation (Agents 3 & 5)
1. **Image Curation**: Source copyright-free aviation images
2. **Mobile Optimization**: Implement responsive framework

### Phase 2: Content Creation (Agents 1 & 2)  
1. **Book Templates**: High-converting sales pages
2. **Blog Content**: 2000+ word comprehensive articles

### Phase 3: Engagement (Agents 4 & 6)
1. **Social Integration**: Sharing and engagement features  
2. **SEO Optimization**: Internal linking and search optimization

### Phase 4: Testing & Launch
1. **Mobile Testing**: All devices and browsers
2. **Performance Audit**: PageSpeed and Core Web Vitals
3. **SEO Verification**: Search Console and rich results

---

## 📊 SUCCESS METRICS

**Book Sales Pages**:
- [ ] Mobile conversion rate >3%
- [ ] Average time on page >3 minutes
- [ ] Bounce rate <40%
- [ ] Add to cart rate >8%

**Blog Posts**:
- [ ] Average time on page >5 minutes
- [ ] Pages per session >2.5
- [ ] Social shares >50 per post
- [ ] Book referral rate >5%

**Technical Performance**:
- [ ] Core Web Vitals: All green
- [ ] Mobile PageSpeed >90
- [ ] Desktop PageSpeed >95
- [ ] Google Search visibility improved

**SEO Results**:
- [ ] 100+ keywords ranking top 10
- [ ] Organic traffic +200%
- [ ] Book sales from organic +150%
- [ ] Featured snippets captured >20

Use these prompts with AI agents to achieve comprehensive website optimization!