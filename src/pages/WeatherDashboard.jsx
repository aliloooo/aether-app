import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundLayer from '../components/BackgroundLayer';
import SearchBar from '../components/SearchBar';
import CurrentWeather from '../components/CurrentWeather';
import ForecastList from '../components/ForecastList';
import WeatherAlerts from '../components/WeatherAlerts';
import WeatherChart from '../components/WeatherChart';
import BottomNav from '../components/BottomNav';
import useWeatherStore from '../store/weatherStore';
import { useWeatherQuery } from '../services/queries';
import { getWeatherTheme } from '../utils/weatherMapping';
import { MapPin, AlertCircle, Calendar, Bookmark, Compass, TrendingUp, PlusCircle } from 'lucide-react';

const WeatherDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const { data, isLoading, error } = useWeatherQuery();
    const setThemeMode = useWeatherStore((state) => state.setThemeMode);
    const setCity = useWeatherStore((state) => state.setCity);
    const setCoords = useWeatherStore((state) => state.setCoords);
    const favorites = useWeatherStore((state) => state.favorites);
    const addFavorite = useWeatherStore((state) => state.addFavorite);

    useEffect(() => {
        if (data?.current?.weather?.[0]?.id) {
            const isDay = data.current.weather[0].icon.includes('d');
            setThemeMode(getWeatherTheme(data.current.weather[0].id, isDay));
        }
    }, [data, setThemeMode]);

    const handleDetectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCoords({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    });
                },
                (err) => console.error("Geolocation error:", err)
            );
        }
    };

    const LoadingSkeleton = () => (
        <div className="flex-1 flex flex-col items-center justify-center gap-8 py-20 animate-pulse">
            <div className="w-48 h-10 bg-white/5 rounded-full"></div>
            <div className="w-56 h-56 bg-white/5 rounded-full"></div>
            <div className="w-64 h-24 bg-white/5 rounded-[40px]"></div>
        </div>
    );

    const renderContent = () => {
        if (isLoading) return <LoadingSkeleton />;

        if (error || !data) {
            return (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6">
                    <div className="p-8 bg-white/5 rounded-[40px] border border-white/10 backdrop-blur-3xl">
                        <AlertCircle size={64} className="text-white/20 mb-6 mx-auto" />
                        <h2 className="text-4xl font-black text-white mb-4 tracking-tighter">NOT FOUND</h2>
                        <p className="text-white/40 font-bold mb-8 max-w-xs uppercase tracking-[0.2em] text-[10px] leading-relaxed">
                            The location you searched for vanished into the ether.
                        </p>
                        <button
                            onClick={() => setCity('Jakarta')}
                            className="w-full bg-white text-black font-black py-5 rounded-3xl uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-xl"
                        >
                            Reset to Jakarta
                        </button>
                    </div>
                </div>
            );
        }

        switch (activeTab) {
            case 'home':
                return (
                    <motion.div
                        key="home"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                        className="flex flex-col gap-10 pb-48"
                    >
                        <CurrentWeather data={data.current} aqiData={data.aqi} />

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between px-2">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Hourly Trends</h3>
                            </div>
                            <div className="bg-white/[0.03] backdrop-blur-3xl border border-white/5 p-6 rounded-[40px]">
                                <WeatherChart data={data.forecast} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-center justify-between px-4">
                                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30">Metrics</h3>
                                <button
                                    onClick={() => addFavorite(data.current.name)}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400 group transition-all"
                                >
                                    <PlusCircle size={14} className="group-hover:rotate-90 transition-transform" />
                                    Save City
                                </button>
                            </div>
                            <CurrentWeather data={data.current} aqiData={data.aqi} type="stats" />
                        </div>

                        <WeatherAlerts data={data.current} />
                    </motion.div>
                );
            case 'forecast':
                return (
                    <motion.div
                        key="forecast"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.5, ease: "circOut" }}
                        className="flex flex-col gap-8 pb-48"
                    >
                        <div className="flex items-center gap-6 mb-4 px-2">
                            <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                                <Calendar size={32} className="text-white" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">Forecast</h1>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-2">Next 7 Days</span>
                            </div>
                        </div>
                        <ForecastList forecast={data.forecast} />
                    </motion.div>
                );
            case 'favorites':
                return (
                    <motion.div
                        key="favorites"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1 }}
                        className="flex flex-col gap-8 pb-48"
                    >
                        <div className="flex items-center gap-6 mb-4 px-2">
                            <div className="p-4 bg-white/5 rounded-3xl border border-white/10">
                                <Bookmark size={32} className="text-white" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-4xl font-black text-white tracking-tighter leading-none">Saved</h1>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mt-2">Personal List</span>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {favorites.map((fav, idx) => (
                                <motion.button
                                    key={fav}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    onClick={() => { setCity(fav); setActiveTab('home'); }}
                                    className="bg-white/5 border border-white/5 backdrop-blur-2xl p-8 rounded-[36px] flex items-center justify-between hover:bg-white/10 transition-all group"
                                >
                                    <span className="text-2xl font-black text-white tracking-tighter">{fav}</span>
                                    <div className="p-3 rounded-2xl bg-white/5 group-hover:bg-white text-white/30 group-hover:text-black transition-all">
                                        <TrendingUp size={20} />
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 'info':
                return (
                    <motion.div
                        key="info"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex flex-col items-center justify-center py-10 gap-8"
                    >
                        <div className="bg-white/5 p-12 rounded-[56px] border border-white/5 flex flex-col items-center text-center gap-8 backdrop-blur-3xl">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 bg-white text-black rounded-[32px] flex items-center justify-center shadow-2xl overflow-hidden"
                            >
                                <Compass size={48} />
                            </motion.div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-5xl font-black text-white tracking-tighter leading-none">Aether</h2>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/30 ml-[0.5em]">Climate Experience</span>
                            </div>
                            <div className="h-[1px] w-12 bg-white/20"></div>
                            <p className="text-white/40 text-xs font-bold uppercase tracking-widest leading-loose max-w-[200px]">
                                Redefining weather through digital minimalism.
                            </p>
                            <div className="flex flex-col items-center gap-1 opacity-20">
                                <span className="text-[9px] font-black">v2.1.0</span>
                                <span className="text-[9px] font-black">Built with Passion</span>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col font-sans overflow-x-hidden selection:bg-white/20 selection:text-white">
            <BackgroundLayer />

            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 pt-16 pb-20 relative z-10 gap-10">
                {/* Logo Section */}
                <header className="flex items-center justify-between px-2">
                    <h1 className="text-3xl font-black tracking-tighter text-white/30 uppercase tracking-[0.3em] leading-none">Aether</h1>
                    <button
                        onClick={handleDetectLocation}
                        className="p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/5 backdrop-blur-xl group"
                    >
                        <MapPin size={20} className="text-white group-active:scale-90 transition-transform" />
                    </button>
                </header>

                <SearchBar onSearch={setCity} />

                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default WeatherDashboard;
