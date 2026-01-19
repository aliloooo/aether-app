export const getWeatherTheme = (weatherCode) => {
    // Group 2xx: Thunderstorm
    if (weatherCode >= 200 && weatherCode < 300) return 'Thunderstorm';
    // Group 3xx: Drizzle
    if (weatherCode >= 300 && weatherCode < 400) return 'Drizzle';
    // Group 5xx: Rain
    if (weatherCode >= 500 && weatherCode < 600) return 'Rain';
    // Group 6xx: Snow
    if (weatherCode >= 600 && weatherCode < 700) return 'Snow';
    // Group 7xx: Atmosphere (Mist, Smoke, Haze, Dust, Fog, Sand, Dust, Ash, Squall, Tornado)
    if (weatherCode >= 700 && weatherCode < 800) return 'Mist';
    // Group 800: Clear
    if (weatherCode === 800) return 'Clear';
    // Group 80x: Clouds
    if (weatherCode > 800) return 'Clouds';

    return 'Default';
};

export const bgGradients = {
    Clear: 'bg-gradient-to-br from-blue-400 to-blue-600',
    Clouds: 'bg-gradient-to-br from-slate-400 to-slate-600',
    Rain: 'bg-gradient-to-br from-slate-700 to-slate-900',
    Drizzle: 'bg-gradient-to-br from-cyan-600 to-blue-800',
    Thunderstorm: 'bg-gradient-to-br from-gray-900 to-black',
    Snow: 'bg-gradient-to-br from-blue-100 to-slate-300',
    Mist: 'bg-gradient-to-br from-zinc-400 to-stone-500',
    Default: 'bg-gradient-to-br from-slate-800 to-blue-900'
};
