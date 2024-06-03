import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Setting up the react query client
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
function ReactQuerySettings({ children }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 2,
      },
      mutations: {
        retry: 2,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default ReactQuerySettings;
