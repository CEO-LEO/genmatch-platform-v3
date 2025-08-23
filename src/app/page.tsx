'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Home,
  Search,
  Plus,
  Bell,
  User,
  MapPin,
  Building,
  Wrench,
  Heart,
  Users,
  Calendar,
  Star,
  Clock
} from 'lucide-react';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState('home');

  // หมวดหมู่งานจิตอาสา
  const volunteerCategories = [
    {
      id: 'hospital',
      name: 'โรงพยาบาล',
      description: 'ช่วยเหลือในโรงพยาบาล',
      icon: <Building className="w-8 h-8 text-white" />,
      color: 'bg-red-500',
      href: '/search?category=hospital'
    },
    {
      id: 'temple',
      name: 'วัด',
      description: 'กิจกรรมจิตอาสาในวัด',
      icon: <Building className="w-8 h-8 text-white" />,
      color: 'bg-yellow-500',
      href: '/search?category=temple'
    },
    {
      id: 'physical',
      name: 'งานใช้แรงกาย',
      description: 'งานที่ต้องใช้แรงกาย',
      icon: <Wrench className="w-8 h-8 text-white" />,
      color: 'bg-green-500',
      href: '/search?category=physical'
    },
    {
      id: 'repair',
      name: 'งานซ่อมแซม',
      description: 'งานซ่อมแซมอุปกรณ์',
      icon: <Wrench className="w-8 h-8 text-white" />,
      color: 'bg-blue-500',
      href: '/search?category=repair'
    }
  ];

  // งานจิตอาสาล่าสุด
  const recentTasks = [
    {
      id: '1',
      title: 'พาไปตรวจสุขภาพที่โรงพยาบาล',
      description: 'ต้องการจิตอาสาพาไปตรวจสุขภาพที่โรงพยาบาลมหิดล',
      category: 'โรงพยาบาล',
      location: 'โรงพยาบาลมหิดล',
      date: '15 มี.ค. 2024',
      time: '09:00',
      maxVolunteers: 2,
      currentVolunteers: 1,
      urgent: true
    },
    {
      id: '2',
      title: 'ช่วยติดตั้งคอมพิวเตอร์',
      description: 'ต้องการความช่วยเหลือในการติดตั้งคอมพิวเตอร์และโปรแกรม',
      category: 'งานซ่อมแซม',
      location: 'บ้านพักผู้สูงอายุ',
      date: '16 มี.ค. 2024',
      time: '14:00',
      maxVolunteers: 1,
      currentVolunteers: 0,
      urgent: false
    },
    {
      id: '3',
      title: 'กิจกรรมจิตอาสาในวัด',
      description: 'ช่วยจัดกิจกรรมและดูแลผู้เข้าร่วม',
      category: 'วัด',
      location: 'วัดพระศรีมหาธาตุ',
      date: '17 มี.ค. 2024',
      time: '08:00',
      maxVolunteers: 5,
      currentVolunteers: 3,
      urgent: false
    }
  ];

  // สถิติ
  const stats = [
    { label: 'งานจิตอาสา', value: '156', icon: Heart, color: 'text-red-500' },
    { label: 'จิตอาสา', value: '89', icon: Users, color: 'text-blue-500' },
    { label: 'ชั่วโมงอาสา', value: '2,340', icon: Clock, color: 'text-green-500' },
    { label: 'คะแนนเฉลี่ย', value: '4.8', icon: Star, color: 'text-yellow-500' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">GenMatch</h1>
              <p className="text-sm text-gray-500">แพลตฟอร์มเชื่อมโยงจิตอาสา</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Link
              href="/notifications"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center relative"
            >
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                3
              </span>
            </Link>
            
            <Link
              href="/profile"
              className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <User className="w-5 h-5 text-purple-600" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 mb-6 text-white text-center">
          <h2 className="text-2xl font-bold mb-2">ยินดีต้อนรับสู่ GenMatch</h2>
          <p className="text-purple-100 mb-6">
            แพลตฟอร์มเชื่อมโยงระหว่างนักศึกษาและผู้สูงอายุ เพื่อการเป็นจิตอาสา
          </p>
          <div className="flex space-x-3 justify-center">
            <Link
              href="/search"
              className="bg-white text-purple-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              ค้นหางานจิตอาสา
            </Link>
            <Link
              href="/add-task"
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white hover:text-purple-600 transition-colors"
            >
              สร้างงานใหม่
            </Link>
          </div>
        </div>

        {/* Stats */}
        <section className="mb-8">
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 ${stat.color.replace('text-', 'bg-').replace('-500', '-100')} rounded-lg flex items-center justify-center`}>
                      <Icon className={`w-5 h-5 ${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">หมวดหมู่งานจิตอาสา</h3>
          <div className="grid grid-cols-2 gap-4">
            {volunteerCategories.map((category) => (
              <Link
                key={category.id}
                href={category.href}
                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-3`}>
                  {category.icon}
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{category.name}</h4>
                <p className="text-sm text-gray-600">{category.description}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Recent Tasks */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">งานจิตอาสาล่าสุด</h3>
            <Link
              href="/search"
              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
            >
              ดูทั้งหมด
            </Link>
          </div>
          
          <div className="space-y-3">
            {recentTasks.map((task) => (
              <Link
                key={task.id}
                href={`/task/${task.id}`}
                className="block bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{task.title}</h4>
                  {task.urgent && (
                    <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded-full">
                      ด่วน
                    </span>
                  )}
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                
                <div className="flex items-center space-x-4 text-xs text-gray-500 mb-3">
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-3 h-3" />
                    <span>{task.location}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>{task.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>{task.currentVolunteers}/{task.maxVolunteers}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{task.category}</span>
                  <span className="text-xs text-gray-500">{task.time}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Quick Actions */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">การดำเนินการด่วน</h3>
          <div className="grid grid-cols-2 gap-4">
            <Link
              href="/add-task"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl p-4 text-center hover:from-purple-600 hover:to-pink-600 transition-colors"
            >
              <Plus className="w-8 h-8 mx-auto mb-2" />
              <p className="font-medium">สร้างงานใหม่</p>
            </Link>
            
            <Link
              href="/search"
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl p-4 text-center hover:from-blue-600 hover:to-indigo-600 transition-colors"
            >
              <Search className="w-8 h-8 mx-auto mb-2" />
              <p className="font-medium">ค้นหางาน</p>
            </Link>
          </div>
        </section>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2">
        <div className="flex items-center justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg transition-colors ${
              activeTab === 'home' ? 'text-purple-600 bg-purple-50' : 'text-gray-600 hover:text-purple-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">หน้าหลัก</span>
          </button>
          
          <Link
            href="/search"
            className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Search className="w-6 h-6" />
            <span className="text-xs">ค้นหา</span>
          </Link>
          
          <Link
            href="/add-task"
            className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Plus className="w-6 h-6" />
            <span className="text-xs">สร้างงาน</span>
          </Link>
          
          <Link
            href="/my-tasks"
            className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <Heart className="w-6 h-6" />
            <span className="text-xs">งานของฉัน</span>
          </Link>
          
          <Link
            href="/profile"
            className="flex flex-col items-center space-y-1 py-2 px-3 rounded-lg text-gray-600 hover:text-purple-600 transition-colors"
          >
            <User className="w-6 h-6" />
            <span className="text-xs">โปรไฟล์</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}