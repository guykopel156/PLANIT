import { useState, useCallback } from 'react';

import { UIBox, UIIconButton, UITextarea } from '../../../UI';

interface IChatInputProps {
  onSend: (content: string) => void;
  isDisabled: boolean;
}

function ChatInput({ onSend, isDisabled }: IChatInputProps): React.ReactElement {
  const [value, setValue] = useState('');

  const handleSubmit = useCallback((): void => {
    if (value.trim().length === 0 || isDisabled) {
      return;
    }
    onSend(value);
    setValue('');
  }, [value, isDisabled, onSend]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>): void {
    setValue(event.target.value);
  }

  return (
    <UIBox className="border-t border-gray-200 bg-white px-4 py-3 dark:border-gray-700 dark:bg-gray-900">
      <UIBox className="flex items-end gap-2">
        <UITextarea
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          disabled={isDisabled}
          rows={1}
          className="flex-1"
        />
        <UIIconButton
          onClick={handleSubmit}
          disabled={isDisabled || value.trim().length === 0}
          ariaLabel="Send message"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:hover:bg-blue-600"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </UIIconButton>
      </UIBox>
    </UIBox>
  );
}

export default ChatInput;
