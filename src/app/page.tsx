'use client';

import { useState } from 'react';
import Link from 'next/link';
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
  GraduationCap
} from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('features');

  const features = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'เชื่อมโยงจิตอาสา',
      description: 'เชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสาที่มีประสิทธิภาพ'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'ชุมชนแห่งการให้',
      description: 'สร้างชุมชนที่เต็มไปด้วยความเอื้ออาทรและการช่วยเหลือกัน'
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'ค้นหางานใกล้บ้าน',
      description: 'ค้นหางานจิตอาสาที่อยู่ใกล้คุณ พร้อมระบบนำทางที่แม่นยำ'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'สะสมชั่วโมงจิตอาสา',
      description: 'นักศึกษาสามารถสะสมชั่วโมงจิตอาสาเพื่อใช้ในการกู้กยศ. และสมัครงาน'
    }
  ];

  const categories = [
    {
      icon: '🏥',
      title: 'โรงพยาบาล',
      description: 'พาไปตรวจสุขภาพ, รับยา, นัดหมายแพทย์',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: '🕍',
      title: 'วัด',
      description: 'พาไปทำบุญ, กิจกรรมทางศาสนา, งานวัด',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: '💪',
      title: 'ออกกำลังกาย',
      description: 'พาไปออกกำลังกาย, เดินเล่น, กิจกรรมกีฬา',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: '🔧',
      title: 'งานซ่อม',
      description: 'ซ่อมแซมอุปกรณ์, งานช่าง, งานเทคนิค',
      color: 'from-blue-500 to-indigo-500'
    }
  ];

  const stats = [
    { number: '1,500+', label: 'จิตอาสา', icon: <Users className="w-6 h-6" /> },
    { number: '500+', label: 'งานเสร็จสิ้น', icon: <CheckCircle className="w-6 h-6" /> },
    { number: '2,000+', label: 'ชั่วโมงจิตอาสา', icon: <Clock className="w-6 h-6" /> },
    { number: '4.8', label: 'คะแนนความพึงพอใจ', icon: <Star className="w-6 h-6" /> }
  ];

  const testimonials = [
    {
      name: 'คุณสมชาย ใจดี',
      role: 'นักศึกษา มหาวิทยาลัยมหิดล',
      content: 'ได้เรียนรู้การดูแลผู้สูงอายุและได้รับประสบการณ์ที่มีค่ามาก ระบบใช้งานง่ายมาก',
      avatar: '👨‍🎓',
      rating: 5
    },
    {
      name: 'คุณยายสมศรี รักดี',
      role: 'ผู้สูงอายุ',
      content: 'มีคนมาช่วยเหลือเป็นประจำ ทำให้ชีวิตมีความสุขมากขึ้น ขอบคุณมากๆ',
      avatar: '👵',
      rating: 5
    },
    {
      name: 'คุณสมหญิง รักดี',
      role: 'นักศึกษา จุฬาลงกรณ์มหาวิทยาลัย',
      content: 'ได้ช่วยเหลือสังคมและสะสมชั่วโมงจิตอาสาไปพร้อมกัน ดีมากเลย',
      avatar: '👩‍🎓',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-purple-900">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-white">GenMatch</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-white/70 hover:text-white transition-colors">คุณสมบัติ</a>
          <a href="#how-it-works" className="text-white/70 hover:text-white transition-colors">วิธีการทำงาน</a>
          <a href="#about" className="text-white/70 hover:text-white transition-colors">เกี่ยวกับเรา</a>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link href="/login" className="text-white/70 hover:text-white transition-colors">
            เข้าสู่ระบบ
          </Link>
          <Link href="/register" className="glass-button-primary px-6 py-2 rounded-lg">
            ลงทะเบียน
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 text-center py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            เชื่อมโยง
            <span className="block bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
              จิตอาสา
            </span>
            สร้างสังคมดี
          </h1>
          
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            แพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสาที่มีประสิทธิภาพ<br />
            นักศึกษาสามารถสะสมชั่วโมงจิตอาสา ผู้สูงอายุได้รับความช่วยเหลือที่ต้องการ
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link href="/register" className="glass-button-primary px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform">
              เริ่มต้นใช้งาน
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </Link>
            
            <Link href="#how-it-works" className="glass-button-secondary px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform">
              <Play className="w-5 h-5 mr-2 inline" />
              ดูวิธีการทำงาน
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <div className="text-white">
                    {stat.icon}
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">คุณสมบัติเด่น</h2>
            <p className="text-xl text-white/70">ทุกสิ่งที่คุณต้องการในการเป็นจิตอาสา</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="glass-card p-8 hover:scale-105 transition-transform">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-white/70 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">หมวดหม่งาน</h2>
            <p className="text-xl text-white/70">เลือกงานที่เหมาะสมกับความสามารถของคุณ</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div key={index} className="glass-card p-6 text-center hover:scale-105 transition-transform">
                <div className={`w-20 h-20 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mx-auto mb-4 text-4xl`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{category.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">วิธีการทำงาน</h2>
            <p className="text-xl text-white/70">ง่ายๆ เพียง 3 ขั้นตอน</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                1
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">ลงทะเบียน</h3>
              <p className="text-white/70">สร้างบัญชีและเลือกประเภทผู้ใช้ (นักศึกษาหรือผู้สูงอายุ)</p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                2
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">ค้นหาหรือโพสต์งาน</h3>
              <p className="text-white/70">นักศึกษาค้นหางาน ผู้สูงอายุโพสต์งานที่ต้องการความช่วยเหลือ</p>
            </div>
            
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-white">
                3
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">เริ่มต้นการเป็นจิตอาสา</h3>
              <p className="text-white/70">ติดต่อกัน ทำงานร่วมกัน และสร้างความสัมพันธ์ที่ดี</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">เสียงจากผู้ใช้งาน</h2>
            <p className="text-xl text-white/70">เรื่องราวดีๆ จากชุมชน GenMatch</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="glass-card p-8">
                <div className="flex items-center mb-6">
                  <div className="text-4xl mr-4">{testimonial.avatar}</div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{testimonial.name}</h4>
                    <p className="text-white/70 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                
                <p className="text-white/80 mb-4 leading-relaxed">"{testimonial.content}"</p>
                
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="glass-card p-12">
            <h2 className="text-4xl font-bold text-white mb-6">พร้อมที่จะเริ่มต้นการเป็นจิตอาสา?</h2>
            <p className="text-xl text-white/70 mb-8">
              เข้าร่วมกับเราเพื่อสร้างสังคมแห่งการให้และความเอื้ออาทร
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link href="/register" className="glass-button-primary px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform">
                ลงทะเบียนเลย
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </Link>
              
              <Link href="/login" className="glass-button-secondary px-8 py-4 text-lg rounded-xl hover:scale-105 transition-transform">
                เข้าสู่ระบบ
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-12 px-6 border-t border-white/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">GenMatch</span>
              </div>
              <p className="text-white/70 text-sm">
                แพลตฟอร์มเชื่อมโยงจิตอาสา สร้างสังคมดี
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">คุณสมบัติ</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">ค้นหางาน</a></li>
                <li><a href="#" className="hover:text-white transition-colors">โพสต์งาน</a></li>
                <li><a href="#" className="hover:text-white transition-colors">แชท</a></li>
                <li><a href="#" className="hover:text-white transition-colors">สถิติ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">หมวดหม่งาน</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">โรงพยาบาล</a></li>
                <li><a href="#" className="hover:text-white transition-colors">วัด</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ออกกำลังกาย</a></li>
                <li><a href="#" className="hover:text-white transition-colors">งานซ่อม</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">ติดต่อเรา</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><a href="#" className="hover:text-white transition-colors">ช่วยเหลือ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
                <li><a href="#" className="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a></li>
                <li><a href="#" className="hover:text-white transition-colors">ข้อกำหนดการใช้งาน</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-white/50 text-sm">
              © 2024 GenMatch. สงวนลิขสิทธิ์ทั้งหมด.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
