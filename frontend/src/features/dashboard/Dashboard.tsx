import { UIBox } from '../../UI';
import { MOCK_TRIPS } from './data/mockTrips';
import DashboardHeader from './components/DashboardHeader';
import TripCard from './components/TripCard';
import DashboardEmptyState from './components/DashboardEmptyState';

function Dashboard(): React.ReactElement {
  const trips = MOCK_TRIPS;
  const hasTrips = trips.length > 0;

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
