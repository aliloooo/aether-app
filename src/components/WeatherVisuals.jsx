import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Cloud, CloudRain, CloudLightning, CloudSnow, Wind, CloudFog } from 'lucide-react';

const WeatherVisuals = ({ themeMode }) => {
    const renderVisual = () => {
        switch (themeMode) {
            case 'Clear':
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 90, 180, 270, 360]
                            }}
                            transition={{
                                scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                            }}
                            className="text-yellow-400 opacity-20"
                        >
                            <Sun size={400} strokeWidth={0.5} />
                        </motion.div>
                    </div>
                );
            case 'Clouds':
                return (
                    <div className="relative w-full h-full">
                        <motion.div
                            animate={{ x: [-100, 1000] }}
                            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            className="absolute top-20 left-0 text-white opacity-10"
                        >
                            <Cloud size={300} strokeWidth={0.5} />
                        </motion.div>
                        <motion.div
                            animate={{ x: [1000, -100] }}
                            transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
                            className="absolute bottom-40 right-0 text-white opacity-5"
                        >
                            <Cloud size={400} strokeWidth={0.5} />
                        </motion.div>
                    </div>
                );
            case 'Rain':
            case 'Drizzle':
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{ y: [0, 20, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="text-white opacity-10"
                        >
                            <CloudRain size={400} strokeWidth={0.5} />
                        </motion.div>
                    </div>
                );
            case 'Thunderstorm':
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{
                                opacity: [0.1, 0.3, 0.1, 0.5, 0.1],
                                scale: [1, 1.02, 1]
                            }}
                            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
                            className="text-white"
                        >
                            <CloudLightning size={400} strokeWidth={0.5} />
                        </motion.div>
                    </div>
                );
            case 'Snow':
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="text-white opacity-10"
                        >
                            <CloudSnow size={400} strokeWidth={0.5} />
                        </motion.div>
                    </div>
                );
            case 'Mist':
                return (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <motion.div
                            animate={{ x: [-20, 20, -20] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="text-white opacity-10"
                        >
                            <CloudFog size={400} strokeWidth={0.5} />
                        </motion.div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
            {renderVisual()}
        </div>
    );
};

export default WeatherVisuals;
