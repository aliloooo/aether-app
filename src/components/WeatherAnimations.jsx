import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import useWeatherStore from '../store/weatherStore';

const WeatherAnimations = ({ weatherCondition, isDay }) => {
    const reducedMotion = useWeatherStore((state) => state.reducedMotion);

    // Don't render animations if reduced motion is enabled
    if (reducedMotion) return null;

    const getAnimationType = () => {
        const condition = weatherCondition?.toLowerCase() || '';

        if (condition.includes('rain') || condition.includes('drizzle')) {
            return 'rain';
        } else if (condition.includes('snow')) {
            return 'snow';
        } else if (condition.includes('cloud')) {
            return 'clouds';
        } else if (condition.includes('thunder') || condition.includes('storm')) {
            return 'storm';
        }
        return null;
    };

    const animationType = getAnimationType();

    if (!animationType) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
            {animationType === 'rain' && <RainAnimation />}
            {animationType === 'snow' && <SnowAnimation />}
            {animationType === 'clouds' && <CloudsAnimation />}
            {animationType === 'storm' && <StormAnimation />}
        </div>
    );
};

// Rain Animation Component
const RainAnimation = () => {
    const raindrops = useMemo(() => {
        return Array.from({ length: 80 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            animationDelay: Math.random() * 2,
            opacity: 0.3 + Math.random() * 0.4,
            duration: 0.8 + Math.random() * 0.4,
        }));
    }, []);

    return (
        <>
            {raindrops.map((drop) => (
                <motion.div
                    key={drop.id}
                    className="absolute w-[2px] h-12 bg-gradient-to-b from-transparent via-blue-300/60 to-blue-400/80"
                    style={{
                        left: `${drop.left}%`,
                        top: '-50px',
                    }}
                    animate={{
                        y: ['0vh', '110vh'],
                    }}
                    transition={{
                        duration: drop.duration,
                        repeat: Infinity,
                        delay: drop.animationDelay,
                        ease: 'linear',
                    }}
                />
            ))}
        </>
    );
};

// Snow Animation Component
const SnowAnimation = () => {
    const snowflakes = useMemo(() => {
        return Array.from({ length: 50 }, (_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: 4 + Math.random() * 6,
            animationDelay: Math.random() * 3,
            swayAmount: 20 + Math.random() * 30,
            duration: 3 + Math.random() * 2,
        }));
    }, []);

    return (
        <>
            {snowflakes.map((flake) => (
                <motion.div
                    key={flake.id}
                    className="absolute rounded-full bg-white shadow-lg"
                    style={{
                        left: `${flake.left}%`,
                        width: flake.size,
                        height: flake.size,
                        top: '-20px',
                    }}
                    animate={{
                        y: ['0vh', '110vh'],
                        x: [`0px`, `${flake.swayAmount}px`, `0px`, `-${flake.swayAmount}px`, `0px`],
                        rotate: [0, 360],
                    }}
                    transition={{
                        duration: flake.duration,
                        repeat: Infinity,
                        delay: flake.animationDelay,
                        ease: 'linear',
                    }}
                />
            ))}
        </>
    );
};

// Clouds Animation Component
const CloudsAnimation = () => {
    const clouds = useMemo(() => {
        return Array.from({ length: 4 }, (_, i) => ({
            id: i,
            top: 10 + Math.random() * 30,
            scale: 0.8 + Math.random() * 0.5,
            opacity: 0.15 + Math.random() * 0.15,
            duration: 25 + Math.random() * 15,
        }));
    }, []);

    return (
        <>
            {clouds.map((cloud) => (
                <motion.div
                    key={cloud.id}
                    className="absolute"
                    style={{
                        top: `${cloud.top}%`,
                        left: '-200px',
                    }}
                    animate={{
                        x: ['0px', 'calc(100vw + 200px)'],
                    }}
                    transition={{
                        duration: cloud.duration,
                        repeat: Infinity,
                        ease: 'linear',
                    }}
                >
                    <svg
                        width="200"
                        height="80"
                        viewBox="0 0 200 80"
                        style={{
                            transform: `scale(${cloud.scale})`,
                            opacity: cloud.opacity,
                        }}
                    >
                        <ellipse cx="60" cy="50" rx="50" ry="30" fill="white" />
                        <ellipse cx="100" cy="40" rx="60" ry="35" fill="white" />
                        <ellipse cx="140" cy="50" rx="45" ry="28" fill="white" />
                    </svg>
                </motion.div>
            ))}
        </>
    );
};

// Storm Animation (Combination of rain and lightning)
const StormAnimation = () => {
    const [showLightning, setShowLightning] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) {
                setShowLightning(true);
                setTimeout(() => setShowLightning(false), 200);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <RainAnimation />
            {showLightning && (
                <motion.div
                    className="absolute inset-0 bg-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0, 0.3, 0] }}
                    transition={{ duration: 0.4 }}
                />
            )}
        </>
    );
};

export default WeatherAnimations;
