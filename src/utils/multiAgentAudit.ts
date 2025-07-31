// Multi-Agent Audit System for Charles Mackay Books Website
// Implements the 5-agent framework specified in the TODO list

export interface AuditResult {
  agent: string;
  page: string;
  passed: boolean;
  score: number; // 0-100
  issues: string[];
  recommendations: string[];
  timestamp: Date;
}

export interface PageAudit {
  url: string;
  title: string;
  results: AuditResult[];
  overallScore: number;
  status: 'excellent' | 'good' | 'needs-improvement' | 'poor';
}

// Agent 1: Design & Layout Agent
export class DesignLayoutAgent {
  private static instance: DesignLayoutAgent;
  
  static getInstance(): DesignLayoutAgent {
    if (!DesignLayoutAgent.instance) {
      DesignLayoutAgent.instance = new DesignLayoutAgent();
    }
    return DesignLayoutAgent.instance;
  }

  async auditPage(url: string, html: string): Promise<AuditResult> {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check for responsive design
    if (!html.includes('viewport')) {
      issues.push('Missing viewport meta tag');
      score -= 20;
      recommendations.push('Add viewport meta tag for mobile responsiveness');
    }

    // Check for modern CSS features
    if (!html.includes('grid') && !html.includes('flex')) {
      issues.push('No modern CSS layout detected');
      score -= 15;
      recommendations.push('Implement CSS Grid or Flexbox for modern layouts');
    }

    // Check for consistent typography
    if (!html.includes('font-family') && !html.includes('Georgia')) {
      issues.push('Typography not optimized for readability');
      score -= 10;
      recommendations.push('Use serif fonts (Georgia) for body text');
    }

    // Check for visual hierarchy
    if (!html.includes('<h1>') || !html.includes('<h2>')) {
      issues.push('Poor heading structure');
      score -= 15;
      recommendations.push('Implement proper heading hierarchy (H1-H6)');
    }

    // Check for color contrast
    if (html.includes('color: #000') && html.includes('background: #000')) {
      issues.push('Potential color contrast issues');
      score -= 10;
      recommendations.push('Ensure sufficient color contrast for accessibility');
    }

    return {
      agent: 'Design & Layout Agent',
      page: url,
      passed: score >= 80,
      score: Math.max(0, score),
      issues,
      recommendations,
      timestamp: new Date(),
    };
  }
}

// Agent 2: SEO & Performance Agent
export class SEOPerformanceAgent {
  private static instance: SEOPerformanceAgent;
  
  static getInstance(): SEOPerformanceAgent {
    if (!SEOPerformanceAgent.instance) {
      SEOPerformanceAgent.instance = new SEOPerformanceAgent();
    }
    return SEOPerformanceAgent.instance;
  }

  async auditPage(url: string, html: string): Promise<AuditResult> {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check meta tags
    if (!html.includes('<title>')) {
      issues.push('Missing title tag');
      score -= 25;
      recommendations.push('Add descriptive title tag (50-60 characters)');
    }

    if (!html.includes('meta name="description"')) {
      issues.push('Missing meta description');
      score -= 20;
      recommendations.push('Add meta description (150-160 characters)');
    }

    // Check structured data
    if (!html.includes('application/ld+json')) {
      issues.push('Missing structured data');
      score -= 15;
      recommendations.push('Implement JSON-LD structured data');
    }

    // Check internal linking
    const internalLinks = (html.match(/href="[^"]*"/g) || []).filter(link => 
      link.includes('href="/') || link.includes('href="https://charlesmackaybooks.com')
    ).length;
    
    if (internalLinks < 3) {
      issues.push('Insufficient internal linking');
      score -= 10;
      recommendations.push('Add more internal links for better SEO');
    }

    // Check image optimization
    const images = html.match(/<img[^>]+>/g) || [];
    const unoptimizedImages = images.filter(img => 
      !img.includes('loading="lazy"') && !img.includes('srcset')
    ).length;
    
    if (unoptimizedImages > 0) {
      issues.push(`${unoptimizedImages} images not optimized`);
      score -= 10;
      recommendations.push('Add lazy loading and srcset to images');
    }

    // Check Core Web Vitals indicators
    if (html.includes('large image') || html.includes('heavy script')) {
      issues.push('Potential Core Web Vitals issues');
      score -= 10;
      recommendations.push('Optimize for LCP, FID, and CLS');
    }

    return {
      agent: 'SEO & Performance Agent',
      page: url,
      passed: score >= 80,
      score: Math.max(0, score),
      issues,
      recommendations,
      timestamp: new Date(),
    };
  }
}

// Agent 3: Content & Accessibility Agent
export class ContentAccessibilityAgent {
  private static instance: ContentAccessibilityAgent;
  
  static getInstance(): ContentAccessibilityAgent {
    if (!ContentAccessibilityAgent.instance) {
      ContentAccessibilityAgent.instance = new ContentAccessibilityAgent();
    }
    return ContentAccessibilityAgent.instance;
  }

  async auditPage(url: string, html: string): Promise<AuditResult> {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check alt text for images
    const images = html.match(/<img[^>]+>/g) || [];
    const imagesWithoutAlt = images.filter(img => 
      !img.includes('alt="') || img.includes('alt=""')
    ).length;
    
    if (imagesWithoutAlt > 0) {
      issues.push(`${imagesWithoutAlt} images missing alt text`);
      score -= 15;
      recommendations.push('Add descriptive alt text to all images');
    }

    // Check semantic HTML
    if (!html.includes('<main>') && !html.includes('<article>') && !html.includes('<section>')) {
      issues.push('Missing semantic HTML elements');
      score -= 10;
      recommendations.push('Use semantic HTML5 elements');
    }

    // Check heading structure
    const headings = html.match(/<h[1-6][^>]*>/g) || [];
    if (headings.length === 0) {
      issues.push('No headings found');
      score -= 20;
      recommendations.push('Add proper heading structure');
    }

    // Check for skip links
    if (!html.includes('skip') && !html.includes('main-content')) {
      issues.push('No skip navigation link');
      score -= 5;
      recommendations.push('Add skip navigation for keyboard users');
    }

    // Check content quality
    const textContent = html.replace(/<[^>]*>/g, ' ').trim();
    if (textContent.length < 300) {
      issues.push('Content too short');
      score -= 10;
      recommendations.push('Add more valuable content');
    }

    // Check for accessibility attributes
    if (!html.includes('aria-label') && !html.includes('role=')) {
      issues.push('Missing ARIA attributes');
      score -= 5;
      recommendations.push('Add ARIA labels where appropriate');
    }

    return {
      agent: 'Content & Accessibility Agent',
      page: url,
      passed: score >= 80,
      score: Math.max(0, score),
      issues,
      recommendations,
      timestamp: new Date(),
    };
  }
}

// Agent 4: E-commerce & Conversion Agent
export class EcommerceConversionAgent {
  private static instance: EcommerceConversionAgent;
  
  static getInstance(): EcommerceConversionAgent {
    if (!EcommerceConversionAgent.instance) {
      EcommerceConversionAgent.instance = new EcommerceConversionAgent();
    }
    return EcommerceConversionAgent.instance;
  }

  async auditPage(url: string, html: string): Promise<AuditResult> {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check for purchase buttons
    const buyButtons = (html.match(/buy|purchase|order|add to cart/gi) || []).length;
    if (buyButtons === 0) {
      issues.push('No clear purchase options');
      score -= 20;
      recommendations.push('Add prominent buy/purchase buttons');
    }

    // Check for pricing information
    if (!html.includes('£') && !html.includes('$') && !html.includes('price')) {
      issues.push('No pricing information visible');
      score -= 15;
      recommendations.push('Display clear pricing information');
    }

    // Check for trust elements
    const trustElements = (html.match(/trust|secure|guarantee|feedback|positive/gi) || []).length;
    if (trustElements < 2) {
      issues.push('Insufficient trust elements');
      score -= 10;
      recommendations.push('Add trust badges, guarantees, or testimonials');
    }

    // Check for related content
    if (!html.includes('related') && !html.includes('recommend')) {
      issues.push('No related content or recommendations');
      score -= 10;
      recommendations.push('Add related books or content recommendations');
    }

    // Check for social proof
    if (!html.includes('testimonial') && !html.includes('review') && !html.includes('customer')) {
      issues.push('No social proof elements');
      score -= 10;
      recommendations.push('Add customer testimonials or reviews');
    }

    return {
      agent: 'E-commerce & Conversion Agent',
      page: url,
      passed: score >= 80,
      score: Math.max(0, score),
      issues,
      recommendations,
      timestamp: new Date(),
    };
  }
}

// Agent 5: Technical & Security Agent
export class TechnicalSecurityAgent {
  private static instance: TechnicalSecurityAgent;
  
  static getInstance(): TechnicalSecurityAgent {
    if (!TechnicalSecurityAgent.instance) {
      TechnicalSecurityAgent.instance = new TechnicalSecurityAgent();
    }
    return TechnicalSecurityAgent.instance;
  }

  async auditPage(url: string, html: string): Promise<AuditResult> {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check for security headers
    if (!html.includes('X-Frame-Options') && !html.includes('Content-Security-Policy')) {
      issues.push('Missing security headers');
      score -= 10;
      recommendations.push('Implement security headers');
    }

    // Check for HTTPS
    if (url.startsWith('http://')) {
      issues.push('Not using HTTPS');
      score -= 20;
      recommendations.push('Use HTTPS for all pages');
    }

    // Check for modern JavaScript
    if (html.includes('eval(') || html.includes('innerHTML')) {
      issues.push('Potentially unsafe JavaScript patterns');
      score -= 10;
      recommendations.push('Avoid eval() and innerHTML for security');
    }

    // Check for error handling
    if (!html.includes('error') && !html.includes('try') && !html.includes('catch')) {
      issues.push('No visible error handling');
      score -= 5;
      recommendations.push('Implement proper error handling');
    }

    // Check for mobile responsiveness
    if (!html.includes('media') && !html.includes('responsive')) {
      issues.push('Mobile responsiveness not confirmed');
      score -= 10;
      recommendations.push('Ensure mobile-responsive design');
    }

    return {
      agent: 'Technical & Security Agent',
      page: url,
      passed: score >= 80,
      score: Math.max(0, score),
      issues,
      recommendations,
      timestamp: new Date(),
    };
  }
}

// Multi-Agent Coordinator
export class MultiAgentAuditor {
  private agents = [
    DesignLayoutAgent.getInstance(),
    SEOPerformanceAgent.getInstance(),
    ContentAccessibilityAgent.getInstance(),
    EcommerceConversionAgent.getInstance(),
    TechnicalSecurityAgent.getInstance(),
  ];

  async auditPage(url: string, html: string): Promise<PageAudit> {
    const results: AuditResult[] = [];
    
    // Run all agents in parallel
    const agentPromises = this.agents.map(agent => agent.auditPage(url, html));
    const agentResults = await Promise.all(agentPromises);
    
    results.push(...agentResults);
    
    // Calculate overall score
    const totalScore = results.reduce((sum, result) => sum + result.score, 0);
    const overallScore = Math.round(totalScore / results.length);
    
    // Determine status
    let status: PageAudit['status'];
    if (overallScore >= 90) status = 'excellent';
    else if (overallScore >= 80) status = 'good';
    else if (overallScore >= 60) status = 'needs-improvement';
    else status = 'poor';
    
    return {
      url,
      title: this.extractTitle(html),
      results,
      overallScore,
      status,
    };
  }

  async auditMultiplePages(pages: { url: string; html: string }[]): Promise<PageAudit[]> {
    const audits: PageAudit[] = [];
    
    for (const page of pages) {
      try {
        const audit = await this.auditPage(page.url, page.html);
        audits.push(audit);
      } catch (error) {
        console.error(`Failed to audit ${page.url}:`, error);
      }
    }
    
    return audits;
  }

  private extractTitle(html: string): string {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return titleMatch ? titleMatch[1].trim() : 'Untitled';
  }

  generateReport(audits: PageAudit[]): string {
    const totalPages = audits.length;
    const excellentPages = audits.filter(a => a.status === 'excellent').length;
    const goodPages = audits.filter(a => a.status === 'good').length;
    const needsImprovementPages = audits.filter(a => a.status === 'needs-improvement').length;
    const poorPages = audits.filter(a => a.status === 'poor').length;
    
    const averageScore = Math.round(
      audits.reduce((sum, audit) => sum + audit.overallScore, 0) / totalPages
    );

    let report = `# Multi-Agent Website Audit Report\n\n`;
    report += `**Generated:** ${new Date().toLocaleString()}\n`;
    report += `**Total Pages Audited:** ${totalPages}\n`;
    report += `**Average Score:** ${averageScore}/100\n\n`;
    
    report += `## Overall Status\n`;
    report += `- Excellent: ${excellentPages} pages\n`;
    report += `- Good: ${goodPages} pages\n`;
    report += `- Needs Improvement: ${needsImprovementPages} pages\n`;
    report += `- Poor: ${poorPages} pages\n\n`;
    
    report += `## Detailed Results\n\n`;
    
    audits.forEach(audit => {
      report += `### ${audit.title} (${audit.url})\n`;
      report += `**Status:** ${audit.status.toUpperCase()} (${audit.overallScore}/100)\n\n`;
      
      audit.results.forEach(result => {
        report += `#### ${result.agent}\n`;
        report += `**Score:** ${result.score}/100\n`;
        
        if (result.issues.length > 0) {
          report += `**Issues:**\n`;
          result.issues.forEach(issue => report += `- ${issue}\n`);
        }
        
        if (result.recommendations.length > 0) {
          report += `**Recommendations:**\n`;
          result.recommendations.forEach(rec => report += `- ${rec}\n`);
        }
        report += `\n`;
      });
    });
    
    return report;
  }
}

// Export singleton instance
export const multiAgentAuditor = new MultiAgentAuditor(); 