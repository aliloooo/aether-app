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
                    className="w-full py-2 pl-4 pr-10 bg-white/5 border border-white/10 rounded-full text-white placeholder-white/30 outline-none backdrop-blur-sm transition-all focus:bg-white/10 focus:border-white/20 text-sm font-light tracking-wide text-right"
                />
                <button type="submit" className="absolute right-0 top-0 bottom-0 p-2 text-white/40 hover:text-white transition-colors">
                    <Search size={16} />
                </button>
            </div>
        </form>
    );
};

export default SearchBar;
