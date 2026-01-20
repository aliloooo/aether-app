import React from 'react';
import { motion } from 'framer-motion';
import {
    Wind,
    Droplets,
    Thermometer,
    Eye,
    MapPin,
    TrendingUp,
    AlertCircle,
    ChevronUp
} from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const CurrentWeather = ({ data, aqiData, type = 'main' }) => {
    if (!data) return null;

    const { main, weather, wind, name, visibility } = data;
    const currentTemp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const condition = weather[0].description;
    const iconCode = weather[0].icon;
    const weatherId = weather[0].id;

    // Smart Insight Logic
    const getInsight = () => {
        if (weatherId >= 200 && weatherId < 600) return "Don't forget your umbrella ☔";
        if (weatherId >= 600 && weatherId < 700) return "Bundle up, it's snowy ❄️";
        if (weatherId === 800) return "Perfect time for a walk ☀️";
        if (weatherId > 800) return "A bit cloudy, but nice ☁️";
        if (currentTemp > 30) return "Stay hydrated, it's hot 🥤";
        if (currentTemp < 10) return "Wear a warm jacket 🧥";
        return "Enjoy your day! ✨";
    };

    const aqiMap = {
        1: { label: 'Good', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
        2: { label: 'Fair', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
        3: { label: 'Moderate', color: 'text-orange-400', bg: 'bg-orange-500/10' },
        4: { label: 'Poor', color: 'text-red-400', bg: 'bg-red-500/10' },
        5: { label: 'Hazardous', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    };

    const aqi = aqiData?.list?.[0]?.main?.aqi || 1;
    const aqiInfo = aqiMap[aqi];

    if (type === 'stats') {
        const stats = [
            { id: 'humidity', icon: Droplets, label: 'Humidity', value: `${main.humidity}%`, color: 'text-blue-400' },
            { id: 'wind', icon: Wind, label: 'Wind Speed', value: `${wind.speed}m/s`, color: 'text-teal-400' },
            { id: 'feels', icon: Thermometer, label: 'Feels Like', value: `${feelsLike}°`, color: 'text-orange-400' },
            { id: 'visibility', icon: Eye, label: 'Visibility', value: `${visibility / 1000}km`, color: 'text-indigo-400' },
            { id: 'aqi', icon: AlertCircle, label: 'Air Quality', value: aqiInfo.label, color: aqiInfo.color },
            { id: 'pressure', icon: TrendingUp, label: 'Pressure', value: `${main.pressure}hPa`, color: 'text-pink-400' },
        ];

        return (
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-glass-bg backdrop-blur-md rounded-[32px] p-6 border border-glass-border flex flex-col gap-3 group transition-colors hover:bg-glass-highlight"
                    >
                        <div className={`p-3 rounded-2xl w-fit ${stat.color.replace('text', 'bg')}/10`}>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-white font-black text-2xl tracking-tighter leading-none">{stat.value}</span>
                            <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mt-1">{stat.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center py-4">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 px-6 py-2.5 bg-glass-bg hover:bg-glass-highlight transition-all rounded-full border border-glass-border mb-8 backdrop-blur-xl cursor-default group"
            >
                <div className="p-1 bg-white text-black rounded-lg group-hover:rotate-12 transition-transform duration-300">
                    <MapPin size={12} strokeWidth={3} />
                </div>
                <span className="text-white font-black text-xs uppercase tracking-[0.2em]">{name}</span>
            </motion.div>

            <div className="relative mb-6">
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10 drop-shadow-2xl"
                >
                    <WeatherIcon iconCode={iconCode} description={condition} size="large" />
                </motion.div>
                {/* Dynamic Glow managed by BackgroundLayer, keeping local simple */}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="flex flex-col items-center pointer-events-none"
            >
                <div className="flex items-start">
                    <span className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 drop-shadow-lg">
                        {currentTemp}
                    </span>
                    <span className="text-5xl md:text-7xl font-black text-white/30 mt-6 md:mt-8 tracking-tighter ml-1">°</span>
                </div>

                <div className="flex flex-col items-center gap-4 mt-[-10px] md:mt-[-20px]">
                    <p className="text-xl md:text-3xl font-black text-white uppercase tracking-[0.2em] ml-[0.2em]">
                        {condition}
                    </p>

                    {/* Smart Insight Pill */}
                    <div className="px-5 py-2 rounded-full bg-white/10 border border-white/10 backdrop-blur-md">
                        <span className="text-xs font-bold text-white/90 tracking-wide">{getInsight()}</span>
                    </div>

                    <div className="flex items-center gap-2 text-white/30 font-bold text-[10px] uppercase tracking-widest mt-2">
                        <ChevronUp size={10} className="text-emerald-400" />
                        Feels like {feelsLike}°
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default CurrentWeather;
