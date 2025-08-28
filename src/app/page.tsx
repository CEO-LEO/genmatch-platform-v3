'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Heart, Search, Plus, Users, Award, Shield, Clock, MapPin } from 'lucide-react';

export default function HomePage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (user) {
        // If user is logged in, redirect to dashboard
        router.push('/dashboard');
      } else {
        // If user is not logged in, show home page
        setShowContent(true);
      }
    }
  }, [user, loading, router]);

  // Show loading while checking authentication
  if (loading || !showContent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header - Mobile Optimized */}
      <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg sm:text-xl">GM</span>
              </div>
              
              <div>
                <h1 className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  GenMatch
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">แพลตฟอร์มจิตอาสาแห่งอนาคต</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link 
                href="/login"
                className="px-3 sm:px-6 py-2 sm:py-2.5 text-gray-700 border border-gray-300 rounded-lg sm:rounded-xl hover:bg-gray-50 transition-all duration-200 text-sm sm:text-base font-medium"
              >
                เข้าสู่ระบบ
              </Link>
              <Link 
                href="/register"
                className="px-3 sm:px-6 py-2 sm:py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg sm:rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section - Mobile First */}
      <section className="relative overflow-hidden px-4 sm:px-6 py-12 sm:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6 sm:space-y-8">
            {/* Tag Line */}
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-xs sm:text-sm font-medium">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              สร้างสังคมที่มีน้ำใจ
            </div>
            
            {/* Main Heading - Mobile Optimized */}
            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight px-2">
                เชื่อมโยง
                <span className="block sm:inline bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  ผู้สูงอายุ
                </span>
                <span className="hidden sm:inline"> กับ </span>
                <span className="block sm:inline bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  นักศึกษา
                </span>
              </h1>
            </div>
            
            {/* Description - Shortened for Mobile */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed px-2">
              แพลตฟอร์มจิตอาสาที่เชื่อมโยงผู้สูงอายุกับนักศึกษา
              <span className="hidden sm:inline"> ใช้เทคโนโลยีสมัยใหม่ในการสร้างสังคมที่มีน้ำใจและช่วยเหลือกัน</span>
            </p>
            
            {/* CTA Buttons - Mobile Optimized */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center pt-2">
              <Link 
                href="/register"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
              >
                <Plus className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>เริ่มต้นใช้งานฟรี</span>
              </Link>
              <Link 
                href="/search"
                className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>ดูงานจิตอาสา</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements - Reduced for Mobile */}
        <div className="absolute top-10 sm:top-20 left-4 sm:left-10 w-12 h-12 sm:w-20 sm:h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 sm:top-40 right-4 sm:right-20 w-10 h-10 sm:w-16 sm:h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-10 sm:bottom-20 left-1/4 w-8 h-8 sm:w-12 sm:h-12 bg-purple-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Features Section - Mobile Optimized */}
      <section className="py-12 sm:py-20 bg-white px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              ทำไมต้องเลือก GenMatch?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              ง่าย สะดวก และปลอดภัย
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">ค้นหางานง่าย</h3>
              <p className="text-sm sm:text-base text-gray-600">ระบบค้นหาที่ทันสมัย</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-2xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">ปลอดภัย 100%</h3>
              <p className="text-sm sm:text-base text-gray-600">ระบบความปลอดภัยที่เข้มงวด</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-purple-50 rounded-2xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">ประสานงานเร็ว</h3>
              <p className="text-sm sm:text-base text-gray-600">ระบบแชทที่ใช้งานง่าย</p>
            </div>

            <div className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">ชุมชนใหญ่</h3>
              <p className="text-sm sm:text-base text-gray-600">ผู้ใช้งานทั่วประเทศ</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Mobile Optimized */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              ใช้งานง่าย 3 ขั้นตอน
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              เริ่มต้นการเดินทางจิตอาสาได้ทันที
            </p>
          </div>
          
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold flex-shrink-0">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">สมัครสมาชิก</h3>
                <p className="text-sm sm:text-base text-gray-600">เลือกประเภทผู้ใช้และกรอกข้อมูล</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold flex-shrink-0">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">ค้นหาหรือสร้างงาน</h3>
                <p className="text-sm sm:text-base text-gray-600">นักศึกษาค้นหางาน ผู้สูงอายุสร้างงาน</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center text-center sm:text-left space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-green-600 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl sm:text-3xl font-bold flex-shrink-0">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">เริ่มต้นช่วยเหลือ</h3>
                <p className="text-sm sm:text-base text-gray-600">ประสานงานและเริ่มต้นการช่วยเหลือ</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Mobile Optimized */}
      <section className="py-12 sm:py-20 bg-white px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
              ตัวเลขที่น่าประทับใจ
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600">1,000+</div>
              <div className="text-sm sm:text-base text-gray-600">ผู้ใช้งาน</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">500+</div>
              <div className="text-sm sm:text-base text-gray-600">งานจิตอาสา</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-600">50+</div>
              <div className="text-sm sm:text-base text-gray-600">จังหวัด</div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-600">99%</div>
              <div className="text-sm sm:text-base text-gray-600">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile Optimized */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-purple-600 to-blue-600 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-purple-100 mb-6 sm:mb-8">
            เข้าร่วมชุมชน GenMatch วันนี้
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <Link 
              href="/register"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-white text-purple-600 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              สมัครสมาชิกฟรี
            </Link>
            <Link 
              href="/search"
              className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white text-white rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              ดูงานจิตอาสา
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Mobile Optimized */}
      <footer className="bg-gray-900 text-white py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-sm sm:text-lg">GM</span>
                </div>
                <span className="text-lg sm:text-xl font-bold">GenMatch</span>
              </div>
              <p className="text-sm sm:text-base text-gray-400">
                แพลตฟอร์มจิตอาสาที่เชื่อมโยงผู้สูงอายุกับนักศึกษา
              </p>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-base sm:text-lg">ฟีเจอร์</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><Link href="/search" className="hover:text-white transition-colors">ค้นหางาน</Link></li>
                <li><Link href="/add-task" className="hover:text-white transition-colors">สร้างงาน</Link></li>
                <li><Link href="/chat" className="hover:text-white transition-colors">แชท</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-base sm:text-lg">ช่วยเหลือ</h4>
              <ul className="space-y-2 text-sm sm:text-base text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">คู่มือการใช้งาน</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">คำถามที่พบบ่อย</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">ติดต่อเรา</Link></li>
              </ul>
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-semibold text-base sm:text-lg">ติดต่อ</h4>
              <div className="space-y-2 text-sm sm:text-base text-gray-400">
                <p>support@genmatch.com</p>
                <p>02-XXX-XXXX</p>
                <p>จันทร์-ศุกร์ 9:00-18:00 น.</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-sm sm:text-base text-gray-400">
            <p>&copy; 2024 GenMatch. สงวนลิขสิทธิ์ทั้งหมด.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}