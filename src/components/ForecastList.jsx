import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Thermometer, Droplets, Wind } from 'lucide-react';
import WeatherIcon from './WeatherIcon';

const ForecastList = ({ forecast }) => {
    if (!forecast || !forecast.list) return null;

    // Filter for daily forecast (roughly every 24h at noon)
    const dailyForecast = forecast.list.filter((reading) => reading.dt_txt.includes("12:00:00")).slice(0, 7);

    return (
        <div className="flex flex-col gap-4">
            {dailyForecast.map((item, index) => (
                <motion.div
                    key={item.dt}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 8 }}
                    className="bg-white/5 border border-white/5 hover:bg-white/10 transition-all rounded-[32px] p-6 flex items-center justify-between"
                >
                    <div className="flex items-center gap-6">
                        <div className="flex flex-col">
                            <span className="text-white font-black text-xl tracking-tight">
                                {format(new Date(item.dt * 1000), 'EEEE')}
                            </span>
                            <span className="text-white/40 font-bold uppercase tracking-widest text-[10px]">
                                {format(new Date(item.dt * 1000), 'MMM d')}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex items-center gap-4 text-white/40">
                                <div className="flex items-center gap-1">
                                    <Droplets size={12} className="text-blue-400 opacity-60" />
                                    <span className="text-[10px] font-black">{item.main.humidity}%</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Wind size={12} className="text-emerald-400 opacity-60" />
                                    <span className="text-[10px] font-black">{Math.round(item.wind.speed)}m/s</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="text-white font-black text-2xl tracking-tighter">
                                    {Math.round(item.main.temp)}°
                                </span>
                                <div className="p-2 bg-white/10 rounded-2xl">
                                    <WeatherIcon iconCode={item.weather[0].icon} description={item.weather[0].description} size="small" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default ForecastList;
