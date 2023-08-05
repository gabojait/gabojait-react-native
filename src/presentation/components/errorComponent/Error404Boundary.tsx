import React from 'react';
import { ReactNode } from 'react';
import { ErrorBoundaryState } from './ErrorBoundary';
import { ApiErrorCode, ApiErrorCodeType } from '@/data/api/ApiErrorCode';

class Error404Boundary extends React.Component<
  {
    children?: ReactNode;
    fallback: ReactNode;
  },
  ErrorBoundaryState
> {
  constructor(props: { children?: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
      isPropagated: false,
      error: null,
    };
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

  render(): React.ReactNode {
    const { hasError, isPropagated, error } = this.state;
    const { children, fallback } = this.props;

    if (hasError && isPropagated) {
      throw error;
    }

    if (hasError && !isPropagated) {
      console.log(`errorCode:${error?.name}, errorMessage:${error?.message}`);
      return fallback;
    }

    return children;
  }
}

export default Error404Boundary;
