import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TemperatureIndicator = ({ temperature, feelsLike, minTemp, maxTemp }) => {
    const [animatedTemp, setAnimatedTemp] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setAnimatedTemp(temperature), 100);
        return () => clearTimeout(timer);
    }, [temperature]);

    // Calculate temperature percentage for circular progress (range: -20°C to 50°C)
    const tempRange = { min: -20, max: 50 };
    const percentage = ((temperature - tempRange.min) / (tempRange.max - tempRange.min)) * 100;
    const circumference = 2 * Math.PI * 90; // radius = 90
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    // Get color based on temperature
    const getTemperatureColor = (temp) => {
        if (temp < 0) return '#3b82f6'; // freezing - blue
        if (temp < 10) return '#06b6d4'; // cold - cyan
        if (temp < 20) return '#10b981'; // cool - green
        if (temp < 30) return '#f59e0b'; // warm - amber
        return '#ef4444'; // hot - red
    };

    const tempColor = getTemperatureColor(temperature);
    const feelsLikeDiff = Math.abs(temperature - feelsLike);

    return (
        <div className="relative flex items-center justify-center">
            {/* SVG Circle */}
            <svg className="w-64 h-64 -rotate-90" viewBox="0 0 200 200">
                {/* Background circle */}
                <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="12"
                    className="dark:text-white/5 text-black/10"
                />

                {/* Animated progress circle */}
                <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke={tempColor}
                    strokeWidth="12"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        filter: 'drop-shadow(0 0 8px currentColor)',
                    }}
                />
            </svg>

            {/* Temperature Text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col items-center"
                >
                    <motion.span
                        className="text-6xl font-black dark:text-white text-black tracking-tighter"
                        key={animatedTemp}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        {Math.round(animatedTemp)}°
                    </motion.span>

                    {/* Feels Like */}
                    {feelsLikeDiff > 2 && (
                        <motion.span
                            className="text-sm font-bold dark:text-white/40 text-black/40 mt-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            Feels like {Math.round(feelsLike)}°
                        </motion.span>
                    )}

                    {/* Min/Max Temperature */}
                    {minTemp !== undefined && maxTemp !== undefined && (
                        <motion.div
                            className="flex items-center gap-3 mt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <span className="text-xs font-black dark:text-blue-400 text-blue-600">
                                ↓ {Math.round(minTemp)}°
                            </span>
                            <div className="w-[1px] h-3 dark:bg-white/20 bg-black/20" />
                            <span className="text-xs font-black dark:text-red-400 text-red-600">
                                ↑ {Math.round(maxTemp)}°
                            </span>
                        </motion.div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default TemperatureIndicator;
