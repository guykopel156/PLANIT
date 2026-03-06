import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface IUIDialogOverlayProps {
  onBackdropClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
  className: string;
}

function UIDialogOverlay({ onBackdropClick, children, className }: IUIDialogOverlayProps): React.ReactElement {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className={`relative z-10 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-gray-900 sm:p-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}

interface IUIDialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

function UIDialog({ isOpen, onClose, children, className = '' }: IUIDialogProps): React.ReactElement | null {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return (): void => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <UIDialogOverlay onBackdropClick={handleBackdropClick} className={className}>
      {children}
    </UIDialogOverlay>,
    document.body,
  );
}

export default UIDialog;
