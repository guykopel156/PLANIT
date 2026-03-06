import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../../../context/AuthContext';
import { UIBox, UIErrorBoundary } from '../../../UI';

function AppPage(): React.ReactElement {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <UIBox className="min-h-screen bg-gray-50 pt-16 dark:bg-gray-950">
      <UIErrorBoundary>
        <Outlet />
      </UIErrorBoundary>
    </UIBox>
  );
}

export default AppPage;
