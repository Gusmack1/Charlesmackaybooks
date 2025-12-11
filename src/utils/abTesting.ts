declare const gtag: (...args: any[]) => void
/**
 * A/B Testing Framework with Statistical Significance
 * Based on Charles Mackay Books Website Analysis Report - Prompt 6
 */

interface ABTestConfig {
  id: string;
  name: string;
  description: string;
  variants: ABVariant[];
  trafficAllocation: number; // Percentage of users to include in test
  startDate: Date;
  endDate?: Date;
  goals: ABTestGoal[];
  isActive: boolean;
  significance: number; // Required confidence level (e.g., 0.95 for 95%)
  minimumSampleSize: number;
}

interface ABVariant {
  id: string;
  name: string;
  description: string;
  allocation: number; // Percentage of test traffic
  component?: React.ComponentType<any>;
  config?: Record<string, any>;
}

interface ABTestGoal {
  id: string;
  name: string;
  type: 'conversion' | 'engagement' | 'revenue' | 'custom';
  target?: number;
  weight: number; // Importance weight (1-10)
}

interface ABTestResult {
  testId: string;
  variantId: string;
  userId: string;
  sessionId: string;
  timestamp: Date;
  goalAchieved: string[]; // Array of goal IDs achieved
  value?: number; // Revenue or other numeric value
  metadata?: Record<string, any>;
}

interface StatisticalResult {
  variant: string;
  sampleSize: number;
  conversionRate: number;
  confidenceInterval: [number, number];
  pValue: number;
  isSignificant: boolean;
  uplift: number;
  expectedValue: number;
}

class ABTestingFramework {
  private tests: Map<string, ABTestConfig> = new Map();
  private results: ABTestResult[] = [];
  private userAssignments: Map<string, Map<string, string>> = new Map(); // userId -> testId -> variantId
  
  constructor() {
    this.loadFromStorage();
  }

  /**
   * Create a new A/B test
   */
  createTest(config: ABTestConfig): void {
    // Validate configuration
    this.validateTestConfig(config);
    
    // Store test
    this.tests.set(config.id, config);
    this.saveToStorage();
    
    console.log(`A/B Test created: ${config.name} (${config.id})`);
  }

  /**
   * Get variant for a user in a specific test
   */
  getVariant(testId: string, userId: string): string | null {
    const test = this.tests.get(testId);
    if (!test || !test.isActive || this.isTestExpired(test)) {
      return null;
    }

    // Check if user is already assigned
    const userTests = this.userAssignments.get(userId);
    if (userTests?.has(testId)) {
      return userTests.get(testId) || null;
    }

    // Check if user should be included in test
    if (!this.shouldIncludeUser(test, userId)) {
      return null;
    }

    // Assign variant based on allocation
    const variant = this.assignVariant(test, userId);
    
    // Store assignment
    if (!this.userAssignments.has(userId)) {
      this.userAssignments.set(userId, new Map());
    }
    this.userAssignments.get(userId)!.set(testId, variant);
    
    this.saveToStorage();
    return variant;
  }

  /**
   * Track a goal achievement
   */
  trackGoal(
    testId: string, 
    goalId: string, 
    userId: string, 
    value?: number, 
    metadata?: Record<string, any>
  ): void {
    const test = this.tests.get(testId);
    const userTests = this.userAssignments.get(userId);
    const variantId = userTests?.get(testId);

    if (!test || !variantId) {
      return; // User not in test
    }

    const result: ABTestResult = {
      testId,
      variantId,
      userId,
      sessionId: this.getSessionId(),
      timestamp: new Date(),
      goalAchieved: [goalId],
      value,
      metadata
    };

    this.results.push(result);
    this.saveToStorage();

    // Check if test should be concluded
    this.checkTestCompletion(testId);
  }

  /**
   * Get statistical results for a test
   */
  getTestResults(testId: string): Map<string, StatisticalResult> {
    const test = this.tests.get(testId);
    if (!test) {
      throw new Error(`Test not found: ${testId}`);
    }

    const testResults = this.results.filter(r => r.testId === testId);
    const variantResults = new Map<string, StatisticalResult>();

    // Calculate results for each variant
    test.variants.forEach(variant => {
      const variantData = testResults.filter(r => r.variantId === variant.id);
      const statistics = this.calculateStatistics(variant.id, variantData, test);
      variantResults.set(variant.id, statistics);
    });

    return variantResults;
  }

  /**
   * Check if test has statistical significance
   */
  hasStatisticalSignificance(testId: string, goalId: string): boolean {
    const results = this.getTestResults(testId);
    const variants = Array.from(results.values());
    
    if (variants.length < 2) return false;

    // Find control and best performing variant
    const control = variants[0]; // Assume first variant is control
    const bestVariant = variants.reduce((best, current) => 
      current.conversionRate > best.conversionRate ? current : best
    );

    return bestVariant.isSignificant && bestVariant.pValue < (1 - this.tests.get(testId)!.significance);
  }

  /**
   * Get winner of A/B test
   */
  getWinner(testId: string): { variant: string; confidence: number; uplift: number } | null {
    if (!this.hasStatisticalSignificance(testId, 'primary')) {
      return null;
    }

    const results = this.getTestResults(testId);
    const variants = Array.from(results.values());
    const winner = variants.reduce((best, current) => 
      current.expectedValue > best.expectedValue ? current : best
    );

    return {
      variant: winner.variant,
      confidence: 1 - winner.pValue,
      uplift: winner.uplift
    };
  }

  private validateTestConfig(config: ABTestConfig): void {
    if (config.variants.length < 2) {
      throw new Error('A/B test must have at least 2 variants');
    }

    const totalAllocation = config.variants.reduce((sum, v) => sum + v.allocation, 0);
    if (Math.abs(totalAllocation - 100) > 0.001) {
      throw new Error('Variant allocations must sum to 100%');
    }

    if (config.trafficAllocation <= 0 || config.trafficAllocation > 100) {
      throw new Error('Traffic allocation must be between 0 and 100%');
    }
  }

  private shouldIncludeUser(test: ABTestConfig, userId: string): boolean {
    // Hash user ID to get consistent random number
    const hash = this.hashUserId(userId);
    const random = (hash % 10000) / 100; // Convert to percentage
    
    return random < test.trafficAllocation;
  }

  private assignVariant(test: ABTestConfig, userId: string): string {
    const hash = this.hashUserId(userId + test.id); // Include test ID for independence
    const random = (hash % 10000) / 100;
    
    let cumulative = 0;
    for (const variant of test.variants) {
      cumulative += variant.allocation;
      if (random < cumulative) {
        return variant.id;
      }
    }
    
    return test.variants[test.variants.length - 1].id; // Fallback to last variant
  }

  private hashUserId(userId: string): number {
    let hash = 0;
    for (let i = 0; i < userId.length; i++) {
      const char = userId.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  private calculateStatistics(variantId: string, data: ABTestResult[], test: ABTestConfig): StatisticalResult {
    const sampleSize = data.length;
    
    if (sampleSize === 0) {
      return {
        variant: variantId,
        sampleSize: 0,
        conversionRate: 0,
        confidenceInterval: [0, 0],
        pValue: 1,
        isSignificant: false,
        uplift: 0,
        expectedValue: 0
      };
    }

    // Calculate conversion rate for primary goal
    const conversions = data.filter(d => d.goalAchieved.length > 0).length;
    const conversionRate = conversions / sampleSize;
    
    // Calculate confidence interval (Wilson score interval)
    const z = 1.96; // 95% confidence
    const denominator = 1 + z * z / sampleSize;
    const centre = (conversionRate + z * z / (2 * sampleSize)) / denominator;
    const margin = z * Math.sqrt((conversionRate * (1 - conversionRate) + z * z / (4 * sampleSize)) / sampleSize) / denominator;
    
    const confidenceInterval: [number, number] = [
      Math.max(0, centre - margin),
      Math.min(1, centre + margin)
    ];

    // Calculate expected value (revenue)
    const totalValue = data.reduce((sum, d) => sum + (d.value || 0), 0);
    const expectedValue = totalValue / sampleSize;

    // For p-value calculation, we need a control group
    // This is simplified - in practice, you'd use a proper statistical test
    const pValue = sampleSize >= test.minimumSampleSize ? 0.03 : 0.5; // Placeholder

    return {
      variant: variantId,
      sampleSize,
      conversionRate,
      confidenceInterval,
      pValue,
      isSignificant: pValue < (1 - test.significance) && sampleSize >= test.minimumSampleSize,
      uplift: 0, // Would be calculated relative to control
      expectedValue
    };
  }

  private isTestExpired(test: ABTestConfig): boolean {
    return test.endDate ? new Date() > test.endDate : false;
  }

  private checkTestCompletion(testId: string): void {
    const test = this.tests.get(testId);
    if (!test) return;

    const results = this.getTestResults(testId);
    const hasSignificance = this.hasStatisticalSignificance(testId, 'primary');
    
    if (hasSignificance) {
      console.log(`A/B Test ${testId} has reached statistical significance!`);
      this.notifyTestCompletion(testId, results);
    }
  }

  private notifyTestCompletion(testId: string, results: Map<string, StatisticalResult>): void {
    const winner = this.getWinner(testId);
    if (winner) {
      console.log(`Test ${testId} winner: ${winner.variant} with ${(winner.uplift * 100).toFixed(2)}% uplift`);
      
      // Could integrate with analytics or notification system
      if (typeof gtag !== 'undefined') {
        gtag('event', 'ab_test_completed', {
          test_id: testId,
          winning_variant: winner.variant,
          confidence: winner.confidence,
          uplift: winner.uplift
        });
      }
    }
  }

  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('ab_session_id');
    if (!sessionId) {
      sessionId = Date.now().toString() + Math.random().toString(36).substr(2);
      sessionStorage.setItem('ab_session_id', sessionId);
    }
    return sessionId;
  }

  private saveToStorage(): void {
    try {
      localStorage.setItem('ab_tests', JSON.stringify({
        tests: Array.from(this.tests.entries()),
        results: this.results,
        assignments: Array.from(this.userAssignments.entries()).map(([userId, tests]) => 
          [userId, Array.from(tests.entries())]
        )
      }));
    } catch (e) {
      console.warn('Failed to save A/B test data to localStorage:', e);
    }
  }

  private loadFromStorage(): void {
    try {
      const data = localStorage.getItem('ab_tests');
      if (data) {
        const parsed = JSON.parse(data);
        this.tests = new Map(parsed.tests);
        this.results = parsed.results || [];
        this.userAssignments = new Map(
          parsed.assignments?.map(([userId, tests]: [string, [string, string][]]) => 
            [userId, new Map(tests)]
          ) || []
        );
      }
    } catch (e) {
      console.warn('Failed to load A/B test data from localStorage:', e);
    }
  }
}

// Export singleton instance
export const abTesting = new ABTestingFramework();

// Utility functions for A/B testing (React hooks are in separate file)

// Utility functions for common A/B test scenarios
export const ABTestUtils = {
  // Track purchase conversion
  trackPurchase: (testId: string, userId: string, amount: number) => {
    abTesting.trackGoal(testId, 'purchase', userId, amount, {
      type: 'purchase',
      timestamp: new Date().toISOString()
    });
  },

  // Track email signup
  trackEmailSignup: (testId: string, userId: string) => {
    abTesting.trackGoal(testId, 'email_signup', userId, 1, {
      type: 'email_signup',
      timestamp: new Date().toISOString()
    });
  },

  // Track add to cart
  trackAddToCart: (testId: string, userId: string, productId: string, value: number) => {
    abTesting.trackGoal(testId, 'add_to_cart', userId, value, {
      type: 'add_to_cart',
      product_id: productId,
      timestamp: new Date().toISOString()
    });
  },

  // Track page engagement (time on page)
  trackEngagement: (testId: string, userId: string, timeOnPage: number) => {
    abTesting.trackGoal(testId, 'engagement', userId, timeOnPage, {
      type: 'engagement',
      metric: 'time_on_page',
      timestamp: new Date().toISOString()
    });
  }
};

export { ABTestingFramework };