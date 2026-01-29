/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                charcoal: {
                    DEFAULT: '#0a0a0a',
                    50: '#1a1a1a',
                    100: '#141414',
                },
                cream: {
                    DEFAULT: '#f5f2ed',
                    50: '#faf9f7',
                },
                gold: {
                    DEFAULT: '#c9a962',
                    light: '#d4ba7a',
                    dark: '#b89a4f',
                },
            },
            fontFamily: {
                editorial: ['Cormorant Garamond', 'Georgia', 'serif'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            transitionTimingFunction: {
                'luxury': 'cubic-bezier(0.16, 1, 0.3, 1)',
                'heavy': 'cubic-bezier(0.7, 0, 0.3, 1)',
            },
            transitionDuration: {
                '1200': '1200ms',
                '1500': '1500ms',
                '2000': '2000ms',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                fadeInUp: {
                    '0%': { opacity: '0', transform: 'translateY(10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                'fade-in': 'fadeIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'fade-in-up': 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
        },
    },
    plugins: [],
}
