import { UIBox, UITypography } from '../../../UI';

interface IChatErrorProps {
  message: string;
}

function ChatError({ message }: IChatErrorProps): React.ReactElement {
  return (
    <UIBox className="mx-4 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 dark:border-red-800 dark:bg-red-950/30">
      <UITypography variant="errorText" className="text-sm">
        {message}
      </UITypography>
    </UIBox>
  );
}

export default ChatError;
