import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Eye, ThermometerSun, MapPin } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const CurrentWeather = ({ data, type = 'all' }) => {
    const { main, weather, wind, visibility, sys, name } = data;

    const containerVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Main Info View: Location, Temp, Icon
    if (type === 'main') {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center lg:items-start w-full"
            >
                <motion.div variants={itemVariants} className="flex items-center gap-2 mb-2 opacity-60">
                    <MapPin size={16} />
                    <span className="text-sm font-semibold tracking-wider uppercase">{name}, {sys.country}</span>
                </motion.div>

                <motion.h2 variants={itemVariants} className="text-6xl md:text-8xl font-bold tracking-tighter mb-4 text-white">
                    {Math.round(main.temp)}<span className="text-white/30">°</span>
                </motion.h2>

                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-8">
                    <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-xl border border-white/10">
                        <WeatherIcon iconCode={weather[0].icon} description={weather[0].description} size="large" />
                    </div>
                    <div>
                        <p className="text-2xl md:text-3xl font-medium capitalize text-white/90">{weather[0].description}</p>
                        <p className="text-sm opacity-50 font-medium">Feels like {Math.round(main.feels_like)}°</p>
                    </div>
                </motion.div>
            </motion.div>
        );
    }

    // Stats Grid View
    if (type === 'stats') {
        return (
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-2 gap-4 w-full"
            >
                <StatCard
                    variants={itemVariants}
                    icon={<Droplets size={18} className="text-blue-400" />}
                    label="Humidity"
                    value={`${main.humidity}%`}
                />
                <StatCard
                    variants={itemVariants}
                    icon={<Wind size={18} className="text-teal-400" />}
                    label="Wind Speed"
                    value={`${wind.speed} m/s`}
                />
                <StatCard
                    variants={itemVariants}
                    icon={<Eye size={18} className="text-purple-400" />}
                    label="Visibility"
                    value={`${(visibility / 1000).toFixed(1)} km`}
                />
                <StatCard
                    variants={itemVariants}
                    icon={<ThermometerSun size={18} className="text-orange-400" />}
                    label="Pressure"
                    value={`${main.pressure} hPa`}
                />
            </motion.div>
        );
    }

    return null;
};

const StatCard = ({ icon, label, value, variants }) => (
    <motion.div
        variants={variants}
        whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
        className="glass-card p-5 flex flex-col gap-3 group transition-all"
    >
        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
            {icon}
        </div>
        <div>
            <span className="text-sm uppercase tracking-widest opacity-40 font-bold block mb-1">{label}</span>
            <span className="text-xl font-bold tracking-tight">{value}</span>
        </div>
    </motion.div>
);

export default CurrentWeather;

