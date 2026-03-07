import { UIBox, UITypography, UIAvatar, UIProgressBar, UIBadge, UIImageCarousel } from '../../../UI';
import { useCountdown } from '../hooks/useCountdown';

import type { Trip } from '../../../types/trip';

interface ITripCardProps {
  trip: Trip;
}

function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };

  return `${start.toLocaleDateString('en-US', options)} – ${end.toLocaleDateString('en-US', options)}, ${end.getFullYear()}`;
}

const MAX_VISIBLE_AVATARS = 3;

function TripCard({ trip }: ITripCardProps): React.ReactElement {
  const countdown = useCountdown(trip.startDate);
  const visibleCollaborators = trip.collaborators.slice(0, MAX_VISIBLE_AVATARS);
  const remainingCount = trip.collaborators.length - MAX_VISIBLE_AVATARS;

  return (
    <UIBox className="group overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
      <UIBox className="relative h-36">
        <UIImageCarousel
          images={trip.coverImages}
          fallbackGradient={trip.thumbnailGradient}
          className="h-full w-full"
        />
        <UIBox className="absolute right-3 top-3 z-10">
          <UIBadge className="bg-white/90 text-gray-800 dark:bg-gray-900/90 dark:text-gray-200">
            {countdown}
          </UIBadge>
        </UIBox>
      </UIBox>

      <UIBox className="p-4">
        <UITypography variant="h4" className="text-gray-900 dark:text-white">
          {trip.name}
        </UITypography>
        <UITypography variant="p" className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {trip.destination}
        </UITypography>
        <UITypography variant="p" className="mt-0.5 text-xs text-gray-400 dark:text-gray-500">
          {formatDateRange(trip.startDate, trip.endDate)}
        </UITypography>

        <UIBox className="mt-4 flex items-center justify-between">
          <UIBox className="flex -space-x-2">
            {visibleCollaborators.map((collaborator) => (
              <UIAvatar
                key={collaborator.userId}
                name={collaborator.name}
                imageUrl={collaborator.avatar}
                size="sm"
                className="ring-2 ring-white dark:ring-gray-800"
              />
            ))}
            {remainingCount > 0 && (
              <UIBox className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-600 ring-2 ring-white dark:bg-gray-700 dark:text-gray-300 dark:ring-gray-800">
                +{remainingCount}
              </UIBox>
            )}
          </UIBox>
        </UIBox>

        <UIBox className="mt-3">
          <UIBox className="mb-1 flex items-center justify-between">
            <UITypography variant="span" className="text-xs text-gray-500 dark:text-gray-400">
              Progress
            </UITypography>
            <UITypography variant="span" className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {trip.completionPercentage}%
            </UITypography>
          </UIBox>
          <UIProgressBar value={trip.completionPercentage} />
        </UIBox>
      </UIBox>
    </UIBox>
  );
}

export default TripCard;
