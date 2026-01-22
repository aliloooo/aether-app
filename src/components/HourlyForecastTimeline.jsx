import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Cloud, CloudRain, Droplets, Wind } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const HourlyForecastTimeline = ({ forecastData }) => {
    const scrollRef = useRef(null);

    if (!forecastData?.list) return null;

    // Get next 24 hours (8 items, 3-hour intervals)
    const hourlyData = forecastData.list.slice(0, 8);
    const currentHour = new Date().getHours();

    const getWindDirection = (deg) => {
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        return directions[Math.round(deg / 45) % 8];
    };

    return (
        <div className="w-full">
            {/* Scrollable Container */}
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {hourlyData.map((hour, index) => {
                    const time = new Date(hour.dt * 1000);
                    const isCurrentHour = index === 0;
                    const temp = Math.round(hour.main.temp);
                    const precipitation = hour.pop * 100;

                    return (
                        <motion.div
                            key={hour.dt}
                            className={`flex-shrink-0 w-32 p-4 rounded-3xl border backdrop-blur-2xl snap-start transition-all
                                        ${isCurrentHour
                                    ? 'dark:bg-white/10 dark:border-white/20 bg-black/10 border-black/20 scale-105'
                                    : 'dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/[0.07] bg-black/5 border-black/10 hover:bg-black/[0.07]'
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -4 }}
                        >
                            {/* Time */}
                            <div className="text-center mb-3">
                                <p className={`text-xs font-black uppercase tracking-wider
                                                ${isCurrentHour ? 'dark:text-white text-black' : 'dark:text-white/50 text-black/50'}`}>
                                    {isCurrentHour ? 'Now' : format(time, 'HH:mm')}
                                </p>
                            </div>

                            {/* Weather Icon */}
                            <div className="flex justify-center mb-3">
                                <WeatherIcon
                                    iconCode={hour.weather[0].icon}
                                    size={40}
                                    className="opacity-90"
                                />
                            </div>

                            {/* Temperature */}
                            <div className="text-center mb-3">
                                <p className="text-2xl font-black dark:text-white text-black tracking-tighter">
                                    {temp}°
                                </p>
                            </div>

                            {/* Precipitation */}
                            {precipitation > 20 && (
                                <div className="flex items-center justify-center gap-1 mb-2">
                                    <Droplets className="w-3 h-3 dark:text-blue-400 text-blue-600" />
                                    <span className="text-[10px] font-bold dark:text-blue-400 text-blue-600">
                                        {Math.round(precipitation)}%
                                    </span>
                                </div>
                            )}

                            {/* Wind */}
                            <div className="flex items-center justify-center gap-1">
                                <Wind className="w-3 h-3 dark:text-white/40 text-black/40" />
                                <span className="text-[10px] font-bold dark:text-white/40 text-black/40">
                                    {Math.round(hour.wind.speed)} m/s
                                </span>
                            </div>

                            {/* Wind Direction Indicator */}
                            <div className="flex justify-center mt-2">
                                <div
                                    className="w-5 h-5 rounded-full dark:bg-white/10 bg-black/10 flex items-center justify-center"
                                    style={{ transform: `rotate(${hour.wind.deg}deg)` }}
                                >
                                    <div className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent dark:border-b-white/60 border-b-black/60" />
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center mt-4 gap-1">
                {hourlyData.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 rounded-full transition-all
                                    ${index === 0 ? 'w-4 dark:bg-white/40 bg-black/40' : 'w-1 dark:bg-white/20 bg-black/20'}`}
                    />
                ))}
            </div>

            <style jsx>{`
                .scrollbar-hide::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </div>
    );
};

export default HourlyForecastTimeline;
