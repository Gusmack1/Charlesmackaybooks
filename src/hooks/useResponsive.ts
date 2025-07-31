'use client';

import { useState, useEffect } from 'react';

// Breakpoint definitions
export const BREAKPOINTS = {
  mobile: 320,
  mobileLarge: 480,
  tablet: 768,
  tabletLarge: 1024,
  desktop: 1280,
  desktopLarge: 1536,
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

// Device type definitions
export type DeviceType = 'mobile' | 'tablet' | 'desktop';

// Orientation type
export type Orientation = 'portrait' | 'landscape';

// Touch capability
export type TouchCapability = 'touch' | 'mouse' | 'both';

interface ResponsiveState {
  width: number;
  height: number;
  breakpoint: Breakpoint;
  deviceType: DeviceType;
  orientation: Orientation;
  isTouch: boolean;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isPortrait: boolean;
  pixelRatio: number;
  viewportHeight: number;
  viewportWidth: number;
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<ResponsiveState>({
    width: 0,
    height: 0,
    breakpoint: 'mobile',
    deviceType: 'mobile',
    orientation: 'portrait',
    isTouch: false,
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLandscape: false,
    isPortrait: false,
    pixelRatio: 1,
    viewportHeight: 0,
    viewportWidth: 0,
  });

  useEffect(() => {
    const updateResponsiveState = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = window.devicePixelRatio || 1;

      // Determine breakpoint
      let breakpoint: Breakpoint = 'mobile';
      if (width >= BREAKPOINTS.desktopLarge) breakpoint = 'desktopLarge';
      else if (width >= BREAKPOINTS.desktop) breakpoint = 'desktop';
      else if (width >= BREAKPOINTS.tabletLarge) breakpoint = 'tabletLarge';
      else if (width >= BREAKPOINTS.tablet) breakpoint = 'tablet';
      else if (width >= BREAKPOINTS.mobileLarge) breakpoint = 'mobileLarge';
      else breakpoint = 'mobile';

      // Determine device type
      let deviceType: DeviceType = 'mobile';
      if (width >= BREAKPOINTS.tabletLarge) deviceType = 'desktop';
      else if (width >= BREAKPOINTS.tablet) deviceType = 'tablet';
      else deviceType = 'mobile';

      // Determine orientation
      const orientation: Orientation = width > height ? 'landscape' : 'portrait';

      // Detect touch capability
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

      setState({
        width,
        height,
        breakpoint,
        deviceType,
        orientation,
        isTouch,
        isMobile: deviceType === 'mobile',
        isTablet: deviceType === 'tablet',
        isDesktop: deviceType === 'desktop',
        isLandscape: orientation === 'landscape',
        isPortrait: orientation === 'portrait',
        pixelRatio,
        viewportHeight: height,
        viewportWidth: width,
      });
    };

    // Initial update
    updateResponsiveState();

    // Add event listeners
    window.addEventListener('resize', updateResponsiveState);
    window.addEventListener('orientationchange', updateResponsiveState);

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateResponsiveState);
      window.removeEventListener('orientationchange', updateResponsiveState);
    };
  }, []);

  return state;
}

// Hook for breakpoint-specific logic
export function useBreakpoint(breakpoint: Breakpoint): boolean {
  const { width } = useResponsive();
  return width >= BREAKPOINTS[breakpoint];
}

// Hook for device type detection
export function useDeviceType(): DeviceType {
  const { deviceType } = useResponsive();
  return deviceType;
}

// Hook for orientation detection
export function useOrientation(): Orientation {
  const { orientation } = useResponsive();
  return orientation;
}

// Hook for touch capability detection
export function useTouchCapability(): TouchCapability {
  const { isTouch } = useResponsive();
  const [hasMouse, setHasMouse] = useState(false);

  useEffect(() => {
    const handleMouseMove = () => {
      setHasMouse(true);
    };

    document.addEventListener('mousemove', handleMouseMove, { once: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (isTouch && hasMouse) return 'both';
  if (isTouch) return 'touch';
  return 'mouse';
}

// Hook for viewport dimensions
export function useViewport() {
  const { width, height, viewportWidth, viewportHeight } = useResponsive();
  return { width, height, viewportWidth, viewportHeight };
}

// Hook for pixel ratio
export function usePixelRatio(): number {
  const { pixelRatio } = useResponsive();
  return pixelRatio;
}

// Utility functions for responsive design
export const responsiveUtils = {
  // Get CSS classes based on breakpoint
  getBreakpointClasses: (baseClass: string, breakpoints: Record<Breakpoint, string>) => {
    const classes = [baseClass];
    
    Object.entries(breakpoints).forEach(([breakpoint, className]) => {
      if (className) {
        const prefix = breakpoint === 'mobile' ? '' : `${breakpoint}:`;
        classes.push(`${prefix}${className}`);
      }
    });
    
    return classes.join(' ');
  },

  // Get responsive spacing
  getResponsiveSpacing: (spacing: Record<Breakpoint, string>) => {
    return responsiveUtils.getBreakpointClasses('', spacing);
  },

  // Get responsive typography
  getResponsiveTypography: (sizes: Record<Breakpoint, string>) => {
    return responsiveUtils.getBreakpointClasses('', sizes);
  },

  // Check if current breakpoint matches
  isBreakpoint: (currentBreakpoint: Breakpoint, targetBreakpoint: Breakpoint): boolean => {
    const currentIndex = Object.keys(BREAKPOINTS).indexOf(currentBreakpoint);
    const targetIndex = Object.keys(BREAKPOINTS).indexOf(targetBreakpoint);
    return currentIndex >= targetIndex;
  },

  // Get optimal image size for current breakpoint
  getOptimalImageSize: (breakpoint: Breakpoint): number => {
    switch (breakpoint) {
      case 'mobile':
        return 400;
      case 'mobileLarge':
        return 600;
      case 'tablet':
        return 800;
      case 'tabletLarge':
        return 1000;
      case 'desktop':
        return 1200;
      case 'desktopLarge':
        return 1600;
      default:
        return 800;
    }
  },

  // Get optimal grid columns for current breakpoint
  getOptimalGridCols: (breakpoint: Breakpoint): number => {
    switch (breakpoint) {
      case 'mobile':
        return 1;
      case 'mobileLarge':
        return 1;
      case 'tablet':
        return 2;
      case 'tabletLarge':
        return 3;
      case 'desktop':
        return 4;
      case 'desktopLarge':
        return 5;
      default:
        return 2;
    }
  },
};

// Predefined responsive configurations for common use cases
export const responsiveConfigs = {
  // Book grid configuration
  bookGrid: {
    cols: {
      mobile: 1,
      tablet: 2,
      desktop: 3,
      large: 4,
    },
    gap: {
      mobile: '1rem',
      tablet: '1.5rem',
      desktop: '2rem',
    },
  },

  // Blog grid configuration
  blogGrid: {
    cols: {
      mobile: 1,
      tablet: 2,
      desktop: 2,
      large: 3,
    },
    gap: {
      mobile: '1.5rem',
      tablet: '2rem',
      desktop: '2.5rem',
    },
  },

  // Hero section configuration
  heroSection: {
    cols: {
      mobile: 1,
      tablet: 1,
      desktop: 2,
      large: 2,
    },
    gap: {
      mobile: '1rem',
      tablet: '2rem',
      desktop: '3rem',
    },
  },

  // Typography scale
  typography: {
    h1: {
      mobile: 'text-2xl',
      tablet: 'text-3xl',
      desktop: 'text-4xl',
      large: 'text-5xl',
    },
    h2: {
      mobile: 'text-xl',
      tablet: 'text-2xl',
      desktop: 'text-3xl',
      large: 'text-4xl',
    },
    h3: {
      mobile: 'text-lg',
      tablet: 'text-xl',
      desktop: 'text-2xl',
      large: 'text-3xl',
    },
    body: {
      mobile: 'text-base',
      tablet: 'text-lg',
      desktop: 'text-lg',
      large: 'text-xl',
    },
  },
}; 