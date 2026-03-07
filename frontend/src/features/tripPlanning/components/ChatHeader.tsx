import { UIBox, UITypography } from '../../../UI';

function ChatHeader(): React.ReactElement {
  return (
    <UIBox className="flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
      <UIBox className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600">
        <UITypography variant="span" className="text-sm font-bold text-white">
          AI
        </UITypography>
      </UIBox>
      <UIBox className="flex flex-col">
        <UITypography variant="span" className="text-sm font-semibold text-gray-900 dark:text-white">
          PLANIT AI
        </UITypography>
        <UIBox className="flex items-center gap-1.5">
          <UIBox className="h-2 w-2 rounded-full bg-green-500" />
          <UITypography variant="span" className="text-xs text-gray-500 dark:text-gray-400">
            Online
          </UITypography>
        </UIBox>
      </UIBox>
    </UIBox>
  );
}

export default ChatHeader;
