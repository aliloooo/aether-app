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
import TemperatureIndicator from './TemperatureIndicator';

const CurrentWeather = ({ data, aqiData, type = 'main', useCircularTemp = false }) => {
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
        1: { label: 'Good', color: 'dark:text-emerald-400 text-emerald-600', bg: 'dark:bg-emerald-500/10 bg-emerald-500/20' },
        2: { label: 'Fair', color: 'dark:text-yellow-400 text-yellow-600', bg: 'dark:bg-yellow-500/10 bg-yellow-500/20' },
        3: { label: 'Moderate', color: 'dark:text-orange-400 text-orange-600', bg: 'dark:bg-orange-500/10 bg-orange-500/20' },
        4: { label: 'Poor', color: 'dark:text-red-400 text-red-600', bg: 'dark:bg-red-500/10 bg-red-500/20' },
        5: { label: 'Hazardous', color: 'dark:text-purple-400 text-purple-600', bg: 'dark:bg-purple-500/10 bg-purple-500/20' },
    };

    const aqi = aqiData?.list?.[0]?.main?.aqi || 1;
    const aqiInfo = aqiMap[aqi];

    if (type === 'stats') {
        const stats = [
            { id: 'humidity', icon: Droplets, label: 'Humidity', value: `${main.humidity}%`, color: 'dark:text-blue-400 text-blue-600', bg: 'dark:bg-blue-400/10 bg-blue-400/20' },
            { id: 'wind', icon: Wind, label: 'Wind Speed', value: `${wind.speed}m/s`, color: 'dark:text-teal-400 text-teal-600', bg: 'dark:bg-teal-400/10 bg-teal-400/20' },
            { id: 'feels', icon: Thermometer, label: 'Feels Like', value: `${feelsLike}°`, color: 'dark:text-orange-400 text-orange-600', bg: 'dark:bg-orange-400/10 bg-orange-400/20' },
            { id: 'visibility', icon: Eye, label: 'Visibility', value: `${visibility / 1000}km`, color: 'dark:text-indigo-400 text-indigo-600', bg: 'dark:bg-indigo-400/10 bg-indigo-400/20' },
            { id: 'aqi', icon: AlertCircle, label: 'Air Quality', value: aqiInfo.label, color: aqiInfo.color, bg: aqiInfo.bg },
            { id: 'pressure', icon: TrendingUp, label: 'Pressure', value: `${main.pressure}hPa`, color: 'dark:text-pink-400 text-pink-600', bg: 'dark:bg-pink-400/10 bg-pink-400/20' },
        ];

        return (
            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={stat.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        whileHover={{ scale: 1.02, y: -2 }}
                        className="backdrop-blur-md rounded-[32px] p-6 border flex flex-col gap-3 group transition-all
                                   dark:bg-glass-bg dark:border-glass-border dark:hover:bg-glass-highlight
                                   bg-glass-bgLight border-glass-borderLight hover:bg-white/90"
                    >
                        <div className={`p-3 rounded-2xl w-fit ${stat.bg}`}>
                            <stat.icon size={20} className={stat.color} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-black text-2xl tracking-tighter leading-none dark:text-white text-black">
                                {stat.value}
                            </span>
                            <span className="text-[9px] font-black uppercase tracking-widest mt-1 dark:text-white/40 text-black/40">
                                {stat.label}
                            </span>
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
                className="flex items-center gap-3 px-6 py-2.5 transition-all rounded-full border backdrop-blur-xl cursor-default group
                           dark:bg-glass-bg dark:border-glass-border dark:hover:bg-glass-highlight
                           bg-glass-bgLight border-glass-borderLight hover:bg-white/90 mb-8"
            >
                <div className="p-1 rounded-lg group-hover:rotate-12 transition-transform duration-300 dark:bg-white dark:text-black bg-black text-white">
                    <MapPin size={12} strokeWidth={3} />
                </div>
                <span className="font-black text-xs uppercase tracking-[0.2em] dark:text-white text-black">
                    {name}
                </span>
            </motion.div>

            {useCircularTemp ? (
                <TemperatureIndicator
                    temperature={currentTemp}
                    feelsLike={feelsLike}
                    minTemp={main.temp_min}
                    maxTemp={main.temp_max}
                />
            ) : (
                <>
                    <div className="relative mb-6">
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10 drop-shadow-2xl"
                        >
                            <WeatherIcon iconCode={iconCode} description={condition} size="large" />
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="flex flex-col items-center pointer-events-none"
                    >
                        <div className="flex items-start">
                            <span className="text-[120px] md:text-[180px] font-black leading-none tracking-tighter drop-shadow-lg
                                           dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-b dark:from-white dark:to-white/50
                                           text-black">
                                {currentTemp}
                            </span>
                            <span className="text-5xl md:text-7xl font-black mt-6 md:mt-8 tracking-tighter ml-1 dark:text-white/30 text-black/30">
                                °
                            </span>
                        </div>

                        <div className="flex flex-col items-center gap-4 mt-[-10px] md:mt-[-20px]">
                            <p className="text-xl md:text-3xl font-black uppercase tracking-[0.2em] ml-[0.2em] dark:text-white text-black">
                                {condition}
                            </p>

                            {/* Smart Insight Pill */}
                            <div className="px-5 py-2 rounded-full border backdrop-blur-md
                                           dark:bg-white/10 dark:border-white/10
                                           bg-black/10 border-black/10">
                                <span className="text-xs font-bold tracking-wide dark:text-white/90 text-black/90">
                                    {getInsight()}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 font-bold text-[10px] uppercase tracking-widest mt-2 dark:text-white/30 text-black/30">
                                <ChevronUp size={10} className="dark:text-emerald-400 text-emerald-600" />
                                Feels like {feelsLike}°
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </div>
    );
};

export default CurrentWeather;
