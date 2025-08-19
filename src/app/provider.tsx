import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, Suspense, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from '@/components/theme-provider';
import { queryConfig } from '@/lib/react-query';

type AppProviderProps = { children: ReactNode };

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () => new QueryClient({ defaultOptions: queryConfig }),
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          Loading bang
        </div>
      }
    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="system" storageKey="theme">
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </Suspense>
  );
};
