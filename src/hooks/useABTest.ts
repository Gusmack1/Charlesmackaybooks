'use client';

import { useState, useEffect } from 'react';
import { abTesting } from '@/utils/abTesting';

/**
 * React hook for A/B testing
 * @param testId - The ID of the A/B test
 * @param userId - The user ID for consistent variant assignment
 * @returns The assigned variant ID or null if user is not in test
 */
export function useABTest(testId: string, userId: string): string | null {
  const [variant, setVariant] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const assignedVariant = abTesting.getVariant(testId, userId);
    setVariant(assignedVariant);
    setIsLoading(false);
  }, [testId, userId]);

  return isLoading ? null : variant;
}

/**
 * Hook for tracking A/B test goals
 * @param testId - The ID of the A/B test
 * @param userId - The user ID
 */
export function useABTestTracking(testId: string, userId: string) {
  const trackGoal = (goalId: string, value?: number, metadata?: Record<string, any>) => {
    abTesting.trackGoal(testId, goalId, userId, value, metadata);
  };

  const trackPurchase = (amount: number) => {
    abTesting.trackGoal(testId, 'purchase', userId, amount, {
      type: 'purchase',
      timestamp: new Date().toISOString()
    });
  };

  const trackAddToCart = (productId: string, value: number) => {
    abTesting.trackGoal(testId, 'add_to_cart', userId, value, {
      type: 'add_to_cart',
      product_id: productId,
      timestamp: new Date().toISOString()
    });
  };

  const trackEmailSignup = () => {
    abTesting.trackGoal(testId, 'email_signup', userId, 1, {
      type: 'email_signup',
      timestamp: new Date().toISOString()
    });
  };

  return {
    trackGoal,
    trackPurchase,
    trackAddToCart,
    trackEmailSignup
  };
}