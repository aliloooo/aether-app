import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWeatherStore = create(
    persist(
        (set) => ({
            city: 'Jakarta',
            coords: null,
            unit: 'metric',
            themeMode: 'Default',
            isDarkMode: true,
            reducedMotion: false,
            autoRefresh: true,
            favorites: ['Jakarta', 'London', 'Tokyo'],
            recentSearches: [],
            favoritesData: {},

            setCity: (input) => set((state) => {
                let cityName = input;
                let newCoords = null;

                if (typeof input === 'object' && input !== null) {
                    cityName = input.name;
                    newCoords = { lat: input.lat, lon: input.lon };
                }

                const newRecent = [cityName, ...state.recentSearches.filter(c => c !== cityName)].slice(0, 5);
                return { city: cityName, coords: newCoords, recentSearches: newRecent };
            }),
            setCoords: (coords) => set({ coords, city: null }),
            setUnit: (unit) => set({ unit }),
            setThemeMode: (mode) => set({ themeMode: mode }),

            // Theme Controls
            toggleTheme: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
            setDarkMode: (value) => set({ isDarkMode: value }),

            // Accessibility
            setReducedMotion: (value) => set({ reducedMotion: value }),
            toggleReducedMotion: () => set((state) => ({ reducedMotion: !state.reducedMotion })),

            // Auto Refresh
            setAutoRefresh: (value) => set({ autoRefresh: value }),

            // Favorites Management
            addFavorite: (city) => set((state) => ({
                favorites: [...new Set([...state.favorites, city])]
            })),

            removeFavorite: (city) => set((state) => ({
                favorites: state.favorites.filter((fav) => fav !== city),
                favoritesData: Object.fromEntries(
                    Object.entries(state.favoritesData).filter(([key]) => key !== city)
                )
            })),

            updateFavoriteData: (city, data) => set((state) => ({
                favoritesData: {
                    ...state.favoritesData,
                    [city]: {
                        ...data,
                        lastUpdated: new Date().toISOString()
                    }
                }
            })),

            // Recent Searches
            clearRecentSearches: () => set({ recentSearches: [] }),
        }),
        {
            name: 'weather-storage',
        }
    )
);

export default useWeatherStore;
