import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, Clock, X, Loader2 } from 'lucide-react';
import useWeatherStore from '../store/weatherStore';
import { fetchCitySuggestions } from '../services/api';

const LocationSearch = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef(null);
    const timeoutRef = useRef(null);

    const recentSearches = useWeatherStore((state) => state.recentSearches);

    // Popular cities for quick access
    const popularCities = [
        { name: 'Jakarta', country: 'ID' },
        { name: 'London', country: 'GB' },
        { name: 'New York', country: 'US' },
        { name: 'Tokyo', country: 'JP' },
        { name: 'Paris', country: 'FR' },
        { name: 'Sydney', country: 'AU' },
    ];

    // Debounced search
    useEffect(() => {
        if (query.length >= 3) {
            setIsLoading(true);

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            timeoutRef.current = setTimeout(async () => {
                try {
                    const results = await fetchCitySuggestions(query);
                    setSuggestions(results);
                } catch (error) {
                    console.error('Search error:', error);
                    setSuggestions([]);
                } finally {
                    setIsLoading(false);
                }
            }, 300);
        } else {
            setSuggestions([]);
            setIsLoading(false);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [query]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Keyboard navigation
    const handleKeyDown = (e) => {
        const items = suggestions.length > 0 ? suggestions : (recentSearches.length > 0 ? recentSearches : popularCities);

        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        } else if (e.key === 'Enter' && selectedIndex >= 0) {
            e.preventDefault();
            handleSelect(items[selectedIndex]);
        } else if (e.key === 'Escape') {
            setIsOpen(false);
            setQuery('');
        }
    };

    const handleSelect = (location) => {
        const cityName = typeof location === 'string' ? location : location.name;
        onSearch(location);
        setQuery('');
        setIsOpen(false);
        setSuggestions([]);
        setSelectedIndex(-1);
    };

    const handleInputChange = (e) => {
        setQuery(e.target.value);
        setIsOpen(true);
        setSelectedIndex(-1);
    };

    const handleClear = () => {
        setQuery('');
        setSuggestions([]);
        setSelectedIndex(-1);
    };

    const displayList = suggestions.length > 0 ? suggestions : (query.length === 0 && recentSearches.length > 0) ? recentSearches : popularCities;
    const showDropdown = isOpen && (query.length >= 3 || query.length === 0);

    return (
        <div ref={searchRef} className="relative w-full">
            {/* Search Input */}
            <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 dark:text-white/40 text-black/40 pointer-events-none" />

                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => setIsOpen(true)}
                    placeholder="Search for a city..."
                    className="w-full pl-14 pr-12 py-4 rounded-3xl border font-medium text-base
                               dark:bg-white/5 dark:border-white/10 dark:text-white dark:placeholder:text-white/30
                               bg-black/5 border-black/10 text-black placeholder:text-black/30
                               focus:outline-none focus:ring-2 dark:focus:ring-white/20 focus:ring-black/20
                               transition-all"
                />

                {/* Clear button or Loading spinner */}
                {query && (
                    <button
                        onClick={handleClear}
                        className="absolute right-5 top-1/2 -translate-y-1/2 dark:text-white/40 dark:hover:text-white/60 text-black/40 hover:text-black/60 transition-colors"
                    >
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <X className="w-5 h-5" />
                        )}
                    </button>
                )}
            </div>

            {/* Dropdown */}
            <AnimatePresence>
                {showDropdown && displayList.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full mt-2 w-full rounded-3xl border backdrop-blur-3xl shadow-2xl overflow-hidden z-50
                                   dark:bg-dark-card dark:border-white/10
                                   bg-light-card border-black/10"
                    >
                        {/* Header */}
                        <div className="px-5 py-3 border-b dark:border-white/5 border-black/5">
                            <p className="text-[10px] font-black uppercase tracking-[0.3em] dark:text-white/30 text-black/30">
                                {suggestions.length > 0 ? 'Suggestions' : query.length === 0 && recentSearches.length > 0 ? 'Recent' : 'Popular'}
                            </p>
                        </div>

                        {/* List */}
                        <div className="max-h-[400px] overflow-y-auto">
                            {displayList.map((item, index) => {
                                const isRecent = typeof item === 'string';
                                const displayName = isRecent ? item : item.label || item.name;
                                const isSelected = selectedIndex === index;

                                return (
                                    <motion.button
                                        key={isRecent ? item : item.label}
                                        onClick={() => handleSelect(item)}
                                        className={`w-full px-5 py-4 flex items-center gap-4 transition-colors text-left
                                                    ${isSelected
                                                ? 'dark:bg-white/10 bg-black/10'
                                                : 'dark:hover:bg-white/5 hover:bg-black/5'
                                            }`}
                                        whileHover={{ x: 4 }}
                                    >
                                        <div className={`p-2 rounded-xl ${isRecent ? 'dark:bg-emerald-500/20 bg-emerald-500/30' : 'dark:bg-blue-500/20 bg-blue-500/30'}`}>
                                            {isRecent ? (
                                                <Clock className="w-4 h-4 dark:text-emerald-400 text-emerald-600" />
                                            ) : (
                                                <MapPin className="w-4 h-4 dark:text-blue-400 text-blue-600" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold dark:text-white text-black">{displayName}</p>
                                        </div>
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LocationSearch;
