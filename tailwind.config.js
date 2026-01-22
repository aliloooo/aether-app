const config = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'Plus Jakarta Sans', 'Outfit', 'sans-serif'],
                display: ['Manrope', 'Plus Jakarta Sans', 'sans-serif'],
            },
            colors: {
                // Dark Mode Colors
                dark: {
                    bg: '#0a0e1a',
                    card: 'rgba(15, 23, 42, 0.6)',
                    cardHover: 'rgba(15, 23, 42, 0.8)',
                    text: '#e2e8f0',
                    textMuted: '#64748b',
                    border: 'rgba(255, 255, 255, 0.1)',
                },
                // Light Mode Colors
                light: {
                    bg: '#f1f5f9',
                    card: 'rgba(255, 255, 255, 0.7)',
                    cardHover: 'rgba(255, 255, 255, 0.9)',
                    text: '#0f172a',
                    textMuted: '#475569',
                    border: 'rgba(0, 0, 0, 0.1)',
                },
                // Glassmorphism
                glass: {
                    bg: 'rgba(255, 255, 255, 0.05)',
                    bgLight: 'rgba(255, 255, 255, 0.7)',
                    border: 'rgba(255, 255, 255, 0.15)',
                    borderLight: 'rgba(0, 0, 0, 0.1)',
                    highlight: 'rgba(255, 255, 255, 0.1)',
                },
                // Weather Condition Colors
                weather: {
                    sunny: { from: '#FDB813', to: '#FF6B35', light: '#FFE5B4' },
                    sunnyNight: { from: '#0f2027', to: '#203a43', light: '#2c5364' },
                    cloudy: { from: '#bdc3c7', to: '#2c3e50', light: '#95a5a6' },
                    rainy: { from: '#373B44', to: '#4286f4', light: '#5F9EA0' },
                    snowy: { from: '#83a4d4', to: '#b6fbff', light: '#E0F7FA' },
                    storm: { from: '#232526', to: '#414345', light: '#546E7A' },
                    mist: { from: '#606c88', to: '#3f4c6b', light: '#B0BEC5' },
                },
                // Accent Colors
                accent: {
                    primary: '#3b82f6',
                    secondary: '#8b5cf6',
                    success: '#10b981',
                    warning: '#f59e0b',
                    danger: '#ef4444',
                },
                // Temperature Gradient
                temp: {
                    freezing: '#3b82f6',
                    cold: '#06b6d4',
                    cool: '#10b981',
                    warm: '#f59e0b',
                    hot: '#ef4444',
                }
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'drift': 'drift 20s linear infinite',
                'drift-slow': 'drift 30s linear infinite',
                'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'slide-down': 'slideDown 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                'fade-in': 'fadeIn 0.4s ease-out',
                'fade-out': 'fadeOut 0.4s ease-out',
                'scale-in': 'scaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'scale-out': 'scaleOut 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                'rain': 'rain 1s linear infinite',
                'snow': 'snow 3s linear infinite',
                'lightning': 'lightning 0.5s ease-in-out',
                'shimmer': 'shimmer 2s ease-in-out infinite',
                'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
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
                slideDown: {
                    '0%': { transform: 'translateY(-20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                fadeOut: {
                    '0%': { opacity: '1' },
                    '100%': { opacity: '0' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                scaleOut: {
                    '0%': { transform: 'scale(1)', opacity: '1' },
                    '100%': { transform: 'scale(0.95)', opacity: '0' },
                },
                rain: {
                    '0%': { transform: 'translateY(-100vh)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translateY(100vh)', opacity: '0' },
                },
                snow: {
                    '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
                    '10%': { opacity: '1' },
                    '90%': { opacity: '1' },
                    '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' },
                },
                lightning: {
                    '0%, 100%': { opacity: '0' },
                    '50%': { opacity: '1' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                bounceGentle: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-10px)' },
                }
            },
            backdropBlur: {
                xs: '2px',
            },
            backgroundImage: {
                'shimmer-gradient': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
            }
        },
    },
    plugins: [],
}

export default config;

