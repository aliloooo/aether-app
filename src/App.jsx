import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeatherDashboard from './pages/WeatherDashboard';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <WeatherDashboard />
    </QueryClientProvider>
  );
};

export default App;
