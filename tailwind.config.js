/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'Outfit', 'sans-serif'],
            },
            colors: {
                glass: {
                    bg: 'rgba(255, 255, 255, 0.05)',
                    border: 'rgba(255, 255, 255, 0.15)',
                    highlight: 'rgba(255, 255, 255, 0.1)',
                },
                accent: {
                    sun: '#FFD700',
                    rain: '#4A90E2',
                    cloud: '#A0AEC0',
                    storm: '#4A5568',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'drift': 'drift 20s linear infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                drift: {
                    '0%': { transform: 'translateX(-10%)' },
                    '100%': { transform: 'translateX(110%)' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}

