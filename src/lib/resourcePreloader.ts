// Resource preloader for critical assets
export class ResourcePreloader {
  private static instance: ResourcePreloader;
  private preloadedResources = new Set<string>();

  static getInstance(): ResourcePreloader {
    if (!ResourcePreloader.instance) {
      ResourcePreloader.instance = new ResourcePreloader();
    }
    return ResourcePreloader.instance;
  }

  preloadImage(src: string, priority: 'high' | 'low' = 'low'): Promise<void> {
    if (this.preloadedResources.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.preloadedResources.add(src);
        resolve();
      };
      
      img.onerror = reject;
      
      // Set loading priority
      if (priority === 'high') {
        img.fetchPriority = 'high';
      }
      
      img.src = src;
    });
  }

  preloadImages(sources: string[], priority: 'high' | 'low' = 'low'): Promise<void[]> {
    const promises = sources.map(src => this.preloadImage(src, priority));
    return Promise.all(promises);
  }

  preloadCriticalResources(): void {
    // Preload hero image and other critical assets
    const criticalImages = [
      '/blitzer_logo.jpg',
      // Add other critical images here
    ];

    this.preloadImages(criticalImages, 'high').catch(console.warn);
  }

  prefetchRoute(route: string): void {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = route;
    document.head.appendChild(link);
  }

  preconnectToDomain(domain: string): void {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = domain;
    document.head.appendChild(link);
  }
}

// Initialize preloader
export const preloader = ResourcePreloader.getInstance();

