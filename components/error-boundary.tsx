"use client"

import React from "react"

interface ErrorBoundaryState {
    hasError: boolean
    error: Error | null
    errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
    children: React.ReactNode
    fallback?: React.ReactNode
}

export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props)
        this.state = { hasError: false, error: null, errorInfo: null }
    }

    static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ errorInfo })
    }

    render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback
            }

            return (
                <div className="min-h-screen flex items-center justify-center p-4 bg-gray-900 text-white">
                    <div className="max-w-2xl w-full bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-red-400 mb-4">Something went wrong</h2>
                        <div className="bg-gray-900 rounded p-4 mb-4 overflow-auto max-h-64">
                            <p className="text-sm text-gray-300 font-mono">
                                {this.state.error?.message || "Unknown error"}
                            </p>
                        </div>
                        {this.state.errorInfo && (
                            <details className="text-sm text-gray-400">
                                <summary className="cursor-pointer hover:text-gray-200 mb-2">
                                    Component Stack
                                </summary>
                                <pre className="bg-gray-900 rounded p-4 overflow-auto max-h-64 text-xs">
                                    {this.state.errorInfo.componentStack}
                                </pre>
                            </details>
                        )}
                        <button
                            className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm"
                            onClick={() => window.location.reload()}
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            )
        }

        return this.props.children
    }
}
