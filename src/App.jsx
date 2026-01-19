import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import BackgroundLayer from './components/BackgroundLayer';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import ForecastList from './components/ForecastList';
import Footer from './components/Footer';
import useWeatherStore from './store/weatherStore';
import { useWeatherQuery } from './services/queries';
import { getWeatherTheme } from './utils/weatherMapping';

const queryClient = new QueryClient();

const WeatherAppContent = () => {
  const { data, isLoading, error } = useWeatherQuery();
  const setThemeMode = useWeatherStore((state) => state.setThemeMode);
  const setCity = useWeatherStore((state) => state.setCity);

  useEffect(() => {
    if (data?.current?.weather?.[0]?.id) {
      setThemeMode(getWeatherTheme(data.current.weather[0].id));
    }
  }, [data, setThemeMode]);

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full p-4 md:p-8">
      <BackgroundLayer />

      {/* Main Minimalist Container */}
      <div className="w-full max-w-4xl glass-panel relative flex flex-col gap-6 md:gap-8 min-h-[600px] h-full max-h-[90vh]">

        {/* Header Row: Brand + Search */}
        <header className="flex flex-col md:flex-row justify-between items-center gap-4 shrink-0">
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-semibold tracking-tight">Aether</h1>
            <p className="text-xs font-light opacity-60 uppercase tracking-widest">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="w-full max-w-xs">
            <SearchBar onSearch={setCity} />
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 flex flex-col justify-between overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-8 w-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex items-center justify-center text-red-300">
              City not found
            </div>
          )}

          {data && !isLoading && !error && (
            <>
              {/* Middle Grid: Main Weather + Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center h-full">
                <section className="flex justify-center md:justify-start">
                  <CurrentWeather data={data.current} type="main" />
                </section>
                <section className="flex flex-col gap-4">
                  <CurrentWeather data={data.current} type="stats" />
                </section>
              </div>

              {/* Bottom Row: Forecast */}
              <section className="mt-auto pt-6 border-t border-white/5">
                <ForecastList forecast={data.forecast} />
              </section>

              <Footer />
            </>
          )}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherAppContent />
    </QueryClientProvider>
  );
};

export default App;
