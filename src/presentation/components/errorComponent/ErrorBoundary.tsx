import ErrorCode from '@/data/api/ErrorCode'
import React, {ElementType, ReactElement, ReactNode} from 'react'
import {Text, View} from 'react-native'

export interface ErrorBoundaryState {
  hasError: boolean
  isPropagated: boolean
  error: Error | null
}

export interface ErrorBoundaryProps {
  children?: ReactNode
  fallback500: ReactNode
  fallback503: ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      isPropagated: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    const result: ErrorBoundaryState = {
      hasError: true,
      isPropagated: false,
      error: error,
    }
    return result
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {}

  render(): React.ReactNode {
    const {hasError, isPropagated, error} = this.state
    const {children, fallback500, fallback503} = this.props

    if (hasError) {
      if (error?.name == ErrorCode[500].code) {
        return fallback500
      } else if (error?.name == ErrorCode[503].code) {
        return fallback503
      }
      return (
        <>
          <Text>원인을 알 수 없는 오류</Text>
        </>
      )
    }

    return children
  }
}

export default ErrorBoundary
