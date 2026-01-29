import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { clamp, mapRange } from '../../utils/easing';

export default function DishPlane({
    dish,
    index,
    position,
    scrollProgress,
    totalCount
}) {
    // Load texture from the path in menu.js
    // useTexture will auto-suspend appropriately
    const texture = useTexture(dish.image);
    const materialRef = useRef();

    useFrame(() => {
        if (!materialRef.current) return;

        // FOCUS LOGIC
        // Which index is the camera currently looking at?
        const focusIndex = scrollProgress * (totalCount - 1);

        // Distance from focal plane
        // 0 = perfectly in focus
        const dist = Math.abs(index - focusIndex);

        // Opacity / Visibility Logic
        // We want a very tight focus where the photography is crisp
        // But we allow it to be visible (faded) in the distance
        // The "fog" of the experience
        const targetOpacity = mapRange(clamp(dist, 0, 1.2), 0, 1.2, 1, 0.15);

        // Apply opacity (no heavy lerp needed for opacity, the scroll is smooth)
        materialRef.current.opacity = targetOpacity;
    });

    return (
        <mesh position={position}>
            {/* Square aspect ratio [width, height] */}
            <planeGeometry args={[2.5, 2.5]} />
            <meshBasicMaterial
                ref={materialRef}
                map={texture}
                transparent
                // Initialize as transparent until frame updates
                opacity={0}
                // Don't let lighting affect the photography colors (it's already lit)
                toneMapped={false}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
}
