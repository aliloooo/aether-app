import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Eye, ThermometerSun } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const CurrentWeather = ({ data, type = 'all' }) => {
    const { main, weather, wind, visibility, sys, name } = data;

    // Main Info View: Location, Temp, Icon
    if (type === 'main' || type === 'all') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center md:items-start"
            >
                <div className="flex flex-col text-center md:text-left">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2">{name}, {sys.country}</h2>
                    <p className="text-lg opacity-60 capitalize mb-6">{weather[0].description}</p>

                    <div className="flex items-center gap-6">
                        <span className="text-8xl md:text-9xl font-light tracking-tighter">
                            {Math.round(main.temp)}°
                        </span>
                        <div className="hidden md:block">
                            <WeatherIcon iconCode={weather[0].icon} description={weather[0].description} size="large" />
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Stats Grid View
    if (type === 'stats' || type === 'all') {
        return (
            <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="grid grid-cols-2 gap-4 w-full"
            >
                <StatCard
                    icon={<Droplets size={20} />}
                    label="Humidity"
                    value={`${main.humidity}%`}
                />
                <StatCard
                    icon={<Wind size={20} />}
                    label="Wind"
                    value={`${wind.speed} m/s`}
                />
                <StatCard
                    icon={<Eye size={20} />}
                    label="Visibility"
                    value={`${(visibility / 1000).toFixed(1)} km`}
                />
                <StatCard
                    icon={<ThermometerSun size={20} />}
                    label="Feels Like"
                    value={`${Math.round(main.feels_like)}°`}
                />
            </motion.div>
        );
    }
};

const StatCard = ({ icon, label, value }) => (
    <div className="glass-card p-4 flex flex-col items-center justify-center text-center gap-2 h-28">
        <div className="opacity-70">{icon}</div>
        <div>
            <span className="text-lg font-semibold block">{value}</span>
            <span className="text-[10px] uppercase tracking-wider opacity-50">{label}</span>
        </div>
    </div>
);

export default CurrentWeather;
