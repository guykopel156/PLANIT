import { useState } from 'react';

import { UIBox, UITypography } from '../../../UI';

import type { ItineraryDay } from '../../../types/trip';

interface IItineraryDayCardProps {
  day: ItineraryDay;
}

function ItineraryDayCard({ day }: IItineraryDayCardProps): React.ReactElement {
  const [isExpanded, setIsExpanded] = useState(true);

  function handleToggle(): void {
    setIsExpanded((prev) => !prev);
  }

  return (
    <UIBox className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <button
        type="button"
        onClick={handleToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-750"
      >
        <UIBox className="flex items-center gap-3">
          <UIBox className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700 dark:bg-blue-900 dark:text-blue-300">
            {day.dayNumber}
          </UIBox>
          <UIBox>
            <UITypography variant="h5" className="text-gray-900 dark:text-white">
              Day {day.dayNumber}: {day.theme}
            </UITypography>
            <UITypography variant="span" className="text-xs text-gray-500 dark:text-gray-400">
              {day.date}
            </UITypography>
          </UIBox>
        </UIBox>
        <UITypography variant="span" className="text-gray-400 dark:text-gray-500">
          {isExpanded ? '▲' : '▼'}
        </UITypography>
      </button>

      {isExpanded && (
        <UIBox className="border-t border-gray-100 px-5 py-4 dark:border-gray-700">
          <UIBox className="flex flex-col gap-4">
            {day.activities.map((activity, index) => (
              <UIBox key={index} className="flex gap-4">
                <UIBox className="flex flex-col items-center">
                  <UITypography variant="span" className="text-xs font-medium text-blue-600 dark:text-blue-400">
                    {activity.time}
                  </UITypography>
                  {index < day.activities.length - 1 && (
                    <UIBox className="mt-1 h-full w-px bg-gray-200 dark:bg-gray-700" />
                  )}
                </UIBox>
                <UIBox className="flex-1 pb-2">
                  <UITypography variant="h5" className="text-gray-900 dark:text-white">
                    {activity.title}
                  </UITypography>
                  <UITypography variant="p" className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {activity.description}
                  </UITypography>
                  <UIBox className="mt-2 flex flex-wrap gap-3 text-xs text-gray-500 dark:text-gray-400">
                    <UITypography variant="span">📍 {activity.location}</UITypography>
                    <UITypography variant="span">⏱ {activity.duration}</UITypography>
                    <UITypography variant="span">💰 {activity.cost}</UITypography>
                  </UIBox>
                </UIBox>
              </UIBox>
            ))}
          </UIBox>
        </UIBox>
      )}
    </UIBox>
  );
}

export default ItineraryDayCard;
