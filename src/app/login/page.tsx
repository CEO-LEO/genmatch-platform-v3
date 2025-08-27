'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string; suggestion?: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        
        // Store user data and token
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        
        // Redirect to dashboard
        setTimeout(() => {
          window.location.href = '/dashboard';
        }, 1000);
      } else {
        setMessage({ type: 'error', text: data.error, suggestion: data.suggestion });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm sm:text-lg">GM</span>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold text-gray-900">GenMatch</h1>
                  <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">แพลตฟอร์มจิตอาสา</p>
                </div>
              </Link>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link 
                href="/"
                className="px-3 sm:px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base font-medium"
              >
                หน้าหลัก
              </Link>
              <Link 
                href="/register"
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              เข้าสู่ระบบ
            </h2>
            <p className="text-gray-600 text-lg">
              ยินดีต้อนรับกลับสู่ GenMatch
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                เบอร์โทรศัพท์ *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  placeholder="081-234-5678"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                รหัสผ่าน *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  placeholder="รหัสผ่าน"
                  className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link 
                href="/forgot-password" 
                className="text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                <div className="font-semibold">{message.text}</div>
                {message.suggestion && (
                  <div className="text-sm mt-1 opacity-90">{message.suggestion}</div>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>กำลังเข้าสู่ระบบ...</span>
                </>
              ) : (
                <>
                  <span>เข้าสู่ระบบ</span>
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">หรือ</span>
              </div>
            </div>
          </div>

          {/* Alternative Login Options */}
          <div className="space-y-3">
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              <div className="w-5 h-5 bg-blue-600 rounded mr-3"></div>
              เข้าสู่ระบบด้วย Google
            </button>
            <button
              type="button"
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
            >
              <div className="w-5 h-5 bg-blue-800 rounded mr-3"></div>
              เข้าสู่ระบบด้วย Facebook
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              ยังไม่มีบัญชี?{' '}
              <Link href="/register" className="text-purple-600 hover:text-purple-700 font-semibold">
                สมัครสมาชิก
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}