import React from 'react';
import { ReactNode } from 'react';
import { ErrorBoundaryProps, ErrorBoundaryState } from './ErrorBoundary';
import { ApiErrorCodeType } from '@/data/api/ApiErrorCode';
import { Fallback404 } from './Fallback';

const initialState: ErrorBoundaryState = {
  hasError: false,
  isPropagated: false,
  error: null,
};

class Error404Boundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    console.log(`errorCode:${error?.name}, errorMessage:${error?.message}`);
    if (error.name == ApiErrorCodeType[404]) {
      return {
        hasError: true,
        isPropagated: false,
        error: error,
      };
    }
    return {
      hasError: true,
      isPropagated: true,
      error: error,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {}

  onResetErrorBoundary = () => {
    const { onReset } = this.props;
    onReset == null ? void 0 : onReset();
    this.reset();
  };

  reset() {
    this.setState(initialState);
  }

  render(): React.ReactNode {
    const { hasError, isPropagated, error } = this.state;
    const { children } = this.props;

    if (hasError && isPropagated) {
      throw error;
    }

    if (hasError && !isPropagated) {
      console.log(`errorCode:${error?.name}, errorMessage:${error?.message}`);
      return <Fallback404 onPressReset={this.onResetErrorBoundary} />;
    }

    return children;
  }
}

export default Error404Boundary;
