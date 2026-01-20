const config = {
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
                weather: {
                    sunny: { from: '#4facfe', to: '#00f2fe' },
                    sunnyNight: { from: '#0f2027', to: '#203a43' },
                    cloudy: { from: '#bdc3c7', to: '#2c3e50' },
                    rainy: { from: '#373B44', to: '#4286f4' },
                    snowy: { from: '#83a4d4', to: '#b6fbff' },
                    storm: { from: '#232526', to: '#414345' },
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'drift': 'drift 20s linear infinite',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-in': 'fadeIn 0.4s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                drift: {
                    '0%': { transform: 'translateX(-10%)' },
                    '100%': { transform: 'translateX(110%)' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                }
            },
            backdropBlur: {
                xs: '2px',
            }
        },
    },
    plugins: [],
}

export default config;

