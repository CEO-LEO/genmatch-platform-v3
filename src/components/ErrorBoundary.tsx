'use client';

import React from 'react';
import Link from 'next/link';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{error?: Error}>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('🚨 Error Boundary caught an error:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo
    });

    // Log to external service in production
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        const FallbackComponent = this.props.fallback;
        return <FallbackComponent error={this.state.error} />;
      }

      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
            
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              เกิดข้อผิดพลาด
            </h1>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              ขออภัย เกิดข้อผิดพลาดที่ไม่คาดคิดขึ้น<br />
              กรุณาลองใหม่อีกครั้ง หรือกลับไปหน้าหลัก
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
                <h3 className="text-sm font-semibold text-red-800 mb-2">Error Details:</h3>
                <pre className="text-xs text-red-700 overflow-auto max-h-32">
                  {this.state.error.toString()}
                </pre>
              </div>
            )}
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.handleReload}
                className="flex-1 flex items-center justify-center px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                ลองใหม่อีกครั้ง
              </button>
              
              <Link
                href="/dashboard"
                className="flex-1 flex items-center justify-center px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                <Home className="w-5 h-5 mr-2" />
                กลับหน้าหลัก
              </Link>
            </div>
            
            <p className="mt-4 text-sm text-gray-500">
              หากปัญหายังคงเกิดขึ้น กรุณาติดต่อทีมสนับสนุน
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
