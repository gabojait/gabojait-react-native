import React from 'react';
import { ReactNode } from 'react';
import { ErrorBoundaryState } from './ErrorBoundary';
import { ApiErrorCode, ApiErrorCodeType } from '@/data/api/ApiErrorCode';

interface GetTeamErrorBoundaryProps {
  children?: ReactNode;
  fallback: ReactNode;
}

class GetTeamErrorBoundary extends React.Component<GetTeamErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: GetTeamErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      isPropagated: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error: Error) {
    if (error.name == ApiErrorCodeType[500] || error.name == ApiErrorCodeType[503]) {
      return {
        hasError: true,
        isPropagated: true,
        error: error,
      };
    }
    return {
      hasError: true,
      isPropagated: false,
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

export default GetTeamErrorBoundary;
