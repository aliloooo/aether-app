import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind, CloudFog } from 'lucide-react';

const WeatherIcon = ({ iconCode, description, size = "large" }) => {
    const isLarge = size === "large";
    const iconSize = isLarge ? 64 : 24;

    const getIcon = () => {
        // Map OpenWeatherMap icon codes to Lucide icons
        const code = iconCode.substring(0, 2);
        switch (code) {
            case '01': return <Sun size={iconSize} className="text-yellow-400" />;
            case '02': return <Cloud size={iconSize} className="text-blue-200" />;
            case '03':
            case '04': return <Cloud size={iconSize} className="text-gray-400" />;
            case '09':
            case '10': return <CloudRain size={iconSize} className="text-blue-400" />;
            case '11': return <CloudLightning size={iconSize} className="text-yellow-500" />;
            case '13': return <CloudSnow size={iconSize} className="text-blue-100" />;
            case '50': return <CloudFog size={iconSize} className="text-slate-400" />;
            default: return <Sun size={iconSize} className="text-yellow-400" />;
        }
    };

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex items-center justify-center"
        >
            {getIcon()}
        </motion.div>
    );
};

export default WeatherIcon;

