import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const withReactQuery = (children:()=> React.ReactNode) => () => (
  <QueryClientProvider client={queryClient}>
    {children()}
  </QueryClientProvider>
);
export { withReactQuery };
