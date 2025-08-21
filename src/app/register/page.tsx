'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Mail, User, Phone, GraduationCap, Building, MapPin, ArrowLeft, CheckCircle } from 'lucide-react'
import LogoIcon from '@/components/LogoIcon'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [userType, setUserType] = useState<'STUDENT' | 'ELDERLY'>('STUDENT')
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    studentId: '',
    university: '',
    address: '',
    city: '',
    province: '',
    postalCode: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน กรุณาตรวจสอบอีกครั้ง')
      return
    }
    
    if (formData.password.length < 8) {
      alert('รหัสผ่านต้องมีอย่างน้อย 8 ตัวอักษร')
      return
    }
    
    if (!formData.firstName || !formData.lastName) {
      alert('กรุณากรอกข้อมูลให้ครบถ้วน')
      return
    }
    
    // Student validation
    if (userType === 'STUDENT') {
      if (!formData.email || !formData.phone || !formData.studentId || !formData.university) {
        alert('กรุณากรอกข้อมูลนักศึกษาให้ครบถ้วน')
        return
      }
    }
    
    // Address validation
    if (!formData.address || !formData.city || !formData.province || !formData.postalCode) {
      alert('กรุณากรอกข้อมูลที่อยู่ให้ครบถ้วน')
      return
    }
    
    setIsLoading(true)
    
    try {
      // Simulate registration process
      console.log('กำลังสร้างบัญชี...', { userType, ...formData })
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Show success message
      alert(`สร้างบัญชีสำเร็จ! ยินดีต้อนรับเข้าสู่ชุมชนจิตอาสา GenMatch`)
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        studentId: '',
        university: '',
        address: '',
        city: '',
        province: '',
        postalCode: ''
      })
      
      // Redirect to login page after successful registration
      setTimeout(() => {
        window.location.href = '/login'
      }, 1500)
      
    } catch (error) {
      console.error('Registration error:', error)
      alert('เกิดข้อผิดพลาดในการสร้างบัญชี กรุณาลองใหม่อีกครั้ง')
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Back to Home */}
        <Link 
          href="/" 
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>

        {/* Register Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-200/50 p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogoIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-800 bg-clip-text text-transparent">
              สร้างบัญชีใหม่
            </h1>
            <p className="text-gray-600 mt-2">
              เข้าร่วมชุมชนจิตอาสาของเรา
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-900 mb-4 text-center">
              เลือกประเภทผู้ใช้
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                type="button"
                onClick={() => setUserType('STUDENT')}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  userType === 'STUDENT'
                    ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-lg'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-purple-300 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <GraduationCap className="w-6 h-6" />
                  <span className="font-semibold">นักศึกษา กยศ.</span>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setUserType('ELDERLY')}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  userType === 'ELDERLY'
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-lg'
                    : 'border-gray-300 bg-white text-gray-600 hover:border-blue-300 hover:bg-blue-50'
                }`}
              >
                <div className="flex items-center justify-center space-x-3">
                  <User className="w-6 h-6" />
                  <span className="font-semibold">ผู้สูงอายุ</span>
                </div>
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="ชื่อ"
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  นามสกุล
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="นามสกุล"
                  required
                />
              </div>
            </div>

            {/* Email Field (only for students) */}
            {userType === 'STUDENT' && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2 text-purple-500" />
                  อีเมล
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="example@email.com"
                  required
                />
              </div>
            )}

            {/* Phone Field (only for students) */}
            {userType === 'STUDENT' && (
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2 text-purple-500" />
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="081-234-5678"
                  required
                />
              </div>
            )}





            {/* Student-specific fields */}
            {userType === 'STUDENT' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                    รหัสนักศึกษา
                  </label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="รหัสนักศึกษา"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="university" className="block text-sm font-medium text-gray-700 mb-2">
                    <Building className="w-4 h-4 inline mr-2 text-purple-500" />
                    มหาวิทยาลัย
                  </label>
                  <input
                    type="text"
                    id="university"
                    name="university"
                    value={formData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="ชื่อมหาวิทยาลัย"
                    required
                  />
                </div>
              </div>
            )}

            {/* Address Fields */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2 text-purple-500" />
                ที่อยู่
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                placeholder="ที่อยู่"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  อำเภอ/เขต
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="อำเภอ/เขต"
                  required
                />
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-2">
                  จังหวัด
                </label>
                <input
                  type="text"
                  id="province"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="จังหวัด"
                  required
                />
              </div>
              <div>
                <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสไปรษณีย์
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="รหัสไปรษณีย์"
                  required
                />
              </div>
            </div>

            {/* Password Fields - Moved to bottom */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  รหัสผ่าน
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pr-12 px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="รหัสผ่านอย่างน้อย 8 ตัวอักษร"
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  ยืนยันรหัสผ่าน
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pr-12 px-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                    placeholder="ยืนยันรหัสผ่าน"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-500 hover:text-purple-700 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full font-semibold py-4 px-6 rounded-xl shadow-lg transition-all duration-300 text-lg ${
                isLoading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-500 to-blue-700 hover:from-purple-600 hover:to-blue-800 hover:shadow-xl hover:scale-105'
              } text-white`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  กำลังสร้างบัญชี...
                </div>
              ) : (
                'สร้างบัญชี'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              มีบัญชีอยู่แล้ว?{' '}
              <Link 
                href="/login" 
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                เข้าสู่ระบบเลย
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
