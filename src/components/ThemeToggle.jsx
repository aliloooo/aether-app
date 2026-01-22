import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import useWeatherStore from '../store/weatherStore';

const ThemeToggle = () => {
    const isDarkMode = useWeatherStore((state) => state.isDarkMode);
    const toggleTheme = useWeatherStore((state) => state.toggleTheme);

    return (
        <motion.button
            onClick={toggleTheme}
            className="relative p-3 rounded-2xl border transition-all group overflow-hidden
                       dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10
                       bg-black/5 border-black/10 hover:bg-black/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle theme"
        >
            <div className="relative w-6 h-6">
                {/* Sun Icon - visible in dark mode */}
                <motion.div
                    initial={false}
                    animate={{
                        scale: isDarkMode ? 1 : 0,
                        rotate: isDarkMode ? 0 : 180,
                        opacity: isDarkMode ? 1 : 0,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <Sun className="w-6 h-6 text-yellow-400" />
                </motion.div>

                {/* Moon Icon - visible in light mode */}
                <motion.div
                    initial={false}
                    animate={{
                        scale: isDarkMode ? 0 : 1,
                        rotate: isDarkMode ? -180 : 0,
                        opacity: isDarkMode ? 0 : 1,
                    }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-0"
                >
                    <Moon className="w-6 h-6 text-indigo-600" />
                </motion.div>
            </div>

            {/* Shimmer effect on hover */}
            <div className="absolute inset-0 bg-shimmer-gradient bg-[length:200%_100%] opacity-0 group-hover:opacity-100 group-hover:animate-shimmer" />
        </motion.button>
    );
};

export default ThemeToggle;
