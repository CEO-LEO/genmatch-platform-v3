'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  Search, 
  Plus, 
  Bell, 
  User, 
  Users,
  Heart
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <span className="text-2xl font-bold text-white">GM</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <div className="text-sm text-gray-600 leading-tight">
                  <span>Generation</span><br/>
                  <span>Matching</span>
                </div>
              </div>
            </div>
            
            {/* Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                คุณสมบัติ
              </Link>
              <Link href="/how-to-use" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                วิธีใช้งาน
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                เกี่ยวกับเรา
              </Link>
            </nav>
            
            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="px-6 py-2 border-2 border-purple-600 text-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
              <Link 
                href="/register"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Icon */}
          <div className="w-32 h-32 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <div className="flex items-center justify-center relative">
              {/* Center person */}
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              {/* Left person */}
              <div className="absolute -left-4 -top-2 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
              {/* Right person */}
              <div className="absolute -right-4 -top-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Main Title */}
          <h2 className="text-5xl font-bold text-purple-600 mb-6 leading-tight">
            เชื่อมโยงจิตอาสา<br/>
            สร้างสังคมดี
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            แพลตฟอร์มเชื่อมโยงนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสาที่มีประสิทธิภาพ
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="px-8 py-4 bg-purple-600 text-white text-lg font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-lg"
            >
              เริ่มต้นใช้งาน
            </Link>
            <Link 
              href="/login"
              className="px-8 py-4 border-2 border-purple-600 text-purple-600 text-lg font-semibold rounded-lg hover:bg-purple-50 transition-colors"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
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