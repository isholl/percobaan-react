import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useState } from 'react';
import { HelmetProvider } from 'react-helmet-async';

import { ThemeProvider } from '@/components/theme-provider';
import { Spinner } from '@/components/ui/spinner';
import { Toaster } from '@/components/ui/toaster';
import { AuthLoader } from '@/lib/auth';
import { queryConfig } from '@/lib/react-query';

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: queryConfig,
      }),
  );

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner className="size-16" />
        </div>
      }
    >
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          {import.meta.env.DEV && <ReactQueryDevtools />}
          <ThemeProvider defaultTheme="system" storageKey="theme">
            <AuthLoader
              renderLoading={() => (
                <div className="flex h-screen w-screen items-center justify-center">
                  <Spinner className="size-16" />
                </div>
              )}
            >
              <Toaster />
              {children}
            </AuthLoader>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </Suspense>
  );
};
