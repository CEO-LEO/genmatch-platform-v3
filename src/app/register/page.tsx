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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header - Modern Design */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link href="/" className="flex items-center space-x-3 sm:space-x-4 hover:opacity-80 transition-all duration-300">
                <ArrowLeft className="w-6 h-6 sm:w-7 sm:h-7 text-purple-600" />
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-200">
                  <span className="text-white font-bold text-lg sm:text-xl">GM</span>
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">GenMatch</h1>
                  <p className="text-sm sm:text-base text-purple-600/70 font-medium">แพลตฟอร์มจิตอาสา</p>
                </div>
              </Link>
      </div>
            <div className="flex items-center space-x-3 sm:space-x-4">
        <Link 
          href="/" 
                className="px-4 sm:px-6 py-2.5 sm:py-3 text-purple-600 border-2 border-purple-200 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 text-sm sm:text-base font-semibold"
              >
                หน้าหลัก
              </Link>
              <Link 
                href="/login"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 text-sm sm:text-base font-semibold shadow-lg shadow-purple-200 hover:shadow-purple-300"
              >
                เข้าสู่ระบบ
        </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Enhanced Design */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-100/50 border border-white/20 p-6 sm:p-8 lg:p-12">
          {/* Header - Enhanced */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-2xl sm:rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-200">
              <User className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 bg-clip-text text-transparent mb-3 sm:mb-4">
              สมัครสมาชิก GenMatch
            </h2>
            <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-md mx-auto">
              เข้าร่วมชุมชนจิตอาสาและสร้างการเปลี่ยนแปลงที่ดีในสังคม
            </p>
          </div>

          {/* Form - Enhanced Design */}
          <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
            {/* User Type */}
            <div className="group">
              <label htmlFor="userType" className="block text-sm font-bold text-gray-800 mb-3">
                ประเภทผู้ใช้ <span className="text-purple-500">*</span>
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
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                  tabIndex={1}
                >
                  <option value="">เลือกประเภทผู้ใช้</option>
                  <option value="student">🎓 นักศึกษา</option>
                  <option value="elderly">👴 ผู้สูงอายุ</option>
                </select>
                <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                  <User className="h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
                </div>
            </div>
          </div>

            {/* Name Fields - Enhanced */}
            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              <div className="group">
                <label htmlFor="firstName" className="block text-sm font-bold text-gray-800 mb-3">
                  ชื่อ <span className="text-purple-500">*</span>
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
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                  tabIndex={2}
                />
              </div>
              <div className="group">
                <label htmlFor="lastName" className="block text-sm font-bold text-gray-800 mb-3">
                  นามสกุล <span className="text-purple-500">*</span>
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
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                  tabIndex={3}
                />
              </div>
            </div>

            {/* Student-specific fields */}
            {formData.userType === 'student' && (
              <>
                <div className="group">
                  <label htmlFor="email" className="block text-sm font-bold text-gray-800 mb-3">
                    อีเมล <span className="text-purple-500">*</span>
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
                      className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                      tabIndex={4}
                    />
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
                  </div>
                </div>
                <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
                  <div className="group">
                    <label htmlFor="studentId" className="block text-sm font-bold text-gray-800 mb-3">
                      รหัสนักศึกษา <span className="text-purple-500">*</span>
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
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                        tabIndex={5}
                      />
                      <GraduationCap className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                  </div>
                  <div className="group">
                    <label htmlFor="university" className="block text-sm font-bold text-gray-800 mb-3">
                      มหาวิทยาลัย <span className="text-purple-500">*</span>
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
                        className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                        tabIndex={6}
                      />
                      <Building className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Phone */}
            <div className="group">
              <label htmlFor="phone" className="block text-sm font-bold text-gray-800 mb-3">
                เบอร์โทรศัพท์ <span className="text-purple-500">*</span>
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
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                  tabIndex={formData.userType === 'student' ? 7 : 4}
                />
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
              </div>
            </div>

            {/* Address */}
            <div className="group">
              <label htmlFor="address" className="block text-sm font-bold text-gray-800 mb-3">
                ที่อยู่ <span className="text-purple-500">*</span>
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
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium resize-none hover:border-purple-300 group-hover:border-purple-300"
                  tabIndex={formData.userType === 'student' ? 8 : 5}
                />
                <MapPin className="absolute left-4 top-4 h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
              </div>
            </div>

            {/* Password Fields - Enhanced */}
            <div className="space-y-6 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6">
              <div className="group">
                <label htmlFor="password" className="block text-sm font-bold text-gray-800 mb-3">
                  รหัสผ่าน <span className="text-purple-500">*</span>
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
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                    tabIndex={formData.userType === 'student' ? 9 : 6}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 p-1 rounded-lg hover:bg-purple-50 transition-all duration-200"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              <div className="group">
                <label htmlFor="confirmPassword" className="block text-sm font-bold text-gray-800 mb-3">
                  ยืนยันรหัสผ่าน <span className="text-purple-500">*</span>
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
                    className="w-full pl-12 pr-12 py-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-purple-100 focus:border-purple-400 transition-all duration-300 bg-white/80 backdrop-blur-sm text-base font-medium hover:border-purple-300 group-hover:border-purple-300"
                    tabIndex={formData.userType === 'student' ? 10 : 7}
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-400 group-hover:text-purple-500 transition-colors" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-600 p-1 rounded-lg hover:bg-purple-50 transition-all duration-200"
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Message - Enhanced */}
            {message && (
              <div className={`p-5 rounded-2xl border-2 font-medium ${
                message.type === 'success' 
                  ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-800' 
                  : 'bg-gradient-to-r from-red-50 to-pink-50 border-red-200 text-red-800'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    message.type === 'success' ? 'bg-green-200' : 'bg-red-200'
                  }`}>
                    <span className="text-sm">
                      {message.type === 'success' ? '✓' : '✕'}
                    </span>
                  </div>
                  <span>{message.text}</span>
                </div>
              </div>
            )}

            {/* Submit Button - Enhanced */}
            <button
              type="submit"
              disabled={isLoading}
              className="group w-full bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white py-4 sm:py-5 px-8 rounded-2xl font-bold text-lg sm:text-xl hover:from-purple-700 hover:via-purple-600 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-2xl shadow-purple-200 hover:shadow-purple-300 hover:scale-[1.02] active:scale-[0.98] transform"
            >
              <div className="flex items-center justify-center space-x-3">
                {isLoading ? (
                  <>
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>กำลังสมัครสมาชิก...</span>
                  </>
                ) : (
                  <>
                    <User className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    <span>สมัครสมาชิก</span>
                  </>
                )}
              </div>
            </button>
          </form>

          {/* Footer - Enhanced */}
          <div className="mt-8 sm:mt-12 text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent flex-1"></div>
              <span className="text-gray-400 text-sm font-medium">หรือ</span>
              <div className="h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent flex-1"></div>
            </div>
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              มีบัญชีอยู่แล้ว?{' '}
              <Link 
                href="/login" 
                className="text-purple-600 hover:text-purple-700 font-bold hover:underline transition-all duration-200 decoration-2 underline-offset-2"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}