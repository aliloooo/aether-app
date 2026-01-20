export const getWeatherTheme = (weatherCode, isDay = true) => {
    const code = weatherCode.toString();
    const prefix = code[0];

    let type = 'Clear';
    if (prefix === '2') type = 'Thunderstorm';
    else if (prefix === '3') type = 'Drizzle';
    else if (prefix === '5') type = 'Rain';
    else if (prefix === '6') type = 'Snow';
    else if (prefix === '7') type = 'Mist';
    else if (code === '800') type = 'Clear';
    else if (prefix === '8') type = 'Clouds';

    return isDay ? type : `${type}Night`;
};

export const bgGradients = {
    Clear: 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]',
    ClearNight: 'bg-gradient-to-br from-[#243B55] to-[#141E30]',
    Clouds: 'bg-gradient-to-br from-[#89f7fe] to-[#66a6ff]',
    CloudsNight: 'bg-gradient-to-br from-[#434343] to-[#000000]',
    Rain: 'bg-gradient-to-br from-[#30cfd0] to-[#330867]',
    RainNight: 'bg-gradient-to-br from-[#1e3c72] to-[#2a5298]',
    Drizzle: 'bg-gradient-to-br from-[#4facfe] to-[#00f2fe]',
    Thunderstorm: 'bg-gradient-to-br from-[#1e3c72] to-[#2a5298]',
    Snow: 'bg-gradient-to-br from-[#a1c4fd] to-[#c2e9fb]',
    Mist: 'bg-gradient-to-br from-[#1e3c72] to-[#2a5298]',
    Default: 'bg-gradient-to-br from-[#1e3c72] to-[#2a5298]'
};

