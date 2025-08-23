'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, ChevronUp, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';

export default function HelpPage() {
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  const faqs = [
    {
      question: 'GenMatch คืออะไร?',
      answer: 'GenMatch เป็นแพลตฟอร์มเชื่อมโยงนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสาที่มีประสิทธิภาพ โดยช่วยให้ผู้สูงอายุสามารถสร้างงานจิตอาสาและให้นักศึกษาได้ช่วยเหลือ'
    },
    {
      question: 'ฉันจะเริ่มต้นใช้งานได้อย่างไร?',
      answer: 'คุณสามารถเริ่มต้นได้โดยการสมัครสมาชิกใหม่ เลือกประเภทผู้ใช้ (นักศึกษา/ผู้สูงอายุ) และเริ่มสร้างงานจิตอาสาหรือค้นหางานที่เหมาะสม'
    },
    {
      question: 'การสร้างงานจิตอาสาต้องทำอย่างไร?',
      answer: 'ไปที่หน้า "สร้างงานใหม่" กรอกข้อมูลงานที่ต้องการความช่วยเหลือ เช่น ชื่องาน รายละเอียด สถานที่ เวลา และจำนวนจิตอาสาที่ต้องการ'
    },
    {
      question: 'ฉันจะติดต่อจิตอาสาได้อย่างไร?',
      answer: 'เมื่อจิตอาสาสมัครเข้าร่วมงานของคุณ คุณจะได้รับข้อมูลติดต่อและสามารถติดต่อได้โดยตรงผ่านระบบแชทหรือข้อมูลที่ให้ไว้'
    },
    {
      question: 'มีค่าใช้จ่ายในการใช้งานหรือไม่?',
      answer: 'GenMatch เป็นแพลตฟอร์มฟรีสำหรับผู้ใช้งานทุกคน ไม่มีค่าใช้จ่ายในการสมัครสมาชิกหรือสร้างงานจิตอาสา'
    },
    {
      question: 'ฉันจะได้รับความช่วยเหลือเมื่อมีปัญหาได้อย่างไร?',
      answer: 'คุณสามารถติดต่อทีมสนับสนุนได้ผ่านหน้า "ติดต่อเรา" หรือส่งอีเมลไปยัง support@genmatch.com'
    }
  ];

  const features = [
    {
      title: 'เชื่อมโยงจิตอาสา',
      description: 'เชื่อมโยงนักศึกษากับผู้สูงอายุที่ต้องการความช่วยเหลือ',
      icon: '🤝'
    },
    {
      title: 'สร้างงานจิตอาสา',
      description: 'ผู้สูงอายุสามารถสร้างงานจิตอาสาที่ต้องการความช่วยเหลือ',
      icon: '📝'
    },
    {
      title: 'ค้นหางานที่เหมาะสม',
      description: 'นักศึกษาสามารถค้นหางานจิตอาสาที่เหมาะสมกับความสามารถ',
      icon: '🔍'
    },
    {
      title: 'ติดตามความคืบหน้า',
      description: 'ติดตามสถานะและความคืบหน้าของงานจิตอาสา',
      icon: '📊'
    }
  ];

  const contactMethods = [
    {
      title: 'อีเมล',
      value: 'support@genmatch.com',
      icon: Mail,
      description: 'ส่งอีเมลถึงเรา'
    },
    {
      title: 'เบอร์โทรศัพท์',
      value: '02-123-4567',
      icon: Phone,
      description: 'โทรหาเราในเวลาทำการ'
    },
    {
      title: 'แชทสด',
      value: 'เริ่มแชท',
      icon: MessageCircle,
      description: 'แชทกับทีมสนับสนุน'
    },
    {
      title: 'ที่อยู่',
      value: 'กรุงเทพมหานคร, ประเทศไทย',
      icon: MapPin,
      description: 'สำนักงานใหญ่'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-2">
                <span className="text-white font-bold text-lg">GM</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">GenMatch</h1>
                <p className="text-sm text-gray-500">Generation Matching</p>
              </div>
            </div>

            {/* Back to Home Button */}
            <Link 
              href="/"
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
            >
              กลับหน้าหลัก
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-white text-4xl">❓</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">เราพร้อมช่วยเหลือคุณ</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ค้นหาคำตอบสำหรับคำถามที่พบบ่อย และเรียนรู้วิธีการใช้งาน GenMatch
          </p>
        </div>

        {/* Features Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">คุณสมบัติของ GenMatch</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 border border-gray-100 rounded-lg">
                <div className="text-3xl">{feature.icon}</div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">คำถามที่พบบ่อย</h3>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {expandedFaqs.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-purple-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>
                {expandedFaqs.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm mb-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">ติดต่อเรา</h3>
          <p className="text-gray-600 text-center mb-8">
            ยังมีคำถามหรือต้องการความช่วยเหลือเพิ่มเติม? ติดต่อเราได้เลย
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {contactMethods.map((method, index) => (
              <div key={index} className="text-center p-6 border border-gray-100 rounded-lg hover:border-purple-200 transition-colors">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <method.icon className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">{method.title}</h4>
                <p className="text-purple-600 font-medium mb-1">{method.value}</p>
                <p className="text-sm text-gray-500">{method.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการอย่างรวดเร็ว</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              สมัครสมาชิก
            </Link>
            <Link
              href="/search"
              className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
            >
              ค้นหางาน
            </Link>
            <Link
              href="/add-task"
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              สร้างงานใหม่
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
