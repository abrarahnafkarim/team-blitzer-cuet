import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { preloader } from './lib/resourcePreloader'

// Preload critical resources
preloader.preloadCriticalResources();

// Preconnect to external domains
preloader.preconnectToDomain('https://fonts.googleapis.com');
preloader.preconnectToDomain('https://fonts.gstatic.com');

createRoot(document.getElementById("root")!).render(<App />);
