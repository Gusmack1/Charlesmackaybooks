import fs from 'fs';
import path from 'path';

// 1. Fix the main page heading color
function fixMainPageHeading() {
  const mainPagePath = 'src/app/page.tsx';
  
  if (fs.existsSync(mainPagePath)) {
    console.log('Fixing main page heading color...');
    
    let content = fs.readFileSync(mainPagePath, 'utf8');
    let modified = false;
    
    // Fix the heading color from default to a modern blue
    const headingFix = /<h2 className="text-3xl font-bold mb-4">/g;
    if (headingFix.test(content)) {
      content = content.replace(headingFix, '<h2 className="text-3xl font-bold mb-4 text-blue-800">');
      modified = true;
      console.log('  - Updated main page heading color to modern blue');
    }
    
    if (modified) {
      fs.writeFileSync(mainPagePath, content, 'utf8');
      console.log('  ✓ Updated main page');
    }
  }
}

// 2. Update global CSS with modern fonts and styling
function updateGlobalCSS() {
  const globalCSSPath = 'src/app/globals.css';
  
  if (fs.existsSync(globalCSSPath)) {
    console.log('Updating global CSS with modern fonts and styling...');
    
    let content = fs.readFileSync(globalCSSPath, 'utf8');
    
    // Add modern font configuration and improved styling
    const modernStyling = `
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Import mobile-first responsive styles */
@import '../styles/mobile-first-responsive.css';

@layer base {
  body {
    font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    line-height: 1.6;
    color: #1f2937;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', 'Crimson Text', serif;
    font-weight: 600;
    line-height: 1.3;
    color: #1f2937;
  }

  /* Modern paragraph styling */
  p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    color: #374151;
  }

  /* Enhanced link styling */
  a {
    color: #2563eb;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }

  /* Modern button styling */
  button {
    font-family: 'Inter', sans-serif;
  }
}

@layer components {
  /* Modern card styling */
  .modern-card {
    background: white;
    border-radius: 12px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.3s ease;
  }

  .modern-card:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }

  /* Enhanced blog content styling */
  .blog-content {
    font-family: 'Inter', sans-serif;
    line-height: 1.7;
    color: #374151;
  }

  .blog-content h1,
  .blog-content h2,
  .blog-content h3,
  .blog-content h4,
  .blog-content h5,
  .blog-content h6 {
    font-family: 'Playfair Display', serif;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: #1f2937;
  }

  .blog-content h2 {
    font-size: 1.875rem;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }

  .blog-content h3 {
    font-size: 1.5rem;
    color: #374151;
  }

  .blog-content p {
    margin-bottom: 1.5rem;
    line-height: 1.7;
    color: #374151;
    font-size: 1.125rem;
  }

  /* Highlighted paragraphs for better readability */
  .blog-content p:not(:first-child) {
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    padding: 1.5rem;
    border-radius: 8px;
    border-left: 4px solid #3b82f6;
    margin: 1.5rem 0;
  }

  .blog-content blockquote {
    background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
    border-left: 4px solid #f59e0b;
    padding: 1.5rem;
    margin: 2rem 0;
    border-radius: 8px;
    font-style: italic;
    font-size: 1.125rem;
    color: #92400e;
  }

  .blog-content ul,
  .blog-content ol {
    margin: 1.5rem 0;
    padding-left: 1.5rem;
  }

  .blog-content li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
    color: #374151;
  }

  .blog-content img {
    border-radius: 12px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    margin: 2rem 0;
  }

  /* Modern prose styling */
  .prose {
    color: #374151;
  }

  .prose h1,
  .prose h2,
  .prose h3,
  .prose h4,
  .prose h5,
  .prose h6 {
    color: #1f2937;
    font-family: 'Playfair Display', serif;
  }

  .prose p {
    color: #374151;
    line-height: 1.7;
  }

  .prose strong {
    color: #1f2937;
    font-weight: 600;
  }

  .prose a {
    color: #2563eb;
    text-decoration: none;
    font-weight: 500;
  }

  .prose a:hover {
    color: #1d4ed8;
    text-decoration: underline;
  }
}

@layer utilities {
  .line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .line-clamp-3 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .line-clamp-4 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 4;
  }

  .line-clamp-5 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 5;
  }

  /* Modern loading spinner */
  .loading-spinner {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spinner {
    width: 24px;
    height: 24px;
    border: 2px solid #e5e7eb;
    border-top: 2px solid #3b82f6;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Modern responsive image transitions */
  .responsive-image {
    transition: opacity 0.3s ease-in-out;
  }

  .responsive-image.loaded {
    opacity: 1;
  }

  /* Modern mobile menu animations */
  .nav-mobile {
    transition: transform 0.3s ease-in-out;
  }

  .nav-mobile.active {
    transform: translateX(0);
  }

  /* Modern skip link focus styles */
  .skip-link:focus {
    top: 6px;
  }
}

/* Modern Hero Section Improvements */
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%);
  z-index: 1;
}

.hero-section > * {
  position: relative;
  z-index: 2;
}

/* Modern text readability in hero sections */
.hero-section h1,
.hero-section h2,
.hero-section h3,
.hero-section h4,
.hero-section h5,
.hero-section h6 {
  text-shadow: 0 2px 4px rgba(0,0,0,0.5);
  font-family: 'Playfair Display', serif;
}

.hero-section p {
  text-shadow: 0 1px 2px rgba(0,0,0,0.5);
  font-family: 'Inter', sans-serif;
}

/* Modern enhanced button styling */
.hero-section .btn-primary {
  background: linear-gradient(135deg, #059669 0%, #047857 100%);
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.hero-section .btn-primary:hover {
  background: linear-gradient(135deg, #047857 0%, #065f46 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

.hero-section .btn-secondary {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  border: none;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
}

.hero-section .btn-secondary:hover {
  background: linear-gradient(135deg, #1d4ed8 0%, #1e40af 100%);
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0,0,0,0.15);
}

/* Modern typography improvements */
.text-modern {
  font-family: 'Inter', sans-serif;
}

.text-modern-serif {
  font-family: 'Playfair Display', serif;
}

/* Modern color palette */
.text-primary {
  color: #1f2937;
}

.text-secondary {
  color: #374151;
}

.text-accent {
  color: #2563eb;
}

.bg-primary {
  background-color: #ffffff;
}

.bg-secondary {
  background-color: #f8fafc;
}

.bg-accent {
  background-color: #2563eb;
}
`;
    
    // Replace the entire content
    fs.writeFileSync(globalCSSPath, modernStyling, 'utf8');
    console.log('  ✓ Updated global CSS with modern styling');
  }
}

// 3. Update layout to use modern fonts properly
function updateLayoutFonts() {
  const layoutPath = 'src/app/layout.tsx';
  
  if (fs.existsSync(layoutPath)) {
    console.log('Updating layout with proper font configuration...');
    
    let content = fs.readFileSync(layoutPath, 'utf8');
    let modified = false;
    
    // Ensure proper font variable usage
    const htmlClassFix = /className={`\${inter\.variable} \${playfair\.variable}`}/g;
    if (htmlClassFix.test(content)) {
      content = content.replace(htmlClassFix, 'className={`${inter.variable} ${playfair.variable} font-sans`}');
      modified = true;
      console.log('  - Updated HTML class with proper font variables');
    }
    
    if (modified) {
      fs.writeFileSync(layoutPath, content, 'utf8');
      console.log('  ✓ Updated layout');
    }
  }
}

// 4. Update blog template with modern styling
function updateBlogTemplate() {
  const blogTemplatePath = 'src/components/ComprehensiveBlogTemplate.tsx';
  
  if (fs.existsSync(blogTemplatePath)) {
    console.log('Updating blog template with modern styling...');
    
    let content = fs.readFileSync(blogTemplatePath, 'utf8');
    let modified = false;
    
    // Update the prose class with modern styling
    const proseFix = /className="prose prose-lg max-w-none text-gray-900"/g;
    if (proseFix.test(content)) {
      content = content.replace(proseFix, 'className="prose prose-lg max-w-none text-gray-900 modern-prose"');
      modified = true;
      console.log('  - Added modern prose styling');
    }
    
    // Update blog content class
    const blogContentFix = /className="blog-content text-gray-900"/g;
    if (blogContentFix.test(content)) {
      content = content.replace(blogContentFix, 'className="blog-content text-gray-900 modern-blog-content"');
      modified = true;
      console.log('  - Added modern blog content styling');
    }
    
    if (modified) {
      fs.writeFileSync(blogTemplatePath, content, 'utf8');
      console.log('  ✓ Updated blog template');
    }
  }
}

// 5. Update Tailwind config for modern fonts
function updateTailwindConfig() {
  const tailwindConfigPath = 'tailwind.config.js';
  
  if (fs.existsSync(tailwindConfigPath)) {
    console.log('Updating Tailwind config with modern fonts...');
    
    let content = fs.readFileSync(tailwindConfigPath, 'utf8');
    let modified = false;
    
    // Add modern font family configuration
    const fontFamilyFix = /fontFamily:\s*{/g;
    if (fontFamilyFix.test(content)) {
      content = content.replace(fontFamilyFix, `fontFamily: {
        'sans': ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'sans-serif'],
        'serif': ['Playfair Display', 'Crimson Text', 'Georgia', 'serif'],
        'mono': ['Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
        'playfair': ['Playfair Display', 'serif'],
      },`);
      modified = true;
      console.log('  - Added modern font families to Tailwind config');
    }
    
    if (modified) {
      fs.writeFileSync(tailwindConfigPath, content, 'utf8');
      console.log('  ✓ Updated Tailwind config');
    }
  }
}

// 6. Create a modern styling guide
function createStylingGuide() {
  const guideContent = `# Modern Styling Guide - Charles Mackay Books

## Font System
- **Primary Font (Body)**: Inter - Modern, clean, highly readable
- **Secondary Font (Headings)**: Playfair Display - Elegant, professional serif
- **Fallback**: System fonts for optimal performance

## Color Palette
- **Primary Text**: #1f2937 (Dark gray)
- **Secondary Text**: #374151 (Medium gray)
- **Accent Blue**: #2563eb (Modern blue)
- **Success Green**: #059669 (Modern green)
- **Background**: #ffffff (White)
- **Secondary Background**: #f8fafc (Light gray)

## Typography Scale
- **H1**: 2.25rem (36px) - Playfair Display, font-weight: 600
- **H2**: 1.875rem (30px) - Playfair Display, font-weight: 600
- **H3**: 1.5rem (24px) - Playfair Display, font-weight: 600
- **Body**: 1.125rem (18px) - Inter, line-height: 1.7
- **Small**: 0.875rem (14px) - Inter

## Blog Content Enhancements
- **Highlighted Paragraphs**: Light background with left border accent
- **Blockquotes**: Warm background with border accent
- **Images**: Rounded corners with subtle shadows
- **Links**: Modern blue with hover effects

## Modern Components
- **Cards**: Rounded corners, subtle shadows, hover effects
- **Buttons**: Gradient backgrounds, hover animations
- **Forms**: Clean, modern styling with proper spacing
- **Navigation**: Clean, accessible design

## Responsive Design
- **Mobile-first**: All components optimized for mobile
- **Progressive enhancement**: Enhanced features on larger screens
- **Touch-friendly**: Proper touch targets and spacing

## Performance
- **Font loading**: Optimized with display: swap
- **CSS**: Minimal, efficient styles
- **Images**: Optimized with proper sizing and lazy loading
`;

  fs.writeFileSync('STYLING_GUIDE.md', guideContent, 'utf8');
  console.log('  ✓ Created modern styling guide');
}

// Run all fixes
console.log('🎨 Starting comprehensive modern styling fixes...\n');

fixMainPageHeading();
console.log('');

updateGlobalCSS();
console.log('');

updateLayoutFonts();
console.log('');

updateBlogTemplate();
console.log('');

updateTailwindConfig();
console.log('');

createStylingGuide();
console.log('');

console.log('✅ All modern styling fixes completed!');
console.log('📝 Summary:');
console.log('  - Fixed main page heading color to modern blue');
console.log('  - Updated global CSS with modern Inter + Playfair Display fonts');
console.log('  - Enhanced blog content with highlighted paragraphs');
console.log('  - Added modern typography and color system');
console.log('  - Improved component styling with modern design patterns');
console.log('  - Created comprehensive styling guide');
console.log('  - Enhanced readability and visual hierarchy'); 