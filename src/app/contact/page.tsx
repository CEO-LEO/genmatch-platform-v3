'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, MessageCircle, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    }, 2000);
  };

  const contactMethods = [
    {
      title: 'อีเมล',
      value: 'support@genmatch.com',
      icon: Mail,
      description: 'ส่งอีเมลถึงเรา',
      color: 'from-purple-500 to-pink-500'
    },
    {
      title: 'เบอร์โทรศัพท์',
      value: '02-XXX-XXXX',
      icon: Phone,
      description: 'โทรหาเราในเวลาทำการ',
      color: 'from-blue-500 to-green-500'
    },
    {
      title: 'แชทสด',
      value: 'เริ่มแชท',
      icon: MessageCircle,
      description: 'แชทกับทีมสนับสนุน',
      color: 'from-green-500 to-blue-500'
    },
    {
      title: 'ที่อยู่',
      value: 'กรุงเทพมหานคร, ประเทศไทย',
      icon: MapPin,
      description: 'สำนักงานใหญ่',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const workingHours = [
    { day: 'จันทร์ - ศุกร์', time: '9:00 - 18:00 น.' },
    { day: 'เสาร์', time: '9:00 - 15:00 น.' },
    { day: 'อาทิตย์', time: 'ปิดทำการ' }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">ส่งข้อความสำเร็จ!</h2>
          <p className="text-gray-600 mb-6">
            ขอบคุณที่ติดต่อเรา เราจะตอบกลับภายใน 24 ชั่วโมง
          </p>
          <div className="space-y-3">
            <Link 
              href="/"
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-200 block"
            >
              กลับหน้าหลัก
            </Link>
            <button 
              onClick={() => setIsSubmitted(false)}
              className="w-full px-6 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              ส่งข้อความใหม่
            </button>
          </div>
        </div>
      </div>
    );
  }

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
      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            ติดต่อเรา
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            เราพร้อมช่วยเหลือและตอบคำถามของคุณ ติดต่อเราได้หลายช่องทาง
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">ส่งข้อความถึงเรา</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ชื่อ-นามสกุล *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="ชื่อ-นามสกุล"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    อีเมล *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    เบอร์โทรศัพท์
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="081-234-5678"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    หัวข้อ *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  >
                    <option value="">เลือกหัวข้อ</option>
                    <option value="general">คำถามทั่วไป</option>
                    <option value="technical">ปัญหาทางเทคนิค</option>
                    <option value="account">ปัญหาบัญชีผู้ใช้</option>
                    <option value="safety">ปัญหาความปลอดภัย</option>
                    <option value="feedback">ข้อเสนอแนะ</option>
                    <option value="other">อื่นๆ</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ข้อความ *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-none"
                  placeholder="กรุณาเขียนข้อความของคุณ..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-purple-700 hover:to-blue-700 focus:ring-4 focus:ring-purple-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>กำลังส่งข้อความ...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>ส่งข้อความ</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ช่องทางการติดต่อ</h2>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className={`w-12 h-12 bg-gradient-to-r ${method.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                      <method.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{method.title}</h3>
                      <p className="text-purple-600 font-medium">{method.value}</p>
                      <p className="text-sm text-gray-600">{method.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Working Hours */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock className="w-6 h-6 mr-2 text-purple-600" />
                เวลาทำการ
              </h2>
              
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-b-0">
                    <span className="font-medium text-gray-900">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-purple-800">
                  <strong>หมายเหตุ:</strong> สำหรับกรณีฉุกเฉิน สามารถติดต่อได้ตลอด 24 ชั่วโมง
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">ลิงก์ที่เกี่ยวข้อง</h2>
              
              <div className="space-y-3">
                <Link 
                  href="/help"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-purple-600">📚</span>
                  </div>
                  <span className="text-gray-900">คู่มือการใช้งาน</span>
                </Link>
                
                <Link 
                  href="/faq"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-blue-600">❓</span>
                  </div>
                  <span className="text-gray-900">คำถามที่พบบ่อย</span>
                </Link>
                
                <Link 
                  href="/register"
                  className="flex items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                    <span className="text-green-600">✨</span>
                  </div>
                  <span className="text-gray-900">สมัครสมาชิก</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
