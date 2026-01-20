import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full pt-12 pb-8 border-t border-white/5 mt-auto">
            <div className="flex flex-col items-center justify-center gap-2 opacity-30 group cursor-default">
                <p className="text-[10px] font-black uppercase tracking-[0.3em] group-hover:opacity-100 transition-opacity">
                    Aether / Powered by OpenWeather
                </p>
                <div className="flex items-center gap-4 text-[10px] font-bold opacity-60">
                    <span>© {new Date().getFullYear()}</span>
                    <span className="w-1 h-1 bg-white/20 rounded-full"></span>
                    <span>Designed for Excellence</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

