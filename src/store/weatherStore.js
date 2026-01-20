import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWeatherStore = create(
    persist(
        (set) => ({
            city: 'Jakarta',
            coords: null,
            unit: 'metric',
            themeMode: 'Default',
            favorites: ['Jakarta', 'London', 'Tokyo'],
            recentSearches: [],

            setCity: (city) => set((state) => {
                const newRecent = [city, ...state.recentSearches.filter(c => c !== city)].slice(0, 5);
                return { city, coords: null, recentSearches: newRecent };
            }),
            setCoords: (coords) => set({ coords, city: null }),
            setUnit: (unit) => set({ unit }),
            setThemeMode: (mode) => set({ themeMode: mode }),

            addFavorite: (city) => set((state) => ({
                favorites: [...new Set([...state.favorites, city])]
            })),

            removeFavorite: (city) => set((state) => ({
                favorites: state.favorites.filter((fav) => fav !== city)
            })),

            clearRecentSearches: () => set({ recentSearches: [] }),
        }),
        {
            name: 'weather-storage',
        }
    )
);

export default useWeatherStore;
