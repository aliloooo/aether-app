import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundLayer from '../components/BackgroundLayer';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import ForecastList from '../components/ForecastList';
import WeatherAlerts from '../components/WeatherAlerts';
import Footer from '../components/Footer';
import useWeatherStore from '../store/weatherStore';
import { useWeatherQuery } from '../services/queries';
import { getWeatherTheme } from '../utils/weatherMapping';

const WeatherDashboard = () => {
    const { data, isLoading, error } = useWeatherQuery();
    const setThemeMode = useWeatherStore((state) => state.setThemeMode);
    const setCity = useWeatherStore((state) => state.setCity);
    const city = useWeatherStore((state) => state.city);

    useEffect(() => {
        if (data?.current?.weather?.[0]?.id) {
            setThemeMode(getWeatherTheme(data.current.weather[0].id));
        }
    }, [data, setThemeMode]);

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center justify-start p-4 md:p-8 lg:p-12 overflow-x-hidden selection:bg-white/20">
            <BackgroundLayer />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-7xl z-10 flex flex-col gap-12 md:gap-20"
            >
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-center md:items-end gap-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center md:text-left"
                    >
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-gradient mb-2 drop-shadow-2xl">Aether</h1>
                        <p className="text-[10px] md:text-xs font-black text-white/40 uppercase tracking-[0.5em] ml-1">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                    </motion.div>

                    <div className="w-full max-w-lg">
                        <SearchBar onSearch={setCity} />
                    </div>
                </header>

                <main className="relative w-full flex flex-col">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex items-center justify-center p-32"
                            >
                                <div className="h-24 w-24 border-8 border-white/5 border-t-white rounded-full animate-spin shadow-2xl"></div>
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center text-center p-20 glass-panel max-w-2xl mx-auto"
                            >
                                <span className="text-red-400 text-3xl font-black mb-4 tracking-tighter drop-shadow-lg">LOCATION NOT FOUND</span>
                                <p className="text-white/60 font-bold max-w-xs leading-relaxed">We couldn't find "{city}". Please check the spelling or explore a different city.</p>
                                <button
                                    onClick={() => setCity('Jakarta')}
                                    className="mt-12 px-12 py-5 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-[11px] font-black uppercase tracking-[0.3em] border border-white/10 shadow-2xl active:scale-95"
                                >
                                    RETURN TO JAKARTA
                                </button>
                            </motion.div>
                        ) : data && (
                            <motion.div
                                key={data.current.name}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col gap-16 md:gap-24"
                            >
                                {/* Content Grid - Symmetric 1:1 on Desktop */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-20 items-center">
                                    <div className="flex flex-col gap-10 md:gap-14">
                                        <CurrentWeather data={data.current} type="main" />
                                        <WeatherAlerts data={data.current} />
                                    </div>

                                    <div className="w-full">
                                        <div className="glass-panel flex flex-col shadow-2xl">
                                            <div className="flex items-center gap-4 mb-10">
                                                <div className="w-2.5 h-6 bg-white/30 rounded-full"></div>
                                                <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-white/50">Current Metrics</h3>
                                            </div>
                                            <CurrentWeather data={data.current} type="stats" />
                                        </div>
                                    </div>
                                </div>

                                <section className="w-full">
                                    <div className="flex items-center gap-8 mb-12">
                                        <h3 className="text-[12px] font-black uppercase tracking-[0.4em] text-white/40 whitespace-nowrap">EXTENDED FORECAST</h3>
                                        <div className="h-[1px] flex-1 bg-white/10"></div>
                                    </div>
                                    <ForecastList forecast={data.forecast} />
                                </section>

                                <Footer />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </motion.div>

        </div>
    );
};


export default WeatherDashboard;


