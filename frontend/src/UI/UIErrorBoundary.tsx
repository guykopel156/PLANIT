import { Component } from 'react';

import UIPrimaryButton from './UIPrimaryButton';

interface IErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface IErrorBoundaryState {
  hasError: boolean;
}

const DEFAULT_FALLBACK = (
  <div className="flex min-h-[400px] items-center justify-center">
    <div className="text-center">
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
        Something went wrong.
      </p>
      <UIPrimaryButton onClick={() => window.location.reload()} className="mt-4">
        Reload Page
      </UIPrimaryButton>
    </div>
  </div>
);

class UIErrorBoundary extends Component<IErrorBoundaryProps, IErrorBoundaryState> {
  constructor(props: IErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): IErrorBoundaryState {
    return { hasError: true };
  }

  override render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback ?? DEFAULT_FALLBACK;
    }

    return this.props.children;
  }
}

export default UIErrorBoundary;
