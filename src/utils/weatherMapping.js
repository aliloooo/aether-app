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
    Clear: 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]',
    Clouds: 'bg-gradient-to-br from-[#89f7fe] to-[#66a6ff]',
    Rain: 'bg-gradient-to-br from-[#30cfd0] to-[#330867]',
    Drizzle: 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]',
    Thunderstorm: 'bg-gradient-to-br from-[#1e3c72] to-[#2a5298]',
    Snow: 'bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb]',
    Mist: 'bg-gradient-to-br from-[#6a11cb] to-[#2575fc]',
    Default: 'bg-gradient-to-br from-[#1e3c72] to-[#2a5298]'
};

