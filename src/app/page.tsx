'use client';

import Link from 'next/link';
import { Heart, Search, Plus, Users, Award, Shield, Clock, MapPin } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">GM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  GenMatch
                </h1>
                <p className="text-sm text-gray-600">แพลตฟอร์มจิตอาสาแห่งอนาคต</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                href="/login"
                className="px-6 py-2.5 text-gray-700 border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                เข้าสู่ระบบ
              </Link>
              <Link 
                href="/register"
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              <Heart className="w-4 h-4 mr-2" />
              สร้างสังคมที่มีน้ำใจด้วยเทคโนโลยี
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              เชื่อมโยง
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> ผู้สูงอายุ </span>
              กับ
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> นักศึกษา </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              แพลตฟอร์มจิตอาสาที่ใช้เทคโนโลยีสมัยใหม่ในการเชื่อมโยงผู้สูงอายุที่ต้องการความช่วยเหลือ 
              กับนักศึกษาที่ต้องการทำจิตอาสา สร้างสังคมที่มีน้ำใจและช่วยเหลือกัน
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                href="/register"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 flex items-center space-x-2"
              >
                <Plus className="w-6 h-6" />
                <span>เริ่มต้นใช้งานฟรี</span>
              </Link>
              <Link 
                href="/search"
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-2xl font-semibold text-lg hover:border-purple-300 hover:bg-purple-50 transition-all duration-200 flex items-center space-x-2"
              >
                <Search className="w-6 h-6" />
                <span>ดูงานจิตอาสา</span>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-300 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ทำไมต้องเลือก GenMatch?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              เราใช้เทคโนโลยีล่าสุดเพื่อให้การทำจิตอาสาเป็นเรื่องง่าย สะดวก และปลอดภัย
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ค้นหางานง่าย</h3>
              <p className="text-gray-600 leading-relaxed">
                ค้นหางานจิตอาสาที่เหมาะสมกับความสามารถและเวลาของคุณ 
                ด้วยระบบค้นหาและกรองที่ทันสมัย
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ปลอดภัย 100%</h3>
              <p className="text-gray-600 leading-relaxed">
                ระบบความปลอดภัยที่เข้มงวด ข้อมูลส่วนตัวได้รับการปกป้อง 
                และการพบปะในสถานที่ที่ปลอดภัย
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-3xl border border-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ประสานงานง่าย</h3>
              <p className="text-gray-600 leading-relaxed">
                ระบบแชทในตัวที่ช่วยให้ประสานงานได้ง่าย 
                ติดตามความคืบหน้าและอัปเดตสถานะได้ทันที
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              ใช้งานง่ายเพียง 3 ขั้นตอน
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              เริ่มต้นใช้งาน GenMatch ได้ในไม่กี่นาที
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">สมัครสมาชิก</h3>
              <p className="text-gray-600">
                สร้างบัญชีผู้ใช้ด้วยข้อมูลพื้นฐาน 
                เลือกประเภทผู้ใช้ตามความต้องการ
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">ค้นหาหรือสร้างงาน</h3>
              <p className="text-gray-600">
                นักศึกษาค้นหางานจิตอาสา 
                ผู้สูงอายุสร้างงานที่ต้องการความช่วยเหลือ
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">เริ่มทำจิตอาสา</h3>
              <p className="text-gray-600">
                ประสานงานผ่านแชท 
                ทำงานตามที่ตกลงและอัปเดตสถานะ
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">1,000+</div>
              <div className="text-gray-600">ผู้ใช้งาน</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">500+</div>
              <div className="text-gray-600">งานจิตอาสา</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-purple-600">50+</div>
              <div className="text-gray-600">จังหวัด</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-blue-600">99%</div>
              <div className="text-gray-600">ความพึงพอใจ</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            พร้อมเริ่มต้นการเดินทางจิตอาสาแล้วหรือยัง?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            เข้าร่วมชุมชน GenMatch วันนี้ และเป็นส่วนหนึ่งในการสร้างสังคมที่มีน้ำใจ
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/register"
              className="px-8 py-4 bg-white text-purple-600 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              สมัครสมาชิกฟรี
            </Link>
            <Link 
              href="/search"
              className="px-8 py-4 border-2 border-white text-white rounded-2xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-200"
            >
              ดูงานจิตอาสา
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <span className="text-xl font-bold">GenMatch</span>
              </div>
              <p className="text-gray-400">
                แพลตฟอร์มจิตอาสาที่เชื่อมโยงผู้สูงอายุกับนักศึกษา 
                สร้างสังคมที่มีน้ำใจและช่วยเหลือกัน
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">ฟีเจอร์</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/search" className="hover:text-white transition-colors">ค้นหางาน</Link></li>
                <li><Link href="/add-task" className="hover:text-white transition-colors">สร้างงาน</Link></li>
                <li><Link href="/chat" className="hover:text-white transition-colors">แชท</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">ช่วยเหลือ</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">คู่มือการใช้งาน</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">คำถามที่พบบ่อย</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">ติดต่อเรา</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">ติดต่อ</h4>
              <div className="space-y-2 text-gray-400">
                <p>support@genmatch.com</p>
                <p>02-XXX-XXXX</p>
                <p>เวลาทำการ: จันทร์-ศุกร์ 9:00-18:00 น.</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GenMatch. สงวนลิขสิทธิ์ทั้งหมด.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}