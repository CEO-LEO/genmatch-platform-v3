'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    userType: 'student',
    studentId: '',
    university: '',
    address: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.acceptTerms) {
      setMessage({ type: 'error', text: 'กรุณายอมรับข้อกำหนดการใช้งานและนโยบายความเป็นส่วนตัว' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: data.message });
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          userType: 'student',
          studentId: '',
          university: '',
          address: '',
          password: '',
          confirmPassword: '',
          acceptTerms: false
        });
      } else {
        setMessage({ type: 'error', text: data.error });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: target.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-500">Generation Matching</p>
              </div>
            </div>

            {/* Back to Home Button */}
            <Link 
              href="/"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <div className="w-full max-w-md">
          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">สมัครสมาชิก</h2>
            <p className="text-gray-600">สร้างบัญชีใหม่เพื่อใช้งาน GenMatch</p>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-3xl p-10 shadow-lg">
            {/* User Type Field - MOVED TO TOP */}
            <div className="mb-8">
              <label htmlFor="userType" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  👤
                </span>
                ประเภทผู้ใช้ *
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-lg"
                required
              >
                <option value="">เลือกประเภทผู้ใช้</option>
                <option value="student">🎓 นักศึกษา</option>
                <option value="elderly">👴 ผู้สูงอายุ</option>
              </select>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label htmlFor="firstName" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    ✏️
                  </span>
                  ชื่อ *
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg"
                  placeholder="ชื่อ"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center mr-3">
                    ✏️
                  </span>
                  นามสกุล *
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all text-lg"
                  placeholder="นามสกุล"
                  required
                />
              </div>
            </div>

            {/* Email Field - ONLY FOR STUDENTS */}
            {formData.userType === 'student' && (
              <div className="mb-8">
                <label htmlFor="email" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-xl flex items-center justify-center mr-3">
                    📧
                  </span>
                  อีเมล *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-green-100 focus:border-green-500 transition-all text-lg"
                  placeholder="your@email.com"
                  required
                />
              </div>
            )}

            {/* Phone Field */}
            <div className="mb-8">
              <label htmlFor="phone" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center mr-3">
                  📱
                </span>
                เบอร์โทรศัพท์ *
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-yellow-100 focus:border-yellow-500 transition-all text-lg"
                placeholder="081-234-5678"
                required
              />
            </div>

            {/* Student-specific Fields */}
            {formData.userType === 'student' && (
              <>
                <div className="mb-8">
                  <label htmlFor="studentId" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
                      🆔
                    </span>
                    รหัสนักศึกษา *
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-lg"
                    placeholder="เช่น 6400000000"
                    required
                  />
                </div>
                <div className="mb-8">
                  <label htmlFor="university" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                    <span className="w-8 h-8 bg-indigo-100 rounded-xl flex items-center justify-center mr-3">
                      🏫
                    </span>
                    มหาวิทยาลัย *
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleInputChange}
                    className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all text-lg"
                    placeholder="เช่น มหาวิทยาลัยมหิดล"
                    required
                  />
                </div>
              </>
            )}

            {/* Address Field - FOR BOTH USER TYPES */}
            <div className="mb-8">
              <label htmlFor="address" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-red-100 rounded-xl flex items-center justify-center mr-3">
                  🏠
                </span>
                ที่อยู่ *
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows={4}
                className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-red-100 focus:border-red-500 transition-all text-lg resize-none"
                placeholder="กรอกที่อยู่ที่ชัดเจน..."
                required
              />
            </div>

            {/* Password Fields */}
            <div className="mb-8">
              <label htmlFor="password" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  🔒
                </span>
                รหัสผ่าน *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 pr-16 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-lg"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            <div className="mb-8">
              <label htmlFor="confirmPassword" className="block text-lg font-semibold text-gray-800 mb-3 flex items-center">
                <span className="w-8 h-8 bg-purple-100 rounded-xl flex items-center justify-center mr-3">
                  🔒
                </span>
                ยืนยันรหัสผ่าน *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 pr-16 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-500 transition-all text-lg"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-purple-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
                </button>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="mb-8">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  name="acceptTerms"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                  className="w-5 h-5 text-purple-600 border-2 border-gray-300 rounded-lg focus:ring-4 focus:ring-purple-100 mt-1"
                  required
                />
                <span className="ml-3 text-base text-gray-700 leading-relaxed">
                  ฉันยอมรับ{' '}
                  <Link href="/terms" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                    ข้อกำหนดการใช้งาน
                  </Link>
                  {' '}และ{' '}
                  <Link href="/privacy" className="text-purple-600 hover:text-purple-700 font-semibold underline">
                    นโยบายความเป็นส่วนตัว
                  </Link>
                  {' '}ของเรา
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-5 px-6 rounded-2xl font-bold text-xl hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105 shadow-lg mb-8"
              disabled={isLoading}
            >
              {isLoading ? 'กำลังสร้างบัญชี...' : '✨ สร้างบัญชี'}
            </button>

            {/* Message Display */}
            {message && (
              <div className={`mt-4 p-3 rounded-lg text-center ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {message.text}
              </div>
            )}

            {/* Divider */}
            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-gray-300"></div>
              <span className="px-4 text-sm text-gray-500">หรือ</span>
              <div className="flex-1 border-t border-gray-300"></div>
            </div>

            {/* Social Registration Buttons */}
            <div className="space-y-3">
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="w-5 h-5 bg-blue-600 rounded mr-3"></div>
                สมัครสมาชิกด้วย Google
              </button>
              <button
                type="button"
                className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="w-5 h-5 bg-blue-800 rounded mr-3"></div>
                สมัครสมาชิกด้วย Facebook
              </button>
            </div>

            {/* Login Link */}
            <div className="text-center mt-6">
              <span className="text-gray-600">มีบัญชีอยู่แล้ว? </span>
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-medium">
                เข้าสู่ระบบ
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}