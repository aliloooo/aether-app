import React, { useState, useRef, useEffect } from 'react';
import { Search, X, History, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useWeatherStore from '../store/weatherStore';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const trimmed = query.trim();
        if (trimmed) {
            onSearch(trimmed);
            setQuery('');
            setIsFocused(false);
        }
    };

    const handleRecentClick = (city) => {
        onSearch(city);
        setIsFocused(false);
    };

    return (
        <div ref={searchRef} className="relative w-full z-40">
            <form onSubmit={handleSubmit} className="relative">
                <motion.div
                    animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
                    className={`relative flex items-center transition-all duration-300 ${isFocused ? 'ring-2 ring-white/20' : ''
                        }`}
                >
                    <div className="absolute left-5 text-white/30">
                        <Search size={20} strokeWidth={2.5} />
                    </div>

                    <input
                        type="text"
                        value={query}
                        onFocus={() => setIsFocused(true)}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for a city..."
                        className="w-full py-5 pl-14 pr-16 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-white/30 outline-none backdrop-blur-3xl focus:bg-white/10 transition-all font-bold tracking-tight text-lg shadow-2xl"
                    />

                    {query && (
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="absolute right-14 p-2 text-white/30 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    )}

                    <button
                        type="submit"
                        className={`absolute right-3 p-3 rounded-2xl bg-white text-black hover:scale-105 active:scale-95 transition-all shadow-lg ${!query.trim() ? 'opacity-20 pointer-events-none' : 'opacity-100'
                            }`}
                    >
                        <ArrowRight size={20} strokeWidth={3} />
                    </button>
                </motion.div>
            </form>

            <AnimatePresence>
                {isFocused && recentSearches.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute top-full left-0 right-0 mt-3 p-3 bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                        <div className="flex items-center justify-between px-3 py-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Recent Searches</span>
                            <button
                                onClick={clearRecent}
                                className="text-[10px] font-black uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-colors"
                            >
                                Clear All
                            </button>
                        </div>
                        <div className="flex flex-col gap-1">
                            {recentSearches.map((city, idx) => (
                                <button
                                    key={`${city}-${idx}`}
                                    onClick={() => handleRecentClick(city)}
                                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/10 transition-colors group text-left"
                                >
                                    <History size={16} className="text-white/20 group-hover:text-white/60 transition-colors" />
                                    <span className="text-white font-bold tracking-tight">{city}</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;
