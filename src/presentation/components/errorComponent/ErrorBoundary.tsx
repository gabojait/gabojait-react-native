import { ApiErrorCode, ApiErrorCodeType } from '@/data/api/ApiErrorCode';
import React, { ReactNode } from 'react';
import { Text } from 'react-native';

export interface ErrorBoundaryState {
  hasError: boolean;
  isPropagated: boolean;
  error: Error | null;
}

export interface ErrorBoundaryProps {
  children?: ReactNode;
  onReset?: () => void;
  fallback?: ReactNode;
  message?: string;
}

interface GeneralErrorBoundaryProps extends ErrorBoundaryProps {
  fallback500: ReactNode;
  fallback503: ReactNode;
}

class GeneralErrorBoundary extends React.Component<GeneralErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: GeneralErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      isPropagated: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    const result: ErrorBoundaryState = {
      hasError: true,
      isPropagated: false,
      error: error,
    };
    return result;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {}

  render(): React.ReactNode {
    const { hasError, isPropagated, error } = this.state;
    const { children, fallback500, fallback503 } = this.props;

    if (hasError) {
      if (error?.name == ApiErrorCodeType[500]) {
        return fallback500;
      } else if (error?.name == ApiErrorCodeType[503]) {
        return fallback503;
      }
    }

    return children;
  }
}

export default GeneralErrorBoundary;
