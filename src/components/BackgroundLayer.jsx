import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";
import useWeatherStore from '../store/weatherStore';
import { bgGradients } from '../utils/weatherMapping';
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

    const particlesConfig = useMemo(() => {
        const baseConfig = {
            fullScreen: { enable: false, zIndex: 0 },
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: { events: { onHover: { enable: true, mode: "bubble" } } },
            particles: {
                move: { enable: true },
                number: { density: { enable: true, area: 800 } },
                opacity: { value: 0.3 }
            }
        };

        if (['Rain', 'Drizzle', 'Thunderstorm'].includes(themeMode)) {
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

        if (themeMode === 'Snow') {
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

        return {
            ...baseConfig,
            particles: {
                ...baseConfig.particles,
                number: { value: 40 },
                color: { value: "#ffffff" },
                size: { value: { min: 1, max: 2 } },
                move: { enable: true, speed: 0.8, direction: "none", random: true, straight: false, outModes: "out" }
            }
        };
    }, [themeMode]);

    return (
        <div className={`absolute inset-0 -z-10 transition-all duration-1000 ${bgGradients[themeMode] || bgGradients.Default}`}>
            <WeatherVisuals themeMode={themeMode} />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] z-0"></div>

            {init && (
                <Particles
                    id="tsparticles"
                    options={particlesConfig}
                    className="absolute inset-0 h-full w-full pointer-events-none"
                />
            )}
        </div>
    );
};

export default BackgroundLayer;
