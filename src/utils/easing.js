// Long, luxurious easing curves — no bounce, no spring

export const EASE = {
    // Primary easing for most animations
    luxury: [0.16, 1, 0.3, 1],

    // Heavier, slower easing for 3D motion
    heavy: [0.7, 0, 0.3, 1],

    // Subtle entrance
    fadeIn: [0.4, 0, 0.2, 1],

    // Smooth exit
    fadeOut: [0.4, 0, 1, 1],
};

export const DURATION = {
    fast: 0.6,
    normal: 1.0,
    slow: 1.2,
    slower: 1.8,
    slowest: 2.4,
};

// Convert cubic-bezier array to CSS string
export function toCSSEasing(bezier) {
    return `cubic-bezier(${bezier.join(', ')})`;
}

// Lerp utility for smooth interpolation
export function lerp(start, end, factor) {
    return start + (end - start) * factor;
}

// Clamp utility
export function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

// Map a value from one range to another
export function mapRange(value, inMin, inMax, outMin, outMax) {
    return outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);
}
