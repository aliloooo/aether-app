import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
    const [city, setCity] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (city.trim()) {
            onSearch(city);
            setCity('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative w-full">
            <motion.div
                whileHover={{ scale: 1.01 }}
                className="relative flex items-center group"
            >
                <div className="absolute left-5 text-white/30 group-focus-within:text-white/60 transition-colors">
                    <Search size={18} />
                </div>
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search for a city..."
                    className="w-full py-4 h-14 pl-12 pr-6 bg-black/40 border border-white/20 rounded-2xl text-white placeholder-white/40 outline-none backdrop-blur-xl transition-all focus:bg-black/60 focus:border-white/40 text-sm font-bold uppercase tracking-widest shadow-2xl"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-3 bottom-3 px-4 flex items-center justify-center rounded-xl bg-white/20 text-white hover:text-white hover:bg-white/30 transition-all active:scale-95 text-[10px] font-black uppercase tracking-tighter"
                >
                    ENTER
                </button>

            </motion.div>
        </form>
    );
};

export default SearchBar;

