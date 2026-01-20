import React from 'react';
import { motion } from 'framer-motion';
import WeatherIcon from './WeatherIcon';

const ForecastList = ({ forecast }) => {
    if (!forecast || !forecast.list) return null;

    // Filter for daily forecast (roughly every 24h at noon)
    const dailyForecast = forecast.list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 5);

    return (
        <div className="w-full flex overflow-x-auto pb-6 gap-4 hide-scrollbar snap-x">
            {dailyForecast.map((item, index) => (
                <motion.div
                    key={item.dt}
                    initial={{ opacity: 0, scale: 0.9, x: 20 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    whileHover={{ y: -10, backgroundColor: "rgba(0, 0, 0, 0.4)" }}
                    className="glass-card flex-shrink-0 w-36 md:w-44 p-6 flex flex-col items-center justify-between gap-4 snap-center group transition-colors shadow-2xl"
                >
                    <div className="text-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 block mb-1">
                            {new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                        </span>
                        <span className="text-[10px] font-black text-white/30 uppercase tracking-tighter">
                            {new Date(item.dt * 1000).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}
                        </span>
                    </div>

                    <div className="p-3 bg-white/10 rounded-2xl group-hover:scale-110 transition-transform duration-500 shadow-inner">
                        <WeatherIcon iconCode={item.weather[0].icon} description={item.weather[0].description} size="small" />
                    </div>

                    <div className="text-center">
                        <span className="text-2xl font-black tracking-tight text-white">
                            {Math.round(item.main.temp)}°
                        </span>
                        <p className="text-[10px] font-black uppercase text-white/40 mt-1 truncate w-24">
                            {item.weather[0].main}
                        </p>
                    </div>
                </motion.div>

            ))}
        </div>
    );
};

export default ForecastList;

