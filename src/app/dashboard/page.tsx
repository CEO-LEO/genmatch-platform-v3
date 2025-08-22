'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User, LogOut, Bell, Settings, Search, Plus, MapPin, Clock, CheckCircle, XCircle, Heart, Star, Trophy, MessageCircle } from 'lucide-react'
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
      <div className="min-h-screen genmatch-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
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
              <span className="text-xl font-bold genmatch-text-primary">
                GenMatch
              </span>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/dashboard" className="genmatch-text-primary font-semibold">
                หน้าหลัก
              </Link>
              <Link href="/my-tasks" className="genmatch-text-secondary hover:text-indigo-600 transition-colors">
                งาน
              </Link>
              <Link href="/search" className="genmatch-text-secondary hover:text-indigo-600 transition-colors">
                ค้นหา
              </Link>
              <Link href="/chat" className="genmatch-text-secondary hover:text-indigo-600 transition-colors">
                แชท
              </Link>
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 genmatch-text-secondary hover:text-indigo-600 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              </button>
              <div className="relative group">
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 transition-all duration-200">
                  <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium genmatch-text-primary">
                    {user.userType === 'STUDENT' ? 'นักศึกษา' : 'ผู้สูงอายุ'}
                  </span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 genmatch-card opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top-right scale-95 group-hover:scale-100">
                  <div className="py-2">
                    <Link href="/profile" className="flex items-center px-4 py-2 text-sm genmatch-text-secondary hover:bg-slate-100 transition-colors">
                      <User className="w-4 h-4 mr-3" />
                      โปรไฟล์
                    </Link>
                    <Link href="/settings" className="flex items-center px-4 py-2 text-sm genmatch-text-secondary hover:bg-slate-100 transition-colors">
                      <Settings className="w-4 h-4 mr-3" />
                      ตั้งค่า
                    </Link>
                    <hr className="my-2 border-slate-200" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="genmatch-card p-8 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold genmatch-text-primary mb-4">
              ยินดีต้อนรับ, {user.firstName} {user.lastName}!
            </h1>
            <p className="text-xl genmatch-text-secondary mb-6">
              {user.userType === 'STUDENT' 
                ? 'คุณเป็นนักศึกษาที่สามารถรับงานอาสาเพื่อช่วยเหลือผู้สูงอายุและสังคม'
                : 'คุณเป็นผู้สูงอายุที่สามารถสร้างงานอาสาเพื่อให้นักศึกษาได้ช่วยเหลือ'
              }
            </p>
            <div className="flex items-center justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="genmatch-text-primary">คะแนน: {user.rating || 4.5}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="genmatch-text-primary">งานที่เสร็จแล้ว: {user.completedTasks || 0}</span>
              </div>
              {user.userType === 'STUDENT' && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="genmatch-text-primary">ชั่วโมงอาสา: {user.totalHours || 0}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="genmatch-card p-8 mb-8">
          <h2 className="text-2xl font-bold genmatch-text-primary mb-6">การดำเนินการด่วน</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {user.userType === 'ELDERLY' ? (
              // Elderly Actions
              <>
                <Link href="/my-tasks" className="genmatch-card-hover p-6 text-center group">
                  <Plus className="w-12 h-12 text-indigo-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold genmatch-text-primary mb-2">เพิ่มงาน</h3>
                  <p className="genmatch-text-secondary">สร้างงานใหม่ให้นักศึกษาได้ช่วยเหลือ</p>
                </Link>
                <Link href="/my-tasks" className="genmatch-card-hover p-6 text-center group">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold genmatch-text-primary mb-2">จัดการงาน</h3>
                  <p className="genmatch-text-secondary">ดูและจัดการงานที่คุณสร้างไว้</p>
                </Link>
                <Link href="/chat" className="genmatch-card-hover p-6 text-center group">
                  <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold genmatch-text-primary mb-2">แชท</h3>
                  <p className="genmatch-text-secondary">ติดต่อกับนักศึกษาที่รับงาน</p>
                </Link>
              </>
            ) : (
              // Student Actions
              <>
                <Link href="/search" className="genmatch-card-hover p-6 text-center group">
                  <Search className="w-12 h-12 text-indigo-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold genmatch-text-primary mb-2">ค้นหางาน</h3>
                  <p className="genmatch-text-secondary">ค้นหางานอาสาที่คุณสามารถช่วยเหลือได้</p>
                </Link>
                <Link href="/my-tasks" className="genmatch-card-hover p-6 text-center group">
                  <Heart className="w-12 h-12 text-red-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold genmatch-text-primary mb-2">งานที่รับ</h3>
                  <p className="genmatch-text-secondary">ดูงานที่คุณรับไว้และกำลังดำเนินการ</p>
                </Link>
                <Link href="/chat" className="genmatch-card-hover p-6 text-center group">
                  <MessageCircle className="w-12 h-12 text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-lg font-semibold genmatch-text-primary mb-2">แชท</h3>
                  <p className="genmatch-text-secondary">ติดต่อกับผู้สร้างงาน</p>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="genmatch-card p-8">
          <h2 className="text-2xl font-bold genmatch-text-primary mb-6">กิจกรรมล่าสุด</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <p className="genmatch-text-primary font-medium">งาน "ช่วยซื้อของที่ซุปเปอร์มาร์เก็ต" เสร็จสิ้น</p>
                <p className="genmatch-text-light text-sm">เมื่อ 2 ชั่วโมงที่แล้ว</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Heart className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="genmatch-text-primary font-medium">รับงาน "ช่วยติดตั้งคอมพิวเตอร์"</p>
                <p className="genmatch-text-light text-sm">เมื่อ 1 วันที่แล้ว</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="genmatch-text-primary font-medium">ได้รับข้อความใหม่จากคุณยายสมศรี</p>
                <p className="genmatch-text-light text-sm">เมื่อ 3 วันที่แล้ว</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
