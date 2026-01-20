// Weather Type definition maps to visual themes
export const THEMES = {
    Clear: {
        id: 'Clear',
        gradient: 'bg-gradient-to-br from-[#FFD200] via-[#F7971E] to-[#FFD200]', // Warm Sunny
        dayIcon: 'd',
        textColor: 'text-amber-100',
        accentColor: 'text-yellow-300',
        glassColor: 'bg-amber-500/10'
    },
    ClearNight: {
        id: 'ClearNight',
        gradient: 'bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]', // Deep Night
        dayIcon: 'n',
        textColor: 'text-blue-100',
        accentColor: 'text-blue-300',
        glassColor: 'bg-blue-900/10'
    },
    Clouds: {
        id: 'Clouds',
        gradient: 'bg-gradient-to-br from-[#8e9eab] via-[#eef2f3] to-[#8e9eab]', // Soft Cloud
        dayIcon: 'd',
        textColor: 'text-slate-800', // Darker text for light bg
        accentColor: 'text-blue-500',
        glassColor: 'bg-white/20'
    },
    CloudsNight: {
        id: 'CloudsNight',
        gradient: 'bg-gradient-to-br from-[#232526] via-[#414345] to-[#232526]', // Dark metal
        dayIcon: 'n',
        textColor: 'text-gray-300',
        accentColor: 'text-gray-400',
        glassColor: 'bg-white/5'
    },
    Rain: {
        id: 'Rain',
        gradient: 'bg-gradient-to-br from-[#00c6ff] via-[#0072ff] to-[#00c6ff]', // Vibrant Blue
        dayIcon: 'd',
        textColor: 'text-blue-50',
        accentColor: 'text-blue-200',
        glassColor: 'bg-blue-500/10'
    },
    RainNight: {
        id: 'RainNight',
        gradient: 'bg-gradient-to-br from-[#141E30] via-[#243B55] to-[#141E30]', // Dark Blue
        dayIcon: 'n',
        textColor: 'text-indigo-100',
        accentColor: 'text-indigo-300',
        glassColor: 'bg-indigo-900/20'
    },
    Thunderstorm: {
        id: 'Thunderstorm',
        gradient: 'bg-gradient-to-br from-[#232526] via-[#414345] to-[#2C5364]', // Stormy dark
        dayIcon: 'd',
        textColor: 'text-purple-100',
        accentColor: 'text-yellow-400', // Lightning accent
        glassColor: 'bg-gray-800/30'
    },
    Snow: {
        id: 'Snow',
        gradient: 'bg-gradient-to-br from-[#E0EAFC] via-[#CFDEF3] to-[#E0EAFC]', // Snowy White
        dayIcon: 'd',
        textColor: 'text-blue-900', // Dark text
        accentColor: 'text-blue-500',
        glassColor: 'bg-white/30'
    },
    Mist: {
        id: 'Mist',
        gradient: 'bg-gradient-to-br from-[#3E5151] via-[#DECBA4] to-[#3E5151]', // Foggy
        dayIcon: 'd',
        textColor: 'text-gray-100',
        accentColor: 'text-gray-300',
        glassColor: 'bg-gray-500/20'
    },
    Default: {
        id: 'Default',
        gradient: 'bg-gradient-to-br from-[#4facfe] via-[#00f2fe] to-[#4facfe]',
        dayIcon: 'd',
        textColor: 'text-white',
        accentColor: 'text-white/50',
        glassColor: 'bg-white/10'
    }
};

export const getWeatherTheme = (weatherCode, isDay = true) => {
    const code = weatherCode.toString();
    const prefix = code[0];

    let type = 'Clear';
    if (prefix === '2') type = 'Thunderstorm';
    else if (prefix === '3') type = 'Rain'; // Drizzle treated as Rain
    else if (prefix === '5') type = 'Rain';
    else if (prefix === '6') type = 'Snow';
    else if (prefix === '7') type = 'Mist';
    else if (code === '800') type = 'Clear';
    else if (prefix === '8') type = 'Clouds';

    // Handle Night variations
    if (!isDay && ['Clear', 'Clouds', 'Rain'].includes(type)) {
        type = `${type}Night`;
    }

    return THEMES[type] || THEMES['Default'];
};

