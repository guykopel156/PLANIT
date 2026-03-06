import { UIBadge, UIBox, UITypography } from '../../../UI';
import MouseGlowCard from './MouseGlowCard';

interface ITicketProps {
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  date: string;
}

function FlightTicket({
  from,
  fromCode,
  to,
  toCode,
  date,
}: ITicketProps): React.ReactElement {
  return (
    <MouseGlowCard
      className="rounded-2xl border border-gray-200/80 bg-white/80 shadow-sm backdrop-blur-sm dark:border-white/[0.08] dark:bg-white/[0.04]"
      tiltStrength={5}
      shouldScaleOnHover
      glowColor="rgba(59,130,246,0.12)"
    >
      <UIBox
        className="group relative overflow-hidden p-5 sm:p-6"
      >
        <UIBox className="flex items-center justify-between gap-4">
          <UIBox className="text-left">
            <UITypography variant="p" className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              {fromCode}
            </UITypography>
            <UITypography variant="p" className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
              {from}
            </UITypography>
          </UIBox>

          <UIBox className="flex flex-1 items-center gap-2 px-2 sm:gap-3 sm:px-4">
            <UIBox className="h-px flex-1 bg-gradient-to-r from-blue-500/60 to-transparent dark:from-blue-400/40" />
            <UIBox className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-500/10">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 -rotate-12 text-blue-600 dark:text-blue-400"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </UIBox>
            <UIBox className="h-px flex-1 bg-gradient-to-l from-blue-500/60 to-transparent dark:from-blue-400/40" />
          </UIBox>

          <UIBox className="text-right">
            <UITypography variant="p" className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              {toCode}
            </UITypography>
            <UITypography variant="p" className="text-xs text-gray-500 sm:text-sm dark:text-gray-400">
              {to}
            </UITypography>
          </UIBox>
        </UIBox>

        <UIBox className="mt-4 flex items-center justify-between border-t border-dashed border-gray-200 pt-4 dark:border-white/[0.08]">
          <UITypography variant="p" className="text-xs text-gray-400 sm:text-sm dark:text-gray-500">
            {date}
          </UITypography>
          <UIBadge>Direct</UIBadge>
        </UIBox>

        <UIBox className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-black/[0.03] to-transparent transition-transform duration-700 group-hover:translate-x-full dark:via-white/[0.03]" />
      </UIBox>
    </MouseGlowCard>
  );
}

export default FlightTicket;
