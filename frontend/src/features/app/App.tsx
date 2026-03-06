import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { UIBox, UINavbar, UIErrorBoundary } from '../../UI';
import { AuthProvider } from '../../context/AuthContext';

const Home = lazy(() => import('../landingPage/Home'));
const AppPage = lazy(() => import('./pages/AppPage'));
const Dashboard = lazy(() => import('../dashboard/Dashboard'));
const TripPlanning = lazy(() => import('../tripPlanning/TripPlanning'));

const queryClient = new QueryClient();

function App(): React.ReactElement {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <UIErrorBoundary>
            <UINavbar />
            <Suspense fallback={<UIBox className="flex min-h-screen items-center justify-center" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/app" element={<AppPage />}>
                  <Route index element={<Dashboard />} />
                  <Route path="plan" element={<TripPlanning />} />
                </Route>
              </Routes>
            </Suspense>
          </UIErrorBoundary>
          <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover />
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
