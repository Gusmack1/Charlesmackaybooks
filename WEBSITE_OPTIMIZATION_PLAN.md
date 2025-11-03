# Website Optimization Plan - Charles Mackay Books

## Executive Summary
This document outlines SEO optimizations, broken image management, and design improvements for charlesmackaybooks.com.

---

## 1. SEO ISSUES IDENTIFIED

### Critical Issues:
1. **109 Pages Not Indexed** (vs 94 indexed)
   - Action: Review and fix indexing issues
   - Priority: HIGH
   - Potential causes: canonical tags, robots.txt, sitemap issues

2. **Low Search Performance**
   - Only 83 total web search clicks in period
   - Need to improve content optimization and internal linking

3. **Page Performance Insights**
   - HMS Argus page showing 236% impression increase - investigate why
   - Use this as template for other pages

### SEO Recommendations:
- Submit updated sitemap to Google Search Console
- Review robots.txt for over-blocking
- Add canonical tags to prevent duplicate content
- Improve internal linking structure
- Add schema markup for blog posts
- Ensure all blog posts have proper meta descriptions
- Add alt text to all images

---

## 2. BROKEN IMAGES ANALYSIS

### Current Image System:
- Images stored in `/public/blog-images/`
- Blog posts reference images with paths like `/blog-images/sopwith-camel-historical-1918.jpg`
- Image approval system exists in `approvedImageResolver.ts`
- Fallback SVG system in place for missing images

### Systematic Image Removal Plan:

#### Phase 1: Detection
Create script to:
1. Scan all blog post files (`src/app/blog/*/page.tsx`)
2. Extract all image URLs from content
3. Check if files exist in `public/blog-images/`
4. Generate report of broken images

#### Phase 2: Removal
Automated script to:
1. Remove broken image references from blog post HTML
2. Clean up orphaned image files
3. Update image manifest
4. Log all changes for review

#### Phase 3: Replacement
- Use existing `refresh-blog-images.cjs` script to fetch new images
- Maintain minimum 4 images per post (as per current template requirement)
- Ensure all images have proper alt text and captions

### Script Location:
Create: `scripts/audit-and-remove-broken-images.js`

---

## 3. DESIGN IMPROVEMENTS - Dark Blue Theme

### Color Scheme:
- **Background**: Dark blue (#1e3a8a - Tailwind blue-900 or similar)
- **Text**: White (#ffffff)
- **Accents**: Lighter blue for links/hover states

### Implementation Plan:

#### Step 1: Update CSS Variables (`globals.css`)
```css
:root {
  --color-bg-primary: #1e3a8a; /* Dark blue */
  --color-text-primary: #ffffff; /* White */
  --color-text-secondary: #e5e7eb; /* Light gray for secondary text */
}
```

#### Step 2: Update Tailwind Config
- Ensure dark blue colors are available
- Update default background colors

#### Step 3: Update Components
- Modify all page templates to use dark background
- Ensure text contrast is sufficient (WCAG AA compliance)
- Update header/footer to match theme
- Update blog post templates
- Update book pages

#### Step 4: Test
- Test all pages for readability
- Ensure links are visible
- Check mobile responsiveness
- Verify accessibility (contrast ratios)

---

## 4. IMPLEMENTATION PRIORITY

### Phase 1 (Urgent - Week 1):
1. ✅ Create broken image detection script
2. ✅ Update CSS for dark blue theme
3. ✅ Test homepage and blog listing page

### Phase 2 (Week 2):
1. ✅ Fix broken images systematically
2. ✅ Update all blog post templates
3. ✅ Update book pages
4. ✅ Submit sitemap to Google Search Console

### Phase 3 (Week 3):
1. ✅ Review and fix indexing issues
2. ✅ Improve internal linking
3. ✅ Add schema markup
4. ✅ Final testing and optimization

---

## 5. FILES TO MODIFY

### CSS/Styling:
- `src/app/globals.css` - Main color scheme
- `tailwind.config.ts` - Theme configuration

### Components:
- `src/components/ComprehensiveBlogTemplate.tsx`
- `src/components/BlogPostTemplate.tsx`
- `src/components/OptimizedBlogTemplate.tsx`
- All page templates in `src/app/`

### Scripts:
- Create `scripts/audit-and-remove-broken-images.js`
- Update `scripts/refresh-blog-images.cjs` if needed

---

## 6. TESTING CHECKLIST

- [ ] All pages load with dark blue background
- [ ] All text is readable (white/gray)
- [ ] Links are visible and functional
- [ ] Images display correctly
- [ ] Mobile responsive
- [ ] Accessibility (contrast ratios)
- [ ] No broken images
- [ ] SEO meta tags present
- [ ] Schema markup valid

---

## 7. NOTES

- Maintain existing functionality while applying theme
- Ensure all existing CSS rules continue to work
- Keep image fallback system intact
- Preserve accessibility features

