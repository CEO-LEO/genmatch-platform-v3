'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Search, Plus, MessageCircle, Shield, Clock, MapPin, Users, Award } from 'lucide-react';

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">GM</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
                  <p className="text-sm text-gray-600">แพลตฟอร์มจิตอาสา</p>
                </div>
              </Link>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            คู่มือการใช้งาน GenMatch
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            เรียนรู้วิธีใช้งานแพลตฟอร์มจิตอาสาที่จะช่วยให้คุณเริ่มต้นการเดินทางจิตอาสาได้อย่างง่ายดาย
          </p>
        </div>

        {/* Quick Navigation */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Link href="#getting-started" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-xl flex items-center justify-center mb-4">
              <Plus className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">เริ่มต้นใช้งาน</h3>
            <p className="text-gray-600 text-sm">ขั้นตอนการสมัครสมาชิกและเริ่มต้นใช้งาน</p>
          </Link>

          <Link href="#for-students" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">สำหรับนักศึกษา</h3>
            <p className="text-gray-600 text-sm">วิธีรับงานจิตอาสาและช่วยเหลือสังคม</p>
          </Link>

          <Link href="#for-elderly" className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">สำหรับผู้สูงอายุ</h3>
            <p className="text-gray-600 text-sm">วิธีสร้างงานจิตอาสาและรับความช่วยเหลือ</p>
          </Link>
        </div>

        {/* Getting Started Section */}
        <section id="getting-started" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
              <Plus className="w-5 h-5 text-white" />
            </div>
            เริ่มต้นใช้งาน GenMatch
          </h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-purple-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">ขั้นตอนที่ 1: สมัครสมาชิก</h3>
              <p className="text-gray-600 mb-4">
                สร้างบัญชีผู้ใช้ใหม่โดยเลือกประเภทผู้ใช้ (นักศึกษาหรือผู้สูงอายุ) และกรอกข้อมูลส่วนตัวที่จำเป็น
              </p>
              <Link href="/register" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                สมัครสมาชิกเลย
              </Link>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">ขั้นตอนที่ 2: เข้าสู่ระบบ</h3>
              <p className="text-gray-600 mb-4">
                ใช้เบอร์โทรศัพท์และรหัสผ่านที่สมัครไว้เพื่อเข้าสู่ระบบและเข้าถึงฟีเจอร์ต่างๆ
              </p>
              <Link href="/login" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                เข้าสู่ระบบ
              </Link>
            </div>

            <div className="border-l-4 border-green-500 pl-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">ขั้นตอนที่ 3: เริ่มใช้งาน</h3>
              <p className="text-gray-600">
                หลังจากเข้าสู่ระบบแล้ว คุณจะสามารถเข้าถึง Dashboard และเริ่มใช้งานฟีเจอร์ต่างๆ ได้ทันที
              </p>
            </div>
          </div>
        </section>

        {/* For Students Section */}
        <section id="for-students" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
              <Users className="w-5 h-5 text-white" />
            </div>
            คู่มือสำหรับนักศึกษา
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">🎯 วิธีรับงานจิตอาสา</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>ไปที่หน้า <strong>ค้นหา</strong> เพื่อดูงานจิตอาสาที่มีอยู่</li>
                <li>ใช้ตัวกรองเพื่อค้นหางานที่เหมาะสมกับความสามารถและเวลาของคุณ</li>
                <li>อ่านรายละเอียดงานและกดปุ่ม <strong>รับงาน</strong></li>
                <li>ประสานงานกับผู้สร้างงานผ่านระบบแชท</li>
                <li>ไปทำงานตามวันเวลาที่ตกลงกัน</li>
                <li>อัปเดตสถานะงานเป็น <strong>เสร็จสิ้น</strong> เมื่อทำงานเสร็จ</li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">💡 เคล็ดลับสำหรับนักศึกษา</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• เลือกงานที่เหมาะสมกับตารางเวลาของคุณ</li>
                <li>• ติดต่อผู้สร้างงานล่วงหน้าเพื่อประสานงาน</li>
                <li>• ไปทำงานตรงเวลาและแต่งกายให้เหมาะสม</li>
                <li>• ถามคำถามหากมีข้อสงสัยเกี่ยวกับงาน</li>
                <li>• รายงานปัญหาหรือข้อผิดพลาดทันที</li>
              </ul>
            </div>
          </div>
        </section>

        {/* For Elderly Section */}
        <section id="for-elderly" className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3">
              <Award className="w-5 h-5 text-white" />
            </div>
            คู่มือสำหรับผู้สูงอายุ
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">📝 วิธีสร้างงานจิตอาสา</h3>
              <ol className="list-decimal list-inside space-y-2 text-gray-600">
                <li>ไปที่หน้า <strong>สร้างงาน</strong> เพื่อโพสต์งานใหม่</li>
                <li>กรอกข้อมูลงานให้ครบถ้วนและชัดเจน</li>
                <li>ระบุวันที่ เวลา และสถานที่ที่ต้องการความช่วยเหลือ</li>
                <li>อัปโหลดรูปภาพหรือเอกสารที่เกี่ยวข้อง (ถ้ามี)</li>
                <li>กดปุ่ม <strong>สร้างงาน</strong> เพื่อโพสต์</li>
                <li>รอให้นักศึกษารับงานและติดต่อกลับ</li>
              </ol>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">🔒 ความปลอดภัยและข้อควรระวัง</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• เลือกสถานที่ที่ปลอดภัยและเป็นสาธารณะ</li>
                <li>• แจ้งครอบครัวหรือคนใกล้ตัวก่อนพบจิตอาสา</li>
                <li>• ไม่ให้ข้อมูลส่วนตัวที่สำคัญกับจิตอาสา</li>
                <li>• ไม่โอนเงินหรือให้ทรัพย์สินมีค่า</li>
                <li>• ติดต่อเรา หากพบพฤติกรรมที่น่าสงสัย</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">ฟีเจอร์หลักของ GenMatch</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ค้นหางานง่าย</h3>
              <p className="text-gray-600 text-sm">ระบบค้นหาและกรองที่ทันสมัย ช่วยให้หางานที่เหมาะสมได้ง่าย</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ระบบแชท</h3>
              <p className="text-gray-600 text-sm">ประสานงานและติดต่อกันได้ง่ายผ่านระบบแชทในตัว</p>
            </div>

            <div className="text-center p-6 bg-gradient-to-br from-green-50 to-purple-50 rounded-xl">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">ปลอดภัย 100%</h3>
              <p className="text-gray-600 text-sm">ระบบความปลอดภัยที่เข้มงวด ข้อมูลส่วนตัวได้รับการปกป้อง</p>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">ยังมีคำถามอยู่?</h2>
          <p className="text-xl text-purple-100 mb-6">
            ทีมงานของเราพร้อมช่วยเหลือคุณ อย่าลังเลที่จะติดต่อเรา
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact"
              className="px-8 py-3 bg-white text-purple-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
            >
              ติดต่อเรา
            </Link>
            <Link 
              href="/faq"
              className="px-8 py-3 border-2 border-white text-white rounded-xl font-semibold hover:bg-white hover:text-purple-600 transition-colors"
            >
              คำถามที่พบบ่อย
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
