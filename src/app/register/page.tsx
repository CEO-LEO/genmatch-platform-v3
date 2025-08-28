'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { User, Mail, Phone, MapPin, GraduationCap, Building, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

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

  // Refs for proper tab navigation
  const userTypeRef = useRef<HTMLSelectElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const studentIdRef = useRef<HTMLInputElement>(null);
  const universityRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle next button from mobile keyboard
  const handleNextField = (currentField: string) => {
    const fieldOrder = [
      'userType', 'firstName', 'lastName', 'email', 'studentId', 
      'university', 'phone', 'address', 'password', 'confirmPassword'
    ];
    
    const currentIndex = fieldOrder.indexOf(currentField);
    if (currentIndex < fieldOrder.length - 1) {
      const nextField = fieldOrder[currentIndex + 1];
      if (nextField) {
        const nextRef = getFieldRef(nextField);
        if (nextRef?.current) {
          nextRef.current.focus();
          nextRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }
    }
  };

  const getFieldRef = (fieldName: string) => {
    const refs: { [key: string]: any } = {
      userType: userTypeRef,
      firstName: firstNameRef,
      lastName: lastNameRef,
      email: emailRef,
      studentId: studentIdRef,
      university: universityRef,
      phone: phoneRef,
      address: addressRef,
      password: passwordRef,
      confirmPassword: confirmPasswordRef
    };
    return refs[fieldName] || null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage(null);

    try {
      console.log('📤 Sending registration data:', {
        ...formData,
        password: '[HIDDEN]',
        confirmPassword: '[HIDDEN]'
      });
      
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('📨 API Response:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      const data = await response.json();
      console.log('📋 Response data:', data);

      if (response.ok) {
        setMessage({ type: 'success', text: data.message || 'สมัครสมาชิกสำเร็จแล้ว!' });
        
        // Clear form
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
        
        // Auto redirect to login after 2 seconds
      setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
      
      } else {
        const errorMsg = data.error || data.message || 'เกิดข้อผิดพลาดในการสมัครสมาชิก';
        setMessage({ type: 'error', text: errorMsg });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header - Mobile Optimized */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <Link href="/" className="flex items-center space-x-2 sm:space-x-3 hover:opacity-80 transition-opacity">
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
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
                href="/login"
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg"
              >
                เข้าสู่ระบบ
        </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Mobile First */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl border border-gray-100 p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
              สมัครสมาชิก GenMatch
            </h2>
            <p className="text-gray-600 text-sm sm:text-base sm:text-lg">
              เข้าร่วมชุมชนจิตอาสาและสร้างการเปลี่ยนแปลงในสังคม
            </p>
          </div>

          {/* Form - Mobile Optimized */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* User Type */}
            <div>
              <label htmlFor="userType" className="block text-sm font-semibold text-gray-700 mb-2">
                ประเภทผู้ใช้ *
            </label>
              <div className="relative">
                <select
                  id="userType"
                  ref={userTypeRef}
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNextField('userType');
                    }
                  }}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors bg-white text-base"
                  tabIndex={1}
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

            {/* Name Fields - Mobile Stacked */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-2">
                  ชื่อ *
                </label>
                <input
                  id="firstName"
                  ref={firstNameRef}
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNextField('firstName');
                    }
                  }}
                  required
                  placeholder="ชื่อจริง"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                  tabIndex={2}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-2">
                  นามสกุล *
                </label>
                <input
                  id="lastName"
                  ref={lastNameRef}
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNextField('lastName');
                    }
                  }}
                  required
                  placeholder="นามสกุล"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                  tabIndex={3}
                />
              </div>
            </div>

            {/* Student-specific fields */}
            {formData.userType === 'student' && (
              <>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    อีเมล *
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      ref={emailRef}
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleNextField('email');
                        }
                      }}
                      required
                      placeholder="your@email.com"
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                      tabIndex={4}
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
                  <div>
                    <label htmlFor="studentId" className="block text-sm font-semibold text-gray-700 mb-2">
                      รหัสนักศึกษา *
                    </label>
                    <div className="relative">
                  <input
                        id="studentId"
                        ref={studentIdRef}
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleNextField('studentId');
                          }
                        }}
                        required
                    placeholder="รหัสนักศึกษา"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                        tabIndex={5}
                  />
                      <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label htmlFor="university" className="block text-sm font-semibold text-gray-700 mb-2">
                      มหาวิทยาลัย *
                  </label>
                    <div className="relative">
                  <input
                        id="university"
                        ref={universityRef}
                    type="text"
                    name="university"
                    value={formData.university}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleNextField('university');
                          }
                        }}
                        required
                    placeholder="ชื่อมหาวิทยาลัย"
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                        tabIndex={6}
                  />
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                เบอร์โทรศัพท์ *
              </label>
              <div className="relative">
                <input
                  id="phone"
                  ref={phoneRef}
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      handleNextField('phone');
                    }
                  }}
                  required
                  placeholder="081-234-5678"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                  tabIndex={formData.userType === 'student' ? 7 : 4}
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
              </div>

            {/* Address */}
              <div>
              <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-2">
                ที่อยู่ *
                </label>
              <div className="relative">
                <textarea
                  id="address"
                  ref={addressRef}
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleNextField('address');
                    }
                  }}
                  required
                  rows={3}
                  placeholder="ที่อยู่ปัจจุบัน"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none text-base"
                  tabIndex={formData.userType === 'student' ? 8 : 5}
                />
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Password Fields - Mobile Stacked */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  รหัสผ่าน *
                </label>
                <div className="relative">
                  <input
                    id="password"
                    ref={passwordRef}
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleNextField('password');
                      }
                    }}
                    required
                    placeholder="รหัสผ่าน"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                    tabIndex={formData.userType === 'student' ? 9 : 6}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  ยืนยันรหัสผ่าน *
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    ref={confirmPasswordRef}
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        // Don't move to next field, this is the last one
                      }
                    }}
                    required
                    placeholder="ยืนยันรหัสผ่าน"
                    className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-base"
                    tabIndex={formData.userType === 'student' ? 10 : 7}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1"
                    tabIndex={-1}
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

            {/* Submit Button - Mobile Optimized */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold text-base sm:text-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {isLoading ? 'กำลังสมัครสมาชิก...' : 'สมัครสมาชิก'}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-sm sm:text-base text-gray-600">
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