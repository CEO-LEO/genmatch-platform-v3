'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Star,
  CheckCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export default function HelpPage() {
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'GenMatch คืออะไร?',
      answer: 'GenMatch เป็นแพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสา โดยช่วยให้ผู้สูงอายุสามารถหาความช่วยเหลือได้ง่าย และให้นักศึกษาได้มีโอกาสทำความดี',
      category: 'ทั่วไป'
    },
    {
      id: '2',
      question: 'ฉันจะเริ่มต้นใช้งานได้อย่างไร?',
      answer: 'คุณสามารถเริ่มต้นได้โดยการสมัครสมาชิก เลือกประเภทผู้ใช้ (นักศึกษาหรือผู้สูงอายุ) และเริ่มค้นหางานจิตอาสาหรือสร้างงานใหม่ได้ทันที',
      category: 'การใช้งาน'
    },
    {
      id: '3',
      question: 'ฉันจะสร้างงานจิตอาสาได้อย่างไร?',
      answer: 'ไปที่หน้า "สร้างงานใหม่" กรอกข้อมูลงานที่ต้องการความช่วยเหลือ เช่น ชื่องาน รายละเอียด สถานที่ วันที่ และจำนวนจิตอาสาที่ต้องการ',
      category: 'การใช้งาน'
    },
    {
      id: '4',
      question: 'ฉันจะรับงานจิตอาสาได้อย่างไร?',
      answer: 'ค้นหางานที่สนใจในหน้า "ค้นหา" อ่านรายละเอียดงาน และกดปุ่ม "รับงาน" เพื่อแสดงความสนใจ',
      category: 'การใช้งาน'
    },
    {
      id: '5',
      question: 'มีค่าใช้จ่ายในการใช้งานหรือไม่?',
      answer: 'ไม่มีค่าใช้จ่ายในการใช้งาน GenMatch เป็นแพลตฟอร์มฟรีที่เปิดให้ทุกคนใช้งานได้',
      category: 'ทั่วไป'
    },
    {
      id: '6',
      question: 'ฉันจะติดต่อผู้ใช้คนอื่นได้อย่างไร?',
      answer: 'คุณสามารถส่งข้อความผ่านระบบแชทในแอป หรือติดต่อผ่านข้อมูลที่ผู้ใช้แชร์ไว้ในโปรไฟล์',
      category: 'การใช้งาน'
    },
    {
      id: '7',
      question: 'ฉันจะยกเลิกงานที่รับไว้ได้หรือไม่?',
      answer: 'ได้ แต่ควรแจ้งให้ทราบล่วงหน้าเพื่อให้ผู้สร้างงานสามารถหาจิตอาสาคนอื่นแทนได้',
      category: 'การใช้งาน'
    },
    {
      id: '8',
      question: 'ฉันจะได้รับคะแนนหรือรีวิวได้อย่างไร?',
      answer: 'หลังจากงานเสร็จสิ้น ผู้สร้างงานสามารถให้คะแนนและรีวิวจิตอาสาได้ ซึ่งจะช่วยสร้างความน่าเชื่อถือให้กับโปรไฟล์ของคุณ',
      category: 'การใช้งาน'
    }
  ];

  const toggleFAQ = (id: string) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link href="/" className="p-2 text-gray-600 hover:text-purple-600 transition-colors">
                <ArrowLeft className="w-6 h-6" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">ช่วยเหลือ</h1>
                <p className="text-sm text-gray-600">คำถามที่พบบ่อยและการติดต่อ</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 pb-24">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">เราพร้อมช่วยเหลือคุณ</h2>
            <p className="text-xl opacity-90">
              ค้นหาคำตอบสำหรับคำถามที่พบบ่อย หรือติดต่อเราโดยตรง
            </p>
          </div>
        </section>

        {/* Features */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">คุณสมบัติของ GenMatch</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">ใช้งานง่าย</h4>
              <p className="text-gray-600">อินเทอร์เฟซที่เรียบง่าย เข้าใจง่าย เหมาะสำหรับทุกวัย</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-pink-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">เชื่อถือได้</h4>
              <p className="text-gray-600">ระบบตรวจสอบและรีวิวที่ช่วยให้คุณมั่นใจในความปลอดภัย</p>
            </div>
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">รวดเร็ว</h4>
              <p className="text-gray-600">การเชื่อมโยงที่รวดเร็วระหว่างผู้ที่ต้องการความช่วยเหลือและจิตอาสา</p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">คำถามที่พบบ่อย</h3>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors rounded-2xl"
                >
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h4>
                    <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <div className="ml-4">
                    {expandedFAQ === faq.id ? (
                      <ChevronUp className="w-6 h-6 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-gray-500" />
                    )}
                  </div>
                </button>
                
                {expandedFAQ === faq.id && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Contact Us */}
        <section className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">ติดต่อเรา</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลติดต่อ</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                    <Mail className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">อีเมล</p>
                    <p className="text-gray-600">support@genmatch.com</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-pink-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">โทรศัพท์</p>
                    <p className="text-gray-600">02-123-4567</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">ที่อยู่</p>
                    <p className="text-gray-600">กรุงเทพมหานคร, ประเทศไทย</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">เวลาทำการ</p>
                    <p className="text-gray-600">จันทร์ - ศุกร์ 9:00 - 18:00 น.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">ส่งข้อความถึงเรา</h4>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ชื่อ</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="ชื่อของคุณ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="อีเมลของคุณ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ข้อความ</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-colors"
                    placeholder="ข้อความของคุณ"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  ส่งข้อความ
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="text-center">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="bg-purple-600 text-white px-6 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                กลับหน้าหลัก
              </Link>
              <Link
                href="/search"
                className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
              >
                ค้นหางาน
              </Link>
              <Link
                href="/add-task"
                className="bg-white text-purple-600 border-2 border-purple-600 px-6 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
              >
                สร้างงานใหม่
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          <Link 
            href="/"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">หน้าหลัก</span>
          </Link>
          <Link 
            href="/search"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">🔍</div>
            <span className="text-xs">ค้นหา</span>
          </Link>
          <Link 
            href="/add-task"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">➕</div>
            <span className="text-xs">สร้างงาน</span>
          </Link>
          <Link 
            href="/my-tasks"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">❤️</div>
            <span className="text-xs">งานของฉัน</span>
          </Link>
          <Link 
            href="/profile"
            className="flex flex-col items-center py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <div className="w-6 h-6 mb-1">👤</div>
            <span className="text-xs">โปรไฟล์</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}
