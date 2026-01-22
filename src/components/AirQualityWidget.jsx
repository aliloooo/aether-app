import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, ThumbsUp } from 'lucide-react';

const AirQualityWidget = ({ aqiData }) => {
    if (!aqiData?.list?.[0]) return null;

    const aqi = aqiData.list[0];
    const aqiValue = aqi.main.aqi;
    const components = aqi.components;

    // AQI Levels: 1=Good, 2=Fair, 3=Moderate, 4=Poor, 5=Very Poor
    const aqiLevels = {
        1: { label: 'Good', color: 'emerald', bgColor: 'bg-emerald-500', textColor: 'text-emerald-600', darkTextColor: 'dark:text-emerald-400' },
        2: { label: 'Fair', color: 'green', bgColor: 'bg-green-500', textColor: 'text-green-600', darkTextColor: 'dark:text-green-400' },
        3: { label: 'Moderate', color: 'yellow', bgColor: 'bg-yellow-500', textColor: 'text-yellow-600', darkTextColor: 'dark:text-yellow-400' },
        4: { label: 'Poor', color: 'orange', bgColor: 'bg-orange-500', textColor: 'text-orange-600', darkTextColor: 'dark:text-orange-400' },
        5: { label: 'Very Poor', color: 'red', bgColor: 'bg-red-500', textColor: 'text-red-600', darkTextColor: 'dark:text-red-400' },
    };

    const currentLevel = aqiLevels[aqiValue] || aqiLevels[3];

    const getHealthRecommendation = (aqi) => {
        switch (aqi) {
            case 1:
                return 'Air quality is satisfactory. Enjoy outdoor activities!';
            case 2:
                return 'Air quality is acceptable for most people.';
            case 3:
                return 'Sensitive groups may experience minor effects.';
            case 4:
                return 'Everyone may experience health effects. Limit outdoor exposure.';
            case 5:
                return 'Health alert: Everyone may experience serious effects.';
            default:
                return 'Air quality information unavailable.';
        }
    };

    // Gauge percentage (1-5 scale)
    const gaugePercentage = (aqiValue / 5) * 100;

    return (
        <div className="p-6 rounded-[32px] border backdrop-blur-2xl
                        dark:bg-white/5 dark:border-white/10
                        bg-black/5 border-black/10">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="p-3 rounded-2xl dark:bg-white/10 bg-black/10">
                        <Activity className="w-5 h-5 dark:text-white text-black" />
                    </div>
                    <div>
                        <h3 className="text-sm font-black uppercase tracking-wider dark:text-white text-black">
                            Air Quality
                        </h3>
                        <p className="text-xs font-bold dark:text-white/40 text-black/40">
                            Index: {aqiValue}/5
                        </p>
                    </div>
                </div>

                {/* AQI Badge */}
                <div className={`px-4 py-2 rounded-full ${currentLevel.bgColor}/20`}>
                    <p className={`text-sm font-black ${currentLevel.darkTextColor} ${currentLevel.textColor}`}>
                        {currentLevel.label}
                    </p>
                </div>
            </div>

            {/* Circular Gauge */}
            <div className="flex justify-center mb-6">
                <div className="relative w-40 h-40">
                    <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
                        {/* Background circle */}
                        <circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="10"
                            className="dark:text-white/5 text-black/10"
                        />

                        {/* Progress circle */}
                        <motion.circle
                            cx="60"
                            cy="60"
                            r="50"
                            fill="none"
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={2 * Math.PI * 50}
                            initial={{ strokeDashoffset: 2 * Math.PI * 50 }}
                            animate={{ strokeDashoffset: 2 * Math.PI * 50 - (gaugePercentage / 100) * 2 * Math.PI * 50 }}
                            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                            className={currentLevel.textColor}
                        />
                    </svg>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        {aqiValue <= 2 ? (
                            <ThumbsUp className={`w-10 h-10 ${currentLevel.darkTextColor} ${currentLevel.textColor}`} />
                        ) : (
                            <AlertTriangle className={`w-10 h-10 ${currentLevel.darkTextColor} ${currentLevel.textColor}`} />
                        )}
                    </div>
                </div>
            </div>

            {/* Health Recommendation */}
            <div className="mb-6 p-4 rounded-2xl dark:bg-white/5 bg-black/5">
                <p className="text-sm font-bold dark:text-white/70 text-black/70 text-center">
                    {getHealthRecommendation(aqiValue)}
                </p>
            </div>

            {/* Pollutants Breakdown */}
            <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl dark:bg-white/5 bg-black/5">
                    <p className="text-[10px] font-black uppercase tracking-wider dark:text-white/40 text-black/40 mb-1">
                        PM2.5
                    </p>
                    <p className="text-lg font-black dark:text-white text-black">
                        {components.pm2_5.toFixed(1)}
                    </p>
                </div>
                <div className="p-3 rounded-xl dark:bg-white/5 bg-black/5">
                    <p className="text-[10px] font-black uppercase tracking-wider dark:text-white/40 text-black/40 mb-1">
                        PM10
                    </p>
                    <p className="text-lg font-black dark:text-white text-black">
                        {components.pm10.toFixed(1)}
                    </p>
                </div>
                <div className="p-3 rounded-xl dark:bg-white/5 bg-black/5">
                    <p className="text-[10px] font-black uppercase tracking-wider dark:text-white/40 text-black/40 mb-1">
                        O₃
                    </p>
                    <p className="text-lg font-black dark:text-white text-black">
                        {components.o3.toFixed(1)}
                    </p>
                </div>
                <div className="p-3 rounded-xl dark:bg-white/5 bg-black/5">
                    <p className="text-[10px] font-black uppercase tracking-wider dark:text-white/40 text-black/40 mb-1">
                        NO₂
                    </p>
                    <p className="text-lg font-black dark:text-white text-black">
                        {components.no2.toFixed(1)}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AirQualityWidget;
