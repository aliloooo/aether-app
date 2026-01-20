import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WeatherDashboard from './pages/WeatherDashboard';
import ErrorBoundary from './components/ErrorBoundary';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <WeatherDashboard />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
