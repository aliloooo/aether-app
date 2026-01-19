import React, { useState } from 'react';
import { Search } from 'lucide-react';

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
            <div className="relative flex items-center group">
                <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Search City..."
                    className="w-full py-3 h-12 pl-5 pr-12 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:bg-white/10 focus:border-white/20 text-base font-light tracking-wide"
                />
                <button type="submit" className="absolute right-1 top-1 bottom-1 w-10 h-10 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-all active:scale-95">
                    <Search size={20} />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
