import React, { useState, useRef, useEffect } from 'react';
import { Search, X, History, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useWeatherStore from '../store/weatherStore';
import { fetchCitySuggestions } from '../services/api';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const searchRef = useRef(null);
    const recentSearches = useWeatherStore((state) => state.recentSearches);
    const clearRecent = useWeatherStore((state) => state.clearRecentSearches);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsFocused(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Debounce Search Logic
    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (query.length >= 3) {
                setIsLoading(true);
                const results = await fetchCitySuggestions(query);
                setSuggestions(results);
                setIsLoading(false);
            } else {
                setSuggestions([]);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
            setQuery('');
            setSuggestions([]);
            setIsFocused(false);
        }
    };

    const handleSelect = (city) => {
        // If city is an object (from API), onSearch might need to handle it or just use name
        // The App currently handles string or {lat, lon}
        // Let's pass the object for better accuracy if possible, otherwise just name
        if (typeof city === 'object' && city.lat) {
            onSearch({ lat: city.lat, lon: city.lon, name: city.name });
        } else {
            onSearch(city);
        }
        setQuery('');
        setSuggestions([]);
        setIsFocused(false);
    };

    return (
        <div ref={searchRef} className="relative w-full z-40">
            <form onSubmit={handleSubmit} className="relative">
                <motion.div
                    animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
                    className={`relative flex items-center transition-all duration-300 ${isFocused ? 'ring-2 ring-white/20' : ''}`}
                >
                    <div className="absolute left-5 text-white/30">
                        {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                        ) : (
                            <Search size={20} strokeWidth={2.5} />
                        )}
                    </div>

                    <input
                        type="text"
                        value={query}
                        onFocus={() => setIsFocused(true)}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a city..."
                        className="w-full py-5 pl-14 pr-16 bg-glass-bg border border-glass-border rounded-3xl text-white placeholder-white/30 outline-none backdrop-blur-3xl focus:bg-glass-highlight transition-all font-bold tracking-tight text-lg shadow-2xl"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => { setQuery(''); setSuggestions([]); }}
                            className="absolute right-14 p-2 text-white/30 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}

                    <button
                        type="submit"
                        className={`absolute right-3 p-3 rounded-2xl bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-lg ${!query.trim() ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}
                    >
                        <ArrowRight size={20} strokeWidth={3} />
                    </button>
                </motion.div>
            </form>

            <AnimatePresence>
                {isFocused && (suggestions.length > 0 || recentSearches.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-3 p-3 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden max-h-[400px] overflow-y-auto z-50 scrollbar-hide"
                    >
                        {suggestions.length > 0 ? (
                            <div className="flex flex-col gap-1">
                                <span className="px-3 py-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">Suggestions</span>
                                {suggestions.map((item, idx) => (
                                    <button
                                        key={`s-${idx}`}
                                        onClick={() => handleSelect(item)}
                                        className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-colors group text-left w-full"
                                    >
                                        <div className="p-2 rounded-full bg-white/5 group-hover:bg-white/20 transition-colors">
                                            <Search size={14} className="text-white/60" />
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-white font-bold tracking-tight text-sm">{item.name}</span>
                                            <span className="text-white/40 text-xs">{item.state ? `${item.state}, ` : ''}{item.country}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        ) : (
                            recentSearches.length > 0 && (
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center justify-between px-3 py-2 mb-2">
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Recent Searches</span>
                                        <button
                                            onClick={clearRecent}
                                            className="text-[10px] font-black uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-colors"
                                        >
                                            Clear All
                                        </button>
                                    </div>
                                    {recentSearches.map((city, idx) => (
                                        <button
                                            key={`r-${idx}`}
                                            onClick={() => handleSelect(city)}
                                            className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-colors group text-left w-full"
                                        >
                                            <History size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
                                            <span className="text-white font-bold tracking-tight">{city}</span>
                                        </button>
                                    ))}
                                </div>
                            )
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
