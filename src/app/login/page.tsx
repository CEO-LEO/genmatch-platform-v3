'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Lock, Phone, ArrowLeft } from 'lucide-react'
import LogoIcon from '@/components/LogoIcon'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle login logic here
    console.log('Login:', formData)
    
    // Simulate login process
    if (formData.phone && formData.password) {
      // Show loading state
      const submitBtn = e.currentTarget.querySelector('button[type="submit"]') as HTMLButtonElement
      if (submitBtn) {
        submitBtn.disabled = true
        submitBtn.innerHTML = '<div class="flex items-center justify-center"><div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>กำลังเข้าสู่ระบบ...</div>'
      }
      
      // Simulate API call
      setTimeout(() => {
        // Store user data in localStorage (simulate session)
        const userData = {
          phone: formData.phone,
          userType: 'STUDENT', // หรือ 'ELDERLY' ตามข้อมูลจริง
          isLoggedIn: true,
          loginTime: new Date().toISOString()
        }
        localStorage.setItem('genmatch_user', JSON.stringify(userData))
        
        // Show success message
        alert('เข้าสู่ระบบสำเร็จ! ยินดีต้อนรับกลับสู่ GenMatch')
        
        // Redirect to dashboard
        window.location.href = '/dashboard'
      }, 2000)
    } else {
      alert('กรุณากรอกเบอร์โทรศัพท์และรหัสผ่านให้ครบถ้วน')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-blue-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home */}
        <Link 
          href="/" 
          className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Link>

        {/* Login Card */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl shadow-2xl border border-purple-200/50 p-8">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <LogoIcon className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-800 bg-clip-text text-transparent">
              เข้าสู่ระบบ
            </h1>
            <p className="text-gray-600 mt-2">
              ยินดีต้อนรับกลับสู่ GenMatch
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Field */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                เบอร์โทรศัพท์
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="กรุณากรอกเบอร์โทรศัพท์"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                รหัสผ่าน
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-purple-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-10 pr-12 py-3 border-2 border-purple-200 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  placeholder="กรุณากรอกรหัสผ่าน"
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

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-purple-300 rounded focus:ring-purple-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-gray-600">จดจำฉัน</span>
              </label>
              <Link 
                href="/forgot-password" 
                className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
              >
                ลืมรหัสผ่าน?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-blue-700 hover:from-purple-600 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              เข้าสู่ระบบ
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-purple-200"></div>
            <span className="px-4 text-sm text-gray-500">หรือ</span>
            <div className="flex-1 border-t border-purple-200"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-3">
            <button className="w-full bg-white border-2 border-purple-200 text-purple-600 font-semibold py-3 px-6 rounded-xl hover:bg-purple-50 hover:border-purple-300 transition-all duration-200 flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              เข้าสู่ระบบด้วย Google
            </button>
          </div>

          {/* Register Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              ยังไม่มีบัญชี?{' '}
              <Link 
                href="/register" 
                className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
              >
                ลงทะเบียนเลย
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
