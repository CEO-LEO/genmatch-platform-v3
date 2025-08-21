'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { 
  Heart, 
  Users, 
  MapPin, 
  Clock, 
  Star, 
  ArrowRight, 
  Play,
  Shield,
  CheckCircle,
  TrendingUp,
  Award,
  MessageCircle,
  Calendar,
  Building,
  GraduationCap,
  ChevronRight,
  Sparkles,
  Target,
  Globe,
  User
} from 'lucide-react';
import LogoIcon from '@/components/LogoIcon'

export default function HomePage() {
  const features = [
    {
      icon: <Users className="w-10 h-10 text-white" />,
      title: 'เชื่อมโยงจิตอาสา',
      description: 'เชื่อมต่อระหว่างนักศึกษา กยศ. และผู้สูงอายุอย่างมีประสิทธิภาพ',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      icon: <Target className="w-10 h-10 text-white" />,
      title: 'ระบบจัดการงาน',
      description: 'ติดตามและจัดการงานจิตอาสาได้อย่างเป็นระบบ',
      bgColor: 'bg-gradient-to-br from-purple-600 to-purple-700'
    },
    {
      icon: <Clock className="w-10 h-10 text-white" />,
      title: 'สะสมชั่วโมง',
      description: 'นักศึกษาสามารถสะสมชั่วโมงจิตอาสาได้',
      bgColor: 'bg-gradient-to-br from-blue-600 to-blue-700'
    },
    {
      icon: <Award className="w-10 h-10 text-white" />,
      title: 'รีวิวและคะแนน',
      description: 'ระบบรีวิวและคะแนนความพึงพอใจ',
      bgColor: 'bg-gradient-to-br from-blue-700 to-blue-800'
    }
  ]

  const categories = [
    {
      icon: <Heart className="w-8 h-8 text-white" />,
      title: 'โรงพยาบาล',
      description: 'ช่วยเหลือในโรงพยาบาลและสถานพยาบาล',
      bgColor: 'bg-gradient-to-br from-red-500 to-red-600',
      iconBg: 'bg-red-500'
    },
    {
      icon: <Globe className="w-8 h-8 text-white" />,
      title: 'วัด',
      description: 'กิจกรรมจิตอาสาในวัดและศาสนสถาน',
      bgColor: 'bg-gradient-to-br from-yellow-500 to-yellow-600',
      iconBg: 'bg-yellow-500'
    },
    {
      icon: <Target className="w-8 h-8 text-white" />,
      title: 'ออกกำลังกาย',
      description: 'กิจกรรมออกกำลังกายและกีฬา',
      bgColor: 'bg-gradient-to-br from-green-500 to-green-600',
      iconBg: 'bg-green-500'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-white" />,
      title: 'ซ่อมแซม',
      description: 'งานซ่อมแซมและปรับปรุงสถานที่',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600',
      iconBg: 'bg-blue-500'
    }
  ]

  const stats = [
    {
      icon: <Users className="w-10 h-10 text-purple-600" />,
      value: '1,500+',
      label: 'จิตอาสา',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-200'
    },
    {
      icon: <CheckCircle className="w-10 h-10 text-purple-600" />,
      value: '500+',
      label: 'งานเสร็จสิ้น',
      bgColor: 'bg-gradient-to-br from-purple-50 to-purple-100',
      borderColor: 'border-purple-200'
    },
    {
      icon: <Clock className="w-10 h-10 text-blue-600" />,
      value: '2,000+',
      label: 'ชั่วโมงจิตอาสา',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200'
    },
    {
      icon: <Star className="w-10 h-10 text-blue-600" />,
      value: '4.8',
      label: 'คะแนนความพึงพอใจ',
      bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100',
      borderColor: 'border-blue-200'
    }
  ]

  const steps = [
    {
      number: '1',
      icon: <GraduationCap className="w-12 h-12 text-white" />,
      title: 'นักศึกษา กยศ.',
      description: 'ลงทะเบียนและเลือกงานจิตอาสา',
      bgColor: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      number: '2',
      icon: <User className="w-12 h-12 text-white" />,
      title: 'ผู้สูงอายุ',
      description: 'โพสต์งานที่ต้องการความช่วยเหลือ',
      bgColor: 'bg-gradient-to-br from-blue-500 to-blue-600'
    },
    {
      number: '3',
      icon: <GraduationCap className="w-12 h-12 text-white" />,
      title: 'จิตอาสา',
      description: 'ทำงานและได้รับประสบการณ์',
      bgColor: 'bg-gradient-to-br from-purple-600 to-blue-700'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-purple-200/50 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <LogoIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-600 font-medium">Generation Matching</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-800 bg-clip-text text-transparent">
                  GenMatch
                </div>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-8">
              <Link href="#features" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                คุณสมบัติ
              </Link>
              <Link href="#how-it-works" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                วิธีการทํางาน
              </Link>
              <Link href="#about" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                เกี่ยวกับเรา
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login" className="text-purple-600 hover:text-purple-700 font-semibold px-4 py-2 rounded-lg hover:bg-purple-50 transition-all duration-200">
                เข้าสู่ระบบ
              </Link>
              <Link href="/register" className="bg-gradient-to-r from-purple-500 to-blue-700 hover:from-purple-600 hover:to-blue-800 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                ลงทะเบียน
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-purple-300/20 rounded-full blur-3xl"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-300/30 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-purple-100/30 to-blue-200/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
              <span className="block bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 bg-clip-text text-transparent animate-pulse">
                แพลตฟอร์ม
              </span>
              <span className="block bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 bg-clip-text text-transparent">
                เชื่อมโยง
              </span>
              <span className="block bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 bg-clip-text text-transparent">
                นักศึกษา กยศ.
              </span>
              <span className="block bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 bg-clip-text text-transparent">
                และผู้สูงอายุ
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed">
              แพลตฟอร์มเชื่อมโยงระหว่างนักศึกษา กยศ. และผู้สูงอายุ เพื่อการช่วยเหลือและแลกเปลี่ยนเรียนรู้ซึ่งกันและกัน
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/search" className="group bg-gradient-to-r from-purple-500 to-blue-700 hover:from-purple-600 hover:to-blue-800 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center">
                ดูงานอาสา
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/register" className="group border-2 border-purple-500 text-purple-600 hover:bg-purple-500 hover:text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 inline-flex items-center">
                ลงทะเบียนเป็นจิตอาสา
                <ChevronRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              วิธีการทำงาน
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              ง่ายๆ เพียง 3 ขั้นตอน
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className={`w-24 h-24 ${step.bgColor} rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl`}>
                  <span className="text-3xl font-bold text-white">{step.number}</span>
                </div>
                <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  {step.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
                <div className="flex justify-center mt-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-purple-500 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`group p-6 text-center rounded-2xl border-2 ${stat.bgColor} ${stat.borderColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-white rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-700 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {stat.value}
                </div>
                <div className="text-base text-gray-700 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              คุณสมบัติเด่น
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              แพลตฟอร์มที่ออกแบบมาเพื่อการใช้งานที่ง่ายและมีประสิทธิภาพ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-6 text-center rounded-2xl bg-white border border-gray-200 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              หมวดหม่างานจิตอาสา
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              เลือกงานจิตอาสาตามความสนใจและความสามารถของคุณ
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className={`group p-6 text-center rounded-2xl ${category.bgColor} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className={`w-14 h-14 ${category.iconBg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {category.title}
                </h3>
                <p className="text-white/90 leading-relaxed text-sm">
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-700 rounded-xl flex items-center justify-center">
                  <LogoIcon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">GenMatch</span>
              </div>
              <p className="text-gray-400 leading-relaxed text-sm">
                แพลตฟอร์มเชื่อมโยงจิตอาสาเพื่อสังคมที่ดี
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">ลิงก์ด่วน</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white transition-colors">เกี่ยวกับเรา</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">ติดต่อเรา</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">ความเป็นส่วนตัว</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">บริการ</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/search" className="hover:text-white transition-colors">ค้นหางาน</Link></li>
                <li><Link href="/register" className="hover:text-white transition-colors">ลงทะเบียน</Link></li>
                <li><Link href="/dashboard" className="hover:text-white transition-colors">แดชบอร์ด</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">ติดต่อ</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>อีเมล: info@genmatch.com</li>
                <li>โทร: 02-123-4567</li>
                <li>ที่อยู่: กรุงเทพมหานคร</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 GenMatch. สงวนลิขสิทธิ์ทั้งหมด.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
