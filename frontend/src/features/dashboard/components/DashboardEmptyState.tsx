import { UIBox, UITypography, UIPrimaryButton } from '../../../UI';

function DashboardEmptyState(): React.ReactElement {
  return (
    <UIBox className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 px-6 py-16 dark:border-gray-600">
      <UIBox className="mb-4 text-6xl">
        <span role="img" aria-label="airplane">✈️</span>
      </UIBox>
      <UITypography variant="h3" className="text-gray-900 dark:text-white">
        No trips yet
      </UITypography>
      <UITypography variant="p" className="mt-2 max-w-sm text-center text-gray-500 dark:text-gray-400">
        Plan your first adventure and let AI create the perfect itinerary for you.
      </UITypography>
      <UIPrimaryButton to="/app/plan" className="mt-6">
        Plan Your First Trip
      </UIPrimaryButton>
    </UIBox>
  );
}

export default DashboardEmptyState;
