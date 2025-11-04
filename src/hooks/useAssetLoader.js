import { useEffect, useState } from 'react';

// Preload images
const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(src);
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    img.src = src;
  });
};

// Preload multiple images
const preloadImages = async (imageSources) => {
  const promises = imageSources.map((src) => 
    preloadImage(src).catch((err) => {
      console.warn(err.message);
      return null; // Continue even if one image fails
    })
  );
  await Promise.all(promises);
};

export const useAssetLoader = (criticalAssets = []) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        setLoadingProgress(10);

        // Wait for DOM to be ready
        if (document.readyState !== 'complete') {
          await new Promise((resolve) => {
            window.addEventListener('load', resolve, { once: true });
          });
        }

        setLoadingProgress(20);

        // Wait a bit for initial render
        await new Promise((resolve) => setTimeout(resolve, 100));

        setLoadingProgress(30);

        // Preload critical images
        if (criticalAssets.length > 0) {
          try {
            await Promise.race([
              preloadImages(criticalAssets),
              new Promise((resolve) => setTimeout(resolve, 2000)) // Max 2s for images
            ]);
          } catch (e) {
            console.warn('Image preload warning:', e);
          }
        }

        setLoadingProgress(60);

        // Wait for fonts to load (Font Awesome)
        if (document.fonts && document.fonts.ready) {
          try {
            await Promise.race([
              document.fonts.ready,
              new Promise((resolve) => setTimeout(resolve, 1000)) // Max 1s for fonts
            ]);
          } catch (e) {
            console.warn('Font loading check failed:', e);
          }
        }

        setLoadingProgress(80);

        // Wait for Font Awesome CSS to load (check if stylesheet is loaded)
        await new Promise((resolve) => {
          const fontAwesomeLink = document.querySelector('link[href*="font-awesome"]');
          if (fontAwesomeLink) {
            if (fontAwesomeLink.sheet || fontAwesomeLink.styleSheet) {
              // Stylesheet already loaded
              resolve();
            } else {
              // Wait for stylesheet to load
              fontAwesomeLink.addEventListener('load', resolve, { once: true });
              fontAwesomeLink.addEventListener('error', resolve, { once: true });
              // Timeout after 1s
              setTimeout(resolve, 1000);
            }
          } else {
            resolve();
          }
        });

        setLoadingProgress(90);

        // Small delay for smooth transition
        await new Promise((resolve) => setTimeout(resolve, 200));

        setLoadingProgress(100);
        
        // Final delay before showing content
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading assets:', error);
        // Still show content even if loading fails
        setIsLoading(false);
      }
    };

    loadAssets();
  }, [criticalAssets]);

  return { isLoading, loadingProgress };
};

