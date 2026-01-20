import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";
import useWeatherStore from '../store/weatherStore';
import WeatherVisuals from './WeatherVisuals';

const BackgroundLayer = () => {
    const [init, setInit] = useState(false);
    const themeMode = useWeatherStore((state) => state.themeMode);

    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    // Theme-based accent colors for mesh gradient
    const themeAccents = useMemo(() => {
        const accents = {
            Clear: 'hsla(190, 80%, 30%, 0.3)',
            Clouds: 'hsla(210, 40%, 40%, 0.2)',
            Rain: 'hsla(220, 60%, 20%, 0.3)',
            Snow: 'hsla(180, 20%, 60%, 0.2)',
            Mist: 'hsla(0, 0%, 50%, 0.2)',
            Thunderstorm: 'hsla(280, 70%, 20%, 0.3)',
            Default: 'hsla(230, 60%, 15%, 0.3)'
        };
        const key = themeMode.replace('Night', '');
        return accents[key] || accents.Default;
    }, [themeMode]);

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

        if (['Rain', 'Drizzle', 'Thunderstorm'].includes(themeMode)) {
            return {
                ...baseConfig,
                particles: {
                    ...baseConfig.particles,
                    number: { value: 200 },
                    color: { value: "#ffffff" },
                    shape: { type: "line" },
                    size: { value: { min: 0.1, max: 0.4 } },
                    move: { enable: true, speed: 25, direction: "bottom", straight: true }
                }
            };
        }

        if (themeMode.includes('Snow')) {
            return {
                ...baseConfig,
                particles: {
                    ...baseConfig.particles,
                    number: { value: 120 },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    size: { value: { min: 1, max: 2.5 } },
                    move: { enable: true, speed: 1.5, direction: "bottom", straight: false, random: true, outModes: "out" }
                }
            };
        }

        return {
            ...baseConfig,
            particles: {
                ...baseConfig.particles,
                number: { value: 50 },
                color: { value: "#ffffff" },
                size: { value: { min: 0.5, max: 1.2 } },
                move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, outModes: "out" }
            }
        };
    }, [themeMode]);

    return (
        <div
            className="absolute inset-0 -z-10 transition-colors duration-1000 bg-[#080a0f]"
            style={{
                backgroundImage: `
                    radial-gradient(at 0% 0%, ${themeAccents} 0, transparent 50%),
                    radial-gradient(at 100% 0%, ${themeAccents} 0, transparent 50%),
                    radial-gradient(at 50% 100%, hsla(240, 50%, 10%, 0.5) 0, transparent 80%)
                `
            }}
        >
            <WeatherVisuals themeMode={themeMode} />
            <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px] z-0"></div>

            {init && (
                <Particles
                    id="tsparticles"
                    options={particlesConfig}
                    className="absolute inset-0 h-full w-full pointer-events-none"
                />
            )}

            {/* Soft Ambient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60 pointer-events-none"></div>
        </div>
    );
};

export default BackgroundLayer;
