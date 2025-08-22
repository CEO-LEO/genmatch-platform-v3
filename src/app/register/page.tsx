'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowLeft, 
  AlertCircle, 
  User, 
  Phone,
  MapPin,
  GraduationCap,
  Building,
  CheckCircle,
  Users,
  Star,
  Award,
  TrendingUp,
  Target,
  Zap,
  Crown,
  Shield,
  Globe,
  Wrench,
  CheckCircle as CheckCircleIcon,
  Info,
  HelpCircle,
  MessageCircle,
  Clock,
  Calendar
} from 'lucide-react'
import LogoIcon from '@/components/LogoIcon'

export default function RegisterPage() {
  const { register } = useAuth()
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    userType: '' as 'STUDENT' | 'ELDERLY',
    studentId: '',
    university: '',
    address: '',
    city: 'กรุงเทพมหานคร',
    province: 'กรุงเทพมหานคร',
    postalCode: ''
  })

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.userType) {
        setError('กรุณาเลือกประเภทผู้ใช้')
        return
      }
    } else if (currentStep === 2) {
      if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
        setError('กรุณากรอกข้อมูลให้ครบถ้วน')
        return
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setError('รูปแบบอีเมลไม่ถูกต้อง')
        return
      }
    }
    setError('')
    setCurrentStep(currentStep + 1)
  }

  const handleBack = () => {
    setCurrentStep(currentStep - 1)
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!formData.password || formData.password.length < 6) {
      setError('รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร')
      return
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('รหัสผ่านไม่ตรงกัน')
      return
    }

    if (formData.userType === 'STUDENT' && !formData.studentId) {
      setError('กรุณากรอกรหัสนักศึกษา')
      return
    }

    setIsLoading(true)
    
    try {
      const success = await register(formData)
      
      if (success) {
        router.push('/dashboard')
      } else {
        setError('ไม่สามารถสมัครสมาชิกได้ กรุณาลองใหม่อีกครั้ง')
      }
    } catch (error) {
      console.error('Register error:', error)
      setError('เกิดข้อผิดพลาดในการสมัครสมาชิก กรุณาลองใหม่อีกครั้ง')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Status Bar */}
      <div className="bg-white px-4 py-3 text-sm text-gray-600 text-center border-b border-gray-100 md:hidden">
        <div className="flex items-center justify-between">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={currentStep > 1 ? handleBack : () => router.push('/')}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">สมัครสมาชิก</h1>
          </div>
          <div className="text-sm text-gray-500">
            {currentStep}/3
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex-1">
              <div className={`h-2 rounded-full transition-all duration-300 ${
                step <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
              }`}></div>
            </div>
          ))}
        </div>
        <div className="mt-2 text-center">
          <span className="text-sm text-gray-600">
            {currentStep === 1 && 'เลือกประเภทผู้ใช้'}
            {currentStep === 2 && 'ข้อมูลส่วนตัว'}
            {currentStep === 3 && 'รหัสผ่านและที่อยู่'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <main className="px-4 py-8">
        <div className="max-w-md mx-auto">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <LogoIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              เข้าร่วม GenMatch
            </h2>
            <p className="text-gray-600 text-sm">
              สร้างบัญชีเพื่อเริ่มต้นการเป็นจิตอาสา
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Step 1: User Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  คุณเป็นใคร?
                </h3>
                
                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'STUDENT' })}
                    className={`w-full p-6 border-2 rounded-2xl transition-all duration-200 text-left ${
                      formData.userType === 'STUDENT'
                        ? 'border-indigo-500 bg-indigo-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        formData.userType === 'STUDENT'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <GraduationCap className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">นักศึกษา</h4>
                        <p className="text-sm text-gray-600">
                          ต้องการทำงานจิตอาสาเพื่อสะสมชั่วโมง
                        </p>
                      </div>
                      {formData.userType === 'STUDENT' && (
                        <CheckCircle className="w-6 h-6 text-indigo-600" />
                      )}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, userType: 'ELDERLY' })}
                    className={`w-full p-6 border-2 rounded-2xl transition-all duration-200 text-left ${
                      formData.userType === 'ELDERLY'
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        formData.userType === 'ELDERLY'
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <User className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">ผู้สูงอายุ</h4>
                        <p className="text-sm text-gray-600">
                          ต้องการความช่วยเหลือจากนักศึกษา
                        </p>
                      </div>
                      {formData.userType === 'ELDERLY' && (
                        <CheckCircle className="w-6 h-6 text-purple-600" />
                      )}
                    </div>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all duration-200 disabled:opacity-50"
                  disabled={!formData.userType}
                >
                  ถัดไป
                </button>
              </div>
            )}

            {/* Step 2: Personal Information */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  ข้อมูลส่วนตัว
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ชื่อ
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="ชื่อ"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      นามสกุล
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="นามสกุล"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    อีเมล
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="อีเมลของคุณ"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="0x-xxxx-xxxx"
                      required
                    />
                  </div>
                </div>

                {formData.userType === 'STUDENT' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        รหัสนักศึกษา
                      </label>
                      <input
                        type="text"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                        placeholder="6xxxxxxxxx"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        มหาวิทยาลัย
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          value={formData.university}
                          onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                          placeholder="ชื่อมหาวิทยาลัย"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all duration-200"
                >
                  ถัดไป
                </button>
              </div>
            )}

            {/* Step 3: Password and Address */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">
                  รหัสผ่านและที่อยู่
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    รหัสผ่าน
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="อย่างน้อย 6 ตัวอักษร"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ยืนยันรหัสผ่าน
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                      placeholder="ยืนยันรหัสผ่าน"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ที่อยู่
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <textarea
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200 resize-none"
                      placeholder="ที่อยู่ของคุณ"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    รหัสไปรษณีย์
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                    placeholder="10xxx"
                    maxLength={5}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      กำลังสมัครสมาชิก...
                    </div>
                  ) : (
                    'สมัครสมาชิก'
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Login Link */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              มีบัญชีแล้ว?{' '}
              <Link 
                href="/login" 
                className="text-indigo-600 hover:text-indigo-500 font-medium transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-50 md:hidden"></div>
    </div>
  )
}