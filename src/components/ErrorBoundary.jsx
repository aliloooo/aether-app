import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-8 text-center">
                    <h1 className="text-4xl font-bold mb-4 text-red-500">Something went wrong.</h1>
                    <p className="max-w-md mb-8 text-gray-400">
                        We encountered an unexpected error. Please try refreshing the page.
                    </p>
                    <div className="bg-black/30 p-4 rounded-lg text-left font-mono text-sm text-red-300 overflow-auto max-w-full">
                        {this.state.error?.toString()}
                    </div>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-white text-black font-bold rounded-xl hover:scale-105 transition-transform"
                    >
                        Reload Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
