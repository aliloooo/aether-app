import React from 'react';
import { motion } from 'framer-motion';

const ForecastList = ({ forecast }) => {
    if (!forecast || !forecast.list) return null;

    // Filter for daily forecast (roughly every 24h)
    const dailyForecast = forecast.list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 5);

    return (
        <div className="w-full">
            <h3 className="text-sm font-medium opacity-50 mb-4 px-1 tracking-wide uppercase">5-Day Forecast</h3>

            {/* Mobile: Horizontal Scroll | Desktop: Grid 5 Columns */}
            <div className="flex overflow-x-auto pb-4 gap-3 md:gap-4 lg:grid lg:grid-cols-5 lg:overflow-visible hide-scrollbar scroll-smooth">
                {dailyForecast.map((item, index) => (
                    <motion.div
                        key={item.dt}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card flex-shrink-0 w-24 md:w-28 lg:w-auto p-4 flex flex-col items-center justify-between gap-3 cursor-pointer hover:bg-white/10 transition-all group"
                    >
                        <span className="text-sm font-medium opacity-70 group-hover:opacity-100 transition-opacity">
                            {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>

                        <div className="relative w-10 h-10 md:w-12 md:h-12">
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                                alt={item.weather[0].description}
                                className="w-full h-full object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 filter drop-shadow-sm"
                            />
                        </div>

                        <span className="text-lg md:text-xl font-bold tracking-tight">
                            {Math.round(item.main.temp)}°
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ForecastList;
