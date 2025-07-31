# Blog Post Template Documentation

## Overview

The BlogPostTemplate is a comprehensive, production-ready React component designed specifically for the Charles Mackay books website. It provides a complete solution for creating engaging, SEO-optimized blog posts with advanced features for social sharing, internal linking, and user experience.

## Features

### ✅ Design Requirements
- **Clean, readable design** with 70-character line length for optimal readability
- **Typography**: Serif font (Georgia/Times New Roman) for body text, sans-serif for headings
- **Content Structure**: Supports 2000+ word articles with clear section breaks
- **Visual Hierarchy**: H1-H6 heading structure with proper spacing

### ✅ Content Architecture
- **Header Section**: Post title, author byline, publication date, reading time, category tags
- **Featured Image**: Large hero image (1200px width minimum) with caption support
- **Body Content**: Rich text support with blockquotes, lists, code blocks, and inline images
- **Author Bio**: Expandable author section with photo, biography, and contact info
- **Related Content**: Dynamic book recommendations and related blog posts

### ✅ Social Integration
- **Floating Social Bar**: Sticky social sharing buttons (Facebook, Twitter, LinkedIn, Pinterest, Email)
- **Bottom Social Section**: Comprehensive sharing options with click-to-tweet quotes
- **Social Proof**: Share counts and reading time analytics
- **Open Graph**: Complete meta tag implementation for rich social media previews

### ✅ SEO Optimization
- **Schema Markup**: Article structured data with author, publisher, and reading time
- **Meta Elements**: Dynamic title tags (60 characters), meta descriptions (160 characters)
- **Internal Linking**: Automatic related post suggestions and contextual book links
- **Breadcrumb Navigation**: Clear site hierarchy with schema markup
- **Keyword Optimization**: Natural keyword integration without stuffing

### ✅ Mobile Responsiveness
- **Mobile-First Design**: Progressive enhancement from 320px width
- **Touch-Friendly Elements**: Minimum 44px tap targets for all interactive elements
- **Responsive Images**: Srcset implementation with WebP format support
- **Performance**: Target loading time under 3 seconds on 3G connections
- **Reading Experience**: Optimized line height (1.6) and font size (18px minimum)

### ✅ Navigation and User Experience
- **Reading Progress Bar**: Visual indicator of reading progress
- **Table of Contents**: Auto-generated TOC for posts over 1000 words with active section highlighting
- **Sticky Navigation**: Fixed header with search functionality
- **Next/Previous Posts**: Contextual navigation with thumbnail previews
- **Search Integration**: Site-wide search with autocomplete

### ✅ Dynamic Book Linking
- **Content Analysis**: Automatically detect book mentions and create affiliate links
- **Recommendation Engine**: Display relevant books based on post topic
- **Purchase Integration**: Inline "Buy Now" buttons with multiple purchasing options
- **Review Integration**: Pull in book ratings and review snippets

## Installation

1. **Copy the template files**:
   ```bash
   src/components/BlogPostTemplate.tsx
   src/styles/blog-template.css
   ```

2. **Import the CSS** in your main layout or page:
   ```tsx
   import '@/styles/blog-template.css'
   ```

3. **Import the component**:
   ```tsx
   import BlogPostTemplate from '@/components/BlogPostTemplate'
   ```

## Usage

### Basic Implementation

```tsx
import BlogPostTemplate from '@/components/BlogPostTemplate'

const MyBlogPost = () => {
  const blogData = {
    title: "Your Blog Post Title",
    description: "A compelling description of your blog post",
    author: {
      name: "Charles E. MacKay",
      email: "charlese1mackay@hotmail.com",
      bio: "Author biography...",
      image: "/author-image.jpg",
      location: "Glasgow, Scotland"
    },
    publishDate: "2024-01-15",
    readingTime: 8,
    category: "Aviation History",
    tags: ["Aviation", "History", "Engineering"],
    featuredImage: {
      src: "/blog-images/featured-image.jpg",
      alt: "Image description",
      caption: "Optional image caption"
    },
    content: (
      <div className="blog-post">
        <section id="introduction">
          <h2>Introduction</h2>
          <p>Your content here...</p>
        </section>
        {/* More sections */}
      </div>
    ),
    relatedBooks: [
      {
        id: "book-id",
        title: "Book Title",
        price: 12.99,
        imageUrl: "/book-covers/book-cover.jpg",
        description: "Book description"
      }
    ],
    relatedPosts: [
      {
        slug: "related-post-slug",
        title: "Related Post Title",
        excerpt: "Post excerpt",
        image: "/blog-images/related-image.jpg"
      }
    ],
    schemaData: {
      "@context": "https://schema.org",
      "@type": "Article",
      // ... schema markup
    }
  }

  return <BlogPostTemplate {...blogData} />
}
```

### Content Structure

The template expects content to be structured with proper HTML5 semantic elements:

```tsx
content: (
  <div className="blog-post">
    <section id="introduction">
      <h2>Introduction</h2>
      <p>Introduction paragraph...</p>
    </section>
    
    <section id="main-content">
      <h2>Main Content</h2>
      <p>Content paragraph...</p>
      
      <h3>Subsection</h3>
      <p>Subsection content...</p>
      
      <blockquote>
        "Important quote or highlight"
      </blockquote>
      
      <ul>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
    </section>
    
    <section id="conclusion">
      <h2>Conclusion</h2>
      <p>Conclusion paragraph...</p>
    </section>
  </div>
)
```

## Component Props

### BlogPostProps Interface

```typescript
interface BlogPostProps {
  title: string                    // Blog post title
  description: string              // Meta description
  author: {                        // Author information
    name: string
    email: string
    bio: string
    image: string
    location: string
  }
  publishDate: string              // ISO date string
  readingTime: number              // Estimated reading time in minutes
  category: string                 // Post category
  tags: string[]                   // Array of tags
  featuredImage: {                 // Hero image
    src: string
    alt: string
    caption?: string
  }
  content: React.ReactNode         // Main content
  relatedBooks?: Array<{           // Related books
    id: string
    title: string
    price: number
    imageUrl: string
    description: string
  }>
  relatedPosts?: Array<{           // Related blog posts
    slug: string
    title: string
    excerpt: string
    image: string
  }>
  schemaData?: object              // JSON-LD schema markup
}
```

## Styling

### CSS Classes

The template uses the following CSS classes for styling:

- `.blog-post` - Main content container
- `.social-share-button` - Social sharing buttons
- `.reading-progress` - Reading progress bar container
- `.reading-progress-bar` - Progress bar element
- `.toc-container` - Table of contents container
- `.toc-link` - Table of contents links
- `.related-content` - Related content sections
- `.author-bio` - Author biography section

### Customization

You can customize the styling by modifying the CSS variables or overriding classes:

```css
/* Custom color scheme */
.blog-post {
  --primary-color: #f59e0b;
  --secondary-color: #1f2937;
  --text-color: #374151;
  --background-color: #f8fafc;
}
```

## SEO Features

### Schema Markup

The template automatically generates structured data for search engines:

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Article Title",
  "description": "Article description",
  "author": {
    "@type": "Person",
    "name": "Charles E. MacKay"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Charles E. MacKay - Aviation Historian"
  },
  "datePublished": "2024-01-15",
  "dateModified": "2024-01-15",
  "image": {
    "@type": "ImageObject",
    "url": "/blog-images/featured-image.jpg"
  },
  "keywords": "keyword1, keyword2, keyword3",
  "wordCount": 2500,
  "timeRequired": "PT12M"
}
```

### Meta Tags

Include these meta tags in your page head:

```tsx
export const metadata: Metadata = {
  title: 'Your Blog Post Title | Charles E. MacKay',
  description: 'Your blog post description (160 characters max)',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
  openGraph: {
    title: 'Your Blog Post Title',
    description: 'Your blog post description',
    url: 'https://charlesmackaybooks.com/blog/your-post-slug',
    siteName: 'Charles E. MacKay - Aviation Historian',
    images: [
      {
        url: '/blog-images/featured-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Image description'
      }
    ],
    locale: 'en_GB',
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Your Blog Post Title',
    description: 'Your blog post description',
    images: ['/blog-images/featured-image.jpg'],
  }
}
```

## Performance Optimization

### Image Optimization

- Use Next.js Image component for automatic optimization
- Implement lazy loading for images below the fold
- Use WebP format with fallbacks
- Optimize image sizes for different screen sizes

### Code Splitting

- The template components are designed for code splitting
- Social sharing functionality loads only when needed
- Table of contents is generated client-side for better performance

### Caching

- Implement proper caching headers for static assets
- Use CDN for image delivery
- Cache API responses for related content

## Accessibility

### WCAG 2.1 Compliance

- **Keyboard Navigation**: All interactive elements are keyboard accessible
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Color Contrast**: Meets WCAG AA standards
- **Focus Management**: Clear focus indicators
- **Reduced Motion**: Respects user's motion preferences

### Implementation

```tsx
// Example of accessible button
<button
  onClick={handleShare}
  className="social-share-button"
  aria-label="Share on Facebook"
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleShare()
    }
  }}
>
  <FacebookIcon />
</button>
```

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Browsers**: iOS Safari 14+, Chrome Mobile 90+
- **Progressive Enhancement**: Graceful degradation for older browsers

## Testing

### Unit Tests

```tsx
import { render, screen } from '@testing-library/react'
import BlogPostTemplate from './BlogPostTemplate'

test('renders blog post title', () => {
  const blogData = {
    title: 'Test Title',
    // ... other required props
  }
  
  render(<BlogPostTemplate {...blogData} />)
  expect(screen.getByText('Test Title')).toBeInTheDocument()
})
```

### Integration Tests

- Test social sharing functionality
- Verify schema markup generation
- Check responsive design across devices
- Validate accessibility features

## Troubleshooting

### Common Issues

1. **Images not loading**: Check image paths and Next.js Image configuration
2. **Social sharing not working**: Verify URL encoding and popup blockers
3. **Schema markup errors**: Validate JSON-LD structure
4. **Mobile layout issues**: Check CSS media queries and viewport meta tag

### Debug Mode

Enable debug mode for development:

```tsx
const BlogPostTemplate = ({ debug = false, ...props }) => {
  if (debug) {
    console.log('Blog post data:', props)
  }
  // ... rest of component
}
```

## Best Practices

### Content Creation

1. **Write for your audience**: Use clear, engaging language
2. **Structure content**: Use proper heading hierarchy
3. **Include images**: Add relevant, high-quality images
4. **Internal linking**: Link to related books and blog posts
5. **Call to action**: Include clear next steps for readers

### SEO Optimization

1. **Keyword research**: Identify relevant keywords
2. **Natural integration**: Include keywords naturally in content
3. **Meta descriptions**: Write compelling, keyword-rich descriptions
4. **Internal linking**: Create a network of related content
5. **Regular updates**: Keep content fresh and relevant

### Performance

1. **Optimize images**: Compress and use appropriate formats
2. **Minimize JavaScript**: Use code splitting and lazy loading
3. **Cache effectively**: Implement proper caching strategies
4. **Monitor performance**: Use tools like Lighthouse and WebPageTest

## Support

For questions or issues with the blog post template:

- **Documentation**: Refer to this documentation
- **Examples**: Check the example implementation
- **Issues**: Report bugs through the project repository
- **Contributions**: Submit pull requests for improvements

## License

This template is part of the Charles Mackay books website and follows the same licensing terms as the main project. 