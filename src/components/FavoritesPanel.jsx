import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Trash2, TrendingUp } from 'lucide-react';
import useWeatherStore from '../store/weatherStore';
import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from '../services/api';
import WeatherIcon from './WeatherIcon';

const FavoritesPanel = ({ onClose, onSelectCity }) => {
    const favorites = useWeatherStore((state) => state.favorites);
    const removeFavorite = useWeatherStore((state) => state.removeFavorite);
    const updateFavoriteData = useWeatherStore((state) => state.updateFavoriteData);
    const favoritesData = useWeatherStore((state) => state.favoritesData);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl max-h-[80vh] overflow-hidden rounded-[40px] border backdrop-blur-3xl
                           dark:bg-dark-card dark:border-white/10
                           bg-light-card border-black/10"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b dark:border-white/10 border-black/10">
                    <div>
                        <h2 className="text-2xl font-black dark:text-white text-black tracking-tighter">
                            Saved Locations
                        </h2>
                        <p className="text-sm font-bold dark:text-white/40 text-black/40 mt-1">
                            {favorites.length} {favorites.length === 1 ? 'city' : 'cities'} saved
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-3 rounded-2xl dark:bg-white/5 dark:hover:bg-white/10 bg-black/5 hover:bg-black/10 transition-colors"
                    >
                        <X className="w-5 h-5 dark:text-white text-black" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                    {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <div className="w-20 h-20 rounded-full dark:bg-white/5 bg-black/5 flex items-center justify-center mb-4">
                                <TrendingUp className="w-10 h-10 dark:text-white/20 text-black/20" />
                            </div>
                            <p className="text-lg font-bold dark:text-white/40 text-black/40">
                                No saved locations yet
                            </p>
                            <p className="text-sm font-bold dark:text-white/30 text-black/30 mt-2">
                                Save cities to quickly access their weather
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {favorites.map((city, index) => (
                                <FavoriteCard
                                    key={city}
                                    city={city}
                                    index={index}
                                    onSelect={() => {
                                        onSelectCity(city);
                                        onClose();
                                    }}
                                    onRemove={() => removeFavorite(city)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

// Individual Favorite Card Component
const FavoriteCard = ({ city, index, onSelect, onRemove }) => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['favorite-weather', city],
        queryFn: () => fetchWeatherData(city),
        staleTime: 10 * 60 * 1000, // 10 minutes
        retry: 1,
    });

    const weather = data?.current;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group relative p-4 rounded-3xl border dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/[0.07]
                       bg-black/5 border-black/10 hover:bg-black/[0.07] transition-all cursor-pointer"
            onClick={onSelect}
        >
            {/* Remove Button */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onRemove();
                }}
                className="absolute top-3 right-3 p-2 rounded-xl dark:bg-red-500/20 dark:hover:bg-red-500/30
                           bg-red-500/30 hover:bg-red-500/40 opacity-0 group-hover:opacity-100 transition-all z-10"
            >
                <Trash2 className="w-4 h-4 dark:text-red-400 text-red-600" />
            </button>

            {isLoading ? (
                <div className="flex flex-col gap-3">
                    <div className="h-6 w-32 dark:bg-white/10 bg-black/10 rounded-full animate-pulse" />
                    <div className="h-8 w-20 dark:bg-white/10 bg-black/10 rounded-full animate-pulse" />
                </div>
            ) : error || !weather ? (
                <div className="flex flex-col gap-2">
                    <p className="font-black dark:text-white text-black">{city}</p>
                    <p className="text-sm font-bold dark:text-red-400 text-red-600">Unable to load</p>
                </div>
            ) : (
                <div className="flex items-center gap-4">
                    <div>
                        <WeatherIcon iconCode={weather.weather[0].icon} size={48} />
                    </div>
                    <div className="flex-1">
                        <p className="text-lg font-black dark:text-white text-black tracking-tighter">
                            {city}
                        </p>
                        <p className="text-sm font-bold dark:text-white/50 text-black/50 capitalize">
                            {weather.weather[0].description}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-3xl font-black dark:text-white text-black tracking-tighter">
                            {Math.round(weather.main.temp)}°
                        </p>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default FavoritesPanel;
