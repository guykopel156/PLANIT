import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { UINavbar, UIErrorBoundary } from '../UI';

const Home = lazy(() => import('../LandingPage/Home'));

const queryClient = new QueryClient();

function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UIErrorBoundary>
          <UINavbar />
          <Suspense fallback={<div className="flex min-h-screen items-center justify-center" />}>
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </Suspense>
        </UIErrorBoundary>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
