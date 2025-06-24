/**
 * Utility to check if code is running on the client side
 */
export const isClient = typeof window !== 'undefined';

/**
 * Custom hook to safely use window-dependent code
 * @returns {boolean} - Whether the component is mounted on the client
 */
import { useState, useEffect } from 'react';

export function useHasMounted() {
  const [hasMounted, setHasMounted] = useState(false);
  
  useEffect(() => {
    setHasMounted(true);
  }, []);
  
  return hasMounted;
}

/**
 * Safe window dimension hook that works with SSR
 * @returns {Object} - Window dimensions and mounted state
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 0,
    height: 0,
  });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Set mounted state
    setIsMounted(true);
    
    // Set initial size
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    width: windowSize.width,
    height: windowSize.height,
    isMounted,
  };
}

/**
 * Safe media query hook that works with SSR
 * @param {string} query - CSS media query string
 * @returns {boolean} - Whether the media query matches
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    const media = window.matchMedia(query);
    
    // Set initial value
    setMatches(media.matches);
    
    // Update matches when media query changes
    const listener = () => setMatches(media.matches);
    media.addEventListener('change', listener);
    
    // Clean up
    return () => media.removeEventListener('change', listener);
  }, [query]);

  // Return false during SSR
  return isMounted ? matches : false;
}