'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Users, 
  Clock, 
  Star, 
  Award, 
  Target, 
  Shield, 
  Zap,
  ChevronDown,
  ArrowRight,
  Play,
  CheckCircle,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Menu,
  X,
  Building,
  Globe,
  Wrench,
  GraduationCap
} from 'lucide-react';
import LogoIcon from '@/components/LogoIcon'

export default function HomePage() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // Service categories for mobile
  const serviceCategories = [
    {
      id: 'elderly-care',
      name: 'การดูแลผู้สูงอายุ',
      description: 'ช่วยเหลือและดูแลผู้สูงอายุในชีวิตประจำวัน',
      icon: <Users className="w-8 h-8 text-white" />,
      color: 'bg-blue-500',
      href: '/search?category=elderly-care'
    },
    {
      id: 'education',
      name: 'การศึกษา',
      description: 'สอนหนังสือและให้ความรู้ในด้านต่างๆ',
      icon: <GraduationCap className="w-8 h-8 text-white" />,
      color: 'bg-green-500',
      href: '/search?category=education'
    },
    {
      id: 'household',
      name: 'งานบ้าน',
      description: 'ช่วยงานบ้านและงานซ่อมแซมต่างๆ',
      icon: <Building className="w-8 h-8 text-white" />,
      color: 'bg-purple-500',
      href: '/search?category=household'
    },
    {
      id: 'volunteer',
      name: 'จิตอาสา',
      description: 'กิจกรรมเพื่อสังคมและชุมชน',
      icon: <Star className="w-8 h-8 text-white" />,
      color: 'bg-orange-500',
      href: '/search?category=volunteer'
    }
  ]

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'เชื่อมโยงจิตอาสา',
      description: 'เชื่อมต่อนักศึกษาและผู้สูงอายุ',
      color: 'text-purple-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'สะสมชั่วโมง',
      description: 'นักศึกษาสะสมชั่วโมงจิตอาสา',
      color: 'text-blue-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'ปลอดภัย',
      description: 'ระบบปลอดภัยและน่าเชื่อถือ',
      color: 'text-green-600'
    }
  ]

  const stats = [
    { number: '1000+', label: 'นักศึกษา' },
    { number: '500+', label: 'ผู้สูงอายุ' },
    { number: '5000+', label: 'ชั่วโมงอาสา' },
    { number: '98%', label: 'ความพึงพอใจ' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Status Bar */}
      <div className="bg-white px-4 py-3 text-sm text-gray-600 text-center border-b border-gray-100 md:hidden">
        <div className="flex items-center justify-between">
          <span>9:41</span>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <LogoIcon className="w-8 h-8" />
              <span className="text-xl font-bold text-gray-900">GenMatch</span>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">
                คุณสมบัติ
              </Link>
              <Link href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">
                วิธีใช้งาน
              </Link>
              <Link href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors">
                เกี่ยวกับเรา
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link 
                href="/login"
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                เข้าสู่ระบบ
              </Link>
              <Link 
                href="/register"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                สมัครสมาชิก
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <LogoIcon className="w-8 h-8" />
                  <span className="text-xl font-bold text-gray-900">GenMatch</span>
                </div>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <nav className="space-y-4 mb-8">
                <Link 
                  href="#features" 
                  className="block py-3 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  คุณสมบัติ
                </Link>
                <Link 
                  href="#how-it-works" 
                  className="block py-3 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  วิธีใช้งาน
                </Link>
                <Link 
                  href="#about" 
                  className="block py-3 text-gray-700 hover:text-indigo-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  เกี่ยวกับเรา
                </Link>
              </nav>

              <div className="space-y-3">
                <Link 
                  href="/login"
                  className="block w-full py-3 text-center text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  เข้าสู่ระบบ
                </Link>
                <Link 
                  href="/register"
                  className="block w-full py-3 text-center bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  สมัครสมาชิก
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section - Mobile First */}
      <section className="px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-10 h-10 md:w-12 md:h-12 text-white" />
            </div>
            
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
              เชื่อมโยง<span className="text-indigo-600">จิตอาสา</span><br />
              สร้าง<span className="text-purple-600">สังคมดี</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              แพลตฟอร์มเชื่อมโยงนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสาที่มีประสิทธิภาพ
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 mb-12">
            <Link 
              href="/register"
              className="w-full md:w-auto px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold text-lg hover:bg-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              เริ่มต้นใช้งาน
            </Link>
            <Link 
              href="/login"
              className="w-full md:w-auto px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold text-lg hover:border-indigo-300 hover:text-indigo-600 transition-all duration-200"
            >
              เข้าสู่ระบบ
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-indigo-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-sm md:text-base text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Categories - Mobile First */}
      <section className="px-4 py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              หมวดหมู่งานจิตอาสา
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ค้นหางานจิตอาสาที่เหมาะกับคุณในหมวดหมู่ต่างๆ
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {serviceCategories.map((category, index) => (
              <div
                key={index}
                className={`${category.color} rounded-2xl p-6 text-center text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <div className="text-3xl mb-3">{category.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                <p className="text-sm text-white/90">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Mobile First */}
      <section id="features" className="px-4 py-12 md:py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              ทำไมต้อง GenMatch?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              เราคือแพลตฟอร์มที่ทำให้การเป็นจิตอาสาง่ายและมีประสิทธิภาพ
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 ${feature.color} bg-opacity-10 rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works - Mobile First */}
      <section id="how-it-works" className="px-4 py-12 md:py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              วิธีใช้งาน
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              เริ่มต้นใช้งาน GenMatch ได้ง่ายๆ ใน 3 ขั้นตอน
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                สมัครสมาชิก
              </h3>
              <p className="text-gray-600">
                สร้างบัญชีผู้ใช้ใหม่ ระบุประเภทเป็นนักศึกษาหรือผู้สูงอายุ
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ค้นหาหรือสร้างงาน
              </h3>
              <p className="text-gray-600">
                นักศึกษาค้นหางาน ผู้สูงอายุสร้างงานที่ต้องการความช่วยเหลือ
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                ทำงานและรับรางวัล
              </h3>
              <p className="text-gray-600">
                ทำงานจิตอาสาและรับชั่วโมงอาสาสำหรับการสมัครงานและกู้กยศ.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Mobile First */}
      <section className="px-4 py-12 md:py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">
            พร้อมเริ่มต้นแล้วหรือยัง?
          </h2>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            เข้าร่วมกับเราวันนี้ และเป็นส่วนหนึ่งของการสร้างสังคมที่ดีขึ้น
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4">
            <Link 
              href="/register"
              className="w-full md:w-auto px-8 py-4 bg-white text-indigo-600 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg"
            >
              สมัครสมาชิกฟรี
            </Link>
            <Link 
              href="/login"
              className="w-full md:w-auto px-8 py-4 border-2 border-white text-white rounded-xl font-semibold text-lg hover:bg-white hover:text-indigo-600 transition-all duration-200"
            >
              เข้าสู่ระบบ
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Mobile First */}
      <footer className="bg-gray-900 text-white px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo and Description */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <LogoIcon className="w-8 h-8" />
                <span className="text-xl font-bold">GenMatch</span>
              </div>
              <p className="text-gray-400 mb-6 leading-relaxed">
                แพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสาที่มีประสิทธิภาพ
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-indigo-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ลิงก์ด่วน</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-gray-400 hover:text-white transition-colors">คุณสมบัติ</a></li>
                <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">วิธีใช้งาน</a></li>
                <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
                <li><Link href="/login" className="text-gray-400 hover:text-white transition-colors">เข้าสู่ระบบ</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">ติดต่อเรา</h3>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">info@genmatch.com</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">02-xxx-xxxx</span>
                </li>
                <li className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">กรุงเทพมหานคร</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-8 text-center">
            <p className="text-gray-400">
              © 2024 GenMatch. สงวนลิขสิทธิ์.
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Safe Area */}
      <div className="h-6 bg-gray-900 md:hidden"></div>
    </div>
  )
}