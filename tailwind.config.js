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
                dark: '#0A0A0A',
                surface: '#121212',
                border: '#262626'
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
                }
            }
        }
    },
    plugins: [],
}
