import { useState, useEffect } from 'react';

export function useWebGLSupport() {
    const [isSupported, setIsSupported] = useState(true);
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const checkWebGLSupport = () => {
            try {
                const canvas = document.createElement('canvas');
                const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

                if (!gl) {
                    setIsSupported(false);
                } else {
                    // Check for required extensions
                    const requiredExtensions = ['OES_texture_float', 'OES_standard_derivatives'];
                    const missingExtensions = requiredExtensions.filter(
                        ext => !gl.getExtension(ext)
                    );

                    // Still supported even without these, just check for basic WebGL
                    setIsSupported(true);
                }
            } catch (e) {
                setIsSupported(false);
            } finally {
                setIsChecking(false);
            }
        };

        checkWebGLSupport();
    }, []);

    return { isSupported, isChecking };
}

export default useWebGLSupport;
