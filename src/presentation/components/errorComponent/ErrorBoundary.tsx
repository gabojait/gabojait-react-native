import { ApiErrorCode, ApiErrorCodeType } from '@/data/api/ApiErrorCode';
import React, { ReactNode } from 'react';
import {Fallback500, Fallback503, FallbackNetworkFail} from './Fallback';
import { Alert } from 'react-native';

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

const initialState: ErrorBoundaryState = {
  hasError: false,
  isPropagated: false,
  error: null,
};

class GeneralErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = initialState;
  }

  static getDerivedStateFromError(error: Error) {
    console.log(`errorCode:${error?.name}, errorMessage:${error?.message}`);
    const result: ErrorBoundaryState = {
      hasError: true,
      isPropagated: false,
      error: error,
    };
    return result;
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {}

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

    if (hasError) {
      switch (error?.name) {
        case ApiErrorCodeType[500]:
          return <Fallback500 onPressReset={this.onResetErrorBoundary} />;
        case ApiErrorCodeType[503]:
          return <Fallback503 />;
        case 'TIMEOUT':
          return <FallbackNetworkFail onPressReset={this.onResetErrorBoundary} />;
        default:
          return children;
      }
    }
    return children;
  }
}

export default GeneralErrorBoundary;
