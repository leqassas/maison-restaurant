import { useState, useEffect } from 'react';

export default function useImagePreloader(imageUrls) {
    const [imagesPreloaded, setImagesPreloaded] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let isMounted = true;

        if (!imageUrls || imageUrls.length === 0) {
            setImagesPreloaded(true);
            return;
        }

        const total = imageUrls.length;
        let loadedCount = 0;

        const cacheImage = (url) => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.src = url;
                img.onload = () => resolve();
                img.onerror = () => resolve(); // Resolve anyway to avoid blocking
            });
        };

        const loadImages = async () => {
            const promises = imageUrls.map(async (url) => {
                await cacheImage(url);
                if (isMounted) {
                    loadedCount++;
                    const newProgress = Math.round((loadedCount / total) * 100);
                    setProgress(newProgress);
                }
            });

            await Promise.all(promises);

            if (isMounted) {
                setImagesPreloaded(true);
            }
        };

        loadImages();

        return () => {
            isMounted = false;
        };
    }, [imageUrls]);

    return { imagesPreloaded, progress };
}
