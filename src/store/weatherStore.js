import { create } from 'zustand';

const useWeatherStore = create((set) => ({
    city: 'Jakarta', // Default city
    unit: 'metric', // 'metric' or 'imperial'
    themeMode: 'Default',

    setCity: (city) => set({ city }),
    setUnit: (unit) => set({ unit }),
    setThemeMode: (mode) => set({ themeMode: mode }),
}));

export default useWeatherStore;
