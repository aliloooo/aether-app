import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BackgroundLayer from '../components/BackgroundLayer';
import LocationSearch from '../components/LocationSearch';
import CurrentWeather from '../components/CurrentWeather';
import ForecastList from '../components/ForecastList';
import WeatherAlerts from '../components/WeatherAlerts';
import WeatherChart from '../components/WeatherChart';
import HourlyForecastTimeline from '../components/HourlyForecastTimeline';
import WeeklyForecastGrid from '../components/WeeklyForecastGrid';
import AirQualityWidget from '../components/AirQualityWidget';
import BottomNav from '../components/BottomNav';
import ThemeToggle from '../components/ThemeToggle';
import FavoritesPanel from '../components/FavoritesPanel';
import useWeatherStore from '../store/weatherStore';
import { useWeatherQuery } from '../services/queries';
import { getWeatherTheme } from '../utils/weatherMapping';
import { MapPin, AlertCircle, Calendar, Bookmark, Compass, TrendingUp, PlusCircle, Star } from 'lucide-react';

const WeatherDashboard = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [showFavoritesPanel, setShowFavoritesPanel] = useState(false);

    const { data, isLoading, error } = useWeatherQuery();
    const setThemeMode = useWeatherStore((state) => state.setThemeMode);
    const setCity = useWeatherStore((state) => state.setCity);
    const setCoords = useWeatherStore((state) => state.setCoords);
    const favorites = useWeatherStore((state) => state.favorites);
    const addFavorite = useWeatherStore((state) => state.addFavorite);
    const isDarkMode = useWeatherStore((state) => state.isDarkMode);

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
        <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex-1 flex flex-col items-center justify-center gap-8 py-20"
        >
            <div className="w-48 h-10 dark:bg-white/10 bg-black/10 rounded-full animate-pulse"></div>
            <div className="w-56 h-56 dark:bg-white/10 bg-black/10 rounded-full animate-pulse"></div>
            <div className="w-64 h-24 dark:bg-white/10 bg-black/10 rounded-[40px] animate-pulse"></div>
        </motion.div>
    );

    const renderContent = () => {
        if (isLoading) return <LoadingSkeleton />;

        if (error || !data) {
            return (
                <motion.div
                    key="error"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex-1 flex flex-col items-center justify-center p-8 text-center gap-6"
                >
                    <div className="p-8 rounded-[40px] border backdrop-blur-3xl shadow-2xl
                                    dark:bg-glass-bg dark:border-glass-border
                                    bg-glass-bgLight border-glass-borderLight">
                        <AlertCircle size={64} className="dark:text-red-400 text-red-600 mb-6 mx-auto" />
                        <h2 className="text-4xl font-black tracking-tighter mb-4 dark:text-white text-black">NOT FOUND</h2>
                        <p className="font-bold mb-8 max-w-xs uppercase tracking-[0.2em] text-[10px] leading-relaxed dark:text-white/60 text-black/60">
                            {error ? "Unable to connect to weather services." : "The location you searched for vanished into the ether."}
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="font-black py-4 px-8 rounded-2xl uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-xl
                                       dark:bg-white dark:text-black
                                       bg-black text-white"
                        >
                            Retry Connection
                        </button>
                    </div>
                </motion.div>
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
                        className="flex flex-col gap-8 pb-32 lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start"
                    >
                        {/* Left Column (Desktop) / Top (Mobile) */}
                        <div className="flex flex-col gap-8 lg:col-span-5 lg:sticky lg:top-8">
                            <CurrentWeather data={data.current} aqiData={data.aqi} />

                            {/* Mobile Hourly Chart */}
                            <div className="flex flex-col gap-6 lg:hidden">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-white/40 text-black/40">
                                        Hourly Forecast
                                    </h3>
                                </div>
                                <HourlyForecastTimeline forecastData={data.forecast} />
                            </div>
                        </div>

                        {/* Right Column (Desktop) / Bottom (Mobile) */}
                        <div className="flex flex-col gap-8 lg:col-span-7">
                            {/* Desktop Hourly Forecast */}
                            <div className="hidden lg:flex flex-col gap-6">
                                <div className="flex items-center justify-between px-2">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-white/40 text-black/40">
                                        Hourly Forecast
                                    </h3>
                                </div>
                                <HourlyForecastTimeline forecastData={data.forecast} />
                            </div>

                            {/* Current Details */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between px-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-white/40 text-black/40">
                                        Current Details
                                    </h3>
                                    <button
                                        onClick={() => addFavorite(data.current.name)}
                                        className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors
                                                   dark:text-emerald-300 dark:hover:text-emerald-200
                                                   text-emerald-600 hover:text-emerald-500"
                                    >
                                        <PlusCircle size={14} />
                                        Save City
                                    </button>
                                </div>
                                <CurrentWeather data={data.current} aqiData={data.aqi} type="stats" />
                            </div>

                            {/* Air Quality */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center justify-between px-4">
                                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-white/40 text-black/40">
                                        Air Quality
                                    </h3>
                                </div>
                                <AirQualityWidget aqiData={data.aqi} />
                            </div>

                            <WeatherAlerts data={data.current} />
                        </div>
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
                        className="flex flex-col gap-8 pb-48 lg:max-w-5xl lg:mx-auto lg:w-full"
                    >
                        <div className="flex items-center gap-6 mb-4 px-2">
                            <div className="p-4 rounded-3xl border dark:bg-white/5 dark:border-white/10 bg-black/5 border-black/10">
                                <Calendar size={32} className="dark:text-white text-black" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-4xl font-black tracking-tighter leading-none dark:text-white text-black">
                                    Forecast
                                </h1>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-2 dark:text-white/30 text-black/30">
                                    Next 7 Days
                                </span>
                            </div>
                        </div>
                        <WeeklyForecastGrid forecastData={data.forecast} />
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
                            <div className="p-4 rounded-3xl border dark:bg-white/5 dark:border-white/10 bg-black/5 border-black/10">
                                <Bookmark size={32} className="dark:text-white text-black" />
                            </div>
                            <div className="flex flex-col flex-1">
                                <h1 className="text-4xl font-black tracking-tighter leading-none dark:text-white text-black">
                                    Saved
                                </h1>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-2 dark:text-white/30 text-black/30">
                                    Personal List
                                </span>
                            </div>
                            <button
                                onClick={() => setShowFavoritesPanel(true)}
                                className="p-3 rounded-2xl border transition-all
                                           dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10
                                           bg-black/5 border-black/10 hover:bg-black/10"
                            >
                                <Star className="w-5 h-5 dark:text-white text-black" />
                            </button>
                        </div>

                        {favorites.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-24 h-24 rounded-full mb-6 dark:bg-white/5 bg-black/5 flex items-center justify-center">
                                    <Bookmark className="w-12 h-12 dark:text-white/20 text-black/20" />
                                </div>
                                <p className="text-lg font-bold dark:text-white/40 text-black/40">
                                    No saved locations yet
                                </p>
                                <p className="text-sm font-bold mt-2 dark:text-white/30 text-black/30">
                                    Tap "Save City" to add favorites
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {favorites.map((fav, idx) => (
                                    <motion.button
                                        key={fav}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        onClick={() => { setCity(fav); setActiveTab('home'); }}
                                        className="border backdrop-blur-2xl p-8 rounded-[36px] flex items-center justify-between group transition-all
                                                   dark:bg-white/5 dark:border-white/5 dark:hover:bg-white/10
                                                   bg-black/5 border-black/10 hover:bg-black/10"
                                    >
                                        <span className="text-2xl font-black tracking-tighter dark:text-white text-black">
                                            {fav}
                                        </span>
                                        <div className="p-3 rounded-2xl transition-all dark:bg-white/5 dark:group-hover:bg-white dark:text-white/30 dark:group-hover:text-black bg-black/5 group-hover:bg-black text-black/30 group-hover:text-white">
                                            <TrendingUp size={20} />
                                        </div>
                                    </motion.button>
                                ))}
                            </div>
                        )}
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
                        <div className="p-12 rounded-[56px] border flex flex-col items-center text-center gap-8 backdrop-blur-3xl
                                        dark:bg-white/5 dark:border-white/5
                                        bg-black/5 border-black/10">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 rounded-[32px] flex items-center justify-center shadow-2xl overflow-hidden
                                           dark:bg-white dark:text-black
                                           bg-black text-white"
                            >
                                <Compass size={48} />
                            </motion.div>
                            <div className="flex flex-col gap-3">
                                <h2 className="text-5xl font-black tracking-tighter leading-none dark:text-white text-black">
                                    Aether
                                </h2>
                                <span className="text-[10px] font-black uppercase tracking-[0.5em] ml-[0.5em] dark:text-white/30 text-black/30">
                                    Climate Experience
                                </span>
                            </div>
                            <div className="h-[1px] w-12 dark:bg-white/20 bg-black/20"></div>
                            <p className="text-xs font-bold uppercase tracking-widest leading-loose max-w-[200px] dark:text-white/40 text-black/40">
                                Redefining weather through digital minimalism.
                            </p>
                            <div className="flex flex-col items-center gap-1 opacity-20">
                                <span className="text-[9px] font-black">v3.0.0</span>
                                <span className="text-[9px] font-black">Built with Passion</span>
                            </div>
                        </div>
                    </motion.div>
                );
            default:
                return null;
        }
    };

    const weatherCondition = data?.current?.weather?.[0]?.description;
    const isDay = data?.current?.weather?.[0]?.icon?.includes('d');

    return (
        <div className={`relative min-h-screen w-full flex flex-col font-sans overflow-x-hidden selection:bg-white/20 
                        ${isDarkMode ? 'dark' : ''}`}>
            <BackgroundLayer weatherCondition={weatherCondition} isDay={isDay} />

            <div className="flex-1 flex flex-col max-w-7xl mx-auto w-full px-6 pt-10 pb-24 relative z-10 gap-8 lg:px-12">
                {/* Header */}
                <header className="flex items-center justify-between px-2">
                    <h1 className="text-3xl font-black tracking-tighter uppercase tracking-[0.3em] leading-none dark:text-white/30 text-black/30">
                        Aether
                    </h1>
                    <div className="flex items-center gap-3">
                        <ThemeToggle />
                        <button
                            onClick={handleDetectLocation}
                            className="p-4 rounded-2xl transition-all border backdrop-blur-xl group
                                       dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/5
                                       bg-black/5 hover:bg-black/10 border-black/10"
                        >
                            <MapPin size={20} className="group-active:scale-90 transition-transform dark:text-white text-black" />
                        </button>
                    </div>
                </header>

                <LocationSearch onSearch={setCity} />

                <AnimatePresence mode="wait">
                    {renderContent()}
                </AnimatePresence>
            </div>

            <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />

            {/* Favorites Panel Modal */}
            <AnimatePresence>
                {showFavoritesPanel && (
                    <FavoritesPanel
                        onClose={() => setShowFavoritesPanel(false)}
                        onSelectCity={(city) => {
                            setCity(city);
                            setActiveTab('home');
                        }}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default WeatherDashboard;
