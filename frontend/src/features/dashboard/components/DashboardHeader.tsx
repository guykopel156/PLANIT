import { useAuth } from '../../../context/AuthContext';
import { UIBox, UITypography, UIPrimaryButton } from '../../../UI';

interface IDashboardHeaderProps {
  tripCount: number;
}

function DashboardHeader({ tripCount }: IDashboardHeaderProps): React.ReactElement {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] ?? 'Traveler';

  return (
    <UIBox className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <UIBox>
        <UITypography variant="h1" className="text-gray-900 dark:text-white">
          Welcome back, {firstName}
        </UITypography>
        <UITypography variant="p" className="mt-1 text-gray-500 dark:text-gray-400">
          {tripCount > 0
            ? `You have ${tripCount} trip${tripCount === 1 ? '' : 's'} planned`
            : 'No trips yet — time to start planning!'}
        </UITypography>
      </UIBox>
      <UIPrimaryButton to="/app/plan">
        Plan New Trip
      </UIPrimaryButton>
    </UIBox>
  );
}

export default DashboardHeader;
