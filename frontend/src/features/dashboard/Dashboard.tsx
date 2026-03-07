import { UIBox, UITypography } from '../../UI';
import { useGetTrips } from '../../hooks/useGetTrips';
import DashboardHeader from './components/DashboardHeader';
import TripCard from './components/TripCard';
import DashboardEmptyState from './components/DashboardEmptyState';

function Dashboard(): React.ReactElement {
  const { data: trips = [], isLoading, isError, error } = useGetTrips();
  const hasTrips = trips.length > 0;

  if (isLoading) {
    return (
      <UIBox className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader tripCount={0} />
        <UIBox className="mt-8 flex items-center justify-center py-16">
          <UIBox className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
        </UIBox>
      </UIBox>
    );
  }

  if (isError) {
    return (
      <UIBox className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <DashboardHeader tripCount={0} />
        <UIBox className="mt-8 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-950/30">
          <UITypography variant="errorText">
            {error?.message ?? 'Failed to load trips. Please try again.'}
          </UITypography>
        </UIBox>
      </UIBox>
    );
  }

  return (
    <UIBox className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <DashboardHeader tripCount={trips.length} />

      {hasTrips ? (
        <UIBox className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </UIBox>
      ) : (
        <UIBox className="mt-8">
          <DashboardEmptyState />
        </UIBox>
      )}
    </UIBox>
  );
}

export default Dashboard;
