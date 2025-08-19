'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { 
  AlertTriangle, 
  Home, 
  RefreshCw, 
  ArrowLeft,
  Heart
} from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900 flex items-center justify-center p-4">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 text-center max-w-2xl">
        {/* Logo */}
        <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <Heart className="w-12 h-12 text-white" />
        </div>

        {/* Error Icon */}
        <div className="w-32 h-32 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <AlertTriangle className="w-16 h-16 text-white" />
        </div>

        {/* Error Message */}
        <h1 className="text-6xl font-bold text-white mb-6">
          อุ๊ปส์!
        </h1>
        
        <h2 className="text-3xl font-semibold text-white mb-4">
          เกิดข้อผิดพลาดที่ไม่คาดคิด
        </h2>
        
        <p className="text-xl text-white/70 mb-8 leading-relaxed">
          ขออภัย เกิดข้อผิดพลาดในระบบ กรุณาลองใหม่อีกครั้ง<br />
          หากปัญหายังคงเกิดขึ้น กรุณาติดต่อทีมสนับสนุน
        </p>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="glass-card p-6 mb-8 text-left">
            <h3 className="text-lg font-semibold text-white mb-4">รายละเอียดข้อผิดพลาด:</h3>
            <div className="bg-black/20 rounded-lg p-4 overflow-auto">
              <p className="text-red-400 font-mono text-sm">
                {error.message}
              </p>
              {error.stack && (
                <details className="mt-4">
                  <summary className="text-white/70 cursor-pointer">แสดง Stack Trace</summary>
                  <pre className="text-white/60 text-xs mt-2 whitespace-pre-wrap">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
          <button
            onClick={reset}
            className="glass-button-primary px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform flex items-center"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            ลองใหม่อีกครั้ง
          </button>
          
          <Link href="/" className="glass-button-secondary px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform flex items-center">
            <Home className="w-5 h-5 mr-2" />
            กลับหน้าหลัก
          </Link>
        </div>

        {/* Additional Help */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-white mb-4">ยังคงมีปัญหา?</h3>
          <p className="text-white/70 mb-4">
            ลองทำตามขั้นตอนเหล่านี้:
          </p>
          <ul className="text-white/60 text-left space-y-2 mb-6">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              รีเฟรชหน้าเว็บ
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              ล้างแคชและคุกกี้
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              ลองใช้เบราว์เซอร์อื่น
            </li>
          </ul>
          
          <div className="text-center">
            <Link href="/contact" className="text-pink-400 hover:text-pink-300 font-medium">
              ติดต่อทีมสนับสนุน
            </Link>
          </div>
        </div>

        {/* Back to Previous */}
        <div className="mt-8">
          <button
            onClick={() => window.history.back()}
            className="text-white/70 hover:text-white transition-colors flex items-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            กลับไปหน้าก่อนหน้า
          </button>
        </div>
      </div>
    </div>
  );
}
