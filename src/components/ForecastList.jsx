import React from 'react';
import { motion } from 'framer-motion';

const ForecastList = ({ forecast }) => {
    if (!forecast || !forecast.list) return null;

    // Filter for daily forecast (roughly every 24h)
    const dailyForecast = forecast.list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 5);

    return (
        <div className="w-full">
            <h3 className="text-sm font-medium opacity-50 mb-4 px-2 tracking-wide uppercase">5-Day Forecast</h3>
            <div className="flex justify-between md:justify-start gap-2 md:gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {dailyForecast.map((item, index) => (
                    <motion.div
                        key={item.dt}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass-card flex-1 min-w-[80px] p-4 flex flex-col items-center justify-between gap-2 cursor-pointer hover:scale-[1.02] transition-transform"
                    >
                        <span className="text-sm font-medium opacity-80">
                            {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>

                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt="icon"
                            className="w-10 h-10 opacity-90 grayscale-[30%] hover:grayscale-0 transition-all"
                        />

                        <span className="text-xl font-bold">
                            {Math.round(item.main.temp)}°
                        </span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default ForecastList;
