'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Search, 
  Plus, 
  Bell, 
  User, 
  MapPin, 
  Building, 
  Wrench, 
  Heart, 
  Users, 
  Calendar, 
  Star, 
  Clock 
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-600">แพลตฟอร์มเชื่อมโยงจิตอาสา</p>
              </div>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center space-x-4">
              <Link href="/notifications" className="relative p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <Bell className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </Link>
              <Link href="/profile" className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <User className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white mb-8">
            <h2 className="text-4xl font-bold mb-4">ยินดีต้อนรับสู่ GenMatch</h2>
            <p className="text-xl mb-8 opacity-90">
              แพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสา
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/search"
                className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                ค้นหางานจิตอาสา
              </Link>
              <Link 
                href="/add-task"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-colors"
              >
                สร้างงานใหม่
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">สถิติ</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">156</div>
              <div className="text-sm text-gray-600">งานจิตอาสา</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-6 h-6 text-blue-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">89</div>
              <div className="text-sm text-gray-600">จิตอาสา</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock className="w-6 h-6 text-green-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">2,340</div>
              <div className="text-sm text-gray-600">ชั่วโมงอาสา</div>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-1">4.8</div>
              <div className="text-sm text-gray-600">คะแนนเฉลี่ย</div>
            </div>
          </div>
        </section>

        {/* Volunteer Categories */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">หมวดหมู่งานจิตอาสา</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/search?category=hospital"
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="w-8 h-8 text-red-500" />
              </div>
              <div className="font-semibold text-gray-900">โรงพยาบาล</div>
            </Link>
            <Link 
              href="/search?category=temple"
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Building className="w-8 h-8 text-yellow-500" />
              </div>
              <div className="font-semibold text-gray-900">วัด</div>
            </Link>
            <Link 
              href="/search?category=exercise"
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="w-8 h-8 text-green-500" />
              </div>
              <div className="font-semibold text-gray-900">ออกกำลังกาย</div>
            </Link>
            <Link 
              href="/search?category=repair"
              className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wrench className="w-8 h-8 text-blue-500" />
              </div>
              <div className="font-semibold text-gray-900">ซ่อมแซม</div>
            </Link>
          </div>
        </section>

        {/* Recent Tasks */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">งานล่าสุด</h3>
          <div className="grid gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">ช่วยเหลือผู้สูงอายุที่โรงพยาบาล</h4>
                  <p className="text-gray-600 text-sm mb-3">ช่วยดูแลผู้ป่วยสูงอายุ ให้น้ำ อาหาร และพูดคุย</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>โรงพยาบาลมหาราช</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>25 ส.ค. 2568</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>ต้องการ 2 คน</span>
                    </div>
                  </div>
                </div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  เปิดรับ
                </span>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">ทำความสะอาดวัด</h4>
                  <p className="text-gray-600 text-sm mb-3">ช่วยทำความสะอาดบริเวณวัดและจัดดอกไม้</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>วัดพระศรีมหาธาตุ</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>26 ส.ค. 2568</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>ต้องการ 5 คน</span>
                    </div>
                  </div>
                </div>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  เปิดรับ
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">เริ่มต้นใช้งาน</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/add-task"
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transition-all hover:-translate-y-1 shadow-lg"
            >
              สร้างงานใหม่
            </Link>
            <Link 
              href="/search"
              className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-4 rounded-full font-semibold hover:bg-purple-50 transition-colors"
            >
              ค้นหางาน
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          <Link 
            href="/"
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">หน้าหลัก</span>
          </Link>
          <Link 
            href="/search"
            onClick={() => setActiveTab('search')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'search' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Search className="w-6 h-6 mb-1" />
            <span className="text-xs">ค้นหา</span>
          </Link>
          <Link 
            href="/add-task"
            onClick={() => setActiveTab('add')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'add' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-xs">สร้างงาน</span>
          </Link>
          <Link 
            href="/my-tasks"
            onClick={() => setActiveTab('mytasks')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'mytasks' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs">งานของฉัน</span>
          </Link>
          <Link 
            href="/profile"
            onClick={() => setActiveTab('profile')}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'profile' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">โปรไฟล์</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}