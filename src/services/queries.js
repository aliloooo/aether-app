import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from './api';
import useWeatherStore from '../store/weatherStore';

export const useWeatherQuery = () => {
    const city = useWeatherStore((state) => state.city);
    const coords = useWeatherStore((state) => state.coords);

    const queryKey = coords ? ['weather', coords] : ['weather', city];
    const queryFn = () => fetchWeatherData(coords || city);

    return useQuery({
        queryKey,
        queryFn,
        enabled: !!(city || coords),
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
