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
import { MapPin, Search, PlusCircle, Bookmark, Compass, AlertCircle, Calendar, TrendingUp } from 'lucide-react';

const WeatherDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const { data, isLoading, error } = useWeatherQuery();
    const setThemeMode = useWeatherStore((state) => state.setThemeMode);
    const setCity = useWeatherStore((state) => state.setCity);
    const setCoords = useWeatherStore((state) => state.setCoords);
    const city = useWeatherStore((state) => state.city);
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
                (err) => {
                    console.error("Geolocation error:", err);
                    alert("Unable to retrieve location. Please check permissions.");
                }
            );
        }
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="relative w-32 h-32">
                        <div className="absolute inset-0 border-[6px] border-white/5 rounded-full"></div>
                        <div className="absolute inset-0 border-[6px] border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                </div>
            );
        }

        if (error || !data) {
            return (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                    <AlertCircle size={64} className="text-white/20 mb-6" />
                    <h2 className="text-3xl font-black text-white mb-4 tracking-tighter">LOCATION NOT FOUND</h2>
                    <p className="text-white/40 font-bold mb-8 max-w-xs uppercase tracking-wider text-xs">
                        We searched high and low but couldn't find that place.
                    </p>
                    <button
                        onClick={() => setCity('Jakarta')}
                        className="bg-white text-black font-black px-8 py-4 rounded-2xl uppercase tracking-[0.2em] text-xs hover:scale-105 transition-transform"
                    >
                        Reset to Jakarta
                    </button>
                </div>
            );
        }

        switch (activeTab) {
            case 'home':
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col gap-8 pb-32"
                    >
                        <CurrentWeather data={data.current} aqiData={data.aqi} />
                        <WeatherChart data={data.forecast} />

                        <div className="flex items-center justify-between px-2">
                            <h3 className="text-xs font-black uppercase tracking-widest text-white/40">Conditions</h3>
                            <button
                                onClick={() => addFavorite(data.current.name)}
                                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                            >
                                <PlusCircle size={14} /> Save City
                            </button>
                        </div>

                        <CurrentWeather data={data.current} aqiData={data.aqi} type="stats" />
                        <WeatherAlerts data={data.current} />
                    </motion.div>
                );
            case 'forecast':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6 pb-32"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Calendar size={24} className="text-white/60" />
                            <h2 className="text-3xl font-black text-white tracking-tighter">7-Day Forecast</h2>
                        </div>
                        <ForecastList forecast={data.forecast} />
                    </motion.div>
                );
            case 'favorites':
                return (
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex flex-col gap-6 pb-32"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <Bookmark size={24} className="text-white/60" />
                            <h2 className="text-3xl font-black text-white tracking-tighter">Saved Locations</h2>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            {favorites.map((fav) => (
                                <button
                                    key={fav}
                                    onClick={() => { setCity(fav); setActiveTab('home'); }}
                                    className="bg-white/5 border border-white/10 p-6 rounded-3xl flex items-center justify-between hover:bg-white/10 transition-colors group"
                                >
                                    <span className="text-xl font-black text-white tracking-tight">{fav}</span>
                                    <TrendingUp size={18} className="text-white/20 group-hover:text-white transition-colors" />
                                </button>
                            ))}
                        </div>
                    </motion.div>
                );
            case 'info':
                return (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex flex-col items-center justify-center p-8 text-center gap-6"
                    >
                        <div className="bg-white/10 p-8 rounded-[40px] border border-white/10 flex flex-col items-center gap-6">
                            <div className="w-20 h-20 bg-white text-black rounded-3xl flex items-center justify-center shadow-2xl">
                                <Compass size={40} />
                            </div>
                            <h2 className="text-4xl font-black text-white tracking-tighter leading-none">Aether Weather</h2>
                            <p className="text-white/40 font-bold uppercase tracking-[0.2em] text-[10px] max-w-xs">
                                Redesigning the climate experience through minimal design and real-time data integration.
                            </p>
                            <div className="h-[1px] w-full bg-white/10"></div>
                            <p className="text-white/60 text-xs leading-relaxed max-w-xs font-bold">
                                Version 2.0.0<br />
                                Powered by OpenWeather API
                            </p>
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

            <div className="flex-1 flex flex-col max-w-2xl mx-auto w-full px-6 pt-10 pb-20 relative z-10">
                {/* Minimal Header */}
                <header className="flex items-center justify-between mb-10">
                    <div className="flex flex-col">
                        <h1 className="text-4xl font-black tracking-tighter text-white drop-shadow-xl">Aether</h1>
                    </div>
                    <div className="flex gap-4">
                        <button
                            onClick={handleDetectLocation}
                            className="p-3 bg-white/10 hover:bg-white/20 rounded-2xl transition-all border border-white/10"
                        >
                            <MapPin size={18} className="text-white" />
                        </button>
                    </div>
                </header>

                <div className="mb-10">
                    <SearchBar onSearch={setCity} />
                </div>

                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
    );
};

export default WeatherDashboard;


