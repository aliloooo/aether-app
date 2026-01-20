import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Bookmark, Info } from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'forecast', icon: Calendar, label: 'Forecast' },
        { id: 'favorites', icon: Bookmark, label: 'Saved' },
        { id: 'info', icon: Info, label: 'Info' },
    ];

    return (
        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50">
            <div className="bg-white/5 backdrop-blur-[40px] border border-white/10 rounded-[36px] p-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="relative flex-1 py-3 flex flex-col items-center gap-1 transition-all active:scale-90"
                        >
                            <motion.div
                                animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                                className={`${isActive ? 'text-white' : 'text-white/30'}`}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>

                            {isActive && (
                                <motion.div
                                    layoutId="activeTabGlow"
                                    className="absolute inset-0 bg-white/5 rounded-3xl z-[-1]"
                                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                                />
                            )}

                            <span className={`text-[9px] font-black uppercase tracking-widest ${isActive ? 'text-white opacity-100' : 'text-white opacity-30'}`}>
                                {tab.label}
                            </span>

                            {isActive && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="w-1 h-1 rounded-full bg-white mt-0.5"
                                />
                            )}
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
