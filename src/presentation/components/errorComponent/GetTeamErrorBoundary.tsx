import React from 'react'
import {ReactNode} from 'react'
import {ErrorBoundaryState} from './ErrorBoundary'
import ErrorCode from '@/data/api/ErrorCode'

interface GetTeamErrorBoundaryProps {
  children?: ReactNode
  fallback: ReactNode
}

class GetTeamErrorBoundary extends React.Component<GetTeamErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: GetTeamErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      isPropagated: false,
      error: null,
    }
  }

  static getDerivedStateFromError(error: Error) {
    if (error.name == ErrorCode[500].code || error.name == ErrorCode[503].code) {
      return {
        hasError: true,
        isPropagated: true,
        error: error,
      }
    }
    return {
      hasError: true,
      isPropagated: false,
      error: error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {}

  render(): React.ReactNode {
    const {hasError, isPropagated, error} = this.state
    const {children, fallback} = this.props

    if (hasError && isPropagated) {
      throw error
    }

    if (hasError && !isPropagated) {
      console.log(`errorCode:${error?.name}, errorMessage:${error?.message}`)
      return fallback
    }

    return children
  }
}

export default GetTeamErrorBoundary
