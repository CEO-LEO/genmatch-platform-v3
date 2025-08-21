'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User, LogOut, Bell, Settings, Search, Plus, MapPin, Clock, CheckCircle, XCircle, Heart, Star, Trophy } from 'lucide-react'
import LogoIcon from '@/components/LogoIcon'

interface UserData {
  phone: string
  userType: 'STUDENT' | 'ELDERLY'
  isLoggedIn: boolean
  loginTime: string
}

export default function DashboardPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('genmatch_user')
    if (storedUser) {
      const user = JSON.parse(storedUser)
      if (user.isLoggedIn) {
        setUserData(user)
      } else {
        // Redirect to login if not logged in
        window.location.href = '/login'
      }
    } else {
      // Redirect to login if no user data
      window.location.href = '/login'
    }
    setIsLoading(false)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('genmatch_user')
    window.location.href = '/'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="loading-spinner w-12 h-12"></div>
      </div>
    )
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-primary">
      {/* Header */}
      <header className="glass-effect sticky top-0 z-50 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <LogoIcon className="w-8 h-8" />
              <span className="text-xl font-bold text-gradient font-display">
                GenMatch
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="nav-link-active">
                หน้าหลัก
              </Link>
              <Link href="/my-tasks" className="nav-link">
                งาน
              </Link>
              <Link href="/search" className="nav-link">
                ค้นหา
              </Link>
              <Link href="/chat" className="nav-link">
                แชท
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-neutral-600 hover:text-primary-600 transition-colors focus-visible">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-error-500 rounded-full animate-pulse"></span>
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition-all duration-200 focus-visible">
                  <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-600 rounded-full flex items-center justify-center shadow-glow-primary">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    {userData.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-large border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="py-2">
                    <Link href="/profile" className="block px-4 py-2 text-sm text-neutral-700 hover:bg-primary-50 transition-colors">
                      โปรไฟล์
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                    >
                      ออกจากระบบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3 font-display">
            ยินดีต้อนรับกลับสู่ GenMatch!
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            {userData.userType === 'ELDERLY' 
              ? 'คุณเป็นผู้สูงอายุที่ต้องการความช่วยเหลือ' 
              : 'คุณเป็นนักศึกษาที่พร้อมช่วยเหลือผู้สูงอายุ'
            }
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {userData.userType === 'ELDERLY' ? (
            <>
              <Link href="/add-task" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-primary group-hover:shadow-glow">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">สร้างงานใหม่</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">สร้างงานที่ต้องการความช่วยเหลือจากนักศึกษาผู้มีจิตอาสา</p>
              </Link>
              <Link href="/my-tasks" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-secondary group-hover:shadow-glow">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">งานของฉัน</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">ดูและจัดการงานที่คุณสร้างไว้ พร้อมติดตามความคืบหน้า</p>
              </Link>
            </>
          ) : (
            <>
              <Link href="/search" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-primary group-hover:shadow-glow">
                  <Search className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">ค้นหางาน</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">ค้นหางานอาสาที่เหมาะสมกับทักษะและความสนใจของคุณ</p>
              </Link>
              <Link href="/my-tasks" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-secondary group-hover:shadow-glow">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">งานของฉัน</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">ดูงานที่คุณรับผิดชอบและติดตามความคืบหน้า</p>
              </Link>
            </>
          )}
          
          <Link href="/chat" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.3s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mb-4 shadow-glow group-hover:shadow-glow">
              <span className="text-white font-bold text-lg">💬</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">แชท</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">ติดต่อและประสานงานกับผู้ใช้คนอื่นผ่านระบบแชท</p>
          </Link>
          
          <Link href="/profile" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.4s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-xl flex items-center justify-center mb-4 shadow-soft group-hover:shadow-glow">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">โปรไฟล์</h3>
            <p className="text-neutral-600 text-sm leading-relaxed">จัดการข้อมูลส่วนตัว ดูสถิติและความสำเร็จของคุณ</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="card p-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mr-3"></div>
            กิจกรรมล่าสุด
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-primary-50 rounded-xl border border-primary-100">
              <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm text-neutral-700 font-medium">
                  {userData.userType === 'ELDERLY' 
                    ? 'คุณได้สร้างงาน "ช่วยซื้อของ" เรียบร้อยแล้ว'
                    : 'คุณได้รับงาน "ช่วยซื้อของ" จากคุณยายสมศรี'
                  }
                </p>
                <p className="text-xs text-neutral-500 mt-1">เมื่อ 2 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-secondary-50 rounded-xl border border-secondary-100">
              <div className="w-3 h-3 bg-secondary-500 rounded-full animate-pulse"></div>
              <div className="flex-1">
                <p className="text-sm text-neutral-700 font-medium">
                  {userData.userType === 'ELDERLY'
                    ? 'นักศึกษาอนุชาได้เสร็จสิ้นงาน "ช่วยทำความสะอาดบ้าน"'
                    : 'คุณได้เสร็จสิ้นงาน "ช่วยทำความสะอาดบ้าน"'
                  }
                </p>
                <p className="text-xs text-neutral-500 mt-1">เมื่อ 1 วันที่แล้ว</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card p-6 text-center animate-scale-in" style={{animationDelay: '0.6s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow-primary">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">24</h3>
            <p className="text-neutral-600">ชั่วโมงจิตอาสา</p>
          </div>
          
          <div className="card p-6 text-center animate-scale-in" style={{animationDelay: '0.7s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow-secondary">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">12</h3>
            <p className="text-neutral-600">งานเสร็จสิ้น</p>
          </div>
          
          <div className="card p-6 text-center animate-scale-in" style={{animationDelay: '0.8s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">4.8</h3>
            <p className="text-neutral-600">คะแนนความพึงพอใจ</p>
          </div>
        </div>
      </main>
    </div>
  )
}
