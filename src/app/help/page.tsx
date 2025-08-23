'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  HelpCircle, 
  MessageCircle, 
  Phone, 
  Mail, 
  ChevronDown,
  ChevronUp,
  BookOpen,
  Users,
  Shield,
  Star,
  Heart
} from 'lucide-react';

export default function HelpPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqs = [
    {
      question: 'GenMatch คืออะไร?',
      answer: 'GenMatch เป็นแพลตฟอร์มเชื่อมโยงนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสาที่มีประสิทธิภาพ เรามุ่งมั่นสร้างสังคมที่ดีผ่านการช่วยเหลือซึ่งกันและกัน'
    },
    {
      question: 'ฉันจะเริ่มต้นใช้งานได้อย่างไร?',
      answer: 'คุณสามารถสมัครสมาชิกใหม่ได้ที่หน้าสมัครสมาชิก หรือหากมีบัญชีอยู่แล้วให้เข้าสู่ระบบ จากนั้นคุณจะสามารถค้นหางานจิตอาสาและเข้าร่วมได้ทันที'
    },
    {
      question: 'งานจิตอาสามีประเภทอะไรบ้าง?',
      answer: 'เรามีงานจิตอาสาหลากหลายประเภท เช่น การดูแลผู้สูงอายุ การสอนหนังสือ การทำความสะอาด การซ่อมแซม และอื่นๆ อีกมากมาย'
    },
    {
      question: 'ฉันจะสร้างงานจิตอาสาใหม่ได้อย่างไร?',
      answer: 'คุณสามารถสร้างงานจิตอาสาใหม่ได้ที่หน้าสร้างงาน โดยกรอกข้อมูลงานที่ต้องการความช่วยเหลือ และเราจะช่วยหาจิตอาสาที่เหมาะสม'
    },
    {
      question: 'ฉันจะติดต่อผู้สร้างงานได้อย่างไร?',
      answer: 'คุณสามารถติดต่อผู้สร้างงานได้ผ่านระบบแชทในแอป หรือดูข้อมูลติดต่อที่แสดงในรายละเอียดงาน'
    },
    {
      question: 'มีระบบความปลอดภัยอย่างไร?',
      answer: 'เรามีระบบยืนยันตัวตน การประเมินผลงาน และการรายงานปัญหา เพื่อให้ทุกคนใช้งานได้อย่างปลอดภัยและน่าเชื่อถือ'
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'อีเมล',
      description: 'support@genmatch.com',
      action: 'ส่งอีเมล'
    },
    {
      icon: Phone,
      title: 'โทรศัพท์',
      description: '02-123-4567',
      action: 'โทรหา'
    },
    {
      icon: MessageCircle,
      title: 'แชทสด',
      description: '24/7',
      action: 'เริ่มแชท'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'เชื่อมโยงผู้คน',
      description: 'เชื่อมโยงนักศึกษาและผู้สูงอายุผ่านงานจิตอาสา'
    },
    {
      icon: Shield,
      title: 'ปลอดภัย',
      description: 'ระบบความปลอดภัยที่ได้รับการยืนยันและเชื่อถือได้'
    },
    {
      icon: Star,
      title: 'คุณภาพสูง',
      description: 'งานจิตอาสาที่มีคุณภาพและตรงตามความต้องการ'
    },
    {
      icon: Heart,
      title: 'จิตอาสา',
      description: 'ส่งเสริมการเป็นจิตอาสาและการช่วยเหลือสังคม'
    }
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

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
            
            {/* Back Button */}
            <Link 
              href="/"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>กลับหน้าหลัก</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">เราพร้อมช่วยเหลือคุณ</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              ค้นหาคำตอบสำหรับคำถามที่พบบ่อย หรือติดต่อเราโดยตรงเพื่อรับความช่วยเหลือ
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              );
            })}
          </div>

          {/* FAQ Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center flex items-center justify-center">
              <BookOpen className="w-6 h-6 mr-3 text-purple-600" />
              คำถามที่พบบ่อย
            </h3>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>
                  
                  {expandedFaq === index && (
                    <div className="px-6 py-4 bg-white border-t border-gray-200">
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">ติดต่อเรา</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <div key={index} className="text-center p-6 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h4>
                    <p className="text-gray-600 mb-4">{method.description}</p>
                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors">
                      {method.action}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">การดำเนินการด่วน</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/search"
                className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl text-center hover:bg-purple-100 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  🔍
                </div>
                <h4 className="font-semibold text-purple-800 mb-1">ค้นหางาน</h4>
                <p className="text-sm text-purple-600">ค้นหางานจิตอาสาที่เหมาะกับคุณ</p>
              </Link>
              
              <Link
                href="/add-task"
                className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl text-center hover:bg-purple-100 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  ➕
                </div>
                <h4 className="font-semibold text-purple-800 mb-1">สร้างงาน</h4>
                <p className="text-sm text-purple-600">สร้างงานจิตอาสาใหม่</p>
              </Link>
              
              <Link
                href="/profile"
                className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl text-center hover:bg-purple-100 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  👤
                </div>
                <h4 className="font-semibold text-purple-800 mb-1">โปรไฟล์</h4>
                <p className="text-sm text-purple-600">จัดการโปรไฟล์ของคุณ</p>
              </Link>
              
              <Link
                href="/settings"
                className="p-4 bg-purple-50 border-2 border-purple-200 rounded-xl text-center hover:bg-purple-100 transition-colors"
              >
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  ⚙️
                </div>
                <h4 className="font-semibold text-purple-800 mb-1">ตั้งค่า</h4>
                <p className="text-sm text-purple-600">ปรับแต่งการตั้งค่า</p>
              </Link>
            </div>
          </div>

          {/* Additional Help */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">ยังไม่พบสิ่งที่คุณต้องการ?</h3>
              <p className="text-gray-600 mb-6">
                ทีมงานของเราพร้อมให้ความช่วยเหลือคุณตลอด 24 ชั่วโมง
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/contact"
                  className="bg-purple-600 text-white px-8 py-3 rounded-full font-medium hover:bg-purple-700 transition-colors"
                >
                  ติดต่อเรา
                </Link>
                <Link
                  href="/feedback"
                  className="bg-white text-purple-600 border-2 border-purple-600 px-8 py-3 rounded-full font-medium hover:bg-purple-50 transition-colors"
                >
                  แจ้งความคิดเห็น
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
