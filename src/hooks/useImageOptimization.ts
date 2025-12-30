import React, { useCallback, useEffect, useState } from 'react';

interface UseImageOptimizationOptions {
  rootMargin?: string;
  threshold?: number;
}

export const useImageOptimization = (options: UseImageOptimizationOptions = {}) => {
  const { rootMargin = '50px', threshold = 0.1 } = options;
  
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  
  const imageObserver = useCallback((node: HTMLImageElement | null) => {
    if (!node) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            const src = img.dataset.src;
            
            if (src && !loadedImages.has(src)) {
              img.src = src;
              img.onload = () => {
                setLoadedImages(prev => new Set(prev).add(src));
                img.classList.add('loaded');
              };
              observer.unobserve(img);
            }
          }
        });
      },
      { rootMargin, threshold }
    );
    
    observer.observe(node);
    
    return () => observer.unobserve(node);
  }, [rootMargin, threshold, loadedImages]);
  
  return { imageObserver, loadedImages };
};

// Optimized image component
interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  priority = false,
  ...props
}) => {
  const { imageObserver } = useImageOptimization();
  
  if (priority) {
    return (
      <img
        src={src}
        alt={alt}
        className={`${className} loaded`}
        loading="eager"
        decoding="sync"
        {...props}
      />
    );
  }
  
  return (
    <img
      ref={imageObserver}
      data-src={src}
      alt={alt}
      className={`${className} opacity-0 transition-opacity duration-300`}
      loading="lazy"
      decoding="async"
      style={{ 
        backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23f3f4f6'/%3e%3c/svg%3e")`,
        backgroundSize: 'cover'
      }}
      {...props}
    />
  );
};
