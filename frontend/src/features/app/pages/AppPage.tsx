import { useAuth } from '../../../context/AuthContext';
import { UIBox, UITypography } from '../../../UI';

function AppPage(): React.ReactElement {
  const { user } = useAuth();

  return (
    <UIBox className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
      <UIBox className="text-center">
        <UITypography variant="h1" className="text-gray-900 dark:text-white">
          Welcome, {user?.name ?? 'Traveler'}
        </UITypography>
        <UITypography variant="p" className="mt-2 text-gray-500 dark:text-gray-400">
          Your trip dashboard is coming soon.
        </UITypography>
      </UIBox>
    </UIBox>
  );
}

export default AppPage;
