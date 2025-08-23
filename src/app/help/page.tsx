'use client';

import Link from 'next/link';
import { 
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Shield,
  Star
} from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      question: 'GenMatch คืออะไร?',
      answer: 'GenMatch เป็นแพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสา โดยนักศึกษาจะได้รับชั่วโมงจิตอาสา เพื่อนำไปใช้ในการกู้กยศ. และการสมัครงาน'
    },
    {
      question: 'การใช้งานมีค่าใช้จ่ายหรือไม่?',
      answer: 'ไม่ มีค่าใช้จ่ายใดๆ ทั้งสิ้น GenMatch เป็นแพลตฟอร์มที่ไม่แสวงหาผลกำไร'
    },
    {
      question: 'ใครสามารถใช้งานได้บ้าง?',
      answer: 'นักศึกษาที่ต้องการชั่วโมงจิตอาสา และผู้สูงอายุที่ต้องการความช่วยเหลือ สามารถใช้งานได้ทุกคน'
    },
    {
      question: 'งานจิตอาสามีประเภทไหนบ้าง?',
      answer: 'มีหลายประเภท เช่น การดูแลผู้สูงอายุ งานบ้าน การศึกษา งานซ่อมแซม และกิจกรรมในชุมชน'
    },
    {
      question: 'ระบบความปลอดภัยเป็นอย่างไร?',
      answer: 'เรามีระบบยืนยันตัวตนและประเมินความน่าเชื่อถือ เพื่อความปลอดภัยของผู้ใช้งานทุกคน'
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: 'อีเมล',
      value: 'help@genmatch.com',
      description: 'ตอบกลับภายใน 24 ชั่วโมง'
    },
    {
      icon: Phone,
      title: 'เบอร์โทร',
      value: '02-xxx-xxxx',
      description: 'จันทร์-ศุกร์ 9:00-18:00'
    },
    {
      icon: MapPin,
      title: 'ที่อยู่',
      value: 'กรุงเทพมหานคร',
      description: 'สำนักงานใหญ่'
    }
  ];

  const features = [
    {
      icon: Users,
      title: 'ชุมชนที่ปลอดภัย',
      description: 'ระบบยืนยันตัวตนและประเมินความน่าเชื่อถือ'
    },
    {
      icon: Clock,
      title: 'สะสมชั่วโมง',
      description: 'นักศึกษาสะสมชั่วโมงจิตอาสาเพื่อการกู้กยศ.'
    },
    {
      icon: Shield,
      title: 'การคุ้มครอง',
      description: 'ประกันและความคุ้มครองสำหรับผู้ใช้งาน'
    },
    {
      icon: Star,
      title: 'ระบบประเมิน',
      description: 'ระบบประเมินและรีวิวเพื่อความน่าเชื่อถือ'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center space-x-3">
          <Link
            href="/"
            className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-lg font-bold text-gray-900">ช่วยเหลือ</h1>
            <p className="text-sm text-gray-500">คำถามที่พบบ่อยและการติดต่อ</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 text-white text-center">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-2">เราพร้อมช่วยเหลือคุณ</h2>
          <p className="text-purple-100">
            ค้นหาคำตอบหรือติดต่อเราเพื่อรับความช่วยเหลือ
          </p>
        </div>

        {/* Features */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">คุณสมบัติของ GenMatch</h3>
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                  <p className="text-xs text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">คำถามที่พบบ่อย</h3>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                <p className="text-sm text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Methods */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ติดต่อเรา</h3>
          <div className="space-y-3">
            {contactMethods.map((method, index) => {
              const Icon = method.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{method.title}</h4>
                      <p className="text-sm text-gray-600">{method.value}</p>
                      <p className="text-xs text-gray-500">{method.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
          <div className="space-y-3">
            <Link
              href="/register"
              className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">สมัครสมาชิก</h4>
                    <p className="text-sm text-gray-600">เริ่มต้นใช้งาน GenMatch</p>
                  </div>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            </Link>

            <Link
              href="/search"
              className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">ค้นหางานจิตอาสา</h4>
                    <p className="text-sm text-gray-600">ค้นหางานที่เหมาะกับคุณ</p>
                  </div>
                </div>
                <div className="text-gray-400">→</div>
              </div>
            </Link>
          </div>
        </section>

        {/* Additional Help */}
        <div className="bg-white rounded-xl p-6 shadow-sm text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">ยังคงมีปัญหา?</h3>
          <p className="text-gray-600 mb-4">
            ทีมสนับสนุนของเราพร้อมช่วยเหลือคุณ
          </p>
          <Link
            href="mailto:help@genmatch.com"
            className="inline-flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>ส่งอีเมลหาเรา</span>
          </Link>
        </div>
      </main>
    </div>
  );
}
