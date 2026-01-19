import React, { useEffect, useMemo, useState } from 'react';
import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from "@tsparticles/slim";
import useWeatherStore from '../store/weatherStore';
import { bgGradients } from '../utils/weatherMapping';

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
            interactivity: { events: { onClick: { enable: true, mode: "push" } }, modes: { push: { quantity: 4 } } },
            particles: { move: { enable: true }, number: { density: { enable: true } }, opacity: { value: 0.5 } }
        };

        if (themeMode === 'Rain' || themeMode === 'Drizzle' || themeMode === 'Thunderstorm') {
            return {
                ...baseConfig,
                particles: {
                    ...baseConfig.particles,
                    number: { value: 100 },
                    color: { value: "#ffffff" },
                    shape: { type: "line" }, // Simulating rain drops roughly
                    size: { value: { min: 0.1, max: 0.5 } },
                    move: { enable: true, speed: 15, direction: "bottom", straight: true }
                }
            };
        }

        if (themeMode === 'Snow') {
            return {
                ...baseConfig,
                particles: {
                    ...baseConfig.particles,
                    number: { value: 50 },
                    color: { value: "#ffffff" },
                    shape: { type: "circle" },
                    move: { enable: true, speed: 2, direction: "bottom", straight: false, random: true }
                }
            };
        }

        // Default subtle particles for Clear/Clouds
        return {
            ...baseConfig,
            particles: {
                ...baseConfig.particles,
                number: { value: 30 },
                color: { value: "#ffffff" },
                size: { value: { min: 1, max: 3 } },
                move: { enable: true, speed: 0.5, direction: "none", random: true, straight: false, outModes: "out" }
            }
        }

    }, [themeMode]);

    return (
        <div className={`absolute inset-0 -z-10 transition-all duration-1000 ${bgGradients[themeMode] || bgGradients.Default}`}>
            {init && (
                <Particles
                    id="tsparticles"
                    options={particlesConfig}
                    className="absolute inset-0 h-full w-full"
                />
            )}
        </div>
    );
};

export default BackgroundLayer;
