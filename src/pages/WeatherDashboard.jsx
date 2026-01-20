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
                className="w-full max-w-6xl z-10 flex flex-col gap-8 md:gap-12"
            >
                {/* Header Section */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-center md:text-left"
                    >
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter text-gradient mb-1">Aether</h1>
                        <p className="text-xs font-bold opacity-40 uppercase tracking-[0.4em]">
                            {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                        </p>
                    </motion.div>

                    <div className="w-full max-w-md">
                        <SearchBar onSearch={setCity} />
                    </div>
                </header>

                <main className="relative min-h-[60vh] flex flex-col">
                    <AnimatePresence mode="wait">
                        {isLoading ? (
                            <motion.div
                                key="loading"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex items-center justify-center p-20"
                            >
                                <div className="h-16 w-16 border-4 border-white/10 border-t-white rounded-full animate-spin"></div>
                            </motion.div>
                        ) : error ? (
                            <motion.div
                                key="error"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                className="flex flex-col items-center justify-center text-center p-12 glass-panel"
                            >
                                <span className="text-red-400 text-2xl font-semibold mb-2">Location Not Found</span>
                                <p className="opacity-70 max-w-xs">We couldn't find "{city}". Please check the spelling or try a different city.</p>
                                <button
                                    onClick={() => setCity('Jakarta')}
                                    className="mt-6 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all text-sm font-bold uppercase tracking-widest border border-white/5"
                                >
                                    Return to Jakarta
                                </button>
                            </motion.div>
                        ) : data && (
                            <motion.div
                                key={data.current.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="flex flex-col gap-12"
                            >
                                {/* Main Layout Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                                    {/* Current Weather - Hero Area */}
                                    <div className="lg:col-span-7 flex flex-col gap-8">
                                        <CurrentWeather data={data.current} type="main" />
                                        <WeatherAlerts data={data.current} />
                                    </div>

                                    {/* Quick Stats Area */}
                                    <div className="lg:col-span-5">
                                        <div className="glass-panel h-full flex flex-col">
                                            <div className="flex items-center gap-3 mb-8">
                                                <div className="w-1.5 h-4 bg-white/20 rounded-full"></div>
                                                <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-30">Current Details</h3>
                                            </div>
                                            <CurrentWeather data={data.current} type="stats" />
                                        </div>
                                    </div>
                                </div>

                                {/* Forecast Section */}
                                <section className="w-full">
                                    <div className="flex items-center gap-4 mb-8">
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-30 whitespace-nowrap">Extended Forecast</h3>
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


