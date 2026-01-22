import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";
import useWeatherStore from '../store/weatherStore';
import WeatherVisuals from './WeatherVisuals';
import WeatherAnimations from './WeatherAnimations';

const BackgroundLayer = ({ weatherCondition, isDay }) => {
    const [init, setInit] = useState(false);
    const themeMode = useWeatherStore((state) => state.themeMode);
    const isDarkMode = useWeatherStore((state) => state.isDarkMode);

    // Guard clause in case themeMode is not yet an object (initial load)
    const currentTheme = typeof themeMode === 'string' ? { id: 'Default', gradient: 'bg-gradient-to-br from-[#1e3c72] to-[#2a5298]' } : themeMode;

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesConfig = useMemo(() => {
        const baseConfig = {
            fullScreen: { enable: false, zIndex: 0 },
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: { events: { onHover: { enable: true, mode: "bubble" } } },
            particles: {
                move: { enable: true },
                number: { density: { enable: true, area: 800 } },
                opacity: { value: 0.2 }
            }
        };

        const id = currentTheme.id || 'Default';

        if (['Rain', 'RainNight', 'Drizzle', 'Thunderstorm'].includes(id)) {
            return {
                ...baseConfig,
                particles: {
                    ...baseConfig.particles,
                    number: { value: 150 },
                    color: { value: "#ffffff" },
                    shape: { type: "line" },
                    size: { value: { min: 0.1, max: 0.5 } },
                    move: { enable: true, speed: 20, direction: "bottom", straight: true }
                }
            };
        }

        if (id.includes('Snow')) {
            return {
                ...baseConfig,
                particles: {
                    ...baseConfig.particles,
                    number: { value: 100 },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 3 } },
                    move: { enable: true, speed: 2, direction: "bottom", straight: false, random: true, outModes: "out" }
                }
            };
        }

        if (id.includes('Clouds')) {
            return {
                ...baseConfig,
                particles: {
                    ...baseConfig.particles,
                    number: { value: 30 },
                    color: { value: "#ffffff" },
                    size: { value: { min: 1, max: 3 } },
                    move: { enable: true, speed: 0.5, direction: "right", random: true, straight: false }
                }
            };
        }

        // Clear/Default - subtle floating particles
        return {
            ...baseConfig,
            particles: {
                ...baseConfig.particles,
                number: { value: 40 },
                color: { value: "#ffffff" },
                size: { value: { min: 0.5, max: 1.5 } },
                move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, outModes: "out" }
            }
        };
    }, [currentTheme.id]);

    // Get gradient based on theme mode
    const getBackgroundGradient = () => {
        if (isDarkMode) {
            return currentTheme.gradient || 'bg-gradient-to-br from-[#0a0e1a] via-[#1e3c72] to-[#0a0e1a]';
        } else {
            return 'bg-gradient-to-br from-[#e0f2fe] via-[#bae6fd] to-[#7dd3fc]';
        }
    };

    return (
        <div className={`fixed inset-0 -z-10 transition-all duration-1000 ${getBackgroundGradient()}`}>
            <WeatherVisuals themeMode={currentTheme.id} />

            {/* Weather Animations */}
            <WeatherAnimations weatherCondition={weatherCondition} isDay={isDay} />

            {/* Gradient Overlay for Depth */}
            <div className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 
                            ${isDarkMode
                    ? 'bg-gradient-to-b from-black/0 via-black/10 to-black/40'
                    : 'bg-gradient-to-b from-white/0 via-white/5 to-white/20'
                }`}>
            </div>

            {init && (
                <Particles
                    id="tsparticles"
                    options={particlesConfig}
                    className="absolute inset-0 h-full w-full pointer-events-none"
                    key={currentTheme.id} // Re-render particles on theme change
                />
            )}
        </div>
    );
};

export default BackgroundLayer;
