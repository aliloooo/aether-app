import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, addDays } from 'date-fns';
import { ChevronDown, Droplets, Wind, Sunrise, Sunset, Eye, Gauge } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const WeeklyForecastGrid = ({ forecastData }) => {
    const [expandedDay, setExpandedDay] = useState(null);

    if (!forecastData?.list) return null;

    // Group forecast by day (taking one forecast per day around noon)
    const dailyForecasts = [];
    const processedDates = new Set();

    forecastData.list.forEach((item) => {
        const date = format(new Date(item.dt * 1000), 'yyyy-MM-dd');
        const hour = new Date(item.dt * 1000).getHours();

        // Take the forecast around noon (12:00) for each day
        if (!processedDates.has(date) && hour >= 11 && hour <= 14) {
            processedDates.add(date);
            dailyForecasts.push(item);
        }
    });

    // Take up to 7 days
    const weeklyData = dailyForecasts.slice(0, 7);

    const toggleExpand = (index) => {
        setExpandedDay(expandedDay === index ? null : index);
    };

    return (
        <div className="grid grid-cols-1 gap-4">
            {weeklyData.map((day, index) => {
                const date = new Date(day.dt * 1000);
                const isExpanded = expandedDay === index;
                const isToday = index === 0;
                const temp = Math.round(day.main.temp);
                const tempMin = Math.round(day.main.temp_min);
                const tempMax = Math.round(day.main.temp_max);
                const precipitation = Math.round(day.pop * 100);

                return (
                    <motion.div
                        key={day.dt}
                        layout
                        className="rounded-[32px] border backdrop-blur-2xl overflow-hidden
                                   dark:bg-white/5 dark:border-white/10
                                   bg-black/5 border-black/10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, layout: { duration: 0.3 } }}
                    >
                        {/* Main Card - Always Visible */}
                        <button
                            onClick={() => toggleExpand(index)}
                            className="w-full p-6 flex items-center gap-6 dark:hover:bg-white/[0.03] hover:bg-black/[0.03] transition-colors"
                        >
                            {/* Day */}
                            <div className="flex flex-col items-start min-w-[100px]">
                                <p className="text-lg font-black dark:text-white text-black">
                                    {isToday ? 'Today' : format(date, 'EEEE')}
                                </p>
                                <p className="text-xs font-bold dark:text-white/40 text-black/40">
                                    {format(date, 'MMM d')}
                                </p>
                            </div>

                            {/* Weather Icon */}
                            <div className="flex-shrink-0">
                                <WeatherIcon iconCode={day.weather[0].icon} size={48} />
                            </div>

                            {/* Weather Description */}
                            <div className="flex-1 text-left">
                                <p className="text-sm font-bold dark:text-white/70 text-black/70 capitalize">
                                    {day.weather[0].description}
                                </p>
                            </div>

                            {/* Temperature Range */}
                            <div className="flex items-center gap-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-2xl font-black dark:text-white text-black">
                                        {tempMax}°
                                    </span>
                                    <span className="text-lg font-black dark:text-white/40 text-black/40">
                                        {tempMin}°
                                    </span>
                                </div>

                                {/* Precipitation Badge */}
                                {precipitation > 20 && (
                                    <div className="flex items-center gap-1 px-3 py-1 rounded-full dark:bg-blue-500/20 bg-blue-500/30">
                                        <Droplets className="w-3 h-3 dark:text-blue-400 text-blue-600" />
                                        <span className="text-xs font-bold dark:text-blue-400 text-blue-600">
                                            {precipitation}%
                                        </span>
                                    </div>
                                )}
                            </div>

                            {/* Expand Icon */}
                            <motion.div
                                animate={{ rotate: isExpanded ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <ChevronDown className="w-5 h-5 dark:text-white/40 text-black/40" />
                            </motion.div>
                        </button>

                        {/* Expanded Details */}
                        <AnimatePresence>
                            {isExpanded && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="border-t dark:border-white/10 border-black/10 overflow-hidden"
                                >
                                    <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {/* Humidity */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 dark:text-white/40 text-black/40">
                                                <Droplets className="w-4 h-4" />
                                                <span className="text-xs font-black uppercase tracking-wider">
                                                    Humidity
                                                </span>
                                            </div>
                                            <p className="text-2xl font-black dark:text-white text-black">
                                                {day.main.humidity}%
                                            </p>
                                        </div>

                                        {/* Wind */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 dark:text-white/40 text-black/40">
                                                <Wind className="w-4 h-4" />
                                                <span className="text-xs font-black uppercase tracking-wider">
                                                    Wind
                                                </span>
                                            </div>
                                            <p className="text-2xl font-black dark:text-white text-black">
                                                {Math.round(day.wind.speed)} m/s
                                            </p>
                                        </div>

                                        {/* Pressure */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 dark:text-white/40 text-black/40">
                                                <Gauge className="w-4 h-4" />
                                                <span className="text-xs font-black uppercase tracking-wider">
                                                    Pressure
                                                </span>
                                            </div>
                                            <p className="text-2xl font-black dark:text-white text-black">
                                                {day.main.pressure} hPa
                                            </p>
                                        </div>

                                        {/* Visibility */}
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2 dark:text-white/40 text-black/40">
                                                <Eye className="w-4 h-4" />
                                                <span className="text-xs font-black uppercase tracking-wider">
                                                    Visibility
                                                </span>
                                            </div>
                                            <p className="text-2xl font-black dark:text-white text-black">
                                                {(day.visibility / 1000).toFixed(1)} km
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default WeeklyForecastGrid;
