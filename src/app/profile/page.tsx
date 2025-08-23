'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft,
  Edit,
  Settings,
  HelpCircle,
  LogOut,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Star,
  Award,
  Clock,
  Heart,
  ChevronRight,
  CheckCircle,
  Plus
} from 'lucide-react';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');

  // Mock user data
  const user = {
    id: 'user_1',
    firstName: 'สมศรี',
    lastName: 'ใจดี',
    userType: 'ELDERLY',
    email: 'somsri@email.com',
    phone: '081-234-5678',
    location: 'กรุงเทพมหานคร',
    joinDate: '2024-01-15',
    rating: 4.8,
    totalTasks: 12,
    completedTasks: 8,
    totalHours: 24,
    avatar: ''
  };

  const stats = [
    { icon: Clock, label: 'ชั่วโมงจิตอาสา', value: user.totalHours, color: 'text-blue-600' },
    { icon: Award, label: 'งานที่เสร็จสิ้น', value: user.completedTasks, color: 'text-green-600' },
    { icon: Star, label: 'คะแนนความพึงพอใจ', value: user.rating, color: 'text-yellow-600' }
  ];

  const menuItems = [
    { icon: Edit, label: 'แก้ไขโปรไฟล์', href: '/profile/edit' },
    { icon: Settings, label: 'การตั้งค่า', href: '/settings' },
    { icon: HelpCircle, label: 'ช่วยเหลือ', href: '/help' },
    { icon: LogOut, label: 'ออกจากระบบ', href: '/logout' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Link
              href="/"
              className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-lg font-bold text-gray-900">โปรไฟล์</h1>
              <p className="text-sm text-gray-500">จัดการข้อมูลส่วนตัว</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 py-6 pb-24">
        {/* Profile Header */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="text-center mb-6">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <User className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500">
              {user.userType === 'ELDERLY' ? 'ผู้สูงอายุ' : 'นักศึกษา'}
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className={`w-12 h-12 ${stat.color} bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-2`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div className={`text-lg font-bold ${stat.color} mb-1`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">ข้อมูลส่วนตัว</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Mail className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">อีเมล</p>
                <p className="text-gray-900">{user.email}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">เบอร์โทรศัพท์</p>
                <p className="text-gray-900">{user.phone}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <MapPin className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">ที่อยู่</p>
                <p className="text-gray-900">{user.location}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-gray-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-500">วันที่เข้าร่วม</p>
                <p className="text-gray-900">
                  {new Date(user.joinDate).toLocaleDateString('th-TH')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">กิจกรรมล่าสุด</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">งานเสร็จสิ้น</p>
                <p className="text-xs text-gray-500">ช่วยติดตั้งคอมพิวเตอร์ - 2 ชั่วโมงที่แล้ว</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Plus className="w-4 h-4 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">สร้างงานใหม่</p>
                <p className="text-xs text-gray-500">พาไปตรวจสุขภาพที่โรงพยาบาล - 1 วันที่แล้ว</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <Star className="w-4 h-4 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">ได้รับคะแนน</p>
                <p className="text-xs text-gray-500">5 ดาว จากงานช่วยซื้อของ - 3 วันที่แล้ว</p>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-xl shadow-sm">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`flex items-center space-x-3 p-4 transition-colors ${
                index === menuItems.length - 1 ? '' : 'border-b border-gray-100'
              } hover:bg-gray-50`}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <item.icon className="w-5 h-5 text-gray-600" />
              </div>
              <span className="flex-1 text-gray-900">{item.label}</span>
              <div className="w-5 h-5 text-gray-400">
                <ChevronRight className="w-5 h-5" />
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
