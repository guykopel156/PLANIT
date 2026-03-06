import { useMemo } from 'react';

const MILLISECONDS_PER_DAY = 86400000;

function useCountdown(targetDate: string): string {
  return useMemo((): string => {
    const target = new Date(targetDate);
    const now = new Date();
    const diffInMs = target.getTime() - now.getTime();
    const diffInDays = Math.ceil(diffInMs / MILLISECONDS_PER_DAY);

    if (diffInDays < 0) {
      return 'Trip ended';
    }

    if (diffInDays === 0) {
      return 'Today!';
    }

    if (diffInDays === 1) {
      return '1 day away';
    }

    return `${diffInDays} days away`;
  }, [targetDate]);
}

export { useCountdown };
