import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import * as THREE from 'three';
import MenuStack from './MenuStack';
import { menuItems } from '../../data/menu';
import { lerp } from '../../utils/easing';

// SPATIAL CONFIGURATION (Must match MenuStack)
const SPACING_Z = -3.5;
const SPACING_Y = 0.5;

function CameraRig({ scrollProgress, onDishChange }) {
    const listLength = menuItems.length - 1;

    // We want the camera to start at Z=5 (looking at first dish at Z=0)
    // And end physically inside/near the last dish.
    // The dishes are at: 0, -3.5, -7.0, etc.
    // So the camera needs to travel from Z=3.5 (focused on 0) to Z = (listLength * SPACING_Z) + 3.5

    // Actually, let's keep a consistent offset.
    // The camera should always be +3.5 units (approx) away from the focal dish.
    const CAMERA_OFFSET_Z = 3.5;

    useFrame((state) => {
        // 1. Where do we want to be?
        // Progress 0 -> Dish 0 (Z=0, Y=0)
        // Progress 1 -> Dish N (Z=N*SPACING_Z, Y=N*SPACING_Y)

        const currentDishIndex = scrollProgress * listLength;

        // Calculate Target Camera Position
        const targetZ = (currentDishIndex * SPACING_Z) + CAMERA_OFFSET_Z;
        const targetY = currentDishIndex * SPACING_Y;

        // Move camera directly (Scroll is already smoothed by Lenis)
        // We can add a TINY bit of lag here if we want weight, but keep it tight.
        state.camera.position.z = lerp(state.camera.position.z, targetZ, 0.1);
        state.camera.position.y = lerp(state.camera.position.y, targetY, 0.1);

        // Look roughly at the center, or slightly ahead?
        // Looking straight forward is usually best for editorial.
        state.camera.lookAt(0, state.camera.position.y, state.camera.position.z - 10);

        // Notify parent of current index for DOM text
        // (Round to nearest integer)
        const roundedIndex = Math.round(currentDishIndex);
        onDishChange?.(roundedIndex);
    });

    return null;
}

export default function MenuScene({ scrollProgress, currentDish, onDishChange }) {
    return (
        <Canvas
            camera={{ position: [0, 0, 5], fov: 45 }} // 45mm lens equivalent feeling
            gl={{
                antialias: true,
                alpha: true,
                powerPreference: 'high-performance',
            }}
            dpr={[1, 2]}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none', // Allow scroll through
            }}
        >
            {/* Soft, gallery lighting */}
            <ambientLight intensity={0.8} />
            <directionalLight
                position={[5, 10, 5]}
                intensity={0.5}
                castShadow={false}
            />

            <Suspense fallback={null}>
                <CameraRig scrollProgress={scrollProgress} onDishChange={onDishChange} />
                <MenuStack scrollProgress={scrollProgress} />
            </Suspense>
        </Canvas>
    );
}
