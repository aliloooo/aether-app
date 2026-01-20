import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useWeatherStore = create(
    persist(
        (set) => ({
            city: 'Jakarta',
            coords: null, // { lat, lon }
            unit: 'metric',
            themeMode: 'Default',
            favorites: ['Jakarta', 'London', 'Tokyo'],

            setCity: (city) => set({ city, coords: null }),
            setCoords: (coords) => set({ coords, city: null }),
            setUnit: (unit) => set({ unit }),
            setThemeMode: (mode) => set({ themeMode: mode }),

            addFavorite: (city) => set((state) => ({
                favorites: [...new Set([...state.favorites, city])]
            })),

            removeFavorite: (city) => set((state) => ({
                favorites: state.favorites.filter((fav) => fav !== city)
            })),
        }),
        {
            name: 'weather-storage',
        }
    )
);

export default useWeatherStore;
