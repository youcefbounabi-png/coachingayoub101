/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./sections/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}" // For files in root like App.tsx
    ],
    theme: {
        extend: {
            colors: {
                accent: '#F7E025', // Performance Yellow
                'accent-warm': '#FFB800', // Warm gold
                dark: '#0d1117',   // Rich dark blue-gray (GitHub-style)
                surface: '#161b22', // Warmer surface with blue tint
                border: '#30363d',  // Softer blue-gray border
                'dark-subtle': '#1a1f2e',
                'warm-dark': '#1a1625', // Deep purple-blue
                'warm-surface': '#1f2937', // Warm gray-blue
            },
            fontFamily: {
                heading: ['Syne', 'sans-serif'],
                sans: ['Space Grotesk', 'sans-serif']
            },
            animation: {
                'glitch': 'glitch 1s infinite linear alternate-reverse',
                'float': 'float 6s ease-in-out infinite',
                'ken-burns': 'kenburns 20s ease infinite alternate',
                'marquee': 'marquee 25s linear infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'gradient-shift': 'gradientShift 8s ease infinite',
                'float-slow': 'floatSlow 10s ease-in-out infinite',
                'glow-pulse': 'glowPulse 3s ease-in-out infinite',
                'particle-float': 'particleFloat 20s linear infinite',
            },
            keyframes: {
                glitch: {
                    '0%': { transform: 'translate(0)' },
                    '20%': { transform: 'translate(-2px, 2px)' },
                    '40%': { transform: 'translate(-2px, -2px)' },
                    '60%': { transform: 'translate(2px, 2px)' },
                    '80%': { transform: 'translate(2px, -2px)' },
                    '100%': { transform: 'translate(0)' }
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' }
                },
                kenburns: {
                    '0%': { transform: 'scale(1) translate(0, 0)' },
                    '100%': { transform: 'scale(1.2) translate(-2%, -2%)' }
                },
                marquee: {
                    '0%': { transform: 'translateX(0%)' },
                    '100%': { transform: 'translateX(-50%)' }
                },
                gradientShift: {
                    '0%, 100%': { backgroundPosition: '0% 50%' },
                    '50%': { backgroundPosition: '100% 50%' }
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
                    '33%': { transform: 'translateY(-30px) rotate(5deg)' },
                    '66%': { transform: 'translateY(10px) rotate(-5deg)' }
                },
                glowPulse: {
                    '0%, 100%': { opacity: 0.5, filter: 'blur(20px)' },
                    '50%': { opacity: 0.8, filter: 'blur(30px)' }
                },
                particleFloat: {
                    '0%': { transform: 'translateY(100vh) translateX(0) rotate(0deg)', opacity: 0 },
                    '10%': { opacity: 0.3 },
                    '90%': { opacity: 0.3 },
                    '100%': { transform: 'translateY(-100vh) translateX(100px) rotate(360deg)', opacity: 0 }
                }
            }
        }
    },
    plugins: [],
}
