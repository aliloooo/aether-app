import React from 'react';
import { motion } from 'framer-motion';

const WeatherIcon = ({ iconCode, description, size = "large" }) => {
    const isLarge = size === "large";
    const width = isLarge ? "w-32 h-32" : "w-12 h-12";

    return (
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
                type: "spring",
                stiffness: 100,
                damping: 10
            }}
            // Floating animation
            whileHover={{ y: -5 }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <motion.img
                src={`https://openweathermap.org/img/wn/${iconCode}@4x.png`}
                alt={description}
                className={`${width} drop-shadow-2xl`}
                animate={{
                    y: [0, -10, 0],
                }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
};

export default WeatherIcon;
