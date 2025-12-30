import { useCallback, useEffect, useRef } from 'react';

// Debounce hook for performance optimization
export const useDebounce = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  return useCallback((...args: Parameters<T>) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  }, [callback, delay]) as T;
};

// Throttle hook for scroll events
export const useThrottle = <T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T => {
  const lastCallRef = useRef<number>(0);
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      callback(...args);
    }
  }, [callback, delay]) as T;
};

// Optimized scroll listener
export const useOptimizedScroll = (
  callback: (scrollY: number) => void,
  throttleMs: number = 16
) => {
  const throttledCallback = useThrottle(callback, throttleMs);
  
  useEffect(() => {
    const handleScroll = () => {
      throttledCallback(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [throttledCallback]);
};

// Intersection Observer hook for animations
export const useIntersectionObserver = (
  options: IntersectionObserverInit = {}
) => {
  const elementRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver>();
  
  const observe = useCallback((callback: (entry: IntersectionObserverEntry) => void) => {
    if (!elementRef.current) return;
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(callback);
      },
      { threshold: 0.1, rootMargin: '50px', ...options }
    );
    
    observerRef.current.observe(elementRef.current);
    
    return () => {
      observerRef.current?.disconnect();
    };
  }, [options]);
  
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);
  
  return { elementRef, observe };
};

// Memory leak prevention for event listeners
export const useEventListener = <T extends keyof WindowEventMap>(
  eventType: T,
  handler: (event: WindowEventMap[T]) => void,
  options?: AddEventListenerOptions
) => {
  const savedHandler = useRef(handler);
  
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  
  useEffect(() => {
    const eventListener = (event: WindowEventMap[T]) => {
      savedHandler.current(event);
    };
    
    window.addEventListener(eventType, eventListener, options);
    return () => window.removeEventListener(eventType, eventListener);
  }, [eventType, options]);
};

