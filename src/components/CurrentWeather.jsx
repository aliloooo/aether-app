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
                className="flex flex-col items-center lg:items-start w-full"
            >
                <div className="flex flex-col text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-2 text-white/90">
                        {name}, <span className="text-white/60">{sys.country}</span>
                    </h2>
                    <p className="text-xl md:text-2xl opacity-80 capitalize mb-6 font-light tracking-wide">{weather[0].description}</p>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                        <span className="text-8xl md:text-9xl font-light tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                            {Math.round(main.temp)}°
                        </span>
                        <div className="scale-110 md:scale-125 lg:scale-150 p-4">
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
                className="grid grid-cols-2 gap-3 md:gap-4 w-full"
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
    <div className="glass-card p-4 flex flex-col items-center justify-center text-center gap-2 h-24 md:h-32 hover:bg-white/10 transition-colors">
        <div className="opacity-70 text-white/80">{icon}</div>
        <div>
            <span className="text-lg md:text-xl font-semibold block tracking-tight">{value}</span>
            <span className="text-[10px] md:text-xs uppercase tracking-wider opacity-50">{label}</span>
        </div>
    </div>
);

export default CurrentWeather;
