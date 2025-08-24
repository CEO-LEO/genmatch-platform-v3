'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, GraduationCap, Building, Lock, Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userType: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    studentId: '',
    university: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        setFormData({
          userType: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          studentId: '',
          university: '',
          address: '',
          password: '',
          confirmPassword: ''
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-600">แพลตฟอร์มจิตอาสา</p>
              </div>
            </div>
            <Link 
              href="/login"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              สมัครสมาชิก GenMatch
            </h2>
            <p className="text-gray-600 text-lg">
              เข้าร่วมชุมชนจิตอาสาและสร้างการเปลี่ยนแปลงในสังคม
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ประเภทผู้ใช้ *
              </label>
              <div className="relative">
                <select
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white"
                >
                  <option value="">เลือกประเภทผู้ใช้</option>
                  <option value="student">นักศึกษา</option>
                  <option value="elderly">ผู้สูงอายุ</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ชื่อ *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  placeholder="ชื่อจริง"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  นามสกุล *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  placeholder="นามสกุล"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            {/* Student-specific fields */}
            {formData.userType === 'student' && (
              <>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    อีเมล *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      รหัสนักศึกษา *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleInputChange}
                        required
                        placeholder="รหัสนักศึกษา"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                      <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      มหาวิทยาลัย *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="university"
                        value={formData.university}
                        onChange={handleInputChange}
                        required
                        placeholder="ชื่อมหาวิทยาลัย"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                      />
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Phone */}
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

            {/* Address */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ที่อยู่ *
              </label>
              <div className="relative">
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  placeholder="ที่อยู่ปัจจุบัน"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                />
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ยืนยันรหัสผ่าน *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    placeholder="ยืนยันรหัสผ่าน"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Message */}
            {message && (
              <div className={`p-4 rounded-lg ${
                message.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800' 
                  : 'bg-red-50 border border-red-200 text-red-800'
              }`}>
                {message.text}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              มีบัญชีอยู่แล้ว?{' '}
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold">
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}