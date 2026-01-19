import { useQuery } from '@tanstack/react-query';
import { fetchWeatherData } from './api';
import useWeatherStore from '../store/weatherStore';

export const useWeatherQuery = () => {
    const city = useWeatherStore((state) => state.city);

    return useQuery({
        queryKey: ['weather', city],
        queryFn: () => fetchWeatherData(city),
        enabled: !!city,
        staleTime: 1000 * 60 * 10, // 10 minutes
        retry: 1,
        refetchOnWindowFocus: false,
    });
};
