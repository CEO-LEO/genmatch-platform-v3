'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, LogOut, Bell, Settings, Search, Plus, MapPin, Clock, CheckCircle, XCircle, Heart, Star, Trophy } from 'lucide-react'
import LogoIcon from '@/components/LogoIcon'

export default function DashboardPage() {
  const { user, loading, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-primary flex items-center justify-center">
        <div className="loading-spinner w-12 h-12"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen genmatch-bg">
      {/* Header */}
      <header className="genmatch-header sticky top-0 z-50">
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
                    {user.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-large border border-neutral-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      โปรไฟล์
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      ตั้งค่า
                    </Link>
                    <hr className="my-2 border-neutral-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-error-600 hover:bg-error-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      ออกจากระบบ
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold text-neutral-900 mb-3 font-display">
            ยินดีต้อนรับกลับสู่ GenMatch!
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl">
            {user.userType === 'ELDERLY' ? 'คุณเป็นผู้สูงอายุที่ต้องการความช่วยเหลือ' : 'คุณเป็นนักศึกษาที่พร้อมช่วยเหลือผู้สูงอายุ'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {user.userType === 'ELDERLY' ? (
            <>
              <Link href="/add-task" className="genmatch-task-card group animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-primary group-hover:shadow-glow">
                  <Plus className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold genmatch-text-primary mb-2">สร้างงานใหม่</h3>
                <p className="genmatch-text-secondary text-sm leading-relaxed">สร้างงานที่ต้องการความช่วยเหลือจากนักศึกษาผู้มีจิตอาสา</p>
              </Link>
              
              <Link href="/my-tasks" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-secondary group-hover:shadow-glow">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">งานของฉัน</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">ดูและจัดการงานที่สร้างไว้</p>
              </Link>
              
              <Link href="/chat" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.3s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-primary group-hover:shadow-glow">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">แชท</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">ติดต่อและประสานงานกับนักศึกษาผู้รับงาน</p>
              </Link>
              
              <Link href="/profile" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-secondary group-hover:shadow-glow">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">โปรไฟล์</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">จัดการข้อมูลส่วนตัวและดูสถิติ</p>
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
              
              <Link href="/chat" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.3s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-primary group-hover:shadow-glow">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">แชท</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">ติดต่อและประสานงานกับผู้สร้างงาน</p>
              </Link>
              
              <Link href="/profile" className="card-interactive p-6 group animate-slide-up" style={{animationDelay: '0.4s'}}>
                <div className="w-12 h-12 bg-gradient-to-r from-neutral-500 to-neutral-600 rounded-xl flex items-center justify-center mb-4 shadow-glow-secondary group-hover:shadow-glow">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">โปรไฟล์</h3>
                <p className="text-neutral-600 text-sm leading-relaxed">จัดการข้อมูลส่วนตัว ดูสถิติและความสำเร็จของคุณ</p>
              </Link>
            </>
          )}
        </div>

        <div className="card p-6 animate-fade-in" style={{animationDelay: '0.5s'}}>
          <h2 className="text-xl font-semibold text-neutral-900 mb-6 flex items-center">
            <div className="w-6 h-6 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg mr-3"></div>
            กิจกรรมล่าสุด
          </h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">
                  {user.userType === 'ELDERLY' ? 'คุณสร้างงาน "ช่วยซื้อของ" สำเร็จ' : 'คุณได้รับงาน "ช่วยซื้อของ" จากคุณยายสมศรี'}
                </p>
                <p className="text-xs text-neutral-500">เมื่อ 2 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-secondary-500 to-secondary-600 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">
                  {user.userType === 'ELDERLY' ? 'งาน "พาไปตรวจสุขภาพ" กำลังดำเนินการ' : 'งาน "พาไปตรวจสุขภาพ" เริ่มต้นแล้ว'}
                </p>
                <p className="text-xs text-neutral-500">เมื่อ 1 วันที่แล้ว</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 p-3 bg-neutral-50 rounded-lg">
              <div className="w-10 h-10 bg-gradient-to-r from-accent-500 to-accent-600 rounded-full flex items-center justify-center">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-neutral-900">
                  {user.userType === 'ELDERLY' ? 'คุณได้รับคะแนน 5 ดาวจากนักศึกษา' : 'คุณได้รับคะแนน 5 ดาวจากผู้สูงอายุ'}
                </p>
                <p className="text-xs text-neutral-500">เมื่อ 3 วันที่แล้ว</p>
              </div>
            </div>
          </div>
        </div>

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
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">8</h3>
            <p className="text-neutral-600">งานที่เสร็จสิ้น</p>
          </div>
          
          <div className="card p-6 text-center animate-scale-in" style={{animationDelay: '0.8s'}}>
            <div className="w-12 h-12 bg-gradient-to-r from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mx-auto mb-4 shadow-glow-primary">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-neutral-900 mb-2">4.8</h3>
            <p className="text-neutral-600">คะแนนเฉลี่ย</p>
          </div>
        </div>
      </main>
    </div>
  )
}
