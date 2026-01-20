import React from 'react';
import { motion } from 'framer-motion';
import { Home, Calendar, Heart, Info } from 'lucide-react';

const BottomNav = ({ activeTab, onTabChange }) => {
    const tabs = [
        { id: 'home', icon: Home, label: 'Home' },
        { id: 'forecast', icon: Calendar, label: 'Forecast' },
        { id: 'favorites', icon: Heart, label: 'Saved' },
        { id: 'info', icon: Info, label: 'Info' },
    ];

    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 px-4 flex items-center justify-between shadow-2xl">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className="relative py-2 px-4 flex flex-col items-center gap-1 transition-all active:scale-90"
                        >
                            <motion.div
                                animate={isActive ? { y: -2, scale: 1.1 } : { y: 0, scale: 1 }}
                                className={`${isActive ? 'text-white' : 'text-white/40'}`}
                            >
                                <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            </motion.div>

                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute inset-0 bg-white/10 rounded-2xl z-[-1]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}

                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-white' : 'text-white/40'}`}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </div>
        </nav>
    );
};

export default BottomNav;
