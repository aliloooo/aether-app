import React from 'react';
import { motion } from 'framer-motion';
import {
    Wind,
    Droplets,
    Thermometer,
    Eye,
    MapPin,
    TrendingUp,
    AlertCircle
} from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const CurrentWeather = ({ data, aqiData, type = 'main' }) => {
    if (!data) return null;

    const { main, weather, wind, name, visibility } = data;
    const currentTemp = Math.round(main.temp);
    const feelsLike = Math.round(main.feels_like);
    const condition = weather[0].description;
    const iconCode = weather[0].icon;

    // AQI Map
    const aqiMap = {
        1: { label: 'Good', color: 'text-green-400' },
        2: { label: 'Fair', color: 'text-yellow-400' },
        3: { label: 'Moderate', color: 'text-orange-400' },
        4: { label: 'Poor', color: 'text-red-400' },
        5: { label: 'Very Poor', color: 'text-purple-400' },
    };

    const aqi = aqiData?.list?.[0]?.main?.aqi || 1;
    const aqiInfo = aqiMap[aqi];

    if (type === 'stats') {
        const stats = [
            { id: 'humidity', icon: Droplets, label: 'Humidity', value: `${main.humidity}%`, color: 'text-blue-400' },
            { id: 'wind', icon: Wind, label: 'Wind', value: `${wind.speed} m/s`, color: 'text-emerald-400' },
            { id: 'feels', icon: Thermometer, label: 'Feels Like', value: `${feelsLike}°`, color: 'text-orange-400' },
            { id: 'visibility', icon: Eye, label: 'Visibility', value: `${visibility / 1000} km`, color: 'text-indigo-400' },
            { id: 'aqi', icon: AlertCircle, label: 'AQI', value: aqiInfo.label, color: aqiInfo.color },
            { id: 'pressure', icon: TrendingUp, label: 'Pressure', value: `${main.pressure} hPa`, color: 'text-pink-400' },
        ];

        return (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {stats.map((stat) => (
                    <motion.div
                        key={stat.id}
                        whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.08)' }}
                        className="bg-white/5 rounded-3xl p-4 border border-white/5 flex flex-col gap-2 transition-colors"
                    >
                        <stat.icon size={20} className={`${stat.color} opacity-80`} />
                        <div className="flex flex-col">
                            <span className="text-white font-black text-xl tracking-tighter">{stat.value}</span>
                            <span className="text-white/40 text-[9px] font-black uppercase tracking-widest">{stat.label}</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center text-center gap-2">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10 mb-2"
            >
                <MapPin size={14} className="text-white/60" />
                <span className="text-white font-black text-[10px] uppercase tracking-widest">{name}</span>
            </motion.div>

            <div className="relative group">
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 2, -2, 0]
                    }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative z-10"
                >
                    <WeatherIcon iconCode={iconCode} description={condition} size="large" />
                </motion.div>
                <div className="absolute inset-0 bg-white/20 blur-[100px] rounded-full filter group-hover:bg-white/30 transition-all duration-1000"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center mt-[-20px]"
            >
                <div className="flex items-start">
                    <span className="text-[120px] md:text-[160px] font-black leading-none tracking-tighter text-white drop-shadow-2xl">
                        {currentTemp}
                    </span>
                    <span className="text-4xl md:text-6xl font-black text-white/40 mt-6 md:mt-10 tracking-tighter">°</span>
                </div>
                <p className="text-lg md:text-xl font-black text-white/50 uppercase tracking-[0.3em] mt-[-10px] md:mt-[-20px]">
                    {condition}
                </p>
            </motion.div>
        </div>
    );
};

export default CurrentWeather;
